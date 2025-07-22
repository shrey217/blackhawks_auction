// importFavoritesToFirestore.js
// Usage: node importFavoritesToFirestore.js

const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const favoritesData = [
  { "Player Name": "A Ajith", "Teams": "Ahmedabad Defenders" },
  { "Player Name": "ABDUL RAHEEM", "Teams": "Bengaluru Torpedoes, Calicut Heroes, Delhi Toofans, Kolkata ThunderBolts" },
  { "Player Name": "Abhishek ck", "Teams": "Bengaluru Torpedoes, Calicut Heroes, Delhi Toofans, Goa" },
  { "Player Name": "Aayush", "Teams": "Delhi Toofans, Goa" },
  { "Player Name": "Akhin GS", "Teams": "Chennai Blitz" },
  { "Player Name": "Akshai suresh", "Teams": "Kochi Blue Spikers" },
  { "Player Name": "Alan Ashiqe VL", "Teams": "Goa" },
  { "Player Name": "Aljo sabu", "Teams": "Calicut Heroes, Delhi Toofans, Kochi Blue Spikers" },
  { "Player Name": "Aman Kumar", "Teams": "Delhi Toofans, Mumbai Meteors" },
  { "Player Name": "Amalkthomas", "Teams": "Delhi Toofans, Goa" },
  { "Player Name": "Amit Chhoker", "Teams": "Kolkata ThunderBolts" },
  { "Player Name": "Angamuthu", "Teams": "Ahmedabad Defenders, Chennai Blitz, Kochi Blue Spikers, Goa" },
  { "Player Name": "Arshak sinan", "Teams": "Calicut Heroes, Delhi Toofans, Kochi Blue Spikers" },
  { "Player Name": "ARSHAD K S", "Teams": "Kochi Blue Spikers" },
  { "Player Name": "Arunprasath M", "Teams": "Ahmedabad Defenders, Chennai Blitz" },
  { "Player Name": "Aswath", "Teams": "Ahmedabad Defenders" },
  { "Player Name": "Athul", "Teams": "Calicut Heroes" },
  { "Player Name": "B Thangabalu", "Teams": "Ahmedabad Defenders" },
  { "Player Name": "Darshan Gowda", "Teams": "Mumbai Meteors" },
  { "Player Name": "Deepu venugopal", "Teams": "Calicut Heroes, Kochi Blue Spikers, Mumbai Meteors, Goa" },
  { "Player Name": "George Antony", "Teams": "Kochi Blue Spikers" },
  { "Player Name": "HemanthP", "Teams": "Bengaluru Torpedoes, Calicut Heroes, Kochi Blue Spikers, Kolkata ThunderBolts, Goa" },
  { "Player Name": "Himanshu tyagi", "Teams": "Chennai Blitz" },
  { "Player Name": "Ibin Jose", "Teams": "Bengaluru Torpedoes, Calicut Heroes, Delhi Toofans, Kochi Blue Spikers, Kolkata ThunderBolts, Goa" },
  { "Player Name": "Janshad u", "Teams": "Bengaluru Torpedoes, Calicut Heroes, Delhi Toofans" },
  { "Player Name": "Jerome vinith C", "Teams": "Ahmedabad Defenders, Chennai Blitz, Kochi Blue Spikers, Goa" },
  { "Player Name": "Jerry DANIEL", "Teams": "Ahmedabad Defenders" },
  { "Player Name": "Jibin Sebastian", "Teams": "Calicut Heroes" },
  { "Player Name": "Jishnu PV", "Teams": "Ahmedabad Defenders, Bengaluru Torpedoes, Calicut Heroes, Kochi Blue Spikers" },
  { "Player Name": "Jithin n", "Teams": "Calicut Heroes" },
  { "Player Name": "Joseph Shaiwan", "Teams": "Kochi Blue Spikers" },
  { "Player Name": "Kaila vishnu vardhan babu", "Teams": "Chennai Blitz" },
  { "Player Name": "Karthik A", "Teams": "Kolkata ThunderBolts" },
  { "Player Name": "Lad OmVasant", "Teams": "Chennai Blitz, Kochi Blue Spikers, Kolkata ThunderBolts, Mumbai Meteors" },
  { "Player Name": "Lalsujan MV", "Teams": "Calicut Heroes, Delhi Toofans, Hyderabad Black Hawks, Kochi Blue Spikers, Goa" },
  { "Player Name": "M Ashwin raj", "Teams": "Goa" },
  { "Player Name": "MOHAMED RIYAZUDEEN", "Teams": "Kolkata ThunderBolts" },
  { "Player Name": "Mohanukkrapandian", "Teams": "Chennai Blitz, Kolkata ThunderBolts, Mumbai Meteors" },
  { "Player Name": "Muhammed Iqbal", "Teams": "Kolkata ThunderBolts" },
  { "Player Name": "Muhammed Jasim", "Teams": "Bengaluru Torpedoes, Delhi Toofans" },
  { "Player Name": "Muhammed Shamil O K", "Teams": "Calicut Heroes, Delhi Toofans, Goa" },
  { "Player Name": "Mukesh Kumar", "Teams": "Calicut Heroes, Kochi Blue Spikers, Mumbai Meteors, Goa" },
  { "Player Name": "Namith MN", "Teams": "Ahmedabad Defenders, Bengaluru Torpedoes" },
  { "Player Name": "Nanjil Surya", "Teams": "Ahmedabad Defenders, Bengaluru Torpedoes, Chennai Blitz, Kolkata ThunderBolts" },
  { "Player Name": "Niyas Abdul salam", "Teams": "Calicut Heroes, Goa" },
  { "Player Name": "Pankaj Sharma", "Teams": "Bengaluru Torpedoes" },
  { "Player Name": "Penthala Prashanth", "Teams": "Chennai Blitz" },
  { "Player Name": "Praful S", "Teams": "Kolkata ThunderBolts" },
  { "Player Name": "Prashant Pinamma", "Teams": "Chennai Blitz" },
  { "Player Name": "PrasannaRaja AA", "Teams": "Ahmedabad Defenders" },
  { "Player Name": "Prasinji", "Teams": "Bengaluru Torpedoes" },
  { "Player Name": "Prince", "Teams": "Chennai Blitz, Mumbai Meteors, Goa" },
  { "Player Name": "Ramanathan R", "Teams": "Ahmedabad Defenders, Chennai Blitz, Goa" },
  { "Player Name": "Raman Kumar", "Teams": "Chennai Blitz, Mumbai Meteors" },
  { "Player Name": "Sameer Chaudhary", "Teams": "Bengaluru Torpedoes, Hyderabad Black Hawks, Kochi Blue Spikers, Kolkata ThunderBolts, Mumbai Meteors" },
  { "Player Name": "Sanjay manikandan ks", "Teams": "Delhi Toofans" },
  { "Player Name": "SANTHOSH S", "Teams": "Ahmedabad Defenders, Chennai Blitz, Delhi Toofans, Kolkata ThunderBolts" },
  { "Player Name": "saurabh maan", "Teams": "Mumbai Meteors" },
  { "Player Name": "Selvaganapathy", "Teams": "Chennai Blitz" },
  { "Player Name": "Shameemudheen", "Teams": "Calicut Heroes, Kochi Blue Spikers, Kolkata ThunderBolts, Mumbai Meteors, Goa" },
  { "Player Name": "Shibin TS", "Teams": "Calicut Heroes, Delhi Toofans, Kochi Blue Spikers" },
  { "Player Name": "Shikhar Singh", "Teams": "Ahmedabad Defenders, Calicut Heroes, Delhi Toofans, Mumbai Meteors, Goa" },
  { "Player Name": "Shon T John", "Teams": "Ahmedabad Defenders, Bengaluru Torpedoes, Calicut Heroes, Delhi Toofans, Kochi Blue Spikers" },
  { "Player Name": "shri vignesh", "Teams": "Ahmedabad Defenders" },
  { "Player Name": "Sonu", "Teams": "Mumbai Meteors" },
  { "Player Name": "Srajan shetty", "Teams": "Bengaluru Torpedoes" },
  { "Player Name": "Srinath S", "Teams": "Ahmedabad Defenders" },
  { "Player Name": "Surya Prakash banjara", "Teams": "Delhi Toofans" },
  { "Player Name": "Suryansh Tomar", "Teams": "Mumbai Meteors, Kolkata ThunderBolts" },
  { "Player Name": "T SRIKANTH", "Teams": "Ahmedabad Defenders, Chennai Blitz" },
  { "Player Name": "Tarun Gowda K", "Teams": "Ahmedabad Defenders, Bengaluru Torpedoes, Chennai Blitz" },
  { "Player Name": "Venu", "Teams": "Chennai Blitz" },
  { "Player Name": "Vinit kumar", "Teams": "Ahmedabad Defenders, Bengaluru Torpedoes, Delhi Toofans, Kochi Blue Spikers" },
  { "Player Name": "Vipul Kumar", "Teams": "Mumbai Meteors" },
  { "Player Name": "Yogesh Kumar", "Teams": "Mumbai Meteors" }
];

async function importFavorites() {
  for (const entry of favoritesData) {
    const playerName = entry["Player Name"];
    const teams = entry["Teams"].split(',').map(t => t.trim());
    await db.collection('favorites').doc(playerName).set({ teams });
    console.log(`Imported favorite for ${playerName}`);
  }
  console.log('Import complete.');
  process.exit(0);
}

importFavorites().catch(err => {
  console.error('Error importing favorites:', err);
  process.exit(1);
}); 