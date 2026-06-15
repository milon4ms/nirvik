// মোবাইল হ্যামবার্গার মেনু
const hamburger = document.getElementById('hamburgerBtn');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// সক্রিয় পেজ হাইলাইট
const current = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === current) {
        link.classList.add('active');
    }
});
