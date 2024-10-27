const form = document.getElementById('form-item');
const listaCompras = document.getElementById('lista-compras');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const item = document.getElementById('item').value;
    const quantidade = document.getElementById('quantidade').value;
    const imagem = document.getElementById('imagem').files[0];

    // Criar um elemento li para representar o item
    const novoItem = document.createElement('li');

    // Criar um elemento img para exibir a imagem
    const img = document.createElement('img');
    img.src = URL.createObjectURL(imagem);

    // Adicionar o texto do item, a quantidade e a imagem ao li
    novoItem.textContent = `${item} (${quantidade})`;
    novoItem.appendChild(img);

    listaCompras.appendChild(novoItem);

    form.reset();
});
