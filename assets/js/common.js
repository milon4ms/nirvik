// মোবাইল মেনু টগল
const hamburger = document.getElementById('hamburgerBtn');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
    });
}

// সক্রিয় লিংক হাইলাইট
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// লিংক ক্লিক করলে মেনু বন্ধ
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 700) {
            navMenu.classList.remove('active');
            hamburger.innerHTML = '☰';
        }
    });
});
