// quiz/js/progress.js
import { db, auth } from './firebase-config.js'; // এখানে db এবং auth ইমপোর্ট করা হলো
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

export async function saveProgress(type, id, correctAnswers, totalQuestions) {
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const quizDocId = `${type}:${id}`;
    
    const user = auth.currentUser;
    
    if (user) {
        const progressRef = doc(db, `users/${user.uid}/quizProgress`, quizDocId);
        const docSnap = await getDoc(progressRef);

        let bestPct = percentage;
        let attempts = 1;

        if (docSnap.exists()) {
            const data = docSnap.data();
            bestPct = Math.max(data.bestPct, percentage);
            attempts = data.attempts + 1;
        }

        await setDoc(progressRef, {
            bestCorrect: correctAnswers,
            total: totalQuestions,
            bestPct: bestPct,
            attempts: attempts,
            lastPlayed: new Date()
        }, { merge: true });

    } else {
        console.log("Guest mode: Progress not saved.");
    }
}

export async function checkCertificateEligibility() {
    const user = auth.currentUser;
    if (!user) return false; 

    // পাথ ঠিক করা হয়েছে (./data/symptoms/index.json)
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