// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-65dca.firebaseapp.com",
  projectId: "mern-auth-65dca",
  storageBucket: "mern-auth-65dca.appspot.com",
  messagingSenderId: "263114003158",
  appId: "1:263114003158:web:15fdedbab270443a61ef77",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
