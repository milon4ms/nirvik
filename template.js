/**
 * Nirvik Homeo System - Master Template & Logic
 * Designed for Mobile & PC (Responsive)
 */

function loadDoctorTemplate(symptomsList = []) {
    const app = document.getElementById('app');
    if (!app) return;

    // ১. চিকন ও মোবাইল-বান্ধব হেডার
    const header = `
        <header style="background: #1e293b; color: #fff; padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="font-weight: bold; font-size: 1.05rem; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
                <span>🩺</span> Nirvik Homeo
            </div>
            <div style="font-size: 0.8rem; color: #94a3b8; background: #334155; padding: 3px 8px; border-radius: 4px;">Physician Panel</div>
        </header>
    `;

    // ২. মেইন কন্টেন্ট এরিয়া (লক্ষণ এবং কন্ট্রোল বাটন সমূহ)
    let symptomsHTML = '';
    symptomsList.forEach((symptom, index) => {
        symptomsHTML += `
            <label style="display: flex; align-items: center; margin-bottom: 10px; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; cursor: pointer; font-size: 0.95rem; transition: background 0.2s;">
                <input type="checkbox" class="symptom-checkbox" value="${symptom}" style="margin-right: 12px; transform: scale(1.2); accent-color: #0ea5e9;">
                <span style="color: #334155; line-height: 1.4;">${symptom}</span>
            </label>
        `;
    });

    const mainContent = `
        <main style="max-width: 550px; margin: 20px auto; padding: 15px; background: #fff; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); box-sizing: border-box;">
            
            <h3 style="color: #1e293b; margin-top: 0; margin-bottom: 15px; font-size: 1.1rem; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">📋 রোগীর রোগ লক্ষণ সিলেক্ট করুন:</h3>
            
            <div id="symptoms-container" style="max-height: 280px; overflow-y: auto; margin-bottom: 15px; padding-right: 5px;">
                ${symptomsHTML || '<p style="color:#64748b; font-size:0.9rem; text-align:center;">কোনো লক্ষণ অন্তর্ভুক্ত করা হয়নি।</p>'}
            </div>

            <button id="generate-btn" style="width: 100%; background: #0ea5e9; color: #fff; border: none; padding: 14px; border-radius: 6px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: background 0.2s; box-shadow: 0 2px 4px rgba(14, 165, 233, 0.2);">
                Generate Prompt & Open Perplexity
            </button>

            <div id="prompt-box-container" style="display: none; margin-top: 15px; background: #f8fafc; padding: 12px; border-radius: 6px; border: 1px dashed #cbd5e1;">
                <textarea id="prompt-output" readonly style="width: 100%; height: 90px; padding: 8px; border: 1px solid #e2e8f0; border-radius: 4px; background: #fff; font-size: 0.85rem; resize: none; box-sizing: border-box; color: #475569;"></textarea>
                
                <button id="copy-btn" style="width: 100%; background: #10b981; color: white; border: none; padding: 8px; border-radius: 4px; margin-top: 8px; font-size: 0.85rem; font-weight: bold; cursor: pointer;">
                    📋 Copy Prompt Only
                </button>
            </div>

            <div style="margin-top: 20px; border-top: 1px solid #f1f5f9; padding-top: 15px;">
                <p style="font-size: 0.8rem; color: #64748b; margin-bottom: 8px; font-weight: bold;">AI Platforms Quick Access:</p>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px;">
                    <a href="https://www.perplexity.ai" target="_blank" style="background: #059669; color: white; text-align: center; padding: 8px 2px; border-radius: 4px; font-size: 0.75rem; text-decoration: none; font-weight: bold;">Perplexity</a>
                    <a href="https://gemini.google.com" target="_blank" style="background: #2563eb; color: white; text-align: center; padding: 8px 2px; border-radius: 4px; font-size: 0.75rem; text-decoration: none; font-weight: bold;">Gemini</a>
                    <a href="https://grok.com" target="_blank" style="background: #1e293b; color: white; text-align: center; padding: 8px 2px; border-radius: 4px; font-size: 0.75rem; text-decoration: none; font-weight: bold;">Grok</a>
                    <a href="https://chat.deepseek.com" target="_blank" style="background: #4f46e5; color: white; text-align: center; padding: 8px 2px; border-radius: 4px; font-size: 0.75rem; text-decoration: none; font-weight: bold;">DeepSeek</a>
                </div>
            </div>
        </main>
    `;

    // ৩. চিকন ও ফিক্সড ফুটার
    const footer = `
        <footer style="background: #f8fafc; color: #94a3b8; text-align: center; padding: 8px; font-size: 0.75rem; border-top: 1px solid #e2e8f0; position: fixed; bottom: 0; width: 100%; left: 0; box-sizing: border-box; z-index: 1000;">
            Nirvik Homeo System © ${new Date().getFullYear()}
        </footer>
    `;

    // পুরো ইন্টারফেসটি 'app' ডিভ-এর ভেতর পুশ করা হলো
    app.innerHTML = header + mainContent + footer;

    // --- লজিক এবং ইভেন্ট হ্যান্ডলিং ---
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const promptOutput = document.getElementById('prompt-output');
    const promptBoxContainer = document.getElementById('prompt-box-container');

    // জেনারেট বাটনের কাজ
    generateBtn.addEventListener('click', () => {
        const checkedBoxes = document.querySelectorAll('.symptom-checkbox:checked');
        if (checkedBoxes.length === 0) {
            alert('অনুগ্রহ করে রোগীর অন্তত একটি লক্ষণ সিলেক্ট করুন।');
            return;
        }

        // সিলেক্টেড লক্ষণগুলো অ্যারেতে নেওয়া
        let selectedSymptoms = [];
        checkedBoxes.forEach(box => selectedSymptoms.push(box.value));
        
        // হোমিওপ্যাথিক প্রফেশনাল প্রম্পট ফরম্যাট
        const finalPrompt = `একজন অভিজ্ঞ হোমিওপ্যাথিক চিকিৎসক হিসেবে নিচের লক্ষণগুলির উপর ভিত্তি করে সম্ভাব্য রেমেডি, মায়াজমেটিক অ্যানালাইসিস এবং রেপার্টরি রুব্রিক্স সাজিয়ে দিন। লক্ষণসমূহ: ${selectedSymptoms.join(', ')}।`;

        // টেক্সটবক্সে প্রম্পট সেট করা ও বক্সটি দেখানো
        promptOutput.value = finalPrompt;
        promptBoxContainer.style.display = 'block';

        // ব্যাকআপ হিসেবে ক্লিপবোর্ডে কপি করা
        navigator.clipboard.writeText(finalPrompt).then(() => {
            // URL Parameter মেকানিজম: প্রম্পটসহ সরাসরি Perplexity ওপেন করা
            const encodedPrompt = encodeURIComponent(finalPrompt);
            const perplexityUrl = `https://www.perplexity.ai/?q=${encodedPrompt}`;
            
            window.open(perplexityUrl, '_blank');
        }).catch(err => {
            console.error('কপি করতে সমস্যা হয়েছে: ', err);
            // ক্লিপবোর্ড এপিআই কাজ না করলে সরাসরি উইন্ডো ওপেন হবে
            window.open(`https://www.perplexity.ai/?q=${encodeURIComponent(finalPrompt)}`, '_blank');
        });
    });

    // আলাদা কপি বাটনের কাজ
    copyBtn.addEventListener('click', () => {
        promptOutput.select();
        try {
            document.execCommand('copy');
            alert('প্রম্পটটি সফলভাবে ক্লিপবোর্ডে কপি হয়েছে!');
        } catch (err) {
            alert('কপি করা যায়নি, অনুগ্রহ করে ম্যানুয়ালি সিলেক্ট করে কপি করুন।');
        }
    });
}
