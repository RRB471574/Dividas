let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let questions = []; // Para armazenar as perguntas

const questionElement = document.getElementById('question');
const feedback = document.getElementById('feedback');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-button');
const scoreDisplay = document.getElementById('score-display');

async function loadQuestions() {
    const response = await fetch('perguntas.json');
    const data = await response.json();
    questions = data; // Armazena as perguntas carregadas
}

async function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.innerText = currentQuestion.pergunta;
        answerInput.value = '';
        feedback.innerText = '';
    } else {
        showResults();
    }
}

function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase(); // Normaliza a resposta do usuário
    const correctAnswer = questions[currentQuestionIndex].resposta.trim().toLowerCase(); // Normaliza a resposta correta

    if (userAnswer === correctAnswer) {
        feedback.innerHTML = "Resposta correta!";
        correctAnswers++; // Incrementa contador de acertos
    } else {
        feedback.innerHTML = "Resposta incorreta. Tente novamente!";
        incorrectAnswers++; // Incrementa contador de erros
    }

    currentQuestionIndex++;
    showQuestion();
    updateScoreDisplay(); // Atualiza o contador na tela
}

function updateScoreDisplay() {
    scoreDisplay.innerText = `Acertos: ${correctAnswers} | Erros: ${incorrectAnswers}`;
}

function showResults() {
    questionElement.innerText = "Fim das perguntas!";
    feedback.innerHTML = `Você acertou ${correctAnswers} de ${currentQuestionIndex} perguntas.`;
    submitButton.style.display = 'none'; // Oculta o botão de envio
}

submitButton.addEventListener('click', checkAnswer);
loadQuestions().then(showQuestion); // Chama a função para carregar as perguntas e mostrar a primeira
