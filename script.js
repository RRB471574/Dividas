document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-item');
    const listaCompras = document.getElementById('lista-compras');
    const itemInput = document.getElementById('item');
    const quantidadeInput = document.getElementById('quantidade');
    const imagemUrlInput = document.getElementById('imagem-url');

    if (!form || !listaCompras || !itemInput || !quantidadeInput || !imagemUrlInput) {
        console.error("Erro: Um ou mais elementos não foram encontrados.");
        return;
    }

    function salvarListaNoLocalStorage() {
        const itens = [];
        document.querySelectorAll('#lista-compras li').forEach((li) => {
            const quantidadeItem = li.querySelector('.quantidade-item').textContent;
            const nomeItem = li.querySelector('.nome-item').textContent;
            const imagemItem = li.querySelector('img').src;
            itens.push({ quantidade: quantidadeItem, nome: nomeItem, imagem: imagemItem });
        });
        localStorage.setItem('listaCompras', JSON.stringify(itens));
    }

    function carregarListaDoLocalStorage() {
        const itens = JSON.parse(localStorage.getItem('listaCompras'));
        if (itens) {
            itens.forEach((item) => {
                adicionarItemNaLista(item.quantidade, item.nome, item.imagem);
            });
        }
    }

    function adicionarItemNaLista(quantidade, nome, imagemUrl) {
        const li = document.createElement('li');

        // Cria e configura a imagem
        const img = document.createElement('img');
        img.src = imagemUrl;
        img.alt = nome;
        img.style.width = '50px';
        img.style.height = '50px';
        img.style.marginRight = '10px';

        // Cria os elementos de texto para o nome e quantidade
        const textoQuantidade = document.createElement('span');
        textoQuantidade.classList.add('quantidade-item');
        textoQuantidade.textContent = `${quantidade} x `;

        const textoNome = document.createElement('span');
        textoNome.classList.add('nome-item');
        textoNome.textContent = nome;

        // Cria o botão de remover
        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.style.marginLeft = '10px';

        botaoRemover.addEventListener('click', function() {
            li.remove();
            salvarListaNoLocalStorage();
        });

        // Adiciona imagem, texto e botão ao item da lista
        li.appendChild(img);
        li.appendChild(textoQuantidade);
        li.appendChild(textoNome);
        li.appendChild(botaoRemover);
        listaCompras.appendChild(li);
    }

    carregarListaDoLocalStorage();

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const item = itemInput.value;
        const quantidade = quantidadeInput.value;
        const imagemUrl = imagemUrlInput.value;

        if (item && quantidade && imagemUrl) {
            adicionarItemNaLista(quantidade, item, imagemUrl);

            salvarListaNoLocalStorage();

            itemInput.value = '';
            quantidadeInput.value = '';
            imagemUrlInput.value = '';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
});
