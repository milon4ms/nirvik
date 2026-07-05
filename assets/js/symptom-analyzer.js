/**
 * ============================================
 * হোমিও রোগী বিশ্লেষণ - কমন ফাংশনালিটি
 * সংশোধিত সংস্করণ
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

// ---------- প্রম্পট জেনারেট ----------
function generateSymptomPrompt() {
    const patientInfo = document.querySelector('textarea[name="pationtinfo"]')?.value || '';
    const diseaseDesc = document.querySelector('textarea[name="diseaseDescription"]')?.value || '';

    let promptText = `আমি একজন অভিজ্ঞ হোমিওপ্যাথিক চিকিৎসক। আমার রোগীর লক্ষণসমূহ বিশ্লেষণ করে তোমাকে দিচ্ছি, তুমি লক্ষণ সমুহ হোমিওপ্যাথিক রেপার্টরিসমুহে যাচাই করে হোমিওপ্যাথিক নিয়ম নীতি অনুযায়ী সঠিক ঔষধ নির্বাচন করবে। এমন কোনো ঔষধ নির্বাচন করবেন না যা পরস্পরের ক্রিয়া নাশক (Antidote), শত্রুভাবাপন্ন (Inimical) বা রোগ বৃদ্ধিকারক।`;

    let symptoms = '';
    if (diseaseDesc) symptoms += `রোগের বর্ণনা: ${diseaseDesc}\n`;
    if (patientInfo) symptoms += `রোগীর তথ্য: ${patientInfo}\n`;

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
        if (values) symptoms += `${item.label}: ${values}\n`;
    });

    promptText += symptoms ? `\nরোগীর লক্ষণসমূহ:\n${symptoms}` : `\nরোগীর লক্ষণসমূহ: (কোনো লক্ষণ সিলেক্ট করা হয়নি)\n`;

    promptText += `\nনির্দেশনা: প্রেসক্রিপশনটি সুন্দরভাবে ফরম্যাট করে দিন... (আপনার আগের টেক্সট)`;
    return promptText;
}

// ---------- ফলাফল দেখানো ও কপি ফাংশন ----------
function displayResult() {
    const resultDiv = document.getElementById('result');
    if (!resultDiv) return;
    const promptText = generateSymptomPrompt();
    resultDiv.innerHTML = `<h5>📋 রোগী বিশ্লেষণ প্রম্পট</h5><p style="white-space:pre-wrap;">${promptText}</p>`;
}

function getResultText() {
    const resultDiv = document.getElementById('result');
    if (!resultDiv || resultDiv.innerText.trim() === '') {
        alert('⚠️ প্রথমে "জেনারেট করুন" বাটনে ক্লিক করে প্রম্পট তৈরি করুন।');
        return null;
    }
    return resultDiv.innerText;
}

function copyResult() {
    const text = getResultText();
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => alert('✅ কপি হয়েছে!')).catch(() => fallbackCopy(text));
}

function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('✅ কপি হয়েছে!');
}

// ---------- AI টুলস ফাংশন ----------
function openGemini() { window.open('https://gemini.google.com/', '_blank'); }
function openChatGPT() { window.open('https://chat.openai.com/', '_blank'); }
function openGrok() { window.open('https://grok.com/', '_blank'); }
function openDeepSeek() { window.open('https://chat.deepseek.com/', '_blank'); }
function openPerplexity() { window.open('https://www.perplexity.ai', '_blank'); }

// ---------- বাটন তৈরি ----------
function createButtons() {
    const container = document.getElementById('button-container');
    if (!container) return;

    const buttons = [
        { id: 'generateBtn', class: 'btn btn-primary', icon: '📋', text: 'জেনারেট করুন', type: 'submit' },
        { id: 'copyPromptBtn', class: 'btn btn-copy', icon: '📋', text: 'প্রম্পট কপি', type: 'button', action: copyResult },
        { id: 'geminiBtn', class: 'btn btn-gemini', icon: '🌟', text: 'Gemini', type: 'button', action: openGemini },
        { id: 'chatgptBtn', class: 'btn btn-chatgpt', icon: '🤖', text: 'ChatGPT', type: 'button', action: openChatGPT },
        { id: 'grokBtn', class: 'btn btn-grok', icon: '⚡', text: 'Grok', type: 'button', action: openGrok },
        { id: 'deepseekBtn', class: 'btn btn-deepseek', icon: '🔍', text: 'DeepSeek', type: 'button', action: openDeepSeek },
        { id: 'perplexitybtn', class: 'btn btn-perplexity', icon: '🔬', text: 'Perplexity', type: 'button', action: openPerplexity }
    ];

    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';
    
    buttons.forEach(btnData => {
        const btn = document.createElement('button');
        btn.id = btnData.id;
        btn.className = btnData.class;
        btn.innerHTML = `${btnData.icon} ${btnData.text}`;
        btn.addEventListener('click', (e) => {
            if (btnData.type === 'submit') e.preventDefault();
            btnData.action ? btnData.action() : displayResult();
        });
        buttonGroup.appendChild(btn);
    });
    container.appendChild(buttonGroup);
}

document.addEventListener('DOMContentLoaded', createButtons);
