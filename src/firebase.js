// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeNkaCgSPpjY9IwJAWEhMx3jVE4xGrGGw",
  authDomain: "lectra-2baff.firebaseapp.com",
  projectId: "lectra-2baff",
  storageBucket: "lectra-2baff.firebasestorage.app",
  messagingSenderId: "976607487228",
  appId: "1:976607487228:web:9d8c673621d33218122379",
  measurementId: "G-3Y43B95TWG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache(),
});
export const analytics = getAnalytics(app);
export const auth = getAuth(app);