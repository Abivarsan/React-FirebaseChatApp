// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASKtNdUvlCPN7xJdYEesae82RYguimDjM",
  authDomain: "react-chat-e4edd.firebaseapp.com",
  projectId: "react-chat-e4edd",
  storageBucket: "react-chat-e4edd.appspot.com",
  messagingSenderId: "226600163642",
  appId: "1:226600163642:web:b5b9ec89eb79ca8656d803",
  measurementId: "G-D8GK32WZ39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);