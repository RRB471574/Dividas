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
            itens.forEach(item => adicionarItemNaLista(item.nome, item.quantidade, item.precoLojas, item.categoria));
        }
    }

    // Função para adicionar um item à lista
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita que o formulário recarregue a página

        const item = document.getElementById('item').value;
        const quantidade = document.getElementById('quantidade').value;

        // Captura os preços das lojas
        const precoLoja1 = document.getElementById('preco-loja1').value;
        const precoLoja2 = document.getElementById('preco-loja2').value || 'N/A';
        const precoLoja3 = document.getElementById('preco-loja3').value || 'N/A';

        const precoLojas = {
            loja1: precoLoja1,
            loja2: precoLoja2,
            loja3: precoLoja3
        };

        const categoria = document.getElementById('categoria').value;

        if (item && quantidade && precoLojas.loja1 && categoria) {
            adicionarItemNaLista(item, quantidade, precoLojas, categoria);

            // Limpa os campos do formulário
            document.getElementById('item').value = '';
            document.getElementById('quantidade').value = '';
            document.getElementById('preco-loja1').value = '';
            document.getElementById('preco-loja2').value = '';
            document.getElementById('preco-loja3').value = '';
            document.getElementById('categoria').value = '';
        }
    });

    // Função auxiliar para adicionar um item na lista visualmente e para salvar
    function adicionarItemNaLista(item, quantidade, precoLojas, categoria) {
        // Cria um novo elemento <li> para o item
        const li = document.createElement('li');
        li.innerHTML = `${item} - Quantidade: ${quantidade} - 
        Preços: Loja 1: R$${parseFloat(precoLojas.loja1).toFixed(2)}, 
        Loja 2: ${precoLojas.loja2 !== 'N/A' ? `R$${parseFloat(precoLojas.loja2).toFixed(2)}` : 'N/A'}, 
        Loja 3: ${precoLojas.loja3 !== 'N/A' ? `R$${parseFloat(precoLojas.loja3).toFixed(2)}` : 'N/A'} 
        <span class="categoria">(${categoria})</span> <button class="remover">Remover</button>`;

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

            const precoTexto = itemTexto[2].replace('Preços: ', '').split(', ');
            const precoLojas = {
                loja1: parseFloat(precoTexto[0].replace('Loja 1: R$', '')),
                loja2: precoTexto[1].includes('R$') ? parseFloat(precoTexto[1].replace('Loja 2: R$', '')) : 'N/A',
                loja3: precoTexto[2].includes('R$') ? parseFloat(precoTexto[2].replace('Loja 3: R$', '')) : 'N/A'
            };

            const categoria = li.querySelector('.categoria').textContent.replace(/[()]/g, '');

            itens.push({ nome, quantidade, precoLojas, categoria });
        });

        localStorage.setItem('listaCompras', JSON.stringify(itens));
    }

    // Carregar a lista do localStorage ao abrir a página
    carregarLista();

    // Botão para salvar manualmente (opcional)
    botaoSalvar.addEventListener('click', salvarLista);
});
