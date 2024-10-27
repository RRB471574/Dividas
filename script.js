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

    if (imagem) {
        const img = document.createElement('img');
        img.src = imagem;
        novoItem.appendChild(img);
    }

    listaCompras.appendChild(novoItem);
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const item = document.getElementById('item').value;
    const quantidade = document.getElementById('quantidade').value;
    const imagem = document.getElementById('imagem').files[0];
    const imageUrl = imagem ? URL.createObjectURL(imagem) : null;

    adicionarItem(item, quantidade, imageUrl);

    // Salvar a lista atualizada no localStorage
    const lista = [];
    Array.from(listaCompras.children).forEach(li => {
        const img = li.querySelector('img');
        lista.push({
            item: li.textContent.replace(/ \(\d+\)$/, ''),
            quantidade: li.textContent.match(/\(\d+\)/)[1].slice(1, -1),
            imagem: img ? img.src : null
        });
    });
    localStorage.setItem('listaCompras', JSON.stringify(lista));

    form.reset();
});
