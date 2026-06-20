// assets/js/firebase-config.js
// এখানে কোনো import/export নেই – শুধু সাধারণ JS

const firebaseConfig = {
    apiKey: "AIzaSy...",          // আপনার আসল API Key
    authDomain: "nirvik-72943.firebaseapp.com",
    projectId: "nirvik-72943",
    storageBucket: "nirvik-72943.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};

// Firebase Initialize (global firebase object)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Window-এ রাখুন যাতে অন্য স্ক্রিপ্ট ব্যবহার করতে পারে
window.auth = auth;
window.db = db;
