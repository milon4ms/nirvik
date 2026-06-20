// assets/js/firebase-config.js
// এখানে কোনো import/export নেই – শুধু সাধারণ JS

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDy0r1tnJV09d7wgLplEqMsRz45_0p37CA",
  authDomain: "nirvik-72943.firebaseapp.com",
  projectId: "nirvik-72943",
  storageBucket: "nirvik-72943.firebasestorage.app",
  messagingSenderId: "648899156613",
  appId: "1:648899156613:web:798ed1758e076e8a62a7ec",
  measurementId: "G-DQ32VPXH3Y"
};

// Firebase Initialize (global firebase object)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Window-এ রাখুন যাতে অন্য স্ক্রিপ্ট ব্যবহার করতে পারে
window.auth = auth;
window.db = db;
