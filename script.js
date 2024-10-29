document.getElementById('form-item').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const item = document.getElementById('item').value;
    const quantidade = document.getElementById('quantidade').value;
    const imagem = document.getElementById('imagem').files[0];
    
    if (!item || !quantidade || !imagem) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const novaListaItem = document.createElement('li');
        novaListaItem.classList.add('item');

        novaListaItem.innerHTML = `
            <img src="${event.target.result}" alt="${item}">
            <span class="nome-item">${item}</span>
            <span class="quantidade-item">${quantidade}</span>
            <button class="comprado">✔️</button>
            <button class="remover">❌</button>
        `;

        document.getElementById('lista-compras').appendChild(novaListaItem);

        // Limpa os campos após adicionar o item
        document.getElementById('item').value = '';
        document.getElementById('quantidade').value = '';
        document.getElementById('imagem').value = '';

        // Funcionalidade de marcar como comprado
        const btnComprado = novaListaItem.querySelector('.comprado');
        btnComprado.addEventListener('click', function () {
            // Alterna a classe para marcar/desmarcar como comprado
            novaListaItem.classList.toggle('comprado-item');
            // Alterna o texto do botão
            if (novaListaItem.classList.contains('comprado-item')) {
                btnComprado.innerHTML = '❌'; // Muda para o ícone de desmarcar
            } else {
                btnComprado.innerHTML = '✔️'; // Volta para o ícone de marcar
            }
        });

        // Funcionalidade de remover o item
        const btnRemover = novaListaItem.querySelector('.remover');
        btnRemover.addEventListener('click', function () {
            novaListaItem.remove(); // Remove o item da lista
        });
    };

    reader.readAsDataURL(imagem);
});
