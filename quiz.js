const questions = [
    {
        question: "서울에 있으며, 1592년 임진왜란 때 소실되어 방치되다가 흥선대원군 주도로 중건된 조선시대 궁궐의 이름은?",
        answer: "경복궁"
    },
    {
        question: "전주에 있는 한옥 밀집거리이자, 전주의 대표적인 관광지의 이름은?",
        answer: "전주한옥마을"
    },
    {
        question: "2023년 국제정원박람회가 열리는 전남의 도시의 이름을 두 글자로 적으세요.",
        answer: "순천"
    },
    {
        question: "제2롯데월드가 생긴 도시의 이름을 두 글자로 적으세요.",
        answer: "부산"
    },
    {
        question: "강원도에 있으며, 양떼목장과 삼양목장으로 유명하고 동계올림픽이 열린 지역의 이름을 두 글자로 적으세요.",
        answer: "평창"
    },
    {
        question: "경상북도 경주시에 있는 유네스코 세계유산으로 지정된 사찰의 이름은?",
        answer: "불국사"
    },
    {
        question: "부산에 있으며, 이 지역의 이름을 딴 영화도 개봉한 적이 있는데 이 해수욕장의 이름은?",
        answer: "해운대해수욕장"
    },
    {
        question: "조선시대 정조 시기, 정조와 정약용이 지은 성의 이름은?",
        answer: "수원화성"
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "";

    const questionElement = document.createElement("h2");
    questionElement.classList.add("question");
    questionElement.textContent = questions[currentQuestion].question;
    quizContainer.appendChild(questionElement);

    const answerInput = document.getElementById("answer");
    answerInput.value = "";
    answerInput.focus();
}

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value; // 사용자가 입력한 정답
    const correctAnswer = questions[currentQuestion].answer;  // 현재 질문의 정답

    if (userAnswer === correctAnswer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "";

    const resultElement = document.createElement("h2");
    resultElement.classList.add("question");
    resultElement.textContent = "퀴즈를 모두 완료하셨습니다.";
    quizContainer.appendChild(resultElement);

    const scoreElement = document.createElement("p");
    scoreElement.textContent = "당신의 포인트는 " + score + "점 입니다.";
    quizContainer.appendChild(scoreElement);

    const answerContainer = document.getElementById("answer-container");
    answerContainer.style.display = "none";
}

window.onload = loadQuestion;

function goBack() {
    window.open("trip.html");
    window.close();
}