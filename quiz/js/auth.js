// quiz/js/auth.js
import { auth } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

export function checkAuthState(callback) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            callback(user); // ইউজার লগইন আছে
        } else {
            callback(null); // ইউজার গেস্ট
        }
    });
}

export function logoutUser() {
    signOut(auth).then(() => {
        alert("সফলভাবে লগআউট হয়েছেন!");
        window.location.reload();
    }).catch((error) => {
        console.error("Logout Error:", error);
    });
}