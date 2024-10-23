// Certifique-se de que o DOM foi completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Exemplo de como adicionar o event listener a um botão
    const botao = document.getElementById('seu-botao'); // Substitua 'seu-botao' pelo ID correto do elemento

    if (botao) {
        botao.addEventListener('click', function() {
            // Sua lógica aqui
            console.log('Botão clicado!');
        });
    } else {
        console.error('Elemento com o ID "seu-botao" não foi encontrado.');
    }

    // Outro exemplo com outro elemento, caso haja mais elementos para adicionar eventos
    const outroElemento = document.getElementById('outro-elemento'); // Substitua pelo ID correto

    if (outroElemento) {
        outroElemento.addEventListener('click', function() {
            // Lógica para o segundo elemento
            console.log('Outro elemento clicado!');
        });
    } else {
        console.error('Elemento com o ID "outro-elemento" não foi encontrado.');
    }

    // Adicione mais listeners conforme necessário para outros elementos
});
