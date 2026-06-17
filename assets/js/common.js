// মোবাইল মেনু টগল
const hamburger = document.getElementById('hamburgerBtn');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
    });
}

// সক্রিয় লিংক হাইলাইট
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(function(link) {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// লিংক ক্লিক করলে মেনু বন্ধ
document.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 700) {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.innerHTML = '☰';
        }
    });
});
