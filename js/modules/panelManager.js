// ---------- PANEL CREATOR ----------
function createPanel(ref, maxNumber) {
    return {
        maxNum: maxNumber,
        num1: 0,
        num2: 0,
        answer: 0,
        timer: null,
        startTime: 0,
        totalSeconds: 0,
        count: 0,
        marks: 0,
        progress: 0,

        qElem: document.querySelector(`#${ref} .question`),
        resultElem: document.querySelector(`#${ref} .answerResult`),
        inputElem: document.querySelector(`#${ref} .answerField`),
        tElem: document.querySelector(`#${ref} .timer`),
        sElem: document.querySelector(`#${ref} .status`),
        marksElem: document.querySelector(`#${ref} .marks`),
        totalTimeElem: document.querySelector(`#${ref} .totalTime`),

        progressElem: document.getElementById(ref === "panel1" ? "p1_progress" : "p2_progress")
    };
}

export { createPanel };
