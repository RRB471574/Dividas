document.addEventListener("DOMContentLoaded", () => {
  let currentQuestionIndex = 0;
  let questions;

  fetch("perguntas.json")
    .then(response => response.json())
    .then(data => {
      questions = data;
      showQuestion();
    });

  function showQuestion() {
    document.getElementById("feedback").textContent = "";
    document.getElementById("answer-input").value = "";
    document.getElementById("next-question").style.display = "none";
    document.getElementById("question-container").textContent = questions[currentQuestionIndex].pergunta;
  }

  document.getElementById("submit-answer").addEventListener("click", () => {
    const userAnswer = document.getElementById("answer-input").value.trim();
    const correctAnswer = questions[currentQuestionIndex].resposta.trim();

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      document.getElementById("feedback").textContent = "Resposta Correta!";
      document.getElementById("feedback").style.color = "green";
      document.getElementById("next-question").style.display = "block";
    } else {
      document.getElementById("feedback").textContent = "Resposta Incorreta. Tente novamente.";
      document.getElementById("feedback").style.color = "red";
    }
  });

  document.getElementById("next-question").addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      document.getElementById("question-container").textContent = "Parabéns! Você concluiu o quiz!";
      document.getElementById("answer-input").style.display = "none";
      document.getElementById("submit-answer").style.display = "none";
      document.getElementById("next-question").style.display = "none";
    }
  });
});
