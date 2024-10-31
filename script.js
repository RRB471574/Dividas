let perguntas = [];
let perguntaAtual = 0;

document.addEventListener('DOMContentLoaded', function() {
    carregarPerguntas();
    document.getElementById('botao-responder').addEventListener('click', mostrarPergunta);
});

function carregarPerguntas() {
    fetch('perguntas.json')
        .then(response => response.json())
        .then(data => {
            perguntas = data.perguntas; // Supondo que seu JSON tem uma propriedade 'perguntas'
            mostrarPergunta();
        })
        .catch(error => console.error('Erro ao carregar perguntas:', error));
}

function mostrarPergunta() {
    if (perguntas.length > 0 && perguntaAtual < perguntas.length) {
        const pergunta = perguntas[perguntaAtual];
        document.getElementById('pergunta').innerText = pergunta.pergunta; // Supondo que cada pergunta tem uma propriedade 'pergunta'
    } else {
        document.getElementById('pergunta').innerText = "Fim das perguntas!";
    }
}
