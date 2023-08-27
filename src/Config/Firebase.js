// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from"firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_zH63i9L1sCPaNx_G6m-4tNvGXZxr2pw",
  authDomain: "estatetribe-4fda2.firebaseapp.com",
  projectId: "estatetribe-4fda2",
  storageBucket: "estatetribe-4fda2.appspot.com",
  messagingSenderId: "218900329142",
  appId: "1:218900329142:web:8adf7fcf4005c2b23cac17",
  measurementId: "G-QXKGP1C168"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth=getAuth(app);
export const db = getFirestore(app);