// Carregando perguntas do arquivo JSON
let perguntas = [];
let perguntaAtual = 0;
let acertos = 0;
let erros = 0;

fetch('perguntas.json')
    .then(response => response.json())
    .then(data => {
        perguntas = data.perguntas;
        mostrarPergunta();
    })
    .catch(error => console.error('Erro ao carregar perguntas:', error));

// Função para mostrar a pergunta atual
function mostrarPergunta() {
    if (perguntaAtual < perguntas.length) {
        document.getElementById('pergunta').textContent = perguntas[perguntaAtual].pergunta;
        document.getElementById('resposta').value = ''; // Limpa a resposta anterior
        document.getElementById('feedback').textContent = ''; // Limpa feedback anterior
        document.getElementById('dica').style.display = 'none'; // Limpa a dica anterior
    } else {
        document.getElementById('pergunta').textContent = 'Fim do quiz! Você teve ' + acertos + ' acertos e ' + erros + ' erros.';
        document.getElementById('resposta').style.display = 'none';
        document.getElementById('btnResponder').style.display = 'none';
        document.getElementById('btnPular').style.display = 'none';
        document.getElementById('btnDica').style.display = 'none';
    }
}

// Função para verificar a resposta
document.getElementById('btnResponder').addEventListener('click', function() {
    const respostaUsuario = document.getElementById('resposta').value.trim().toLowerCase();
    const respostaCorreta = perguntas[perguntaAtual].resposta.trim().toLowerCase();

    if (respostaUsuario === '') {
        document.getElementById('feedback').textContent = 'Por favor, digite uma resposta.';
        return;
    }

    if (respostaUsuario.includes(respostaCorreta) || respostaCorreta.includes(respostaUsuario)) {
        acertos++;
        document.getElementById('feedback').textContent = 'Resposta correta!';
    } else {
        erros++;
        document.getElementById('feedback').textContent = 'Resposta incorreta! A resposta correta é: ' + perguntas[perguntaAtual].resposta;
    }

    document.getElementById('acertos').textContent = acertos;
    document.getElementById('erros').textContent = erros;
    perguntaAtual++;
    mostrarPergunta();
});

// Função para pular a pergunta
document.getElementById('btnPular').addEventListener('click', function() {
    erros++;
    document.getElementById('feedback').textContent = 'Pergunta pulada!';
    document.getElementById('acertos').textContent = acertos;
    document.getElementById('erros').textContent = erros;
    perguntaAtual++;
    mostrarPergunta();
});

// Função para dar dicas
document.getElementById('btnDica').addEventListener('click', function() {
    const dica = perguntas[perguntaAtual].dica; // Obtém a dica da pergunta atual
    document.getElementById('dica').textContent = dica; // Exibe a dica
    document.getElementById('dica').style.display = 'block'; // Mostra a dica
});
