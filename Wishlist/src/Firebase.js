import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCck48WfD3mxPpzv2fFj1mGxSShQqB_N9M",
  authDomain: "clone-f2605.firebaseapp.com",
  projectId: "clone-f2605",
  storageBucket: "clone-f2605.firebasestorage.app",
  messagingSenderId: "743378291996",
  appId: "1:743378291996:web:61b2357e8b34ca1cd37ed9",
  measurementId: "G-N3HSJSLFEL"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = getAnalytics(app); // Firebase Analytics
const auth = getAuth(app);           // Firebase Authentication
const googleProvider = new GoogleAuthProvider(); // Google authentication provider
const db = getFirestore(app);        // Initialize Firestore

// Export everything needed for further use
export { app, analytics, auth, googleProvider, db };
