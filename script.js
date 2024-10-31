let perguntas = [];
let currentQuestionIndex = 0;

fetch('perguntas.json')
  .then(response => response.json())
  .then(data => {
    perguntas = data;
    loadQuestion();
  });

function loadQuestion() {
  const questionContainer = document.getElementById('question-container');
  questionContainer.innerText = perguntas[currentQuestionIndex].pergunta;
  document.getElementById('feedback').innerText = ""; // Limpa feedback anterior
}

function checkAnswer() {
  const userAnswer = document.getElementById('answer-input').value.trim();
  const correctAnswer = perguntas[currentQuestionIndex].resposta;
  const feedback = document.getElementById('feedback');

  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    feedback.innerText = "Correto!";
  } else {
    feedback.innerText = `Errado. A resposta certa é: ${correctAnswer}`;
  }

  // Avança para a próxima pergunta
  currentQuestionIndex = (currentQuestionIndex + 1) % perguntas.length;
  document.getElementById('answer-input').value = "";
  setTimeout(loadQuestion, 2000); // Espera 2 segundos para mostrar a próxima pergunta
}

function skipQuestion() {
  // Avança para a próxima pergunta sem feedback
  currentQuestionIndex = (currentQuestionIndex + 1) % perguntas.length;
  document.getElementById('answer-input').value = "";
  loadQuestion();
}
