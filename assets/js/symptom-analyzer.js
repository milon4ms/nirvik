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

    let promptText = `I am a Homeopathic Physician. Analyze the patient's symptoms and select the most appropriate remedies using Boericke, Kent, Allen, Phatak, and Murphy repertories and Materia Medica. Ensure the remedies are neither Antidotes nor Inimical to each other.`;

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
রGenerate a ready-to-use Prescription in the following format (Do not include selection logic inside the prescription):

[Prescription Format]

Header: Date, Patient Name, Age, Phone, Address, Doctor's Name & Chamber Address (Md Ashaduzzaman Milon, Kurigram).

Chief Complaints: Brief symptoms and 1-2 tentative diagnoses.

Rx (Remedies & Dosage): 1. Primary Homeopathic Remedy (Highest repertorial scoring).
2. Complementary Remedy (Compatible with the primary remedy).
3. Biochemic & Biocombination remedies.

Advice: Allowed/restricted foods, lifestyle, and rest guidelines.

[Additional Analysis for the Physician (Outside Prescription)]

Prescription Rationale: Brief justification for the selected remedies.

Differential Remedies: A list of 6-7 alternative remedies (with clear Antidote/Inimical warnings).

Allopathic & Unani Management: Common Allopathic and Unani medicines used for this condition with adult dosages (briefly).

Red Flags & Cautions: Warning signs that require immediate emergency care.

Investigations: Recommended pathological/diagnostic tests for this condition.`;

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
