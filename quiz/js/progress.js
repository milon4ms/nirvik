// quiz/js/progress.js — FIXED
// নিয়ম (index.html-এর সাথে মিলিয়ে): কমপক্ষে ৫০টি রোগলক্ষণ কুইজে bestPct >= 40% হলেই সার্টিফিকেট
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
        let bestCorrect = correctAnswers;
        let attempts = 1;

        if (docSnap.exists()) {
            const data = docSnap.data();
            // FIX: bestCorrect-ও আগের মতো Math.max দিয়ে নেওয়া — আগে সর্বশেষটা বসে যেত
            bestPct = Math.max(data.bestPct || 0, percentage);
            bestCorrect = Math.max(data.bestCorrect || 0, correctAnswers);
            attempts = (data.attempts || 0) + 1;
        }

        await setDoc(progressRef, {
            bestCorrect: bestCorrect,   // সার্টিফিকেটের জন্য
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

// ইউজারের সব প্রগ্রেস একসাথে নিয়ে আসার ফাংশন
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
        // গেস্ট হলে LocalStorage থেকে পড়বে
        progressMap = JSON.parse(localStorage.getItem('guestProgress') || '{}');
    }
    return progressMap;
}

// সার্টিফিকেটের বিস্তারিত অবস্থা: কতটা পাস, মোট কত, যোগ্য কিনা
export async function getCertificateStatus() {
    const user = auth.currentUser;
    if (!user) return { eligible: false, passed: 0, total: 85 };

    try {
        // FIX: ৮৫ বার আলাদা getDoc না করে একবারে সব প্রগ্রেস এনে গোনা
        // FIX: index.json-এর sym.id / sym.slug-এর উপর নির্ভর না করা —
        //      index.html-ও একইভাবে 'sym:' দিয়ে শুরু হওয়া key গুনে, তাই এখানেও তাই
        const progress = await getUserProgress();
        let passed = 0;
        for (const [key, p] of Object.entries(progress || {})) {
            if (!key.startsWith('sym:') || !p) continue;
            const pct = p.bestPct ?? p.lastPct ?? 0;
            if (pct >= 40) passed++;
        }

        // মোট ট্যাগ সংখ্যা দেখানোর জন্য (না পেলে ৮৫ ধরা)
        let total = 85;
        try {
            const res = await fetch('./data/symptoms/index.json');
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data) && data.length) total = data.length;
            }
        } catch (_) { /* index.json না পেলেও passed গোনা ঠিক থাকবে */ }

        // FIX: আগে ছিল passed === total (সব ৮৫টি) — এখন index.html-এর মতো >= 50
        return { eligible: passed >= 50, passed, total };
    } catch (e) {
        console.error('Certificate status error:', e);
        return { eligible: false, passed: 0, total: 85, error: true };
    }
}

export async function checkCertificateEligibility() {
    const s = await getCertificateStatus();
    return s.eligible;
}
