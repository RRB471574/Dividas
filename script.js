const form = document.getElementById('form-item');
const listaCompras = document.getElementById('lista-compras');

// Carregar a lista do localStorage ao iniciar a página
function carregarLista() {
    const listaSalva = localStorage.getItem('listaCompras');
    if (listaSalva) {
        const lista = JSON.parse(listaSalva);
        lista.forEach(item => {
            adicionarItem(item.item, item.quantidade, item.imagem);
        });
    }
}
carregarLista();

function adicionarItem(item, quantidade, imagem) {
    const novoItem = document.createElement('li');
    novoItem.textContent = `${item} (${quantidade})`;

    // Adicionar botão de remover
    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = 'Remover';
    botaoRemover.addEventListener('click', () => {
        novoItem.remove();
        salvarLista(); // Salvar a lista após a remoção
    });
    novoItem.appendChild(botaoRemover);

    if (imagem) {
        const img = document.createElement('img');
        img.src = imagem;
        novoItem.appendChild(img);
    }

    listaCompras.appendChild(novoItem);
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // ... (resto do código para adicionar um novo item)

    salvarLista();
});

function salvarLista() {
    // ... (código para salvar a lista no localStorage)
}
