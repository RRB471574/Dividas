const form = document.getElementById('form-item');
const listaCompras = document.getElementById('lista-compras');

// Carregar a lista do localStorage ao iniciar a página
function carregarLista() {
  const listaSalva = localStorage.getItem('listaCompras');
  if (listaSalva) {
    const lista = JSON.parse(listaSalva);
    lista.forEach(item => {
      adicionarItem(item.item, item.quantidade);
    });
  }
}
carregarLista();

function adicionarItem(item, quantidade) {
  const novoItem = document.createElement('li');
  novoItem.textContent = `${item} (${quantidade})`;

  // Botão para remover o item
  const botaoRemover = document.createElement('button');
  botaoRemover.textContent = 'Remover';
  botaoRemover.addEventListener('click', () => {
    novoItem.remove();
    salvarLista();
  });
  novoItem.appendChild(botaoRemover);

  listaCompras.appendChild(novoItem);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const item = document.getElementById('item').value;
  const quantidade = document.getElementById('quantidade').value;

  adicionarItem(item, quantidade);
  salvarLista();
  form.reset();
});

function salvarLista() {
  const lista = [];
  Array.from(listaCompras.children).forEach(li => {
    lista.push({
      item: li.textContent.replace(/ \(\d+\)$/, ''),
      quantidade: li.textContent.match(/\(\d+\)/)[1].slice(1, -1)
    });
  });
  localStorage.setItem('listaCompras', JSON.stringify(lista));
}
