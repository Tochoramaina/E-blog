// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernblog-16936.firebaseapp.com",
  projectId: "mernblog-16936",
  storageBucket: "mernblog-16936.firebasestorage.app",
  messagingSenderId: "156597352057",
  appId: "1:156597352057:web:6b11eff2f80b30198146a8",
  measurementId: "G-3DV810BNZ7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
