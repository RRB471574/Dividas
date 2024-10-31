let perguntas = [];
let perguntaAtualIndex = 0;

// Função para carregar perguntas do arquivo JSON
function carregarPerguntas() {
    fetch('perguntas.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON');
            }
            return response.json();
        })
        .then(data => {
            perguntas = data.perguntas; // Acesse o array de perguntas corretamente
            mostrarPergunta();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

// Função para mostrar a pergunta atual
function mostrarPergunta() {
    if (perguntas && perguntas.length > 0) {
        const perguntaAtual = perguntas[perguntaAtualIndex];
        document.getElementById('pergunta').textContent = perguntaAtual.pergunta;
        document.getElementById('dica').textContent = `Dica: ${perguntaAtual.dica}`;
        // Limpa respostas anteriores
        document.getElementById('respostas').innerHTML = '';
        
        // Adiciona a resposta correta
        const respostaElement = document.createElement('div');
        respostaElement.textContent = `Resposta: ${perguntaAtual.resposta}`;
        document.getElementById('respostas').appendChild(respostaElement);
        
    } else {
        console.error("As perguntas não foram carregadas corretamente.");
    }
}

// Função para mostrar a próxima pergunta
function mostrarProximaPergunta() {
    perguntaAtualIndex++;
    if (perguntaAtualIndex < perguntas.length) {
        mostrarPergunta();
    } else {
        document.getElementById('pergunta').textContent = 'Você completou todas as perguntas!';
        document.getElementById('respostas').innerHTML = '';
        document.getElementById('dica').textContent = '';
        document.getElementById('proxima').style.display = 'none'; // Esconde o botão
    }
}

// Inicia o carregamento das perguntas
carregarPerguntas();
