document.getElementById('form-item').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Pega os valores dos campos de entrada
    const item = document.getElementById('item').value;
    const quantidade = document.getElementById('quantidade').value;

    // Verifica se os campos de entrada não estão vazios
    if (item && quantidade) {
        // Cria um novo item da lista
        const li = document.createElement('li');
        li.textContent = `${quantidade} x ${item}`; // Formata o texto

        // Adiciona o novo item à lista de compras
        document.getElementById('lista-compras').appendChild(li);

        // Limpa os campos de entrada
        document.getElementById('item').value = '';
        document.getElementById('quantidade').value = '';
    } else {
        alert('Por favor, preencha ambos os campos.');
    }
});
