/**
 * Nirvik Homeo - Materia Medica Master Template Script
 * Year: 2026
 * Description: Dynamically injects Header, Footer and enforces Anti-Copy Protection.
 */

document.addEventListener("DOMContentLoaded", () => {
    // ১. হেডার টেমপ্লেট (HTML)
    const headerHTML = `
    <header class="bg-[#008066] text-white sticky top-0 z-50 shadow-md text-xs">
        <div class="max-w-7xl mx-auto px-3">
            <div class="flex items-center justify-between py-2.5">
                <a href="index.html" class="flex items-center gap-2 hover:opacity-80 transition">
                    <i class="fas fa-arrow-left text-sm"></i>
                    <span class="font-medium text-sm">মেডিকা ডিরেক্টরি</span>
                </a>
                <span class="text-white/90 font-medium text-xs hidden sm:inline">নির্ভীক হোমিও ডিজিটাল অ্যাপ</span>
            </div>
        </div>
    </header>`;

    // ২. ফুটার টেমপ্লেট (HTML)
    const footerHTML = `
    <footer class="bg-[#002D24] text-teal-300 py-3 mt-auto text-[10px]">
        <div class="max-w-7xl mx-auto px-4 text-center flex flex-col sm:flex-row justify-between items-center gap-1">
            <div><strong class="text-white">নির্ভীক হোমিও</strong> — ডিজিটাল ডিরেক্টরি প্ল্যাটফর্ম</div>
            <div class="opacity-75">© ২০২৬ নির্ভীক হোমিও</div>
        </div>
    </footer>`;

    // ৩. ডমে (DOM) হেডার ও ফুটার ইনজেক্ট করা
    const appHeader = document.getElementById("app-header");
    const appFooter = document.getElementById("app-footer");

    if (appHeader) appHeader.insertAdjacentHTML("afterbegin", headerHTML);
    if (appFooter) appFooter.insertAdjacentHTML("afterbegin", footerHTML);

    // ৪. অ্যাডভান্সড অ্যান্টি-কপি এবং কন্টেন্ট প্রটেকশন সিস্টেম
    
    // সিএসএস (CSS) এর মাধ্যমে টেক্সট সিলেকশন বন্ধ করা
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
    document.body.style.msUserSelect = "none";
    document.body.style.mozUserSelect = "none";

    // মাউসের রাইট-ক্লিক (Context Menu) বন্ধ করা
    document.addEventListener("contextmenu", (e) => e.preventDefault());

    // কিবোর্ড শর্টকাট এবং ডেভেলপার টুলস (F12) লক করা
    document.addEventListener("keydown", (e) => {
        // Ctrl+C, Ctrl+A, Ctrl+U, Ctrl+S, Ctrl+P শর্টকাট ব্লক
        if ((e.ctrlKey || e.metaKey) && ["c", "a", "u", "s", "p"].includes(e.key.toLowerCase())) {
            e.preventDefault();
        }
        // F12 ডেভেলপার টুলস ব্লক
        if (e.keyCode === 123) {
            e.preventDefault();
        }
        // Ctrl+Shift+I (ইন্সপেক্ট এলিমেন্ট) ব্লক
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
            e.preventDefault();
        }
    });

    // ড্র্যাগ অ্যান্ড ড্রপ (Drag and Drop) এর মাধ্যমে টেক্সট বা ইমেজ কপি করা বন্ধ করা
    document.addEventListener("dragstart", (e) => e.preventDefault());
});
