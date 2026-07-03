/**
 * Nirvik Homeo - Materia Medica Master Template Script
 * Year: 2026
 * Description: Dynamic Header & Footer synced with main web (Corrected Paths), Mobile Menu & Authentication Support.
 */

document.addEventListener("DOMContentLoaded", () => {
    // ১. মূল ওয়েবসাইটের অনুরূপ সম্পূর্ণ হেডার ডিজাইন (সাব-ডিরেক্টরি পাথ সেট করা)
    const headerHTML = `
    <header class="bg-[#005c4b] text-white sticky top-0 z-50 shadow-md">
        <style>
            /* ===== ড্রপডাউন যোগাযোগ সূত্র (মাউস নিচে নামালেও মেনু থাকে) ===== */
            .relative.group .absolute {
                top: calc(100% - 6px) !important;
                padding-top: 6px !important;
            }
            /* প্যারেন্ট এলিমেন্টে সামান্য প্যাডিং */
            .relative.group {
                padding-bottom: 4px;
            }
            /* ডেস্কটপে ড্রপডাউন মেনু খোলা রাখার নিশ্চয়তা */
            .relative.group:hover > .absolute {
                display: block !important;
            }
            /* মোবাইলে সরাসরি দেখানো বাটনগুলোর স্টাইল */
            .mobile-header-btn {
                background: rgba(255,255,255,0.15);
                border: 1px solid rgba(255,255,255,0.1);
                font-size: 11px;
                padding: 6px 10px;
                border-radius: 9999px;
                font-weight: 500;
                transition: all 0.2s;
            }
            .mobile-header-btn:hover {
                background: rgba(255,255,255,0.25);
            }
            
            /* 📝 পিসির জন্য ডানপাশের সাবমেনু (Nested Dropdown) স্টাইল */
            .nested-dropdown {
                display: none;
                position: absolute;
                left: 100%;
                top: 0;
                margin-left: 2px;
            }
            .nested-parent:hover .nested-dropdown {
                display: block !important;
            }
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
                    
                    <button id="template-mobile-menu-btn" class="text-xl p-2 text-white hover:bg-white/10 rounded-full transition focus:outline-none ml-0.5" aria-label="Toggle Menu">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </div>
        </div>

        <div id="template-mobile-menu" class="hidden md:hidden bg-[#005c4b] border-t border-teal-700 py-3">
            <div class="px-4 flex flex-col gap-1.5 text-base max-h-[80vh] overflow-y-auto">
                
                <a href="index.html" class="px-4 py-2.5 hover:bg-white/20 rounded-xl text-white font-medium flex items-center gap-2">📖 মে.মেডিকা</a>

                <details class="group">
                    <summary class="px-4 py-2.5 hover:bg-white/20 rounded-xl cursor-pointer list-none flex items-center justify-between text-white focus:outline-none">
                        <span>🌡️ সার্বদেহিক রোগ</span>
                        <span class="text-xs transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div class="pl-4 flex flex-col gap-1 mt-1 bg-teal-800/30 rounded-xl p-1">
                        <a href="../jor.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">🤒 জ্বর সর্দি কাশি</a>
                        <a href="../pain.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">⚡ ব্যথা</a>
                        <a href="../tumor.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">⚫ টিউমার</a>
                        <a href="../abscess.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">💧 ফোঁড়া</a>
                        <a href="../pressure.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">🩺 প্রেসার গ্রন্থি শিরা</a>
                        <a href="../bloodbonemuscle.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">🦴 রক্ত হাড় পেশী</a>
                        <a href="../mental.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">🧠 মানসিক রোগ সকল</a>
                        <a href="../skin.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">✨ চর্মরোগ</a>
                    </div>
                </details>

                <details class="group">
                    <summary class="px-4 py-2.5 hover:bg-white/20 rounded-xl cursor-pointer list-none flex items-center justify-between text-white focus:outline-none">
                        <span>👆 উপর অঙ্গের রোগ</span>
                        <span class="text-xs transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div class="pl-4 flex flex-col gap-1 mt-1 bg-teal-800/30 rounded-xl p-1">
                        <a href="../head.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">🧠 মাথা</a>
                        <a href="../eyes.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">👁️ চোখ</a>
                        <a href="../ear.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">👂 কান</a>
                        <a href="../nose.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">👃 নাক</a>
                        <a href="../mouthful.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">👅 মুখ হইতে টুটি ও ঘাড়</a>
                        <a href="../teeth.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">🦷 দাঁত</a>
                        <div class="border-t border-teal-700/50 my-1"></div>
                        <a href="../chest.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">🫁 বুক সমস্যা</a>
                        <a href="../hands.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">✋ হাতের সমস্যা</a>
                        <a href="../back.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">🧍‍♂️ পিঠের সমস্যা</a>
                        <a href="../stomach.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">🍲 পাকস্থলী</a>
                    </div>
                </details>

                <details class="group">
                    <summary class="px-4 py-2.5 hover:bg-white/20 rounded-xl cursor-pointer list-none flex items-center justify-between text-white focus:outline-none">
                        <span>🦶 নিচ অঙ্গের রোগ</span>
                        <span class="text-xs transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div class="pl-4 flex flex-col gap-1 mt-1 bg-teal-800/30 rounded-xl p-1">
                        <a href="../piles.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">🔴 অর্শ</a>
                        <a href="../urethral.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">💧 মূত্রনালী</a>
                        <a href="../leg.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">🦶 পা</a>
                        <a href="../stool.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">🐛 মল ও কৃমি</a>
                        <a href="../anus.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">🌊 মলদ্বার</a>
                        <a href="../male.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">👨 যোনাঙ্গ পুরুষ</a>
                        <a href="../female.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">👩 যৌনাঙ্গ নারী</a>
                    </div>
                </details>

                <details class="group">
                    <summary class="px-4 py-2.5 hover:bg-white/20 rounded-xl cursor-pointer list-none flex items-center justify-between text-white focus:outline-none border-t border-teal-700/50 mt-2 pt-3">
                        <span>🔑 একাউন্ট </span>
                        <span class="text-xs transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div class="pl-4 flex flex-col gap-1 mt-1 bg-teal-800/30 rounded-xl p-1">
                        <a href="../login.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">🔐 লগ ইন </a>
                        <a href="../register.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">📝 রেজিস্ট্রেশন</a>
                        <a href="../dashboard-gate.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">👤 ড্যাশবোর্ড</a>
                        <a href="../forgot-password.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-white">🔑 পাসওয়ার্ড ভুলে গেছি</a>
                        <a href="#" class="nh-logout px-4 py-2 hover:bg-white/20 rounded-xl text-sm text-red-400 border-t border-teal-800 mt-1 pt-1">🚪 লগ আউট</a>
                    </div>
                </details>

            </div>
        </div>
    </header>`;

    // ২. মূল ওয়েবসাইটের অনুরূপ ফুটার ডিজাইন
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
                <div class="text-xs opacity-75">
                    © ২০২৬ নির্ভীক হোমিও
                </div>
            </div>
        </div>
    </footer>`;

    // ৩. ডমে হেডার ও ফুটার রেন্ডারিং করা
    const appHeader = document.getElementById("app-header");
    const appFooter = document.getElementById("app-footer");

    if (appHeader) appHeader.insertAdjacentHTML("afterbegin", headerHTML);
    if (appFooter) appFooter.insertAdjacentHTML("afterbegin", footerHTML);

    // ৪. হিরো ব্যানারের উচ্চতা সুবিন্যস্ত করা
    const heroSection = document.querySelector("section.bg-gradient-to-r");
    if (heroSection) {
        heroSection.classList.remove("py-8");
        heroSection.classList.add("py-5");
    }

    // ৫. মোবাইল মেনু ওপেন/ক্লোজ টগল লজিক
    const menuBtn = document.getElementById('template-mobile-menu-btn');
    const mobileMenu = document.getElementById('template-mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });

        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // 🔐 ৬. ফায়ারবেস লগআউট ইউজার ফাংশন
    function logoutUser() {
        if (typeof window.isLoggingOut !== 'undefined') {
            window.isLoggingOut = true;
        }
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('isLoggingOut', 'true');
        }
        
        if (typeof firebase !== 'undefined' && firebase.auth) {
            firebase.auth().signOut().then(function() {
                if (typeof localStorage !== 'undefined') {
                    localStorage.removeItem('user'); 
                }
                if (typeof sessionStorage !== 'undefined') {
                    sessionStorage.clear();
                }
                
                alert('✅ সফলভাবে লগআউট হয়েছে!');
                window.location.replace('../login.html');
            }).catch(function(error) {
                console.error("লগআউট ত্রুটি:", error);
                if (typeof localStorage !== 'undefined') {
                    localStorage.removeItem('isLoggingOut');
                }
                if (typeof window.isLoggingOut !== 'undefined') {
                    window.isLoggingOut = false; 
                }
            });
        } else {
            window.location.replace('../login.html');
        }
    }

    // লগআউট বাটনে ক্লিক ইভেন্ট হ্যান্ডলার
    window.addEventListener('click', function(e) {
        const logoutBtn = e.target.closest('.nh-logout');
        if (logoutBtn) {
            e.preventDefault();
            if (confirm('আপনি কি নিশ্চিতভাবে লগআউট করতে চান?')) {
                logoutUser();
            }
        }
    });

    // 🛡️ ৭. অ্যাডভান্সড অ্যান্টি-কপি এবং কন্টেন্ট প্রটেকশন সিস্টেম
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
    document.body.style.msUserSelect = "none";
    document.body.style.mozUserSelect = "none";

    document.addEventListener("contextmenu", (e) => e.preventDefault());
    document.addEventListener("dragstart", (e) => e.preventDefault());

    document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && ["c", "a", "u", "s", "p"].includes(e.key.toLowerCase())) {
            e.preventDefault();
        }
        if (e.keyCode === 123) {
            e.preventDefault();
        }
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
            e.preventDefault();
        }
    });
}); 
