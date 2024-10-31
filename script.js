let perguntas = [];
let perguntaAtual = 0;

// Função para carregar perguntas do JSON
async function carregarPerguntas() {
    try {
        const resposta = await fetch('perguntas.json');
        if (!resposta.ok) {
            throw new Error('Erro ao carregar perguntas');
        }
        perguntas = await resposta.json();
        mostrarPergunta();
    } catch (error) {
        console.error('Erro ao carregar perguntas:', error);
    }
}

// Função para mostrar a pergunta atual
function mostrarPergunta() {
    const perguntaEl = document.getElementById('pergunta');
    const respostaEl = document.getElementById('resposta');

    if (perguntaAtual < perguntas.length) {
        const perguntaAtualObj = perguntas[perguntaAtual];
        perguntaEl.textContent = perguntaAtualObj.pergunta;
        respostaEl.value = ''; // Limpa o campo de resposta
    } else {
        // Fim das perguntas
        perguntaEl.textContent = 'Fim das perguntas';
        respostaEl.style.display = 'none'; // Esconde o campo de resposta
        document.getElementById('btn-responder').style.display = 'none'; // Esconde o botão de resposta
    }
}

// Função chamada ao responder a pergunta
function responder() {
    const respostaEl = document.getElementById('resposta');
    if (respostaEl.value.toLowerCase() === perguntas[perguntaAtual].resposta.toLowerCase()) {
        alert('Resposta correta!');
    } else {
        alert('Resposta incorreta! A resposta correta é: ' + perguntas[perguntaAtual].resposta);
    }
    perguntaAtual++;
    mostrarPergunta();
}

// Adiciona event listeners
document.getElementById('btn-responder').addEventListener('click', responder);

// Carrega as perguntas ao iniciar
carregarPerguntas();
