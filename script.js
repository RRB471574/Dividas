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

// Adiciona evento ao formulário
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

// Gerar link para compartilhar a lista
document.getElementById('gerar-link').addEventListener('click', function() {
    const listaSalva = localStorage.getItem('listaCompras');
    if (!listaSalva) {
        alert("A lista está vazia. Adicione itens antes de gerar o link.");
        return;
    }
    
    const encodedLista = encodeURIComponent(listaSalva);
    const link = `${window.location.href}?lista=${encodedLista}`;
    document.getElementById('link-compartilhamento').value = link;
});

// Carregar lista a partir de um link
document.getElementById('carregar-lista').addEventListener('click', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const listaParam = urlParams.get('lista');

    if (listaParam) {
        const listaDecodificada = decodeURIComponent(listaParam);
        const listaItems = JSON.parse(listaDecodificada);
        document.getElementById('lista-compras').innerHTML = ''; // Limpa a lista atual
        listaItems.forEach(item => {
            adicionarItem(item.nome, item.quantidade, item.imagemSrc, item.comprado);
        });
        alert("Lista carregada com sucesso!");
    } else {
        alert("Nenhuma lista para carregar.");
    }
});
