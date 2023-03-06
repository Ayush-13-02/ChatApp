// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAI6B2QyWCNdxaG2_QYe_oYGEWk9vzYQKg",
  authDomain: "chatapp-f085c.firebaseapp.com",
  projectId: "chatapp-f085c",
  storageBucket: "chatapp-f085c.appspot.com",
  messagingSenderId: "799398368655",
  appId: "1:799398368655:web:b26d4332daf184cbb2e7fa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore();