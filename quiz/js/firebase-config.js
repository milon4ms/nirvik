// quiz/js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDy0r1tnJV09d7wgLplEqMsRz45_0p37CA", // এখানে আপনার আসল কী বসান
  authDomain: "nirvik-72943.firebaseapp.com",
  projectId: "nirvik-72943",
  storageBucket: "nirvik-72943.firebasestorage.app",
  messagingSenderId: "648899156613",
  appId: "1:648899156613:web:798ed1758e076e8a62a7ec"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };