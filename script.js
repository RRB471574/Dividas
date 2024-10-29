// Função para salvar a lista de compras no localStorage
function salvarLista() {
    const listaItems = [];
    const listaElementos = document.querySelectorAll('#lista-compras li');

    listaElementos.forEach(item => {
        const nome = item.querySelector('.nome-item').innerText;
        const quantidade = item.querySelector('.quantidade-item').innerText;
        const imagemSrc = item.querySelector('img').src;
        const comprado = item.classList.contains('comprado-item');

        listaItems.push({ nome, quantidade, imagemSrc, comprado });
    });

    localStorage.setItem('listaCompras', JSON.stringify(listaItems));
}

// Função para carregar a lista de compras do localStorage
function carregarLista() {
    const listaSalva = localStorage.getItem('listaCompras');
    if (listaSalva) {
        const listaItems = JSON.parse(listaSalva);
        listaItems.forEach(item => {
            adicionarItem(item.nome, item.quantidade, item.imagemSrc, item.comprado);
        });
    }
}

// Função para adicionar um item à lista
function adicionarItem(nome, quantidade, imagemSrc, comprado) {
    const novaListaItem = document.createElement('li');
    novaListaItem.classList.add('item');

    novaListaItem.innerHTML = `
        <img src="${imagemSrc}" alt="${nome}">
        <span class="nome-item">${nome}</span>
        <span class="quantidade-item">${quantidade}</span>
        <button class="comprado">${comprado ? '❌' : '✔️'}</button>
        <button class="remover">❌</button>
    `;

    document.getElementById('lista-compras').appendChild(novaListaItem);

    // Funcionalidade de marcar como comprado
    const btnComprado = novaListaItem.querySelector('.comprado');
    btnComprado.addEventListener('click', function () {
        novaListaItem.classList.toggle('comprado-item'); // Alterna a classe para marcar/desmarcar
        // Atualiza o texto do botão
        btnComprado.innerHTML = novaListaItem.classList.contains('comprado-item') ? '❌' : '✔️';
        salvarLista(); // Salva a lista após a alteração
    });

    // Funcionalidade de remover o item
    const btnRemover = novaListaItem.querySelector('.remover');
    btnRemover.addEventListener('click', function () {
        novaListaItem.remove(); // Remove o item da lista
        salvarLista(); // Salva a lista após a remoção
    });
}

// Carrega a lista ao iniciar
carregarLista();

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
        adicionarItem(item, quantidade, event.target.result, false); // Adiciona o item com comprado como false
        salvarLista(); // Salva a lista após adicionar um novo item

        // Limpa os campos após adicionar o item
        document.getElementById('item').value = '';
        document.getElementById('quantidade').value = '';
        document.getElementById('imagem').value = '';
    };

    reader.readAsDataURL(imagem);
});
