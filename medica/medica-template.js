/**
 * Nirvik Homeo - Materia Medica Master Template Script
 * Year: 2026
 * Description: Dynamic Header & Footer with Auto-Reinject Protection (MutationObserver), Mobile Menu & Auth Sync.
 */

(function() {
    // ১. সম্পূর্ণ হেডার ডিজাইন
    const headerHTML = `
    <header class="bg-[#005c4b] text-white sticky top-0 z-50 shadow-md">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=SolaimanLipi&display=swap');
            body, header, footer, nav, button, a, div, span, p, h1, h2, h3, strong {
                font-family: 'SolaimanLipi', sans-serif !important;
            }
            .relative.group .absolute {
                top: calc(100% - 6px) !important;
                padding-top: 6px !important;
            }
            .relative.group { padding-bottom: 4px; }
            .relative.group:hover > .absolute { display: block !important; }
            .mobile-header-btn {
                background: rgba(255,255,255,0.15);
                border: 1px solid rgba(255,255,255,0.1);
                font-size: 11px;
                padding: 6px 10px;
                border-radius: 9999px;
                font-weight: 500;
                transition: all 0.2s;
            }
            .mobile-header-btn:hover { background: rgba(255,255,255,0.25); }
        </style>
        
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex items-center justify-between py-4">
                <a href="../index.html" class="flex-shrink-0 hover:opacity-80 transition">
                    <span class="text-white font-bold text-xl md:text-2xl tracking-wide">নির্ভীক হোমিও</span>
                </a>

                <nav class="hidden md:flex items-center gap-6 text-base font-medium">
                    <a href="../select.html" class="hover:bg-white/20 px-5 py-3 rounded-2xl transition">কেস টেকিং</a>
                    <a href="../prescription.html" class="hover:bg-white/20 px-5 py-3 rounded-2xl transition">প্রেসক্রিপশন</a>
                    <a href="index.html" class="bg-white/20 px-5 py-3 rounded-2xl transition">মে.মেডিকা</a>
                    
                    <div class="relative group">
                        <button class="flex items-center gap-1 hover:bg-white/20 px-5 py-3 rounded-2xl transition focus:outline-none">
                            সার্বদেহিক রোগ <i class="fas fa-chevron-down text-xs ml-1"></i>
                        </button>
                        <div class="absolute hidden bg-white text-gray-800 shadow-2xl rounded-3xl py-4 w-72 mt-2 left-0 z-50">
                            <a href="../jor.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-temperature-high mr-2 text-teal-600 w-5"></i>জ্বর সর্দি কাশি</a>
                            <a href="../pain.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-bolt mr-2 text-teal-600 w-5"></i>ব্যথা</a>
                            <a href="../tumor.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-circle mr-2 text-teal-600 w-5"></i>টিউমার</a>
                            <a href="../abscess.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-droplet mr-2 text-teal-600 w-5"></i>ফোঁড়া</a>
                            <a href="../pressure.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-utensils mr-2 text-teal-600 w-5"></i>প্রেসার গ্রন্থি শিরা</a>
                            <a href="../bloodbonemuscle.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-bone mr-2 text-teal-600 w-5"></i>রক্ত হাড় পেশী</a>
                            <a href="../mental.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-brain mr-2 text-teal-600 w-5"></i>মানসিক রোগ সকল</a>
                            <a href="../skin.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-hand-sparkles mr-2 text-teal-600 w-5"></i>চর্মরোগ</a>
                        </div>
                    </div>

                    <div class="relative group">
                        <button class="flex items-center gap-1 hover:bg-white/20 px-5 py-3 rounded-2xl transition focus:outline-none">
                            উপর অঙ্গের রোগ <i class="fas fa-chevron-down text-xs ml-1"></i>
                        </button>
                        <div class="absolute hidden bg-white text-gray-800 shadow-2xl rounded-3xl py-4 w-72 mt-2 left-0 z-50 max-h-[85vh] overflow-y-auto">
                            <a href="../head.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-brain mr-2 text-teal-600 w-5"></i>মাথা</a>
                            <a href="../eyes.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-eye mr-2 text-teal-600 w-5"></i>চোখ</a>
                            <a href="../ear.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-ear-listen mr-2 text-teal-600 w-5"></i>কান</a>
                            <a href="../nose.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-allergies mr-2 text-teal-600 w-5"></i>নাক</a>
                            <a href="../mouthful.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-teeth mr-2 text-teal-600 w-5"></i>মুখ হইতে টুটি ও ঘাড়</a>
                            <a href="../teeth.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-tooth mr-2 text-teal-600 w-5"></i>দাঁত</a>
                            <div class="border-t border-gray-100 my-1"></div>
                            <a href="../chest.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-lungs mr-2 text-teal-600 w-5"></i>বুকের সমস্যা</a>
                            <a href="../hands.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-hand mr-2 text-teal-600 w-5"></i>হাতের সমস্যা</a>
                            <a href="../back.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-child mr-2 text-teal-600 w-5"></i>পিঠের সমস্যা</a>
                            <a href="../stomach.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-apple-alt mr-2 text-teal-600 w-5"></i>পাকস্থলী</a>
                        </div>
                    </div>

                    <div class="relative group">
                        <button class="flex items-center gap-1 hover:bg-white/20 px-5 py-3 rounded-2xl transition focus:outline-none">
                            নিচ অঙ্গের রোগ <i class="fas fa-chevron-down text-xs ml-1"></i>
                        </button>
                        <div class="absolute hidden bg-white text-gray-800 shadow-2xl rounded-3xl py-4 w-72 mt-2 left-0 z-50">
                            <a href="../piles.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-circle-dot mr-2 text-teal-600 w-5"></i>অর্শ</a>
                            <a href="../urethral.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-droplet mr-2 text-teal-600 w-5"></i>মূত্রনালী</a>
                            <a href="../leg.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-shoe-prints mr-2 text-teal-600 w-5"></i>পা</a>
                            <a href="../stool.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-toilet mr-2 text-teal-600 w-5"></i>মল ও কৃমি</a>
                            <a href="../anus.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-water mr-2 text-teal-600 w-5"></i>মলদ্বার</a>
                            <a href="../male.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-person mr-2 text-teal-600 w-5"></i>যৌনাঙ্গ পুরুষ</a>
                            <a href="../female.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-person-dress mr-2 text-teal-600 w-5"></i>যৌনাঙ্গ নারী</a>
                        </div>
                    </div>

                    <div class="relative group">
                        <button class="flex items-center gap-1 hover:bg-white/20 px-5 py-3 rounded-2xl transition focus:outline-none">
                            একাউন্ট <i class="fas fa-chevron-down text-xs ml-1"></i>
                        </button>
                        <div class="absolute hidden bg-white text-gray-800 shadow-2xl rounded-3xl py-4 w-60 mt-2 right-0 z-50">
                            <a href="../login.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-sign-in-alt mr-2 text-teal-600 w-5"></i>লগ ইন</a>
                            <a href="../register.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-user-plus mr-2 text-teal-600 w-5"></i>রেজিস্ট্রেশন</a>
                            <a href="../dashboard-gate.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-user-circle mr-2 text-teal-600 w-5"></i>ড্যাশবোর্ড</a>
                            <a href="../forgot-password.html" class="block px-6 py-3 hover:bg-teal-50 transition"><i class="fas fa-key mr-2 text-teal-600 w-5"></i>পাসওয়ার্ড ভুলে গেছি</a>
                            <div class="border-t border-gray-100 my-1"></div>
                            <a href="#" class="nh-logout block px-6 py-3 hover:bg-red-50 text-red-600 transition"><i class="fas fa-sign-out-alt mr-2 w-5"></i>লগ আউট</a>
                        </div>
                    </div>
                </nav>

                <div class="md:hidden flex items-center gap-1">
                    <a href="../select.html" class="mobile-header-btn"><i class="fas fa-hospital text-[10px] mr-0.5"></i>কেস টেকিং</a>
                    <a href="../prescription.html" class="mobile-header-btn"><i class="fas fa-file-invoice text-[10px] mr-0.5"></i>প্রেসক্রিপশন</a>
                    <button id="template-mobile-menu-btn" class="text-xl p-2 text-white hover:bg-white/10 rounded-full transition focus:outline-none ml-0.5">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </div>
        </div>

        <div id="template-mobile-menu" class="hidden md:hidden bg-[#005c4b] border-t border-teal-700 py-3">
            <div class="px-4 flex flex-col gap-1.5 text-base max-h-[80vh] overflow-y-auto">
                <a href="index.html" class="px-4 py-2.5 hover:bg-white/20 rounded-xl text-white font-medium flex items-center gap-2">📖 মে.মেডিকা</a>
                </div>
        </div>
    </header>`;

    // ২. সম্পূর্ণ ফুটার ডিজাইন
    const footerHTML = `
    <footer class="bg-[#112e24] text-teal-200 py-4 mt-auto">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                <div>
                    <strong class="text-white">নির্ভীক হোমিও</strong> — আপনার প্রশ্ন, প্রযুক্তির বিশ্লেষণ, অল্প সময়ে মেডিসিন সিলেকশন।
                </div>
                <div class="flex flex-wrap gap-x-6 gap-y-2 justify-center">
                    <a href="../rules.html" class="hover:text-white">ব্যবহারের নিয়ম</a>
                    <a href="../paid-user.html" class="hover:text-white">পেইড ইউজারের সুবিধা</a>
                    <a href="../privacy-policy.html" class="hover:text-white">প্রাইভেসি পলিসি</a>
                    <a href="../disclaimer.html" class="hover:text-white">Disclaimer</a>
                    <a href="../contact.html" class="hover:text-white">যোগাযোগ</a>
                </div>
                <div class="text-xs opacity-75">© ২০২৬ নির্ভীক হোমিও</div>
            </div>
        </div>
    </footer>`;

    // ৩. রেন্ডার এবং প্রোটেকশন ফাংশন (যা মুছে গেলেও সাথে সাথে পুনরায় জেনারেট করবে)
    function injectTemplate() {
        const appHeader = document.getElementById("app-header") || document.getElementById("header-container");
        const appFooter = document.getElementById("app-footer") || document.getElementById("footer-container");

        if (appHeader && appHeader.innerHTML !== headerHTML) {
            appHeader.innerHTML = headerHTML;
            setupMobileMenu(); // মেনু ইনজেক্ট হলে টগল লজিক পুনরায় সেটআপ হবে
        }
        if (appFooter && appFooter.innerHTML !== footerHTML) {
            appFooter.innerHTML = footerHTML;
        }
    }

    // ৪. মোবাইল মেনু টগল লজিক
    function setupMobileMenu() {
        const menuBtn = document.getElementById('template-mobile-menu-btn');
        const mobileMenu = document.getElementById('template-mobile-menu');
        if (menuBtn && mobileMenu) {
            menuBtn.onclick = function(e) {
                e.preventDefault();
                mobileMenu.classList.toggle('hidden');
            };
        }
    }

    // ৫. মিউটেশন অবজারভার সেটআপ (ব্যাকগ্রাউন্ড প্রটেক্টর)
    const observer = new MutationObserver((mutations) => {
        injectTemplate();
    });

    // পেজ লোড হওয়া শুরু করলেই রান করবে
    function init() {
        injectTemplate();
        observer.observe(document.body, { childList: true, subtree: true });
        
        const heroSection = document.querySelector("section.bg-gradient-to-r");
        if (heroSection) { heroSection.classList.replace("py-8", "py-5"); }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    // 🔐 ৬. ফায়ারবেস লগআউট ইউজার ফাংশন
    function logoutUser() {
        if (typeof firebase !== 'undefined' && firebase.auth) {
            firebase.auth().signOut().then(function() {
                if (typeof localStorage !== 'undefined') localStorage.removeItem('user');
                if (typeof sessionStorage !== 'undefined') sessionStorage.clear();
                alert('✅ সফলভাবে লগআউট হয়েছে!');
                window.location.href = '../login.html';
            }).catch(function(error) {
                console.error("লগআউট ত্রুটি:", error);
            });
        } else {
            window.location.href = '../login.html';
        }
    }

    window.addEventListener('click', function(e) {
        const logoutBtn = e.target.closest('.nh-logout');
        if (logoutBtn) {
            e.preventDefault();
            if (confirm('আপনি কি নিশ্চিতভাবে লগআউট করতে চান?')) logoutUser();
        }
    });

    // 🛡️ ৭. অ্যান্টি-কপি এবং প্রোটেকশন
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    document.addEventListener("dragstart", (e) => e.preventDefault());
    document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && ["c", "a", "u", "s", "p"].includes(e.key.toLowerCase())) e.preventDefault();
        if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i")) e.preventDefault();
    });
})();
