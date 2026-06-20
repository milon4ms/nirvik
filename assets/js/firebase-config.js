// assets/js/firebase-config.js
// এই ফাইলটি আর ES Module নয়—সাধারণ JavaScript ফাইল

// Firebase ইতিমধ্যে CDN থেকে লোড হয়েছে (নিচে দেখুন)
// আমরা শুধু কনফিগারেশন দিয়ে initialize করছি

const firebaseConfig = {
    apiKey: "AIzaSy...",  // আপনার আসল API Key দিন
    authDomain: "nirvik-72943.firebaseapp.com",
    projectId: "nirvik-72943",
    storageBucket: "nirvik-72943.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};

// Firebase Initialize (global firebase object ব্যবহার)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// অন্যান্য ফাইল যাতে ব্যবহার করতে পারে
window.auth = auth;
window.db = db;
