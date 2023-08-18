window.onload = loadQuestion;

const questions = [
    {
        question: "서울에 있으며, 1592년 임진왜란 때 소실되어 방치되다가 흥선대원군 주도로 중건된 조선시대 궁궐의 이름은?",
        answer: "경복궁"
    },
    {
        question: "전라북도 전주에 있는 한옥 밀집거리이자, 전주의 대표적인 관광지의 이름은?",
        answer: "전주한옥마을"
    },
    {
        question: "2023년 국제정원박람회가 열리는 전남의 도시의 이름을 두 글자로 적으세요.",
        answer: "순천"
    },
    {
        question: "이곳은 대한민국 최대 해양 도시이며, 제2롯데월드가 생긴 도시이다. 이곳의 이름을 두 글자로 적으세요.",
        answer: "부산"
    },
    {
        question: "강원도에 있으며, 양떼목장과 삼양목장으로 유명하고 동계올림픽이 열린 지역의 이름을 두 글자로 적으세요.",
        answer: "평창"
    },
    {
        question: "경상북도 경주시에 있는 유네스코 세계유산으로 지정된 사찰의 이름을 적으세요.",
        answer: "불국사"
    },
    {
        question: "부산에 있으며, 이 지역의 이름을 딴 영화도 개봉한 적이 있는데 이 해수욕장의 이름은?",
        answer: "해운대해수욕장"
    },
    {
        question: "조선시대 정조 시기에 정조와 정약용이 지었으며, 거중기, 녹로 등 신기재를 사용해 만들어진 이 성의 이름은?",
        answer: "수원화성"
    },
    {
        question: "한국의 섬 중에서 가장 크고 인구가 많은 섬이기도 하며 매년 수많은 관광객들이 방문하는 섬의 이름은?",
        answer: "제주도"
    },
    {
        question: "서울의 쇼핑 중심지라 불리는 행정동이며 언제나 내외국인 관광객들로 붐비는 곳은 어디인지 적으세요.",
        answer: "명동"
    },
    {
        question: "경기도 용인에 위치해 있으며, 초기에 자연농원이라는 이름으로 개장한 국내 최대의 테마파크인 이곳의 이름은?",
        answer: "에버랜드"
    },
    {
        question: "인천광역시에 위치해 있으며 섬의 생김새가 반달 꼬리 모양 같아 붙여진 과거에 섬이었던 곳의 이름은?",
        answer: "월미도"
    },
    {
        question: "제주특별자치도 서귀포시 성산읍 성산리에 있는 산이며, 커다란 사발 모양의 분화구가 특징인 이곳의 이름은?",
        answer: "성산일출봉"
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

/*
function checkAnswer() {
    const userAnswer = document.getElementById("answer").value;
    const correctAnswer = questions[currentQuestion].answer;

    const feedback = document.getElementById("feedback");
    if (userAnswer === correctAnswer) {
        feedback.textContent = "정답입니다!";
        feedback.style.color = "#4CAF50";
        score++;
        loadNextQuestion(); // 정답이 맞으면 다음 문제로 바로 넘어감
    } else {
        feedback.textContent = "오답입니다. 정답은 " + correctAnswer + "입니다.";
        feedback.style.color = "#FF0000";
    }

    if (currentQuestion === questions.length - 1) {
        const nextButton = document.querySelector(".next");
        nextButton.textContent = "결과 보기";
    }
}
*/

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value; // 사용자가 입력한 정답
    const correctAnswer = questions[currentQuestion].answer; // 현재 질문의 정답

    const feedback = document.getElementById("feedback");
    if (userAnswer === correctAnswer) {
        feedback.textContent = "정답입니다!";
        feedback.style.color = "#4CAF50"; // 정답일 때 피드백 색상을 초록색으로 설정
    } else {
        feedback.textContent = "오답입니다. 정답은 " + correctAnswer + "입니다.";
        feedback.style.color = "#FF0000"; // 오답일 때 피드백 색상을 빨간색으로 설정
    }

    // 정답을 확인한 후에 결과를 표시하도록 변경
    if (currentQuestion === questions.length - 1) {
        const nextButton = document.querySelector(".next");
        nextButton.textContent = "결과 보기";
    }
}

function loadNextQuestion() {
    const feedback = document.getElementById("feedback");
    feedback.textContent = ""; // 피드백 초기화

    const answerInput = document.getElementById("answer");
    const userAnswer = answerInput.value; // 사용자가 입력한 정답
    const correctAnswer = questions[currentQuestion].answer; // 현재 질문의 정답

    if (currentQuestion < questions.length) {
        if (userAnswer === correctAnswer) {
            score++;
        }

        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
            if (currentQuestion === questions.length - 1) {
                const nextButton = document.querySelector(".next");
                nextButton.textContent = "결과 보기";
            }
        } else {
            showResults();
        }
    }
}

function showResults() {
    const feedback = document.getElementById("feedback");
    feedback.textContent = ""; // 피드백 초기화

    const resultElement = document.createElement("h2");
    resultElement.classList.add("question");
    resultElement.textContent = "퀴즈를 모두 완료하셨습니다.";
    
    const scoreElement = document.createElement("p");
    scoreElement.textContent = "당신의 포인트는 " + score + "점 입니다.";

    feedback.appendChild(resultElement);
    feedback.appendChild(scoreElement);

    const answerContainer = document.getElementById("answer-container");
    answerContainer.style.display = "none";
}

function goBack() {
    window.open("trip.html");
    window.close();
}