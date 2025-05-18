let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 15;

const startScreen = document.getElementById("start-screen");
const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer-button");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const progressBar = document.getElementById("progress-bar");

document.getElementById("start-btn").addEventListener("click", () => {
  startScreen.style.display = "none";
  quiz.style.display = "block";
  showQuestion();
});

function startTimer() {
  timeLeft = 15;
  timeEl.textContent = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      selectAnswer(-1); // No answer selected
    }
  }, 1000);
}

function showQuestion() {
  clearInterval(timerInterval);
  startTimer();
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  answerButtons.forEach((button, index) => {
    button.textContent = currentQuestion.answers[index];
    button.disabled = false;
    button.classList.remove("correct", "wrong");
  });
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
  progressBar.style.width = ((currentQuestionIndex / questions.length) * 100) + "%";
}

function selectAnswer(index) {
  clearInterval(timerInterval);
  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = index === currentQuestion.correctIndex;
  answerButtons.forEach(btn => btn.disabled = true);
  if (index >= 0) {
    answerButtons[index].classList.add(isCorrect ? "correct" : "wrong");
  }
  feedbackEl.textContent = isCorrect ? "Correct!" : `Wrong! Correct: ${currentQuestion.answers[currentQuestion.correctIndex]}`;
  if (isCorrect) score++;
  scoreEl.textContent = score;
  nextBtn.style.display = "inline-block";
}

answerButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    const index = parseInt(e.target.getAttribute("data-index"));
    selectAnswer(index);
  });
});

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    questionEl.textContent = "Quiz Completed!";
    document.querySelector(".answers").style.display = "none";
    nextBtn.style.display = "none";
    feedbackEl.textContent = `Final Score: ${score}/${questions.length}`;
    document.getElementById("timer").style.display = "none";
    progressBar.style.width = "100%";
  }
});
