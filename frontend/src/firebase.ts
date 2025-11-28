
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDlgBSPOq_qQERh_UYdleoRFYNd7l2STH4",
  authDomain: "project1-357f3.firebaseapp.com",
  projectId: "project1-357f3",
  storageBucket: "project1-357f3.firebasestorage.app",
  messagingSenderId: "552280630042",
  appId: "1:552280630042:web:aafe5260004591a3a182a3",
  measurementId: "G-P51F88ZL1Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;