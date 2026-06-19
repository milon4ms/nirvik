/**
 * ============================================
 *   হোমিও রোগী বিশ্লেষণ - কমন ফাংশনালিটি
 *   সব পেজে ব্যবহারের জন্য তৈরি
 *   চেকবক্স গ্রুপ ডিফল্ট বন্ধ (ক্লিক করলে খোলে)
 * ============================================
 */

// ---------- সেকশন টগল (চেকবক্স গ্রুপ খোলা/বন্ধ) ----------
function toggleSection(element) {
    const group = element.nextElementSibling;
    if (group && group.classList.contains('checkbox-group')) {
        // টগল ক্লাস
        group.classList.toggle('open');
        // স্টাইল পরিবর্তন
        if (group.classList.contains('open')) {
            group.style.display = 'flex';
        } else {
            group.style.display = 'none';
        }
        element.classList.toggle('collapsed');
    }
    // textarea এর জন্য
    if (group && group.classList.contains('section-content')) {
        if (group.style.display === 'none' || group.style.display === '') {
            group.style.display = 'block';
        } else {
            group.style.display = 'none';
        }
    }
}

// ---------- চেকবক্স থেকে ভ্যালু নেওয়া ----------
function getCheckedValues(name) {
    const checked = document.querySelectorAll('input[name="' + name + '"]:checked');
    return Array.from(checked).map(cb => cb.value).join(', ');
}

// ---------- প্রম্পট জেনারেট ----------
function generateSymptomPrompt() {
    const patientInfo = document.querySelector('textarea[name="pationtinfo"]')?.value || '';
    const diseaseDesc = document.querySelector('textarea[name="diseaseDescription"]')?.value || '';

    let promptText = `আমি একজন অভিজ্ঞ হোমিওপ্যাথিক চিকিৎসক। আমার রোগীর লক্ষণসমূহ বিশ্লেষণ করে তোমাকে দিচ্ছি, তুমি লক্ষণ যাচাই করে হোমিওপ্যাথিক রেপার্টরি (Boericke, Kent, Allen, Phatak, Murphy ইত্যাদি) এবং ম্যাটেরিয়া মেডিকা অনুসারে সঠিক ঔষধ নির্বাচন করবেন। এমন কোনো ঔষধ নির্বাচন করবেন না যা পরস্পরের ক্রিয়া নাশক (Antidote), শত্রুভাবাপন্ন (Inimical) বা রোগ বৃদ্ধিকারক।`;

    let symptoms = '';

    if (diseaseDesc) {
        symptoms += `রোগের বর্ণনা: ${diseaseDesc}\n`;
    }

    if (patientInfo) {
        symptoms += `রোগীর তথ্য: ${patientInfo}\n`;
    }

    const checkboxNames = [
        { name: 'startedWhen', label: 'রোগ শুরুর সময়কাল' },
        { name: 'aggravationFactors', label: 'রোগ বৃদ্ধির কারণ ও সময়' },
        { name: 'aggravationdeasis', label: 'রোগ উপশমের কারণ ও সময়' },
        { name: 'diseaseSelection', label: 'রোগীর অন্যান্য রোগ' },
        { name: 'olddisease', label: 'অতীতের বড় রোগ' },
        { name: 'relativesdisease', label: 'আত্মীয়দের রোগ' },
        { name: 'diseaseLocationSpread', label: 'রোগের অবস্থান' },
        { name: 'tongue', label: 'পিপাসা, জিহবা ও মুখের লক্ষণ' },
        { name: 'sweat', label: 'ঘাম সম্পর্কিত লক্ষণ' },
        { name: 'sleep', label: 'ঘুম সম্পর্কিত লক্ষণ' },
        { name: 'stomach', label: 'পাকস্থলি সম্পর্কিত লক্ষণ' },
        { name: 'food', label: 'খাবার সম্পর্কিত লক্ষণ' },
        { name: 'stool', label: 'পায়খানা সম্পর্কিত লক্ষণ' },
        { name: 'urine', label: 'প্রসাব সম্পর্কিত লক্ষণ' },
        { name: 'anger', label: 'রাগ সম্পর্কিত লক্ষণ' },
        { name: 'stress', label: 'টেনশন সম্পর্কিত লক্ষণ' },
        { name: 'fear', label: 'ভয় সম্পর্কিত লক্ষণ' },
        { name: 'dreams', label: 'স্বপ্ন সম্পর্কিত লক্ষণ' },
        { name: 'memoryspeech', label: 'স্মৃতি ও কথা বলার ভংগিমা' },
        { name: 'bathtemperaturesocial', label: 'গোসল, তাপমাত্রা ও সামাজিক' },
        { name: 'body_type', label: 'লিঙ্গ, শারীরিক গঠন ও মায়াজম' }
    ];

    checkboxNames.forEach(item => {
        const values = getCheckedValues(item.name);
        if (values) {
            symptoms += `${item.label}: ${values}\n`;
        }
    });

    if (symptoms) {
        promptText += `রোগীর লক্ষণসমূহ:\n${symptoms}\n\n`;
    } else {
        promptText += `রোগীর লক্ষণসমূহ: (কোনো লক্ষণ সিলেক্ট করা হয়নি)\n\n`;
    }

    promptText += `নির্দেশনা:
রোগীর লক্ষণসমূহ বিস্তারিতভাবে যাচাই করে নিম্নোক্ত কাঠামোয় একটি প্রেসক্রিপশন তৈরি করুন। প্রেসক্রিপশন এর ভিতরে ঔষধ সিলেকশনের কারন লিখ না।
প্রেসক্রিপশন ফরম্যাট: সুন্দরভাবে ফরম্যাট করা প্রেসক্রিপশন দিন যা চিকিৎসক গণ ব্যবহার করেন প্রায়শই। এটি যেন সরাসরি কপি-পেস্ট করে ব্যবহার করা যায়। প্রেসক্রিপশনে থাকবে:
তারিখ রোগীর নাম বয়স ফোন নম্বর ঠিকানা চিকিৎসকের নাম ঠিকানা যোগাযোগ (AI এর পূর্বজ্ঞান অনুসারে, জানা না থাকলে দেয়ার দরকার নাই)
রোগীর লক্ষণসমূহ সংক্ষেপে উল্লেখ করবে এবং রোগটির সম্ভব্য নাম উল্লেখ করবে (১/২ টি)
ঔষধ ও ডোজ
১. প্রধান হোমিওপ্যাথিক ঔষধ (সবচেয়ে উপযুক্ত একটি ঔষধ যা রোগীর লক্ষণগুলির সাথে রেপার্টরির রুব্রিক গুলির প্রচলিত নিয়ম অনুযায়ী স্কোর করে। ডোজ সহ উল্লেখ করবে)
২. সহায়ক ঔষধ (প্রধান ঔষধের সাথে সামঞ্জস্যপূর্ণ একটি ঔষধ যা প্রধান ঔষধের পরে রেপার্টরিতে নিয়ম অনুযায়ী সর্বোচ্চ স্কোর করে। ডোজ সহ উল্লেখ করবে)
৩. বায়োকেমিক ও বায়োকম্বিনেশন (সবচেয়ে উপযুক্ত Biochemic salt এবং Biocombination ট্যাবলেট। ডোজ সহ উল্লেখ করবে)
৪.অনুমোদিত খাবার। বর্জনীয় খাবার। বিশ্রাম, ব্যায়াম ও জীবনযাপনের পরামর্শ উল্লেখ করবে।
প্রসক্রিপশন তৈরির পরে চিকিৎসকের জন্য অতিরিক্ত পরামর্শ দিবে নিম্নের ফরমেটে
১) প্রধান হোমিওপ্যাথিক ঔষধ সহায়ক ঔষধ বায়োকেমিক ও বায়োকম্বিনেশন কেন নির্বাচন করা হলো তার সংক্ষিপ্ত ধারনা
২) বিকল্প হোমিওপ্যাথিক ঔষধ- (লক্ষণের সাথে মিল আছে এমন ৬-৭টি ঔষধের তালিকা। যদি কোনো ঔষধ পরস্পরের ক্রিয়া নাশক বা শত্রু হয়, তাহলে স্পষ্ট সতর্কতা দিন।)
৩) এলোপ্যাথি ও ইউনানি চিকিৎসা (সংক্ষেপে) এই রোগে সাধারণত ব্যবহৃত এলোপ্যাথিক ও ইউনানি ঔষধের নাম, প্রাপ্তবয়স্কদের জন্য সাধারণ ডোজ।
৪) সতর্কতা-যদি লক্ষণগুলো গুরুতর বা জরুরি অবস্থার ইঙ্গিত দেয়, তাহলে অবশ্যই চিকিৎসকের শরণাপন্ন হওয়ার সতর্কবাণী দিন।
৫) এই রোগে যে সকল প্যাথলজি পরীক্ষা দেয়া হয় তার নাম`;

    return promptText;
}

// ---------- ফলাফল দেখানো ----------
function displayResult() {
    const resultDiv = document.getElementById('result');
    if (!resultDiv) return;
    
    const promptText = generateSymptomPrompt();
    resultDiv.innerHTML = `<h5>📋 রোগী বিশ্লেষণ প্রম্পট</h5><p style="white-space:pre-wrap;">${promptText}</p>`;
}

// ---------- কপি ফাংশন ----------
function copyResult() {
    const resultDiv = document.getElementById('result');
    if (!resultDiv) {
        alert('⚠️ ফলাফল বক্স পাওয়া যায়নি!');
        return;
    }
    
    const text = resultDiv.innerText;
    if (!text || text.trim() === '') {
        alert('⚠️ কপি করার জন্য কোনো টেক্সট নেই! প্রথমে "জেনারেট করুন" বাটনে ক্লিক করুন।');
        return;
    }

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
            .then(() => alert('✅ কপি হয়েছে!'))
            .catch(() => fallbackCopy(text));
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        alert('✅ কপি হয়েছে!');
    } catch (err) {
        alert('❌ কপি করা সম্ভব হয়নি। ম্যানুয়ালি কপি করুন।');
    }
    document.body.removeChild(textArea);
}

// ---------- এনালাইসিস (Perplexity AI) ----------
function openAnalysis() {
    const resultDiv = document.getElementById('result');
    if (!resultDiv) {
        alert('⚠️ ফলাফল বক্স পাওয়া যায়নি!');
        return;
    }
    
    const text = resultDiv.innerText;
    if (!text || text.trim() === '') {
        alert('⚠️ প্রথমে "জেনারেট করুন" বাটনে ক্লিক করে প্রম্পট তৈরি করুন।');
        return;
    }
    const encoded = encodeURIComponent(text);
    window.open('https://www.perplexity.ai/?q=' + encoded, '_blank');
}

// ---------- প্রেসক্রিপশন (Google Keep) ----------
function openPrescription() {
    const resultDiv = document.getElementById('result');
    if (!resultDiv) {
        alert('⚠️ ফলাফল বক্স পাওয়া যায়নি!');
        return;
    }
    
    const text = resultDiv.innerText;
    if (!text || text.trim() === '') {
        alert('⚠️ প্রথমে "জেনারেট করুন" বাটনে ক্লিক করে প্রম্পট তৈরি করুন।');
        return;
    }
    const encoded = encodeURIComponent(text);
    window.open('https://keep.google.com/#NEW/' + encoded, '_blank');
}

// ---------- DOM রেডি হলে সব ইভেন্ট সেটআপ ----------
document.addEventListener('DOMContentLoaded', function() {
    // ===== চেকবক্স গ্রুপ ডিফল্ট বন্ধ =====
    document.querySelectorAll('.checkbox-group').forEach(group => {
        group.style.display = 'none';  // ডিফল্ট বন্ধ
        group.classList.remove('open');
    });

    // ===== section-content ডিফল্ট বন্ধ (textarea) =====
    document.querySelectorAll('.section-content').forEach(content => {
        content.style.display = 'none';
    });

    // ===== ফর্ম সাবমিট =====
    const form = document.getElementById('symptomForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            displayResult();
        });
    }

    // ===== কপি বাটন =====
    const copyBtn = document.getElementById('copyPromptBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyResult);
    }

    // ===== এনালাইসিস বাটন =====
    const analysisBtn = document.getElementById('analysisBtn');
    if (analysisBtn) {
        analysisBtn.addEventListener('click', openAnalysis);
    }

    // ===== প্রেসক্রিপশন বাটন =====
    const prescriptionBtn = document.getElementById('prescriptionBtn');
    if (prescriptionBtn) {
        prescriptionBtn.addEventListener('click', openPrescription);
    }

    // ===== গ্লোবাল ফাংশন এক্সপোজ =====
    window.HomoeoCommon = {
        toggleSection: toggleSection,
        getCheckedValues: getCheckedValues,
        generateSymptomPrompt: generateSymptomPrompt,
        displayResult: displayResult,
        copyResult: copyResult,
        openAnalysis: openAnalysis,
        openPrescription: openPrescription
    };

    console.log('✅ Symptom Analyzer লোড হয়েছে! চেকবক্স গ্রুপ ডিফল্ট বন্ধ।');
});