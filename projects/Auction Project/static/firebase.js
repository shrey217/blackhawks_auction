// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBh_7ZytYqxX4mJv1jY-IUoWPnTPVbez5o",
  authDomain: "ksg-auction.firebaseapp.com",
  databaseURL: "https://ksg-auction-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ksg-auction",
  storageBucket: "ksg-auction.firebasestorage.app",
  messagingSenderId: "978559404918",
  appId: "1:978559404918:web:407a592decec1c88090857",
  measurementId: "G-PK1CXCEQJB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);