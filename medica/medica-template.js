/**
 * Nirvik Homeo - Materia Medica Master Template Script
 * Year: 2026
 * Description: Dynamic Header (Sync with main web), Compact Hero Height, Footer & Anti-Copy Protection.
 */

document.addEventListener("DOMContentLoaded", () => {
    // ১. মূল ওয়েবসাইটের অনুরূপ সম্পূর্ণ হেডার ডিজাইন (লিংক পাথ ডিরেক্টরি অনুযায়ী ঠিক করা)
    const headerHTML = `
    <header class="bg-[#008066] text-white sticky top-0 z-50 shadow-md">
        <style>
            /* ===== ড্রপডাউন যোগাযোগ সূত্র (মাউস নিচে নামালেও মেনু থাকে) ===== */
            .relative.group .absolute {
                top: calc(100% - 6px) !important;
                padding-top: 6px !important;
            }
            .relative.group {
                padding-bottom: 4px;
            }
            .relative.group:hover > .absolute {
                display: block !important;
            }
            .mobile-menu-btn {
                background: rgba(255,255,255,0.15);
                border: 1px solid rgba(255,255,255,0.1);
            }
            .mobile-menu-btn:hover {
                background: rgba(255,255,255,0.25);
            }
        </style>
        
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex items-center justify-between py-3">
                
                <a href="../index.html" class="flex-shrink-0 hover:opacity-80 transition">
                    <span class="text-teal-200 font-medium text-lg">নির্ভীক হোমিও</span>
                </a>

                <nav class="hidden md:flex items-center gap-4 text-sm font-medium">
                    <a href="../select.html" class="hover:bg-white/20 px-4 py-2 rounded-2xl transition">সাধারণ রোগ</a>
                    
                    <a href="index.html" class="bg-white/20 px-4 py-2 rounded-2xl transition">মেডিকা</a>
                    
                    <div class="relative group">
                        <button class="flex items-center gap-1 hover:bg-white/20 px-4 py-2 rounded-2xl transition">
                            সার্বদেহিক রোগ <i class="fas fa-chevron-down text-xs"></i>
                        </button>
                        <div class="absolute hidden bg-white text-gray-800 shadow-2xl rounded-3xl py-4 w-72 mt-2 z-50">
                            <a href="../jor.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-temperature-high mr-2 text-teal-600"></i>জ্বর সর্দি কাশি</a>
                            <a href="../pain.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-bolt mr-2 text-teal-600"></i>ব্যথা</a>
                            <a href="../tumor.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-circle mr-2 text-teal-600"></i>টিউমার</a>
                            <a href="../abscess.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-droplet mr-2 text-teal-600"></i>ফোঁড়া</a>
                            <a href="../pressure.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-utensils mr-2 text-teal-600"></i>প্রেসার গ্রন্থি শিরা</a>
                            <a href="../bloodbonemuscle.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-bone mr-2 text-teal-600"></i>রক্ত হাড় পেশী</a>
                            <a href="../mental.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-brain mr-2 text-teal-600"></i>মানসিক রোগ সকল</a>
                            <a href="../skin.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-hand-sparkles mr-2 text-teal-600"></i>চর্মরোগ</a>
                        </div>
                    </div>

                    <div class="relative group">
                        <button class="flex items-center gap-1 hover:bg-white/20 px-4 py-2 rounded-2xl transition">
                            উপর অঙ্গের রোগ <i class="fas fa-chevron-down text-xs"></i>
                        </button>
                        <div class="absolute hidden bg-white text-gray-800 shadow-2xl rounded-3xl py-4 w-72 mt-2 z-50">
                            <a href="../head.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-brain mr-2 text-teal-600"></i>মাথা</a>
                            <a href="../eyes.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-eye mr-2 text-teal-600"></i>চোখ</a>
                            <a href="../ear.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-ear-listen mr-2 text-teal-600"></i>কান</a>
                            <a href="../nose.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-nose mr-2 text-teal-600"></i>নাক</a>
                            <a href="../mouthful.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-teeth mr-2 text-teal-600"></i>মুখ হইতে টুটি ও ঘাড়</a>
                            <a href="../teeth.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-tooth mr-2 text-teal-600"></i>দাঁত</a>
                        </div>
                    </div>

                    <div class="relative group">
                        <button class="flex items-center gap-1 hover:bg-white/20 px-4 py-2 rounded-2xl transition">
                            মাঝ অঙ্গের রোগ <i class="fas fa-chevron-down text-xs"></i>
                        </button>
                        <div class="absolute hidden bg-white text-gray-800 shadow-2xl rounded-3xl py-4 w-72 mt-2 z-50">
                            <a href="../chest.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-lungs mr-2 text-teal-600"></i>বুকের সমস্যা</a>
                            <a href="../hands.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-hand mr-2 text-teal-600"></i>হাতের সমস্যা</a>
                            <a href="../back.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-spine mr-2 text-teal-600"></i>পিঠের সমস্যা</a>
                            <a href="../stomach.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-stomach mr-2 text-teal-600"></i>पাকস্থলী</a>
                        </div>
                    </div>

                    <div class="relative group">
                        <button class="flex items-center gap-1 hover:bg-white/20 px-4 py-2 rounded-2xl transition">
                            নিচ অঙ্গের রোগ <i class="fas fa-chevron-down text-xs"></i>
                        </button>
                        <div class="absolute hidden bg-white text-gray-800 shadow-2xl rounded-3xl py-4 w-72 mt-2 z-50">
                            <a href="../piles.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-circle-dot mr-2 text-teal-600"></i>অর্শ</a>
                            <a href="../urethral.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-droplet mr-2 text-teal-600"></i>মূত্রনালী</a>
                            <a href="../leg.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-shoe-prints mr-2 text-teal-600"></i>পা</a>
                            <a href="../stool.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-toilet mr-2 text-teal-600"></i>মল ও কৃমি</a>
                            <a href="../anus.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-water mr-2 text-teal-600"></i>মলদ্বার</a>
                            <a href="../male.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-person mr-2 text-teal-600"></i>যৌনাঙ্গ পুরুষ</a>
                            <a href="../female.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-person-dress mr-2 text-teal-600"></i>যৌনাঙ্গ নারী</a>
                        </div>
                    </div>

                    <div class="relative group">
                        <button class="flex items-center gap-1 hover:bg-white/20 px-4 py-2 rounded-2xl transition">
                            লগ ইন <i class="fas fa-chevron-down text-xs"></i>
                        </button>
                        <div class="absolute hidden bg-white text-gray-800 shadow-2xl rounded-3xl py-4 w-56 mt-2 right-0 z-50">
                            <a href="../register.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-user-plus mr-2"></i>রেজিস্ট্রেশন</a>
                            <a href="../dashboard.html" class="block px-6 py-2.5 hover:bg-teal-50"><i class="fas fa-user-circle mr-2"></i>আমার প্রোফাইল</a>
                            <a href="#" class="block px-6 py-2.5 hover:bg-teal-50 text-red-600"><i class="fas fa-sign-out-alt mr-2"></i>লগ আউট</a>
                        </div>
                    </div>
                </nav>

                <div class="md:hidden flex items-center gap-1.5">
                    <a href="../select.html" class="mobile-menu-btn text-white text-[11px] px-2.5 py-1.5 rounded-full font-medium transition">সাধারণ রোগ</a>
                    <a href="index.html" class="mobile-menu-btn text-white text-[11px] px-2.5 py-1.5 rounded-full font-medium transition">মেডিকা</a>
                    <button id="template-mobile-menu-btn" class="text-lg p-1.5 text-white hover:bg-white/10 rounded-lg transition focus:outline-none">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </div>
        </div>

        <div id="template-mobile-menu" class="hidden md:hidden border-t border-teal-700 py-3 bg-[#008066]">
            <div class="px-4 flex flex-col gap-1.5 text-sm max-h-[75vh] overflow-y-auto">
                <a href="index.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-white flex items-center gap-2">📖 মেডিকা</a>

                <details class="group">
                    <summary class="px-4 py-2 hover:bg-white/20 rounded-xl cursor-pointer list-none flex items-center justify-between text-white focus:outline-none">
                        <span>🫀 সার্বদেহিক রোগ</span>
                        <span class="text-xs transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div class="pl-4 flex flex-col gap-1 mt-1 bg-teal-800/30 rounded-xl p-1">
                        <a href="../jor.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">🔥 জ্বর সর্দি কাশি</a>
                        <a href="../pain.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">⚡ ব্যথা</a>
                        <a href="../tumor.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">⭕ টিউমার</a>
                        <a href="../abscess.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">💧 ফোঁড়া</a>
                        <a href="../pressure.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">🍽️ প্রেসার গ্রন্থি শিরা</a>
                        <a href="../bloodbonemuscle.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">🦴 রক্ত হাড় পেশী</a>
                        <a href="../mental.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">🧠 মানসিক রোগ সকল</a>
                        <a href="../skin.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">✋ চর্মরোগ</a>
                    </div>
                </details>

                <details class="group">
                    <summary class="px-4 py-2 hover:bg-white/20 rounded-xl cursor-pointer list-none flex items-center justify-between text-white focus:outline-none">
                        <span>👆 উপর অঙ্গের রোগ</span>
                        <span class="text-xs transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div class="pl-4 flex flex-col gap-1 mt-1 bg-teal-800/30 rounded-xl p-1">
                        <a href="../head.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">🧠 মাথা</a>
                        <a href="../eyes.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">👁️ চোখ</a>
                        <a href="../ear.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">👂 কান</a>
                        <a href="../nose.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">👃 নাক</a>
                        <a href="../mouthful.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">🦷 মুখ হইতে টুটি ও ঘাড়</a>
                        <a href="../teeth.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">🦷 দাঁত</a>
                    </div>
                </details>

                <details class="group">
                    <summary class="px-4 py-2 hover:bg-white/20 rounded-xl cursor-pointer list-none flex items-center justify-between text-white focus:outline-none">
                        <span>🖐️ মাঝ অঙ্গের রোগ</span>
                        <span class="text-xs transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div class="pl-4 flex flex-col gap-1 mt-1 bg-teal-800/30 rounded-xl p-1">
                        <a href="../chest.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">🫁 বুক সমস্যা</a>
                        <a href="../hands.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">✋ হাতের সমস্যা</a>
                        <a href="../back.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">🔙 পিঠ</a>
                        <a href="../stomach.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">🍲 পাকস্থলী</a>
                    </div>
                </details>

                <details class="group">
                    <summary class="px-4 py-2 hover:bg-white/20 rounded-xl cursor-pointer list-none flex items-center justify-between text-white focus:outline-none">
                        <span>🦶 নিচ অঙ্গের রোগ</span>
                        <span class="text-xs transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div class="pl-4 flex flex-col gap-1 mt-1 bg-teal-800/30 rounded-xl p-1">
                        <a href="../piles.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">🔴 অর্শ</a>
                        <a href="../urethral.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">💧 মূত্রনালী</a>
                        <a href="../leg.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">🦶 পা</a>
                        <a href="../stool.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">🐛 মল ও কৃমি</a>
                        <a href="../anus.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">🌊 মলদ্বার</a>
                        <a href="../male.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">👨 যৌনাঙ্গ পুরুষ</a>
                        <a href="../female.html" class="px-4 py-1.5 hover:bg-white/20 rounded-xl text-xs text-white">👩 যৌনাঙ্গ নারী</a>
                    </div>
                </details>

                <div class="border-t border-teal-700 my-2 pt-2 flex flex-col gap-1">
                    <a href="../dashboard.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-white text-xs flex items-center gap-2">👤 আমার প্রোফাইল</a>
                    <a href="../login.html" class="px-4 py-2 hover:bg-white/20 rounded-xl text-white text-xs flex items-center gap-2">🔑 লগ ইন / রেজিস্ট্রেশন</a>
                </div>
            </div>
        </div>
    </header>`;

    // ২. স্ট্যাটিক ফুটার
    const footerHTML = `
    <footer class="bg-[#002D24] text-teal-300 py-3 mt-auto text-[10px]">
        <div class="max-w-7xl mx-auto px-4 text-center flex flex-col sm:flex-row justify-between items-center gap-1">
            <div><strong class="text-white">নির্ভীক হোমিও</strong> — মেটেরিয়া মেডিকা ডিরেক্টরি</div>
            <div class="opacity-75">© ২০২৬ নির্ভীক হোমিও</div>
        </div>
    </footer>`;

    // ৩. ডমে হেডার ও ফুটার রেন্ডারিং করা
    const appHeader = document.getElementById("app-header");
    const appFooter = document.getElementById("app-footer");

    if (appHeader) appHeader.insertAdjacentHTML("afterbegin", headerHTML);
    if (appFooter) appFooter.insertAdjacentHTML("afterbegin", footerHTML);

    // ৪. হিরো ব্যানারের উচ্চতা কমানো (সেকশনের ক্লাসের প্যাডিং `py-6` থেকে `py-3` এ পরিবর্তন)
    const heroSection = document.querySelector("section.bg-gradient-to-r");
    if (heroSection) {
        heroSection.classList.remove("py-6");
        heroSection.classList.add("py-3");
    }

    // ৫. মোবাইল মেনু ওপেন/ক্লোজ টগল লজিক (আইডি দ্বন্দ্ব এড়াতে সুনির্দিষ্ট করা হয়েছে)
    const menuBtn = document.getElementById('template-mobile-menu-btn');
    const mobileMenu = document.getElementById('template-mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });

        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // ৬. অ্যাডভান্সড অ্যান্টি-কপি এবং কন্টেন্ট প্রটেকশন সিস্টেম
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
