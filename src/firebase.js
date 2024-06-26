import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "examen-5a683.firebaseapp.com",
  projectId: "examen-5a683",
  storageBucket: "examen-5a683.appspot.com",
  messagingSenderId: "73432195054",
  appId: "1:73432195054:web:bbb49c0b7655beff8bb8ff",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
