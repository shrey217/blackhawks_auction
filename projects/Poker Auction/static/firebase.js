// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqnlSKs4OtIt9h0OhpdK9iVQIT2LTNX5g",
  authDomain: "poker-auction.firebaseapp.com",
  projectId: "poker-auction",
  storageBucket: "poker-auction.firebasestorage.app",
  messagingSenderId: "736498711178",
  appId: "1:736498711178:web:7e52da80cb2336dfc24b73",
  measurementId: "G-9P28NQ1SBW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);