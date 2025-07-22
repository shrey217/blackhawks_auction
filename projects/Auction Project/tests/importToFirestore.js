// importToFirestore.js

const admin = require('firebase-admin');

// --- IMPORTANT: UPDATE THESE PATHS ---
const serviceAccount = require('../serviceAccountKey.json'); // Path to your downloaded service account key
const dataToImport = require('../data.json');     // Path to your JSON data file
const collectionName = 'players2';                         // Name of the Firestore collection

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); // Get a reference to the Firestore database

// Helper function to convert "TRUE"/"FALSE" strings to actual booleans
function convertStringToBoolean(value) {
  if (typeof value === 'string') {
    if (value.toUpperCase() === 'TRUE') {
      return true;
    }
    if (value.toUpperCase() === 'FALSE') {
      return false;
    }
  }
  return value; // Return as is if not a recognized string boolean
}

async function importData() {
  console.log(`Starting import to collection: ${collectionName}`);
  console.log(`Total documents to import: ${dataToImport.length}`);

  let currentBatch = db.batch(); // Start a new batch for writes
  let counter = 0;
  const BATCH_SIZE = 499; // Firestore batch limit is 500. Using 499 to be safe.

  for (const item of dataToImport) {
    // Check if the 'name' field exists and is a string
    if (!item.name || typeof item.name !== 'string') {
      console.warn(`Skipping item due to missing or invalid 'name' field:`, item);
      continue; // Skip this item
    }

    // Prepare the document for Firestore
    const { player_number, ...documentData } = item; // Remove player_number from document fields
    Object.assign(documentData, {
      RTM: convertStringToBoolean(item.RTM),
      intrest: convertStringToBoolean(item.intrest)
    });
    // Use player_number as the document ID
    const docRef = db.collection(collectionName).doc(String(item.player_number));

    // Add the document to the batch
    currentBatch.set(docRef, documentData);
    counter++;

    // Commit the batch if we've reached the batch size limit
    if (counter % BATCH_SIZE === 0) {
      console.log(`Committing batch of ${BATCH_SIZE} documents. Total: ${counter}`);
      await currentBatch.commit();
      currentBatch = db.batch(); // Start a new batch
    }
  }

  // Commit any remaining documents in the final batch
  if (counter % BATCH_SIZE !== 0 || counter === 0) {
    console.log(`Committing final batch. Total documents imported: ${counter}`);
    await currentBatch.commit();
  }

  console.log("Data import process finished successfully!");
}

// Run the import function
importData().catch(error => {
  console.error("Error during data import:", error);
  process.exit(1); // Exit with an error code
});
