const questions = [
  {
    question: "Who is the voice actor behind the character of Homer Simpson?",
    answers: [
      { text: "Harry Shearer", correct: false },
      { text: "Hank Azaria", correct: false },
      { text: "Nancy Cartwright", correct: false },
      { text: "Dan Castellaneta", correct: true },
    ],
  },
  {
    question: "What is the name of the town where the Simpsons reside?",
    answers: [
      { text: "Shelbyville", correct: false },
      { text: "Springfield", correct: true },
      { text: "Quahog", correct: false },
      { text: "South Park", correct: false },
    ],
  },
  {
    question: "What is the name of Bart Simpson's best friend?",
    answers: [
      { text: "Nelson Muntz", correct: false },
      { text: "Ralph Wiggum", correct: false },
      { text: "Milhouse Van Houten", correct: true },
      { text: "Martin Prince", correct: false },
    ],
  },
  {
    question: "What is the catchphrase of the character Ned Flanders?",
    answers: [
      { text: "Okily-dokily!", correct: true },
      { text: "Ay caramba!", correct: false },
      { text: "Excellent!", correct: false },
      { text: "D'oh!", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNum = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNum + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.innerHTML = answer.text;
    btn.classList.add("btn");
    answerBtn.appendChild(btn);
    if (answer.correct) {
      btn.dataset.correct = answer.correct;
    }
    btn.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerBtn.children).forEach((btn) => {
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
    btn.disabled = true;
  });
  nextBtn.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
