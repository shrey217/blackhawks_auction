// test_budgeting_formula.js
// Test for the player price calculation formula used in budgeting.html

const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// --- Utility Functions (from budgeting.html) ---
function getCategoryMultiplier(category) {
  switch ((category || '').toLowerCase()) {
    case 'bronze': return 0.4;
    case 'silver': return 0.6;
    case 'gold': return 0.8;
    case 'platinum': return 1.0;
    default: return 1.0;
  }
}

function calculateN(roster, player, teamAbbr) {
  const position = (player.position || '').toLowerCase();
  const maxAllowed = {
    'setter': 2,
    'attacker': 4,
    'libero': 2,
    'middle blocker': 4,
    'middleblocker': 4,
    'universal': 2
  };
  // Count filled positions (normalize for spaces and case)
  let filledCount = 0;
  if (roster && Array.isArray(roster)) {
    roster.forEach(p => {
      if (((p.position || '').replace(/ /g, '').toLowerCase()) === position.replace(/ /g, '')) {
        filledCount++;
      }
    });
  }
  const maxAllowedForPosition = maxAllowed[position] || 2;
  let priority = 1;
  let maxRank = 10;
  // Priority logic (same as in budgeting.html)
  if (teamAbbr === 'HBH') {
    // For HBH, get priority from preferences (drag & drop order)
    // (Not implemented in test, fallback to default)
  } else {
    // For other teams, use the fixed ranking list
    const rankingList = [
      'setter', 'attacker', 'middleblocker', 'libero', 'universal',
      'setter', 'attacker', 'middleblocker', 'libero', 'universal'
    ];
    const normPos = position.replace(/ /g, '');
    let count = 0;
    for (let i = 0; i < rankingList.length; i++) {
      if (rankingList[i] === normPos) {
        count++;
        if (count === filledCount + 1) {
          priority = i + 1; // 1-based index
          break;
        }
      }
    }
    if (count < filledCount + 1) {
      priority = maxRank;
    }
  }
  const needTerm = 1 - (filledCount / maxAllowedForPosition);
  const priorityTerm = 1 - ((priority - 1) / (maxRank - 1));
  const N = needTerm * priorityTerm;
  console.log(`  [N] filledCount: ${filledCount}, maxAllowedForPosition: ${maxAllowedForPosition}`);
  console.log(`  [N] needTerm: ${needTerm.toFixed(3)}, priorityTerm: ${priorityTerm.toFixed(3)}, N: ${N.toFixed(3)}`);
  return Math.max(0, N);
}

function calculateW(finance, roster, player, N, R, k) {
  const F = finance.fighting_balance || 80;
  const B = finance.purse || 0;
  const C = getCategoryMultiplier(player.category);
  const P = 10 - (roster ? roster.length : 0);
  const denom = P > 0 ? P : 1;
  const W = Math.min(F, (B * N * C * (1 + R) * k) / denom);
  console.log(`  [W] F: ${F}, B: ${B}, C: ${C}, P: ${P}, denom: ${denom}`);
  console.log(`  [W] Formula: Math.min(${F}, (${B} * ${N.toFixed(3)} * ${C} * (1 + ${R}) * ${k}) / ${denom})`);
  console.log(`  [W] Raw: ${(B * N * C * (1 + R) * k / denom).toFixed(3)}, W: ${W.toFixed(3)}`);
  return Math.max(W, parseFloat(player.price) || 0);
}

async function calculateWeights(allFinances, allPlayers, allTeamRosters, player, teamAbbr) {
  // --- w1: Balance Pressure Weight ---
  const epsilon = 0.01;
  let purses = [];
  for (const abbr in allFinances) {
    if (allFinances[abbr] && typeof allFinances[abbr].purse === 'number') {
      purses.push(allFinances[abbr].purse);
    }
  }
  const B_max = Math.max(...purses);
  const B_min = Math.min(...purses);
  const Bbar = purses.reduce((a, b) => a + b, 0) / purses.length;
  const w1 = Math.min(1.0, (B_max - B_min) / (Bbar + epsilon));
  // --- w2: Category Urgency Weight ---
  const isTopTier = p => {
    const cat = (p.category || '').toLowerCase();
    return cat === 'gold' || cat === 'platinum';
  };
  const T_high = allPlayers.filter(isTopTier).length;
  const allRosteredPlayerIds = new Set();
  for (const abbr in allTeamRosters) {
    allTeamRosters[abbr].forEach(p => allRosteredPlayerIds.add(p.id));
  }
  const T_high_left = allPlayers.filter(p => isTopTier(p) && !allRosteredPlayerIds.has(p.id)).length;
  const w2 = 1 - (T_high_left / (T_high || 1));
  // --- w3: Positional Scarcity Weight ---
  const position = (player.position || '').replace(/ /g, '').toLowerCase();
  const maxAllowed = {
    'setter': 2,
    'attacker': 4,
    'libero': 2,
    'middleblocker': 4,
    'middle blocker': 4,
    'universal': 2
  };
  let w3 = 0;
  for (const abbr in allTeamRosters) {
    let count = 0;
    allTeamRosters[abbr].forEach(p => {
      const pPos = (p.position || '').replace(/ /g, '').toLowerCase();
      if (pPos === position) count++;
    });
    const max = maxAllowed[position] || 1;
    w3 += 1 - (count / max);
  }
  // --- w4: Auction Progress Weight ---
  const roster = allTeamRosters[teamAbbr] || [];
  const totalNeeded = 10;
  const playersLeftToBuy = totalNeeded - roster.length;
  const w4 = playersLeftToBuy / totalNeeded;
  console.log(`  [w1] Balance Pressure Weight: ${w1.toFixed(3)}`);
  console.log(`  [w2] Category Urgency Weight: ${w2.toFixed(3)}`);
  console.log(`  [w3] Positional Scarcity Weight: ${w3.toFixed(3)}`);
  console.log(`  [w4] Auction Progress Weight: ${w4.toFixed(3)}`);
  return { w1, w2, w3, w4 };
}

async function calculateK(finance, allFinances, allPlayers, allTeamRosters, player, N, teamAbbr) {
  const { w1, w2, w3, w4 } = await calculateWeights(allFinances, allPlayers, allTeamRosters, player, teamAbbr);
  const B = finance.purse || 0;
  let totalPurse = 0, teamCount = 0;
  for (const abbr in allFinances) {
    if (allFinances[abbr] && typeof allFinances[abbr].purse === 'number') {
      totalPurse += allFinances[abbr].purse;
      teamCount++;
    }
  }
  const Bbar = teamCount > 0 ? totalPurse / teamCount : 1;
  const C = getCategoryMultiplier(player.category);
  const maxAllowed = {
    'setter': 2,
    'attacker': 4,
    'libero': 2,
    'middleblocker': 4,
    'middle blocker': 4,
    'universal': 2
  };
  const positions = ['setter', 'attacker', 'middleblocker', 'libero', 'universal'];
  let posLeft = 0;
  if (allTeamRosters[teamAbbr] && Array.isArray(allTeamRosters[teamAbbr])) {
    const roster = allTeamRosters[teamAbbr];
    for (const pos of positions) {
      let count = 0;
      roster.forEach(p => {
        const pPos = (p.position || '').replace(/ /g, '').toLowerCase();
        if (pPos === pos) count++;
      });
      const max = maxAllowed[pos] || 1;
      posLeft += count / max;
    }
  }
  const T = 5;
  let k = 1 + ((B - Bbar) / Bbar) * w1 + (C - 1) * w2 + N * w3 - (posLeft / T) * w4;
  k = Math.max(0.8, Math.min(k, 1.5));
  console.log(`  [k] Formula: 1 + ((B - Bbar) / Bbar) * w1 + (C - 1) * w2 + N * w3 - (posLeft / T) * w4`);
  console.log(`      = 1 + ((${B} - ${Bbar.toFixed(3)}) / ${Bbar.toFixed(3)}) * ${w1.toFixed(3)} + (${C} - 1) * ${w2.toFixed(3)} + ${N.toFixed(3)} * ${w3.toFixed(3)} - (${posLeft.toFixed(3)} / ${T}) * ${w4.toFixed(3)}`);
  console.log(`      = ${k.toFixed(3)}`);
  return k;
}

// --- Main Test Logic ---
async function main() {
  // Get player name from command line
  const playerName = process.argv[2];
  if (!playerName) {
    console.error('Usage: node test_budgeting_formula.js "Player Name"');
    process.exit(1);
  }

  // 1. Fetch the player's data
  let playerDoc = null;
  const playersSnapshot = await db.collection('players').where('name', '==', playerName).get();
  if (!playersSnapshot.empty) {
    playerDoc = playersSnapshot.docs[0].data();
    playerDoc.id = playersSnapshot.docs[0].id;
    console.log(`Player data for ${playerName}:`, playerDoc);
  } else {
    console.error(`${playerName} not found in players collection.`);
    process.exit(1);
  }

  // 2. Fetch all finances, all players, all team rosters
  const teamAbbrs = ["AD", "BT", "CH", "CB", "DT", "HBH", "KBS", "KT", "MM", "GG"];
  const allFinances = {};
  for (const abbr of teamAbbrs) {
    const snap = await db.collection(abbr).doc('finances').get();
    allFinances[abbr] = snap.exists ? snap.data() : {};
  }
  const allPlayersSnap = await db.collection('players').get();
  const allPlayers = allPlayersSnap.docs.map(doc => ({...doc.data(), id: doc.id}));
  const allTeamRosters = {};
  for (const abbr of teamAbbrs) {
    const snap = await db.collection(abbr).doc('roster').collection('players').get();
    allTeamRosters[abbr] = snap.docs.map(doc => ({...doc.data(), id: doc.id}));
  }

  // 3. Calculate N, R, k, W (with all steps) for ALL TEAMS
  console.log(`\n--- Step-by-step Calculation for ALL TEAMS for ${playerName} ---`);
  for (const abbr of teamAbbrs) {
    const teamName = abbr;
    const teamFinance = allFinances[abbr] || {};
    const teamRoster = allTeamRosters[abbr] || [];
    console.log(`\n=== ${abbr} ===`);
    console.log(`Team finances:`, teamFinance);
    console.log(`Team roster size: ${teamRoster.length}`);
    const rosterPositions = teamRoster.map(p => p.position).join(', ');
    console.log(`Team roster positions: ${rosterPositions}`);
    const N = calculateN(teamRoster, playerDoc, abbr);
    const R = 0.5; // Placeholder for R (risk/urgency factor)
    console.log(`  [R] Using R = ${R}`);
    const k = await calculateK(teamFinance, allFinances, allPlayers, allTeamRosters, playerDoc, N, abbr);
    const willingPrice = calculateW(teamFinance, teamRoster, playerDoc, N, R, k);
    console.log(`  [RESULT] ${abbr} would be willing to pay for ${playerName}: ${willingPrice.toFixed(2)} Lakh`);
  }
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });  