// assets/js/access-control.js
function checkAccess(requiredRole) {
    const userStr = localStorage.getItem('user');
    
    if (!userStr) {
        window.location.href = 'login.html';
        return false;
    }
    
    const user = JSON.parse(userStr);
    
    // রোল চেক
    if (requiredRole === 'paid' && !user.isPaid) {
        alert('💎 এই কন্টেন্ট দেখতে পেইড সাবস্ক্রাইবার হতে হবে!');
        window.location.href = 'payment.html';
        return false;
    }
    
    if (requiredRole === 'registered' && user.role === 'general') {
        alert('📝 এই কন্টেন্ট দেখতে রেজিস্ট্রেশন করতে হবে!');
        window.location.href = 'register.html';
        return false;
    }
    
    return true;
}

// পেজ লোড হলে চেক
document.addEventListener('DOMContentLoaded', function() {
    // প্রতিটি পেজের জন্য আলাদা কনফিগ
    const pageConfig = {
        'medica-database.html': 'registered',
        'patient-history.html': 'registered',
        'advanced-report.html': 'paid',
        'genomic-analysis.html': 'paid',
        'private-consultation.html': 'paid'
    };
    
    const currentPage = window.location.pathname.split('/').pop();
    const requiredRole = pageConfig[currentPage];
    
    if (requiredRole) {
        checkAccess(requiredRole);
    }
});
