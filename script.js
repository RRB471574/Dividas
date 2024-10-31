let questions = [];
let currentQuestionIndex = 0;

fetch('perguntas.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    showQuestion();
  });

function showQuestion() {
  const questionContainer = document.getElementById('question-container');
  const question = questions[currentQuestionIndex];

  questionContainer.innerHTML = `<h2>${question.pergunta}</h2>`;
  document.getElementById('answer-input').value = ''; // Limpa o campo de resposta
}

function checkAnswer() {
  const answerInput = document.getElementById('answer-input');
  const feedback = document.getElementById('feedback');
  const question = questions[currentQuestionIndex];

  const userAnswer = answerInput.value.trim().toLowerCase(); // Normaliza a resposta do usuário
  const correctAnswer = question.resposta.trim().toLowerCase(); // Normaliza a resposta correta

  // Verifica se a resposta do usuário não está vazia
  if (userAnswer === "") {
    feedback.innerHTML = "Por favor, digite sua resposta antes de responder.";
    return; // Interrompe a execução se não houver resposta
  }

  if (userAnswer === correctAnswer) {
    feedback.innerHTML = "Resposta correta!";
  } else {
    feedback.innerHTML = "Resposta incorreta. Tente novamente!";
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    feedback.innerHTML += "<br>Fim das perguntas!";
  }
}

function skipQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    document.getElementById('feedback').innerHTML = ''; // Limpa o feedback ao pular
  } else {
    document.getElementById('feedback').innerHTML = 'Fim das perguntas!';
  }
}
