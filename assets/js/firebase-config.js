// assets/js/firebase-config.js

// Firebase SDK গুলো CDN থেকে ইম্পোর্ট করুন
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js';

// আপনার Firebase প্রোজেক্টের কনফিগারেশন (Firebase Console থেকে কপি করুন)
const firebaseConfig = {
    apiKey: "AIzaSy...",  // আপনার আসল apiKey দিন
    authDomain: "nirvik-72943.firebaseapp.com",
    projectId: "nirvik-72943",
    storageBucket: "nirvik-72943.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};
sdfsdfdsa
// Firebase Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// এক্সপোর্ট করুন (যাতে অন্য ফাইল ব্যবহার করতে পারে)
export { auth, db };
