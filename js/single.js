// Single Player Logic (simplified version)

const panel = {
    totalQuestions: 10,
    totalGameTime: 120,
    questionsAsked: 0,
    maxNum: 50,
    num1: 0,
    num2: 0,
    answer: 0,
    marks: 0,
        timer: null,
    startTime: 0,
    gameStarted: false,
    gameCountdownInterval: null,

    qElem: document.querySelector('.question'),
    result: document.querySelector('.answerResult'),
    marksElem: document.querySelector('.marks'),
    timerElem: document.querySelector('.totalTime'),
    options: document.querySelectorAll('.option'),
    leaderboardElem: document.getElementById('leaderboard'),
    progressBarElem: document.getElementById('p1_progress'),
    currentQElem: document.getElementById('currentQ'),
    totalQElem: document.getElementById('totalQ')
};

function formatTime(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
}

function setupGame() {
    const q = prompt('Number of questions?', panel.totalQuestions);
    const t = prompt('Total time (seconds)?', panel.totalGameTime);

    panel.totalQuestions = (q && !isNaN(q) && q > 0) ? parseInt(q) : panel.totalQuestions;
    panel.totalGameTime = (t && !isNaN(t) && t > 10) ? parseInt(t) : panel.totalGameTime;
    
    // Initialize question counter display
    panel.totalQElem.textContent = panel.totalQuestions;
    panel.currentQElem.textContent = '0';
}

function endGame() {
    clearInterval(questionTimer);
    clearInterval(panel.gameCountdownInterval);
    panel.qElem.textContent = '🏁 Game Over';
    panel.result.style.color = 'orange';
    panel.result.textContent = `Final Score: ${panel.marks}/${panel.questionsAsked}`;
    panel.result.style.fontSize = '24px';
    panel.result.style.fontWeight = 'bold';
    saveHighScore();
    loadHighScore();
}

let questionTimer = null;
let questionTime = 10;
let soundEnabled = true;

function updateProgressBar() {
    const progress = (panel.questionsAsked / panel.totalQuestions) * 100;
    panel.progressBarElem.style.width = progress + '%';
}

function newQuestion() {
    panel.questionsAsked++;
    if (panel.questionsAsked > panel.totalQuestions) {
        endGame();
        return;
    }
    
    // Update question counter display
    panel.currentQElem.textContent = panel.questionsAsked;
    updateProgressBar();

    panel.num1 = Math.floor(Math.random() * panel.maxNum) + 1;
    panel.num2 = Math.floor(Math.random() * panel.maxNum) + 1;
    panel.answer = panel.num1 + panel.num2;

    // generate UNIQUE options
    const values = new Set();
    values.add(panel.answer);

    while (values.size < 4) {
        const fake = panel.answer + Math.floor(Math.random() * 20) - 10;
        if (fake !== panel.answer && fake >= 0) {
            values.add(fake);
        }
    }

    const shuffled = Array.from(values).sort(() => Math.random() - 0.5);

    panel.options.forEach((btn, idx) => {
        btn.textContent = `${btn.dataset.opt}: ${shuffled[idx]}`;
        btn.dataset.value = shuffled[idx];
    });

    panel.qElem.textContent = `${panel.num1} + ${panel.num2}`;
    panel.result.textContent = '';
    startQuestionTimer();
}

function startTimer() {
    if (panel.gameStarted) return;

    panel.gameStarted = true;
    panel.startTime = Date.now();
    
    // Start countdown timer
    let remainingTime = panel.totalGameTime;
    panel.timerElem.textContent = formatTime(remainingTime);

    panel.gameCountdownInterval = setInterval(() => {
        remainingTime--;
        panel.timerElem.textContent = formatTime(remainingTime);

        if (remainingTime <= 0) {
            clearInterval(panel.gameCountdownInterval);
            endGame();
        }
    }, 1000);
}

function playTick() {
    if (!soundEnabled) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
}

function updateDifficulty() {
    // Increase number range with score
    panel.maxNum = 50 + panel.marks * 5;

    // Reduce time gradually (minimum 3s)
    questionTime = Math.max(3, 10 - Math.floor(panel.marks / 3));
}

function startQuestionTimer() {
    clearInterval(questionTimer);

    updateDifficulty();
    let timeLeft = questionTime;
    const timerEl = document.querySelector('.timer');

    timerEl.textContent = formatTime(timeLeft);

    questionTimer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = formatTime(timeLeft);

        if (timeLeft <= 3 && timeLeft > 0) playTick();

        if (timeLeft <= 0) {
            clearInterval(questionTimer);
            panel.result.style.color = 'red';
            panel.result.textContent = `Time Up ⏱ Correct: ${panel.answer}`;
            endGameOrNextQuestion();
        }
    }, 1000);
}

function endGameOrNextQuestion() {
    if (panel.questionsAsked >= panel.totalQuestions) {
        endGame();
    } else {
        newQuestion();
    }
}

function submitAnswer(selected) {
    const val = parseInt(selected);
    if (val === panel.answer) {
        clearInterval(questionTimer);
        panel.marks++;
        panel.marksElem.textContent = panel.marks;
        panel.result.style.color = 'green';
        panel.result.textContent = 'Correct ✅';
        endGameOrNextQuestion();
    } else {
        panel.result.style.color = 'red';
        panel.result.textContent = `Wrong ❌ Correct: ${panel.answer}`;
    }
}

function saveHighScore() {
    const best = Number(localStorage.getItem('bestScore') || 0);
    if (panel.marks > best) {
        localStorage.setItem('bestScore', panel.marks);
    }
}

function loadHighScore() {
    const best = Number(localStorage.getItem('bestScore'));
    if (!isNaN(best)) {
        panel.leaderboardElem.innerHTML = `<li>🏆 Best Score: ${best}</li>`;
    }
}

function updateLeaderboard() {
    panel.leaderboardElem.innerHTML = `<li>Player 1 - ${panel.marks} marks</li>`;
    saveHighScore();
}

panel.options.forEach(btn => {
    btn.style.color = 'blue';
    btn.onclick = () => submitAnswer(btn.dataset.value);
});

// Sound toggle button (if exists)
const soundBtn = document.getElementById('soundToggle');
if (soundBtn) {
    soundBtn.onclick = () => {
        soundEnabled = !soundEnabled;
        soundBtn.textContent = soundEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
    };
}

loadHighScore();

document.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'a') {
        setupGame();
        startTimer();
        newQuestion();
    }
});