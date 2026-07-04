/**
 * ============================================
 * হোমিও রোগী বিশ্লেষণ - সংশোধিত কোড
 * ============================================
 */

// ---------- সেকশন টগল ----------
function toggleSection(element) {
    const group = element.nextElementSibling;
    if (group && group.classList.contains('checkbox-group')) {
        group.classList.toggle('open');
        group.style.display = group.classList.contains('open') ? 'flex' : 'none';
        element.classList.toggle('collapsed');
    }
    if (group && group.classList.contains('section-content')) {
        group.style.display = (group.style.display === 'none' || group.style.display === '') ? 'block' : 'none';
    }
}

// ---------- চেকবক্স থেকে ভ্যালু নেওয়া ----------
function getCheckedValues(name) {
    const checked = document.querySelectorAll('input[name="' + name + '"]:checked');
    return Array.from(checked).map(cb => cb.value).join(', ');
}

// ---------- প্রম্পট জেনারেট (আপডেটেড) ----------
function generateSymptomPrompt() {
    const today = new Date().toLocaleDateString('bn-BD');

    let promptText = `আমি একজন অভিজ্ঞ হোমিওপ্যাথিক চিকিৎসক। আমার রোগীর লক্ষণসমূহ বিশ্লেষণ করে তোমাকে দিচ্ছি, তুমি লক্ষণ সমুহ হোমিওপ্যাথিক রেপার্টরিসমুহে যাচাই করে হোমিওপ্যাথিক নিয়ম নীতি অনুযায়ী সঠিক ঔষধ নির্বাচন করবে। এমন কোনো ঔষধ নির্বাচন করবে না যা পরস্পরের ক্রিয়া নাশক , শত্রুভাবাপন্ন বা রোগ বৃদ্ধিকারক।

তুমি আউটপুট দিবে ২টি অংশে। প্রথম অংশে থাকবে প্রেসক্রিপশন ; দ্বিতীয় অংশে থাকবে চিকিৎসকের জ্ঞাতার্থে নামক অংশ।

[প্রেসক্রিপশন অংশ শুরু]
রোগীর নাম: 
ঠিকানা: 
বয়স: 
ফোন নম্বর: 
তারিখ: ${today} 
১. প্রধান হোমিওপ্যাথিক ঔষধ: (ঔষধের নাম ও ডোজ) 
২. সহায়ক ঔষধ: (ঔষধের নাম ও ডোজ) 
৩. বায়োকেমিক:(ঔষধের নাম ও ডোজ) 
৪. পরামর্শ: 
৫.রোগ লক্ষণ সমুহ: 
৬. রোগের সম্ভব্য নাম: 
[প্রেসক্রিপশন অংশ শেষ]

চিকিৎসকের জ্ঞাতার্থে ফরম্যাট: 
৭. বিকল্প ঔষধ সমুহের তালিকা 
৮. ঔষধের সংক্ষিপ্ত লক্ষণ: 
৯. এলোপ্যাথিক ঔষধ: 
১০. ইউনানি ঔষধ: 
১১. রেপার্টরি রুব্রিক তালিকা: 
১২. সতর্কতা: 
১৩. প্যাথলজি পরীক্ষা: (এই রোগে যে সকল প্যাথলজি পরীক্ষা দেয়া হয় তার নাম উল্লেখ করবে)

উপরের পয়েন্ট গুলি তৈরিতে নিচের নির্দেশনা লক্ষণীয়-
১. প্রধান হোমিওপ্যাথিক ঔষধ (সবচেয়ে উপযুক্ত একটি ঔষধ যা রোগীর লক্ষণগুলির সাথে রেপার্টরির রুব্রিক গুলির প্রচলিত নিয়ম অনুযায়ী সর্বোচ্চ স্কোর করে)
২. সহায়ক ঔষধ (প্রধান ঔষধের পরে রেপার্টরিতে নিয়ম অনুযায়ী সর্বোচ্চ স্কোর করে এমন একটি ঔষধের নাম যা প্রধান ঔষধের সাথে ক্রিয়নাশক ও শত্রুভাবাপন্ন নয় )
৩. বায়োকেমিক: (সবচেয়ে উপযুক্ত Biochemic salt এবং Biocombination ট্যাবলেট )
৪. পরামর্শ: এ অংশে রোগীর জন্য অনুমোদিত খাবার,বর্জনীয় খাবার, বিশ্রাম, ব্যায়াম ও জীবনযাপনের সংক্ষিপ্ত পরামর্শ উল্লেখ করবে।
৫.রোগ লক্ষণ সমুহ: ইনপুট দেয়া রোগ লক্ষণ গুলিকে সাজিয়ে সংক্ষেপে উপস্থাপন করিও।
৬. রোগের সম্ভব্য নাম: লক্ষণের ভিত্তিতে রোগের নাম কি হতে পারে তা উল্লেখ করিও সংক্ষেপে।
৭. বিকল্প ঔষধ সমুহের তালিকা: লক্ষণের সাথে মিল আছে এমন ৬-৭টি ঔষধের তালিকা। (এই তালিকার কোনো ঔষধ যদি পরস্পরের ক্রিয়া নাশক বা শত্রু হয়, তাহলে স্পষ্ট সতর্কতা দিও)।
৮. ঔষধের সংক্ষিপ্ত লক্ষণ: ১, ২, ৩, ৭ নং পয়েন্টে যে সকল ঔষধ এর নাম এসেছে তাদেরকে কেন সিলেক্ট করা হয়েছে তার সংক্ষেপে বিবরণ অর্থাৎ রোগলক্ষণের সাথে সম্পর্ক।
৯. এলোপ্যাথিক ঔষধ: এই রোগ লক্ষণ গুলির ক্ষেত্রে কী কী এলোপ্যাথিক ঔষধ সিলেক্ট করা হয় ডোজ সহ উল্লেখ করে দাও।
১০. ইউনানি ঔষধ: এই রোগ লক্ষণ গুলির ক্ষেত্রে কী কী ইউনানি ও আয়ুর্বেদ ঔষধ সিলেক্ট করা হয় নাম দাও।
১১. রেপার্টরি রুব্রিক তালিকা: লক্ষণ গুলি রেপার্টরির কোন অংগে কোন অংশে খুঁজে পেলে তা সংক্ষেপে লিস্ট আকারে দেখাও।
১২. সতর্কতা: লক্ষণ গুলি যদি রোগীর স্বাস্থ্যে জরুরী অবস্থা, খুব খারাপ অবস্থা, বা বিশেষজ্ঞ চিকিৎসকের নিকট যাওয়ার অবস্থা নির্দেশ করে তাহলে সতর্কতা দিও।
১৩. প্যাথলজি পরীক্ষা: এই রোগে যে সকল প্যাথলজি পরীক্ষা দেয়া হয় তার নাম।\n\n`;

    const checkboxNames = [
        { name: 'startedWhen', label: 'রোগ শুরুর সময়কাল' },
        { name: 'aggravationFactors', label: 'রোগ বৃদ্ধির কারণ ও সময়' },
        { name: 'aggravationdeasis', label: 'রোগ উপশমের কারণ ও সময়' },
        { name: 'diseaseSelection', label: 'রোগীর অন্যান্য রোগ' },
        { name: 'olddisease', label: 'অতীতের বড় রোগ' },
        { name: 'relativesdisease', label: 'আত্মীয়দের রোগ' },
        { name: 'diseaseLocationSpread', label: 'রোগের অবস্থান' },
        { name: 'tongue', label: 'পিপাসা, জিহবা ও মুখের লক্ষণ' },
        { name: 'sweat', label: 'ঘাম সম্পর্কিত লক্ষণ' },
        { name: 'sleep', label: 'ঘুম সম্পর্কিত লক্ষণ' },
        { name: 'stomach', label: 'পাকস্থলি সম্পর্কিত লক্ষণ' },
        { name: 'food', label: 'খাবার সম্পর্কিত লক্ষণ' },
        { name: 'stool', label: 'পায়খানা সম্পর্কিত লক্ষণ' },
        { name: 'urine', label: 'প্রসাব সম্পর্কিত লক্ষণ' },
        { name: 'anger', label: 'রাগ সম্পর্কিত লক্ষণ' },
        { name: 'stress', label: 'টেনশন সম্পর্কিত লক্ষণ' },
        { name: 'fear', label: 'ভয় সম্পর্কিত লক্ষণ' },
        { name: 'dreams', label: 'স্বপ্ন সম্পর্কিত লক্ষণ' },
        { name: 'memoryspeech', label: 'স্মৃতি ও কথা বলার ভংগিমা' },
        { name: 'bathtemperaturesocial', label: 'গোসল, তাপমাত্রা ও সামাজিক' },
        { name: 'body_type', label: 'লিঙ্গ, শারীরিক গঠন ও মায়াজম' }
    ];

    checkboxNames.forEach(item => {
        const values = getCheckedValues(item.name);
        if (values) promptText += `${item.label}: ${values}\n`;
    });

    return promptText;
}

// ---------- ফলাফল ও বাটন হ্যান্ডলার ----------
function displayResult() {
    const resultDiv = document.getElementById('result');
    if (!resultDiv) return;
    resultDiv.innerHTML = `<h5>📋 রোগী বিশ্লেষণ প্রম্পট</h5><p style="white-space:pre-wrap;">${generateSymptomPrompt()}</p>`;
}

function getResultText() {
    const resultDiv = document.getElementById('result');
    return resultDiv ? resultDiv.innerText : null;
}

function copyResult() {
    const text = getResultText();
    if (text) navigator.clipboard.writeText(text).then(() => alert('✅ প্রম্পট কপি হয়েছে!'));
}

function openPerplexity() {
    const text = getResultText();
    if (text) window.open('https://www.perplexity.ai/?q=' + encodeURIComponent(text), '_blank');
}

// ---------- বাটন ডায়নামিক্যালি তৈরি ----------
function createButtons() {
    const container = document.getElementById('button-container');
    if (!container) return;

    const buttons = [
        { id: 'generateBtn', class: 'btn btn-primary', icon: '📋', text: 'জেনারেট করুন', type: 'submit' },
        { id: 'copyBtn', class: 'btn btn-copy', icon: '📝', text: 'কপি করুন', type: 'button', action: copyResult },
        { id: 'perplexityBtn', class: 'btn btn-perplexity', icon: '🔬', text: 'Perplexity', type: 'button', action: openPerplexity },
        { id: 'geminiBtn', class: 'btn btn-gemini', icon: '🌟', text: 'Gemini', type: 'button', action: () => window.open('https://gemini.google.com/', '_blank') }
    ];

    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';
    buttons.forEach(btnData => {
        const btn = document.createElement('button');
        btn.innerHTML = `${btnData.icon} ${btnData.text}`;
        btn.onclick = (btnData.type === 'submit') ? (e) => { e.preventDefault(); displayResult(); } : btnData.action;
        buttonGroup.appendChild(btn);
    });
    container.appendChild(buttonGroup);
}

document.addEventListener('DOMContentLoaded', createButtons);
