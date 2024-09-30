import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-lLC3-WWKRoxtkIYDim0odsNIY95d9Qo",
  authDomain: "pokedex-alcv.firebaseapp.com",
  projectId: "pokedex-alcv",
  storageBucket: "pokedex-alcv.appspot.com",
  messagingSenderId: "1078907915418",
  appId: "1:1078907915418:web:7c7abea88e42e1ed5fe323",
  measurementId: "G-349K6VCKF6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const pokemonListRef = collection(firebaseDB, "pokemonList");
