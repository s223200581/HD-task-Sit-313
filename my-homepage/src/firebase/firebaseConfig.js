// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration (provided by you)
const firebaseConfig = {
  apiKey: "AIzaSyB1as2azHCQwjoLJnGYIuGDfHyhKDY4vrI",
  authDomain: "question-page-d6da6.firebaseapp.com",
  projectId: "question-page-d6da6",
  storageBucket: "question-page-d6da6.appspot.com",
  messagingSenderId: "598300145297",
  appId: "1:598300145297:web:e7da817d38fc5c62783130",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  

// Firebase services
const auth = getAuth(app);
const provider = new GoogleAuthProvider();  // Google Auth Provider
const db = getFirestore(app);
const storage = getStorage(app);

// Export the auth, provider, and db services
export { auth, provider, db, storage };
