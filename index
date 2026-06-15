<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI প্রম্পট জেনারেটর - Gemini AI</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #4285f4, #34a853);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .header h1 {
            font-size: 2em;
            margin-bottom: 10px;
        }

        .header p {
            font-size: 1.1em;
            opacity: 0.95;
        }

        .content {
            padding: 30px;
        }

        .preview-box {
            background: #f0f7ff;
            border-left: 5px solid #4285f4;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 30px;
        }

        .preview-box h3 {
            color: #4285f4;
            margin-bottom: 10px;
            font-size: 1.1em;
        }

        .preview-box p {
            color: #333;
            line-height: 1.6;
            font-size: 14px;
            word-wrap: break-word;
        }

        .button-group {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }

        button {
            padding: 12px 20px;
            font-size: 16px;
            font-weight: 600;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: inherit;
        }

        .btn-primary {
            background: #4285f4;
            color: white;
        }

        .btn-primary:hover {
            background: #3367d6;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(66,133,244,0.3);
        }

        .btn-success {
            background: #34a853;
            color: white;
        }

        .btn-success:hover {
            background: #2d8e47;
            transform: translateY(-2px);
        }

        .btn-warning {
            background: #fbbc05;
            color: #333;
        }

        .btn-warning:hover {
            background: #e6a800;
            transform: translateY(-2px);
        }

        .btn-danger {
            background: #ea4335;
            color: white;
        }

        .btn-danger:hover {
            background: #c5221f;
            transform: translateY(-2px);
        }

        .custom-area {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
            display: none;
        }

        .custom-area textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 14px;
            font-family: monospace;
            resize: vertical;
            margin-bottom: 15px;
        }

        .custom-area textarea:focus {
            outline: none;
            border-color: #4285f4;
        }

        .info {
            background: #e8f0fe;
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
        }

        .info h4 {
            color: #4285f4;
            margin-bottom: 8px;
        }

        .info p {
            color: #555;
            font-size: 14px;
            line-height: 1.5;
        }

        .info kbd {
            background: #333;
            color: white;
            padding: 3px 8px;
            border-radius: 5px;
            font-size: 12px;
            margin: 0 2px;
        }

        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 13px;
        }

        @media (max-width: 600px) {
            .button-group {
                grid-template-columns: 1fr;
            }
            .header h1 {
                font-size: 1.5em;
            }
            .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h1>🤖 AI প্রম্পট জেনারেটর</h1>
        <p>এক ক্লিকে প্রম্পট তৈরি করুন এবং Google Gemini AI তে পাঠান</p>
    </div>

    <div class="content">
        <!-- প্রিভিউ সেকশন -->
        <div class="preview-box">
            <h3>📝 আপনার প্রম্পট:</h3>
            <p id="previewText">একটি বাটনে ক্লিক করুন...</p>
        </div>

        <!-- বাটন গ্রুপ -->
        <div class="button-group">
            <button class="btn-primary" onclick="generatePrompt('story')">📖 গল্প লিখুন</button>
            <button class="btn-primary" onclick="generatePrompt('code')">💻 কোড লিখুন</button>
            <button class="btn-primary" onclick="generatePrompt('translate')">🌐 অনুবাদ করুন</button>
            <button class="btn-primary" onclick="generatePrompt('summary')">📄 সারাংশ লিখুন</button>
            <button class="btn-primary" onclick="generatePrompt('email')">✉️ ইমেইল লিখুন</button>
            <button class="btn-success" onclick="generatePrompt('idea')">💡 আইডিয়া জেনারেট</button>
            <button class="btn-warning" onclick="showCustom()">✏️ নিজে লিখুন</button>
            <button class="btn-danger" onclick="randomPrompt()">🎲 র্যান্ডম</button>
        </div>

        <!-- কাস্টম প্রম্পট এরিয়া -->
        <div id="customArea" class="custom-area">
            <h3>✏️ আপনার প্রম্পট লিখুন:</h3>
            <textarea id="customText" rows="4" placeholder="যেমন:&#10;1. পাইথন দিয়ে একটি ক্যালকুলেটর বানাও&#10;2. ঢাকা শহরের ১০টি দর্শনীয় স্থানের নাম বলো&#10;3. একটি মজার গল্প লেখ"></textarea>
            <button class="btn-primary" onclick="sendCustom()">🚀 Gemini তে পাঠান</button>
            <button class="btn-warning" onclick="hideCustom()" style="margin-left: 10px;">❌ বাতিল</button>
        </div>

        <!-- তথ্য বক্স -->
        <div class="info">
            <h4>ℹ️ কিভাবে ব্যবহার করবেন</h4>
            <p>
                <strong>১.</strong> উপরের যেকোনো বাটনে ক্লিক করুন 🖱️<br>
                <strong>২.</strong> প্রম্পট জেনারেট হবে এবং প্রিভিউ দেখাবে ✨<br>
                <strong>৩.</strong>自动ভাবে Google Gemini নতুন ট্যাবে খুলবে 🌐<br>
                <strong>৪.</strong> Gemini তে প্রম্পট দেখাবে, তারপর <kbd>Enter</kbd> চাপুন 🎯<br>
                <strong>💡 টিপ:</strong> Gemini এ গিয়ে প্রম্পট এডিট করেও ব্যবহার করতে পারবেন!
            </p>
        </div>
    </div>

    <div class="footer">
        <p>⚡ 100% ফ্রি | প্রম্পট জেনারেট করে সরাসরি Google Gemini AI তে পাঠায়</p>
        <p style="margin-top: 5px;">🔒 আপনার ডাটা কোথাও সেভ হয় না | সম্পূর্ণ প্রাইভেট</p>
    </div>
</div>

<script>
    // প্রম্পট টেমপ্লেট
    const prompts = {
        story: "একটি ছোট গল্প লেখ। গল্পটি হবে: একটি বুদ্ধিমান কুকুর যে তার মালিককে জঙ্গলে হারিয়ে যাওয়া থেকে উদ্ধার করে। গল্পটি বাংলায় লেখ এবং শেষে একটি শিক্ষণীয় বাক্য থাকবে। গল্পের দৈর্ঘ্য ১৫০ শব্দের মধ্যে।",
        
        code: "JavaScript দিয়ে একটি ফাংশন লেখ যা ইনপুট হিসেবে একটি সংখ্যা নেবে এবং বলে দেবে সেটি জোড় না বিজোড়। ফাংশনটির ব্যাখ্যা বাংলায় দাও। কোডটি ES6 স্টাইলে লেখ।",
        
        translate: "নিচের বাক্যটি ইংরেজি থেকে বাংলায় অনুবাদ কর:\n\n'The Internet has changed the way we communicate, work, and live. It connects billions of people around the world.'\n\nঅনুবাদের পর প্রতিটি গুরুত্বপূর্ণ শব্দের অর্থ লিখ।",
        
        summary: "নিচের টেক্সটটির একটি ছোট সারাংশ লেখ (৩ লাইনে):\n\n'বাংলাদেশ একটি প্রাচীন ও ঐতিহ্যবাহী দেশ। প্রায় ৪০০ বছর ধরে ঢাকা ছিল মুঘল সাম্রাজ্যের একটি গুরুত্বপূর্ণ শহর। ১৯৭১ সালের মহান মুক্তিযুদ্ধের মাধ্যমে বাংলাদেশ স্বাধীনতা অর্জন করে। বর্তমানে বাংলাদেশ দ্রুত উন্নয়নশীল দেশগুলোর একটি।'",
        
        email: "একটি পেশাদার ইমেইল লিখ যাতে নিচের বিষয়গুলো থাকে:\n- প্রাপক: আপনার ম্যানেজার\n- বিষয়: ছুটির আবেদন\n- কারণ: পারিবারিক জরুরি কাজ\n- সময়: ২ দিন\nইমেইলটি বাংলায় লিখ এবং ভদ্র ভাষা ব্যবহার কর।",
        
        idea: "একটি মোবাইল অ্যাপের আইডিয়া দাও যা ছাত্রদের পড়াশোনায় সাহায্য করবে। অ্যাপটির নাম, বৈশিষ্ট্য এবং এটি কিভাবে কাজ করবে তা বিস্তারিত বাংলায় লেখ।"
    };
    
    // প্রম্পট জেনারেট ফাংশন
    function generatePrompt(type) {
        // কাস্টম এরিয়া হাইড করি
        document.getElementById('customArea').style.display = 'none';
        
        // প্রম্পট সিলেক্ট করি
        let promptText = prompts[type];
        if (!promptText) {
            promptText = "আমাকে সাহায্য করুন: [আপনার প্রশ্ন লিখুন]";
        }
        
        // প্রিভিউ আপডেট করি
        document.getElementById('previewText').innerHTML = promptText.replace(/\n/g, '<br>');
        
        // Gemini তে পাঠাই
        sendToGemini(promptText);
    }
    
    // র্যান্ডম প্রম্পট
    function randomPrompt() {
        document.getElementById('customArea').style.display = 'none';
        
        const keys = Object.keys(prompts);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const randomText = prompts[randomKey];
        
        document.getElementById('previewText').innerHTML = randomText.replace(/\n/g, '<br>');
        sendToGemini(randomText);
    }
    
    // কাস্টম প্রম্পট দেখানো
    function showCustom() {
        document.getElementById('customArea').style.display = 'block';
        document.getElementById('customText').value = '';
        document.getElementById('customText').focus();
    }
    
    // কাস্টম প্রম্পট লুকানো
    function hideCustom() {
        document.getElementById('customArea').style.display = 'none';
        document.getElementById('customText').value = '';
    }
    
    // কাস্টম প্রম্পট পাঠানো
    function sendCustom() {
        const customText = document.getElementById('customText').value.trim();
        
        if (customText === '') {
            alert('⚠️ দয়া করে কিছু লিখুন!');
            return;
        }
        
        document.getElementById('previewText').innerHTML = customText.replace(/\n/g, '<br>');
        sendToGemini(customText);
        hideCustom();
    }
    
    // Gemini তে পাঠানোর ফাংশন
    function sendToGemini(promptText) {
        if (!promptText || promptText.trim() === '') {
            alert('❌ প্রম্পট খালি!');
            return;
        }
        
        // URL এনকোড
        const encodedPrompt = encodeURIComponent(promptText.trim());
        
        // Gemini URL
        const geminiUrl = 'https://gemini.google.com/?q=' + encodedPrompt;
        
        // নতুন ট্যাবে খোলা
        window.open(geminiUrl, '_blank');
        
        // কনসোলে দেখানো
        console.log('প্রম্পট পাঠানো হয়েছে:', promptText);
        console.log('Gemini URL:', geminiUrl);
    }
    
    // পেজ লোড হলে কনসোল মেসেজ
    console.log('✅ AI প্রম্পট জেনারেটর রেডি!');
</script>

</body>
</html>
