// Aguarda até que o DOM seja carregado
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-lista');
    const listaCompras = document.getElementById('lista-compras');
    const botaoSalvar = document.getElementById('salvar-lista');

    // Função para carregar a lista do localStorage
    function carregarLista() {
        const listaSalva = localStorage.getItem('listaCompras');
        if (listaSalva) {
            const itens = JSON.parse(listaSalva);
            itens.forEach(item => adicionarItemNaLista(item.nome, item.quantidade, item.preco, item.categoria));
        }
    }

    // Função para adicionar um item à lista
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita que o formulário recarregue a página

        const item = document.getElementById('item').value;
        const quantidade = document.getElementById('quantidade').value;
        const preco = document.getElementById('preco').value;
        const categoria = document.getElementById('categoria').value;

        if (item && quantidade && preco && categoria) {
            adicionarItemNaLista(item, quantidade, preco, categoria);

            // Limpa os campos do formulário
            document.getElementById('item').value = '';
            document.getElementById('quantidade').value = '';
            document.getElementById('preco').value = '';
            document.getElementById('categoria').value = '';
        }
    });

    // Função auxiliar para adicionar um item na lista visualmente e para salvar
    function adicionarItemNaLista(item, quantidade, preco, categoria) {
        const total = (quantidade * preco).toFixed(2); // Calcula o valor total do item

        // Cria um novo elemento <li> para o item
        const li = document.createElement('li');
        li.innerHTML = `${item} - Quantidade: ${quantidade} - Preço Unitário: R$${parseFloat(preco).toFixed(2)} - 
        Total: <span class="total">R$${total}</span> <span class="categoria">(${categoria})</span> <button class="remover">Remover</button>`;

        // Adiciona o novo item à lista
        listaCompras.appendChild(li);

        // Adiciona a funcionalidade de remover o item
        const botaoRemover = li.querySelector('.remover');
        botaoRemover.addEventListener('click', function() {
            listaCompras.removeChild(li);
            salvarLista();
        });

        // Atualiza o localStorage
        salvarLista();
    }

    // Função para salvar a lista no localStorage
    function salvarLista() {
        const itens = [];
        listaCompras.querySelectorAll('li').forEach(li => {
            const itemTexto = li.firstChild.textContent.split(' - ');
            const nome = itemTexto[0];
            const quantidade = parseFloat(itemTexto[1].replace('Quantidade: ', ''));
            const preco = parseFloat(itemTexto[2].replace('Preço Unitário: R$', ''));
            const categoria = li.querySelector('.categoria').textContent.replace(/[()]/g, '');

            itens.push({ nome, quantidade, preco, categoria });
        });

        localStorage.setItem('listaCompras', JSON.stringify(itens));
    }

    // Carregar a lista do localStorage ao abrir a página
    carregarLista();

    // Botão para salvar manualmente (opcional)
    botaoSalvar.addEventListener('click', salvarLista);
});
