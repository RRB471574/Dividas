document.addEventListener('DOMContentLoaded', function () {
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
            novaListaItem.classList.toggle('comprado-item');
            btnComprado.innerHTML = novaListaItem.classList.contains('comprado-item') ? '❌' : '✔️';
            salvarLista();
            atualizarListaCompartilhamento(); // Atualiza a lista compartilhada
        });

        // Funcionalidade de remover o item
        const btnRemover = novaListaItem.querySelector('.remover');
        btnRemover.addEventListener('click', function () {
            novaListaItem.remove();
            salvarLista();
            atualizarListaCompartilhamento(); // Atualiza a lista compartilhada
        });

        atualizarListaCompartilhamento(); // Atualiza a lista compartilhada
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
            adicionarItem(item, quantidade, event.target.result, false);
            salvarLista();

            // Limpa os campos após adicionar o item
            document.getElementById('item').value = '';
            document.getElementById('quantidade').value = '';
            document.getElementById('imagem').value = '';
        };

        reader.readAsDataURL(imagem);
    });

    // Atualiza a área de compartilhamento da lista
    function atualizarListaCompartilhamento() {
        const listaSalva = localStorage.getItem('listaCompras');
        if (listaSalva) {
            const listaItems = JSON.parse(listaSalva);
            const textoLista = listaItems.map(item => `${item.quantidade}x ${item.nome} - ${item.comprado ? 'Comprado' : 'Não Comprado'}`).join('\n');
            document.getElementById('lista-compartilhamento').value = textoLista;
        } else {
            document.getElementById('lista-compartilhamento').value = ''; // Limpa o campo se a lista estiver vazia
        }
    }

    // Copia a lista para a área de transferência
    document.getElementById('copiar-lista').addEventListener('click', function() {
        const listaTextArea = document.getElementById('lista-compartilhamento');
        listaTextArea.select();
        document.execCommand('copy');
        alert("Lista copiada para a área de transferência!");
    });
});
