// assets/js/firebase-config.js

// Firebase SDK গুলো CDN থেকে লোড
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js';

// আপনার Firebase config (Firebase Console থেকে কপি করুন)
const firebaseConfig = {
  apiKey: "AIzaSy...",  // আপনার আসল apiKey দিন
  authDomain: "nirvik-72943.firebaseapp.com",
  projectId: "nirvik-72943",
  storageBucket: "nirvik-72943.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// অন্যান্য ফাইলের জন্য export
export { auth, db };
