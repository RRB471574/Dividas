// Aguarda até que o DOM seja carregado
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-lista');
    const listaCompras = document.getElementById('lista-compras');

    // Função para adicionar um item à lista
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita que o formulário recarregue a página

        const item = document.getElementById('item').value;
        const quantidade = document.getElementById('quantidade').value;
        const categoria = document.getElementById('categoria').value;

        if (item && quantidade && categoria) {
            // Cria um novo elemento <li> para o item
            const li = document.createElement('li');
            li.innerHTML = `${item} - Quantidade: ${quantidade} <span class="categoria">(${categoria})</span> <button class="remover">Remover</button>`;

            // Adiciona o novo item à lista
            listaCompras.appendChild(li);

            // Limpa os campos do formulário
            document.getElementById('item').value = '';
            document.getElementById('quantidade').value = '';
            document.getElementById('categoria').value = '';

            // Adiciona a funcionalidade de remover o item
            const botaoRemover = li.querySelector('.remover');
            botaoRemover.addEventListener('click', function() {
                listaCompras.removeChild(li);
            });
        }
    });
});
