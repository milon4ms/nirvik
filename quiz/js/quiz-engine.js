// quiz/js/quiz-engine.js

// প্রগ্রেস সেভ করার ফাংশন ইমপোর্ট করা হলো
import { saveProgress } from './progress.js';

// URL থেকে ডেটা নেওয়া (যেমন: play.html?type=sym&id=jwor)
const urlParams = new URLSearchParams(window.location.search);
const quizType = urlParams.get('type'); // 'sym' অথবা 'med'
const quizId = urlParams.get('id'); // 'jwor' অথবা 'abrotanum'

let questions = [];
let currentIndex = 0;
let score = 0;

// ডেটা লোড করা
async function loadQuizData() {
    if (!quizType || !quizId) {
        alert("কুইজ আইডি পাওয়া যায়নি!");
        return;
    }

    // ফোল্ডার পাথ নির্ধারণ (sym হলে symptoms, med হলে medicines)
    const folder = quizType === 'sym' ? 'symptoms' : 'medicines';
    
    try {
        // পাথ: ./data/ (কারণ data ফোল্ডারটি quiz ফোল্ডারের ভেতরেই আছে)
        const response = await fetch(`./data/${folder}/${quizId}.json`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        
        // 🟢 এখানে আপডেট করা হয়েছে: 
        // যদি ফাইলে সরাসরি অ্যারে থাকে [ ] তবে data নিবে। আর যদি { "questions": [ ] } থাকে তবে data.questions নিবে।
        let rawQuestions = Array.isArray(data) ? data : data.questions;

        if (!rawQuestions || !Array.isArray(rawQuestions)) {
            throw new Error("JSON ফাইলের ফরম্যাট সঠিক নয়।");
        }

        // প্রশ্ন শাফল (Shuffle) করা
        questions = shuffleArray(rawQuestions);
        
        // যদি ২০টির বেশি থাকে, তবে প্রথম ২০টি নিবে।
        if (questions.length > 20) {
            questions = questions.slice(0, 20);
        }

        renderQuestion();
    } catch (error) {
        // এরর মেসেজে আসল কারণটি দেখাবে
        document.getElementById('quiz-container').innerHTML = `<h3 style="color:red; text-align:center;">ডেটা লোড করতে সমস্যা হয়েছে!<br><small>${error.message}</small></h3>`;
        console.error("Quiz Load Error:", error);
    }
}

// শাফল করার ফাংশন (Fisher-Yates Algorithm)
function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// প্রশ্ন স্ক্রিনে দেখানো
function renderQuestion() {
    const container = document.getElementById('quiz-container');
    const q = questions[currentIndex];
    
    // অপশন শাফল করা (মূল অ্যারে নষ্ট না করার জন্য [...] ব্যবহার করা হয়েছে)
    const shuffledOptions = shuffleArray([...q.options]);

    let optionsHTML = '';
    shuffledOptions.forEach(opt => {
        optionsHTML += `<button class="option-btn" onclick="checkAnswer('${opt.mid}', '${q.answer}', this)">${opt.text}</button>`;
    });

    container.innerHTML = `
        <div class="header">
            <span>প্রশ্ন ${currentIndex + 1} / ${questions.length}</span>
            <span>স্কোর: ${score}</span>
        </div>
        <h3 class="question-stem">${q.stem}</h3>
        <div class="options-grid">${optionsHTML}</div>
        <div id="feedback-box" class="feedback"></div>
        <button id="next-btn" class="next-btn" onclick="nextQuestion()">পরবর্তী প্রশ্ন</button>
    `;
}

// উত্তর চেক করা
window.checkAnswer = function(selectedMid, correctMid, btnElement) {
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(btn => btn.disabled = true); // সব বাটন ডিজেবল

    const q = questions[currentIndex];
    const feedbackBox = document.getElementById('feedback-box');
    const nextBtn = document.getElementById('next-btn');

    if (selectedMid === correctMid) {
        score++;
        btnElement.classList.add('correct');
        feedbackBox.innerHTML = `<strong>✅ সঠিক উত্তর!</strong><br><p>${q.explanation}</p>`;
        feedbackBox.className = 'feedback show correct-box';
    } else {
        btnElement.classList.add('wrong');
        // সঠিক উত্তরটি খুঁজে হাইলাইট করা
        allBtns.forEach(btn => {
            const correctOption = q.options.find(o => o.mid === correctMid);
            if (btn.innerText === correctOption.text) {
                btn.classList.add('correct');
            }
        });
        feedbackBox.innerHTML = `<strong>❌ ভুল উত্তর!</strong><br><p>সঠিক উত্তর: <b>${q.options.find(o => o.mid === correctMid).text}</b></p><p>${q.explanation}</p>`;
        feedbackBox.className = 'feedback show wrong-box';
    }

    nextBtn.classList.add('show');
}

// পরবর্তী প্রশ্নে যাওয়া
window.nextQuestion = function() {
    currentIndex++;
    if (currentIndex < questions.length) {
        renderQuestion();
    } else {
        showResult();
    }
}

// রেজাল্ট দেখানো এবং ডেটা সেভ করা
async function showResult() {
    const total = questions.length;
    const percentage = Math.round((score / total) * 100);
    
    let grade = "অকৃতকার্য";
    let color = "#dc3545";
    if (percentage === 100) { grade = "অসাধারণ"; color = "#ffc107"; }
    else if (percentage >= 80) { grade = "চমৎকার"; color = "#28a745"; }
    else if (percentage >= 60) { grade = "ভালো"; color = "#17a2b8"; }
    else if (percentage >= 40) { grade = "পাস"; color = "#6c757d"; }

    // ডেটাবেসে স্কোর সেভ করা (progress.js থেকে)
    let saveMessage = "";
    try {
        await saveProgress(quizType, quizId, score, total);
        saveMessage = "<p style='color: #28a745; font-weight: bold;'>✔️ আপনার রেকর্ড সেভ করা হয়েছে।</p>";
    } catch (error) {
        // গেস্ট হলে বা সেভ না হলে এই মেসেজ দেখাবে
        saveMessage = "<p style='color: #856404; background: #ffeeba; padding: 10px; border-radius: 5px;'>⚠️ আপনি গেস্ট হিসেবে আছেন, তাই রেকর্ড সেভ হয়নি।</p>";
    }

    document.getElementById('quiz-container').innerHTML = `
        <div class="result-card">
            <h2>কুইজ সম্পন্ন!</h2>
            <div class="score-text" style="color: ${color}">${score} / ${total}</div>
            <h3 style="color: ${color}">ফলাফল: ${grade} (${percentage}%)</h3>
            <br>
            ${saveMessage}
            <hr style="margin: 20px 0; border: 1px solid #eee;">
            <a href="index.html" class="btn btn-gray">হোমে ফিরে যান</a>
            <button onclick="window.location.reload()" class="btn btn-blue">আবার খেলুন</button>
        </div>
    `;
}

// শুরু করা
loadQuizData();
