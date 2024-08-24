// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9lwE5te0jDcgPZ7RuTHqQja7uqpH0rrI",
  authDomain: "coupangconnect.firebaseapp.com",
  projectId: "coupangconnect",
  storageBucket: "coupangconnect.appspot.com",
  messagingSenderId: "793009063082",
  appId: "1:793009063082:web:8943c7fbad3b852968bcd3",
  measurementId: "G-109HKFKJ2X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };