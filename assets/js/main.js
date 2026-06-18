/**
 * ============================================
 *   হোমিওপ্যাথি - আধুনিক ডিজাইন
 *   সম্পূর্ণ ফাংশনালিটি
 * ============================================
 */

// ---------- DOM রেডি ----------
document.addEventListener('DOMContentLoaded', function() {
    
    // ----- ১. মোবাইল হ্যামবার্গার -----
    const hamburger = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // লিংক ক্লিক করলে মেনু বন্ধ
        navMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // ----- ২. ডার্ক/লাইট মোড টগল -----
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // লোকাল স্টোরেজ থেকে থিম লোড
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const current = html.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateThemeIcon(next);
        });
    }
    
    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
    
    // ----- ৩. স্ক্রল ইফেক্ট (হেডার শ্যাডো) -----
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });
    
    // ----- ৪. কাউন্টার অ্যানিমেশন (Intersection Observer) -----
    const counters = document.querySelectorAll('.stat .number');
    
    if (counters.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const count = parseInt(target.getAttribute('data-count')) || 0;
                    animateCounter(target, count);
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(function(counter) {
            observer.observe(counter);
        });
    }
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = Math.ceil(target / 60);
        const duration = 2000;
        const stepTime = Math.floor(duration / 60);
        
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                element.textContent = target + (target > 100 ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = current;
            }
        }, stepTime);
    }
    
    // ----- ৫. স্ক্রল রিভিল অ্যানিমেশন -----
    if ('IntersectionObserver' in window) {
        const revealElements = document.querySelectorAll('.service-card');
        
        const revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        revealElements.forEach(function(el, index) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `all 0.6s ease ${index * 0.1}s`;
            revealObserver.observe(el);
        });
    }
    
    // ----- ৬. সক্রিয় লিংক হাইলাইট -----
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a:not(.btn-nav)').forEach(function(link) {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    console.log('✅ আধুনিক ডিজাইন লোড হয়েছে!');
    console.log('🌙 ডার্ক/লাইট মোড:', html.getAttribute('data-theme'));
});
