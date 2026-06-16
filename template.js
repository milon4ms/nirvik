// একটি ফাংশন যা পুরো পেজের লেআউট তৈরি করবে
function loadDoctorTemplate(symptomsList = []) {
    const app = document.getElementById('app');
    if (!app) return;

    // ১. হেডার তৈরি (চিকন ও রেসপন্সিভ)
    const header = `
        <header style="background: #1e293b; color: #fff; padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="font-weight: bold; font-size: 1.1rem; letter-spacing: 0.5px;">🩺 Nirvik Homeo System</div>
            <div style="font-size: 0.85rem; color: #94a3b8;">Physician Dashboard</div>
        </header>
    `;

    // ২. মেইন কন্টেন্ট ও লক্ষণ সিলেকশন এরিয়া
    let symptomsHTML = '';
    symptomsList.forEach((symptom, index) => {
        symptomsHTML += `
            <label style="display: flex; align-items: center; margin-bottom: 12px; padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; cursor: pointer; font-size: 0.95rem;">
                <input type="checkbox" class="symptom-checkbox" value="${symptom}" style="margin-right: 10px; transform: scale(1.2); accent-color: #0ea5e9;">
                ${symptom}
            </label>
        `;
    });

    const mainContent = `
        <main style="max-width: 600px; margin: 20px auto; padding: 15px; background: #fff; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
            <h3 style="color: #334155; margin-bottom: 15px; font-size: 1.1rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px;">লক্ষণ সমূহ নির্বাচন করুন:</h3>
            
            <div id="symptoms-container" style="max-height: 250px; overflow-y: auto; margin-bottom: 20px; padding-right: 5px;">
                ${symptomsHTML || '<p style="color:#64748b; font-size:0.9rem;">কোনো লক্ষণ পাওয়া যায়নি।</p>'}
            </div>

            <button id="generate-btn" style="width: 100%; background: #0ea5e9; color: #fff; border: none; padding: 12px; border-radius: 6px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: background 0.2s;">
                Generate & Copy for Perplexity
            </button>

            <div id="prompt-box-container" style="display: none; margin-top: 20px;">
                <textarea id="prompt-output" readonly style="width: 100%; height: 100px; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; background: #f1f5f9; font-size: 0.9rem; resize: none; box-sizing: border-box;"></textarea>
                
                <button id="copy-btn" style="width: 100%; background: #10b981; color: #fff; border: none; padding: 8px; border-radius: 6px; margin-top: 8px; font-size: 0.9rem; font-weight: bold; cursor: pointer;">
                    📋 Copy Prompt
                </button>
            </div>

            <div style="margin-top: 25px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
                <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 10px; font-weight: 500;">Open AI Platforms:</p>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
                    <a href="https://www.perplexity.ai" target="_blank" style="background: #10b981; color: white; text-align: center; padding: 6px 2px; border-radius: 4px; font-size: 0.75rem; text-decoration: none; font-weight: bold;">Perplexity</a>
                    <a href="https://gemini.google.com" target="_blank" style="background: #2563eb; color: white; text-align: center; padding: 6px 2px; border-radius: 4px; font-size: 0.75rem; text-decoration: none; font-weight: bold;">Gemini</a>
                    <a href="https://grok.com" target="_blank" style="background: #000000; color: white; text-align: center; padding: 6px 2px; border-radius: 4px; font-size: 0.75rem; text-decoration: none; font-weight: bold;">Grok</a>
                    <a href="https://chat.deepseek.com" target="_blank" style="background: #4f46e5; color: white; text-align: center; padding: 6px 2px; border-radius: 4px; font-size: 0.75rem; text-decoration: none; font-weight: bold;">DeepSeek</a>
                </div>
            </div>
        </main>
    `;

    // ৩. ফুটার (চিকন ও পরিচ্ছন্ন)
    const footer = `
        <footer style="background: #f8fafc; color: #64748b; text-align: center; padding: 10px; font-size: 0.8rem; border-top: 1px solid #e2e8f0; position: fixed; bottom: 0; width: 100%; left: 0; box-sizing: border-box;">
            © ${new Date().getFullYear()} Nirvik Homeo | Designed for Professionals
        </footer>
    `;

    // বডিতে অ্যাপেন্ড করা
    app.innerHTML = header + mainContent + footer;

    // --- ইভেন্ট লিসেনার ও লজিক পার্ট ---
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const promptOutput = document.getElementById('prompt-output');
    const promptBoxContainer = document.getElementById('prompt-box-container');

    generateBtn.addEventListener('click', () => {
        const checkedBoxes = document.querySelectorAll('.symptom-checkbox:checked');
        if (checkedBoxes.length === 0) {
            alert('অনুগ্রহ করে অন্তত একটি লক্ষণ সিলেক্ট করুন।');
            return;
        }

        // লক্ষণগুলো সংগ্রহ করে প্রম্পট তৈরি
        let selectedSymptoms = [];
        checkedBoxes.forEach(box => selectedSymptoms.push(box.value));
        
        const finalPrompt = `একজন অভিজ্ঞ হোমিওপ্যাথিক চিকিৎসক হিসেবে নিচের লক্ষণগুলির উপর ভিত্তি করে সম্ভাব্য রেমেডি, মায়াজমেটিক অ্যানালাইসিস এবং রেপার্টরি রুব্রিক্স সাজিয়ে দিন। লক্ষণসমূহ: ${selectedSymptoms.join(', ')}।`;

        // আউটপুট বক্সে প্রম্পট দেখানো
        promptOutput.value = finalPrompt;
        promptBoxContainer.style.display = 'block';

        // ক্লিপবোর্ডে কপি করা
        navigator.clipboard.writeText(finalPrompt).then(() => {
            // Perplexity AI ওপেন করা
            window.open('https://www.perplexity.ai', '_blank');
        }).catch(err => {
            console.error('কপি করতে সমস্যা হয়েছে: ', err);
        });
    });

    // আলাদা কপি বাটন লজিক
    copyBtn.addEventListener('click', () => {
        promptOutput.select();
        document.execCommand('copy');
        alert('প্রম্পটটি সফলভাবে কপি হয়েছে!');
    });
}
