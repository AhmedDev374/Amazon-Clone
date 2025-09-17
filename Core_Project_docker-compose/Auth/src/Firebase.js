// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCck48WfD3mxPpzv2fFj1mGxSShQqB_N9M",
  authDomain: "clone-f2605.firebaseapp.com",
  projectId: "clone-f2605",
  storageBucket: "clone-f2605.appspot.com", // ✅ fixed typo (was firebasestorage.app)
  messagingSenderId: "743378291996",
  appId: "1:743378291996:web:61b2357e8b34ca1cd37ed9",
  measurementId: "G-N3HSJSLFEL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, googleProvider };
