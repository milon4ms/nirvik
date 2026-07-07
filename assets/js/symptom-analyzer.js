/**
 * ============================================
 *   হোমিও রোগী বিশ্লেষণ - কমন ফাংশনালিটি
 *   সব পেজে ব্যবহারের জন্য তৈরি
 *   বাটন ডায়নামিক্যালি তৈরি করা হয়
 * ============================================
 */

// ---------- সেকশন টগল ----------
function toggleSection(element) {
    const group = element.nextElementSibling;
    if (group && group.classList.contains('checkbox-group')) {
        group.classList.toggle('open');
        if (group.classList.contains('open')) {
            group.style.display = 'flex';
        } else {
            group.style.display = 'none';
        }
        element.classList.toggle('collapsed');
    }
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

    let promptText = `আমি একজন অভিজ্ঞ হোমিওপ্যাথিক চিকিৎসক। আমার রোগীর লক্ষণসমূহ বিশ্লেষণ করে তোমাকে দিচ্ছি, তুমি লক্ষণ সমুহ  হোমিওপ্যাথিক রেপার্টরিসমুহে যাচাই করে হোমিওপ্যাথিক নিয়ম নীতি অনুযায়ী সঠিক ঔষধ নির্বাচন করবে। এমন কোনো ঔষধ নির্বাচন করবে  না যা পরস্পরের ক্রিয়া নাশক , শত্রুভাবাপন্ন  বা রোগ বৃদ্ধিকারক।`;

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
তুমি আউটপুট দিবে ২টি অংশে। প্রথম অংশে থাকবে প্রেসক্রিপশন ; দ্বিতীয় অংশে থাকবে চিকিৎসকের জ্ঞাতার্থে নামক অংশ।
প্রেসক্রিপশন ফরম্যাট: রোগীর নাম: ঠিকানা:  বয়স: ফোন নম্বর: তারিখ:(আজকের তারিখ)  ১. প্রধান হোমিওপ্যাথিক ঔষধ: (ঔষধের নাম ও ডোজ) ২. সহায়ক ঔষধ: (ঔষধের নাম ও ডোজ) ৩. বায়োকেমিক:(ঔষধের নাম ও ডোজ) ৪. পরামর্শ: ৫.রোগ লক্ষণ সমুহ: ৬. রোগের সম্ভব্য নাম: ৭. বিকল্প ঔষধ সমুহের তালিকা:
চিকিৎসকের জ্ঞাতার্থে ফরম্যাট:   ৮. বিজ্ঞ চিকিৎসকদের পছন্দের ঔষধ: ৯. এলোপ্যাথিক ঔষধ: ১০. ইউনানি ঔষধ: ১১. রেপার্টরি রুব্রিক তালিকা: ১২. সতর্কতা:  ১৩. প্যাথলজি পরীক্ষা: 
উপরের পয়েন্ট গুলি তৈরিতে নিচের নির্দেশনা লক্ষণীয়-
১. প্রধান হোমিওপ্যাথিক ঔষধ (সবচেয়ে উপযুক্ত একটি ঔষধ যা রোগীর লক্ষণগুলির সাথে রেপার্টরির রুব্রিক গুলির প্রচলিত নিয়ম অনুযায়ী সর্বোচ্চ স্কোর করে)
২. সহায়ক ঔষধ (প্রধান ঔষধের পরে রেপার্টরিতে নিয়ম অনুযায়ী সর্বোচ্চ স্কোর করে এমন একটি ঔষধের নাম যা প্রধান ঔষধের সাথে  ক্রিয়নাশক ও শত্রুভাবাপন্ন নয় )
৩. বায়োকেমিক: (সবচেয়ে উপযুক্ত Biochemic salt এবং Biocombination ট্যাবলেট )
৪. পরামর্শ: এ অংশে রোগীর জন্য অনুমোদিত খাবার,বর্জনীয় খাবার, বিশ্রাম, ব্যায়াম ও জীবনযাপনের সংক্ষিপ্ত পরামর্শ উল্লেখ করবেে
৫.রোগ লক্ষণ সমুহ: ইনপুট দেয়া রোগ লক্ষণ গুলিকে সাজিয়ে সংক্ষেপে উপস্থাপন করিও
৬. রোগের সম্ভব্য নাম: লক্ষণের ভিত্তিতে রোগের নাম কি হতে পারে তা উল্লেখ করিও সংক্ষেপে 
৭. বিকল্প ঔষধ সমুহের তালিকা: লক্ষণের সাথে মিল আছে এমন ৭-৮টি ঔষধের তালিকা। (১ ও ২ নং পয়েন্টে সিলেক্ট করা ঔষধ দুটি থাকবে প্রথমে। পাশে ব্রাকেট কেন নির্বাচন করা হল সংক্ষেপে সেই লক্ষণগুলি থাকবে। এই তালিকার কোনো ঔষধ যদি পরস্পরের ক্রিয়া নাশক বা শত্রু হয়, তাহলে স্পষ্ট সতর্কতা দিও)
৮. ঔষধের সংক্ষিপ্ত লক্ষণ:অনলাইন অফলাইনে এই রোগের ক্ষেত্রে বিজ্ঞ চিকিৎসক গণ কি মেডিসিন দিয়েছেন এমন একটি তালিকা
৯. এলোপ্যাথিক ঔষধ: এই রোগ লক্ষণ গুলির ক্ষেত্রে কী কী এলোপ্যাথিক ঔষধ সিলেক্ট করা হয় ডোজ সহ উল্লেখ করে দাও।
১০. ইউনানি ঔষধ: এই রোগ লক্ষণ গুলির ক্ষেত্রে কী কী ইউনানি ও আয়ুর্বেদ ঔষধ সিলেক্ট করা হয় নাম দাও।
১১. রেপার্টরি রুব্রিক তালিকা: লক্ষণ গুলি রেপাটরির কোন অংগে কোন অংশে খুজে পেলে তা সংক্ষেপে লিষ্ট আকারে দেখাও
১২. সতর্কতা: লক্ষণ গুলি যদি রোগীর স্বাস্থ্যে জরুরী অবস্থা, খুব খারাপ অবস্থা, বা বিশেষজ্ঞ চিকিৎসকের নিকট যাওয়ার অবস্থা নির্দেশ করে তাহলে সতর্কতা দিও।
১৩. প্যাথলজি পরীক্ষা:  এই রোগে যে সকল প্যাথলজি পরীক্ষা দেয়া হয় তার নাম
১৪.  প্রেসক্রিপশন অংশটি একটি Markdown Code Block-এর মধ্যে থাকবে তবে কোনো Markdown Syntax থাকবেনা,তবে একটি copy বাটন থাকবে`;

    return promptText;
}

// ---------- ফলাফল দেখানো ----------
function displayResult() {
    const resultDiv = document.getElementById('result');
    if (!resultDiv) return;
    
    const promptText = generateSymptomPrompt();
    resultDiv.innerHTML = `<h5>📋 রোগী বিশ্লেষণ প্রম্পট</h5><p style="white-space:pre-wrap;">${promptText}</p>`;
}

// ---------- রেজাল্ট টেক্সট নেওয়া (কমন ফাংশন) ----------
function getResultText() {
    const resultDiv = document.getElementById('result');
    if (!resultDiv) {
        alert('⚠️ ফলাফল বক্স পাওয়া যায়নি!');
        return null;
    }
    const text = resultDiv.innerText;
    if (!text || text.trim() === '') {
        alert('⚠️ প্রথমে "জেনারেট করুন" বাটনে ক্লিক করে প্রম্পট তৈরি করুন।');
        return null;
    }
    return text;
}

// ---------- প্রম্পট কপি ----------
function copyResult() {
    const text = getResultText();
    if (!text) return;

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

// ============================================================
// AI টুলস ফাংশন (প্রতিটি AI প্ল্যাটফর্মে প্রম্পট পাঠানো)
// ============================================================

// ---------- Gemini (শুধু চ্যাট পেজ) ----------
function openGemini() {
    window.open('https://gemini.google.com/', '_blank');
}

// ---------- ChatGPT (শুধু চ্যাট পেজ) ----------
function openChatGPT() {
    window.open('https://chat.openai.com/', '_blank');
}

// ---------- Grok (শুধু চ্যাট পেজ) ----------
function openGrok() {
    window.open('https://grok.com/', '_blank');
}

// ---------- DeepSeek (শুধু চ্যাট পেজ) ----------
function openDeepSeek() {
    window.open('https://chat.deepseek.com/', '_blank');
}

// ---------- Perplexity (শুধু লিংক) ----------
function openPerplexity() {
    window.open('https://www.perplexity.ai/', '_blank');
}

// ============================================================
// বাটন ডায়নামিক্যালি তৈরি করা
// ============================================================
function createButtons() {
    const container = document.getElementById('button-container');
    if (!container) {
        console.warn('⚠️ button-container পাওয়া যায়নি!');
        return;
    }

    // বাটনের ডেটা (প্রেসক্রিপশন বাটন বাদ, Perplexity শুধু লিংক)
    const buttons = [
        { id: 'generateBtn', class: 'btn btn-primary', icon: '📋', text: 'জেনারেট করুন', type: 'submit' },
        { id: 'copyPromptBtn', class: 'btn btn-copy', icon: '📋', text: 'প্রম্পট কপি', type: 'button', action: copyResult },
        { id: 'geminiBtn', class: 'btn btn-gemini', icon: '🌟', text: 'Gemini', type: 'button', action: openGemini },
        { id: 'chatgptBtn', class: 'btn btn-chatgpt', icon: '🤖', text: 'ChatGPT', type: 'button', action: openChatGPT },
        { id: 'grokBtn', class: 'btn btn-grok', icon: '⚡', text: 'Grok', type: 'button', action: openGrok },
        { id: 'deepseekBtn', class: 'btn btn-deepseek', icon: '🔍', text: 'DeepSeek', type: 'button', action: openDeepSeek },
        { id: 'perplexityBtn', class: 'btn btn-perplexity', icon: '🔬', text: 'Perplexity', type: 'button', action: openPerplexity }
    ];

    // বাটন গ্রুপ ডিভ তৈরি
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';
    buttonGroup.id = 'dynamicButtonGroup';

    // প্রতিটি বাটন তৈরি
    buttons.forEach(btnData => {
        const btn = document.createElement('button');
        btn.id = btnData.id;
        btn.className = btnData.class;
        btn.type = btnData.type || 'button';
        btn.innerHTML = `${btnData.icon} ${btnData.text}`;
        
        // submit বাটনের জন্য আলাদা ইভেন্ট
        if (btnData.type === 'submit') {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                displayResult();
            });
        } else if (btnData.action) {
            btn.addEventListener('click', btnData.action);
        }
        
        buttonGroup.appendChild(btn);
    });

    container.appendChild(buttonGroup);
}

// ============================================================
// DOM রেডি হলে সব সেটআপ
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    // ডিফল্ট: সব চেকবক্স গ্রুপ বন্ধ
    document.querySelectorAll('.checkbox-group').forEach(group => {
        group.style.display = 'none';
        group.classList.remove('open');
    });

    document.querySelectorAll('.section-content').forEach(content => {
        content.style.display = 'none';
    });

    // ফর্ম সাবমিট (যদি ফর্ম থাকে)
    const form = document.getElementById('symptomForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            displayResult();
        });
    }

    // বাটন তৈরি করা
    createButtons();

    console.log('✅ Symptom Analyzer লোড হয়েছে! (বাটন ডায়নামিক্যালি তৈরি)');
});
