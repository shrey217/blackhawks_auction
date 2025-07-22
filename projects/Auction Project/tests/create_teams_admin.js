// Firebase Admin SDK
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// --- Data Definitions for Teams and Players ---

// Mapping of abbreviations to full team names (for collection names)
// I've made an educated guess for 'GG' as "Goa Guardians" since it wasn't in your previous list.
const teamNameMapping = {
  'AD': 'Ahmedabad Defenders',
  'BT': 'Bengaluru Torpedoes',
  'KBS': 'Kochi Blue Spikers',
  'MM': 'Mumbai Meteors',
  'GG': 'Goa Guardians', // Assuming a new team for 'GG'
  'CH': 'Calicut Heroes',
  'CB': 'Chennai Blitz',
  'KT': 'Kolkata Thunderbolts',
  'DT': 'Delhi Toofans',
};

// Player data structured by team abbreviation, with exact document IDs
const playersDataByTeam = {
  'AD': ["MUTHUSWAMY APPAVU", "NANDHAGOPAL SUBRAMANIAM"],
  'BT': ["SETHU T R", "MUJEEB M C", "B MIDHUN KUMAR"],
  'CH': ["VIKAS MAAN", "ASHOK BISHNOI"],
  'CB': ["DHILIP KUMAR"],
  'KBS': ["ERIN VARGHESE"],
  'KT': ["ASHWAL RAI", "RAHUL K", "HARI PRASAD"],
  'MM': ["AMIT GULIA", "SUBHAM CHOUDARY"],
  'GG': ["ARAVINDAN D", "CHIRAG YADAV", "LM MANOJ"],
  'DT': ["SAQLAIN TARIQ", "ANU JAMES", "ANAND K"],
};

// Define the consistent fields for all player documents
// The 'name' field will be populated with the document ID for clarity within the document.
const basePlayerFields = {
  team : "HBH",
  position: "Universal",
  RTM: false,
  intrest: false,
  name: "",
  category: "RETAINED",
  preference: 0,
  price: 0,
  state: "India",
};

const baseFinanceFields = {
  RTMS: 0,
  auction_spent: 0,
  fighting_balance: 0,
  opening_balance: 0,
  overall_spent: 0,
  purse: 0,
};

// --- Function to Create All Team Data ---

async function createPrimeVolleyballLeagueTeams() {
  console.log("Starting to create Prime Volleyball League team structures with precise nesting...");

  for (const teamAbbr in teamNameMapping) {
    if (Object.prototype.hasOwnProperty.call(teamNameMapping, teamAbbr)) {
      const fullTeamName = teamNameMapping[teamAbbr];
      const playerDocIds = playersDataByTeam[teamAbbr];

      try {
        console.log(`\nProcessing collection: ${teamAbbr} (Full Team Name: ${fullTeamName})...`);

        // 1. Create a single 'finances' document directly under the abbreviation collection
        // Path: {abbreviation}/finances
        const financesDocRef = db.collection(teamAbbr).doc("finances");
        await financesDocRef.set({
          ...baseFinanceFields,
          notes: `Initial financial overview for ${fullTeamName} (${teamAbbr}).`
        });
        console.log(`  - Created single 'finances' document for '${teamAbbr}'.`);

        // 2. Create player documents in the 'roster/players' sub-subcollection
        // Path: {abbreviation}/roster/players/{player-name}
        const rosterDocRef = db.collection(teamAbbr).doc("roster");
        const playersCollectionRef = rosterDocRef.collection("players");
        for (const playerId of playerDocIds) {
          const playerDocRef = playersCollectionRef.doc(playerId);
          const playerData = {
            name: playerId,
            ...basePlayerFields,
            teamAbbreviation: teamAbbr,
          };
          await playerDocRef.set(playerData);
          console.log(`    - Created player document: ${playerId} under ${teamAbbr}/roster/players.`);
        }
        console.log(`  - Created all specified player documents in 'roster/players' subcollection for '${teamAbbr}'.`);

      } catch (error) {
        console.error(`Error setting up data for ${fullTeamName} (Collection: ${teamAbbr}):`, error);
      }
    }
  }
  console.log("\nAll Prime Volleyball League team structures creation complete!");
}

// Call the function to execute the setup!
createPrimeVolleyballLeagueTeams();
