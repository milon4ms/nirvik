// মোবাইল মেনু টগল
const hamburger = document.getElementById('hamburgerBtn');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// সক্রিয় লিংক হাইলাইট
document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === '#') {
        link.classList.add('active');
    }
});
