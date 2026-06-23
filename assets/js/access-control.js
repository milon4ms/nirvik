// ============================================================
// access-control.js – শুধুমাত্র পেইড ইউজার অ্যাক্সেস পাবে
// ============================================================

/**
 * অ্যাক্সেস চেক ফাংশন – শুধুমাত্র পেইড ইউজার অনুমোদিত
 * @param {string} requiredRole – 'paid' ছাড়া অন্য কিছু চেক করবে না
 * @returns {boolean} – পেইড হলে true, না হলে false (রিডাইরেক্ট সহ)
 */
function checkAccess(requiredRole) {
    // ১. লোকাল স্টোরেজ থেকে ইউজার ডেটা নিন
    const userStr = localStorage.getItem('user');

    // ২. ইউজার লগইন নেই → লগইন পেজে পাঠান
    if (!userStr) {
        alert('🔐 এই পেজ দেখতে লগইন প্রয়োজন।');
        window.location.href = 'login.html';
        return false;
    }

    try {
        // ৩. ইউজার ডেটা পার্স করুন
        const user = JSON.parse(userStr);

        // ৪. শুধুমাত্র পেইড চেক – অন্য যেকোনো রোল (registered, general) ব্যর্থ
        if (requiredRole === 'paid' && !user.isPaid) {
            alert('💎 এই কন্টেন্ট শুধুমাত্র পেইড সাবস্ক্রাইবারদের জন্য।');
            window.location.href = 'payment.html';
            return false;
        }

        // ৫. পেইড হলে অ্যাক্সেস অনুমোদিত
        return true;
    } catch (error) {
        // ৬. JSON পার্সিং বা অন্য কোনো ত্রুটি → লগইন পেজে
        console.error('ইউজার ডেটা ত্রুটিপূর্ণ:', error);
        alert('আপনার সেশন বৈধ নয়। আবার লগইন করুন।');
        window.location.href = 'login.html';
        return false;
    }
}

// ৭. গ্লোবাল স্কোপে ফাংশনটি এক্সপোজ করুন (যেন HTML থেকে কল করা যায়)
window.checkAccess = checkAccess;

// ৮. (অপশনাল) পেজ লোড হলে স্বয়ংক্রিয়ভাবে চেক করার জন্য
//    কিন্তু আপনি চাইলে HTML থেকেই checkAccess('paid') কল করবেন।
//    নিচের কোডটি কমেন্ট করে রাখা হলো – ইচ্ছে করলে ব্যবহার করুন।

/*
document.addEventListener('DOMContentLoaded', function() {
    // আপনি চাইলে এখানে নির্দিষ্ট পেজের লিস্ট দিয়ে অটো-চেক করতে পারেন
    // অথবা সব পেজে চালাতে পারেন (তবে লগইন/পেমেন্ট পেজে সমস্যা হবে)
    const protectedPages = ['jor.html', 'premium-report.html', 'consultation.html'];
    const currentPage = window.location.pathname.split('/').pop();
    if (protectedPages.includes(currentPage)) {
        checkAccess('paid');
    }
});
*/
