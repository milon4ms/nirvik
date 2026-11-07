// quiz/js/progress.js
import { db, auth } from './firebase-config.js';
import { doc, setDoc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

export async function saveProgress(type, id, correctAnswers, totalQuestions) {
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const quizDocId = `${type}:${id}`;
    const user = auth.currentUser;
    
    if (user) {
        // লগইন করা আছে: Firestore এ সেভ হবে
        const progressRef = doc(db, `users/${user.uid}/quizProgress`, quizDocId);
        const docSnap = await getDoc(progressRef);

        let bestPct = percentage;
        let attempts = 1;

        if (docSnap.exists()) {
            const data = docSnap.data();
            bestPct = Math.max(data.bestPct || 0, percentage);
            attempts = (data.attempts || 0) + 1;
        }

        await setDoc(progressRef, {
            bestCorrect: correctAnswers, // সার্টিফিকেটের জন্য
            bestPct: bestPct,            // সার্টিফিকেটের জন্য
            lastCorrect: correctAnswers, // লিস্টে দেখানোর জন্য
            lastPct: percentage,         // লিস্টে দেখানোর জন্য
            total: totalQuestions,
            attempts: attempts,
            lastPlayed: new Date()
        }, { merge: true });

    } else {
        // গেস্ট: LocalStorage এ সেভ হবে
        let guestData = JSON.parse(localStorage.getItem('guestProgress') || '{}');
        guestData[quizDocId] = {
            lastCorrect: correctAnswers,
            lastPct: percentage,
            total: totalQuestions,
            attempts: (guestData[quizDocId]?.attempts || 0) + 1,
            lastPlayed: new Date().toISOString()
        };
        localStorage.setItem('guestProgress', JSON.stringify(guestData));
    }
}

// ইউজারের সব প্রগ্রেস একসাথে নিয়ে আসার ফাংশন
export async function getUserProgress() {
    const user = auth.currentUser;
    let progressMap = {};

    if (user) {
        const progressRef = collection(db, `users/${user.uid}/quizProgress`);
        const snapshot = await getDocs(progressRef);
        snapshot.forEach(doc => {
            progressMap[doc.id] = doc.data();
        });
    } else {
        // গেস্ট হলে LocalStorage থেকে পড়বে
        progressMap = JSON.parse(localStorage.getItem('guestProgress') || '{}');
    }
    return progressMap;
}

export async function checkCertificateEligibility() {
    const user = auth.currentUser;
    if (!user) return false; 

    const res = await fetch('./data/symptoms/index.json');
    const symptomsData = await res.json();
    const totalSymptomQuizzes = symptomsData.length;

    let passedQuizzes = 0;
    for (let sym of symptomsData) {
        const progressRef = doc(db, `users/${user.uid}/quizProgress`, `sym:${sym.id}`);
        const docSnap = await getDoc(progressRef);
        if (docSnap.exists() && docSnap.data().bestPct >= 40) {
            passedQuizzes++;
        }
    }
    return passedQuizzes === totalSymptomQuizzes;
}
