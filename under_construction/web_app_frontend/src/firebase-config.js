// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, serverTimestamp } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCHWikzOvBvmWS39pzrI0O3luNIfvmuMA",
  authDomain: "gix-trailx.firebaseapp.com",
  projectId: "gix-trailx",
  storageBucket: "gix-trailx.appspot.com",
  messagingSenderId: "323140771813",
  appId: "1:323140771813:web:72000aae9b2bf96c25590c",
  measurementId: "G-D9D0JRVVV6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };