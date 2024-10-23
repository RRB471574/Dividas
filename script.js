document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-lista');
    const listaCompras = document.getElementById('lista-compras');
    const botaoSalvar = document.getElementById('salvar-lista');

    // Verificação para garantir que os campos existem no DOM
    const itemInput = document.getElementById('item');
    const quantidadeInput = document.getElementById('quantidade');
    const precoLoja1Input = document.getElementById('preco-loja1');
    const precoLoja2Input = document.getElementById('preco-loja2');
    const precoLoja3Input = document.getElementById('preco-loja3');
    const categoriaSelect = document.getElementById('categoria');

    // Certifique-se de que os elementos foram encontrados
    if (!itemInput || !quantidadeInput || !precoLoja1Input || !categoriaSelect) {
        console.error('Um ou mais elementos não foram encontrados no DOM. Verifique os IDs no HTML.');
        return;
    }

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

        const item = itemInput.value;
        const quantidade = quantidadeInput.value;

        // Captura os preços das lojas, garantindo que os elementos existam
        const precoLoja1 = precoLoja1Input ? precoLoja1Input.value : null;
        const precoLoja2 = precoLoja2Input ? precoLoja2Input.value || 'N/A' : 'N/A';
        const precoLoja3 = precoLoja3Input ? precoLoja3Input.value || 'N/A' : 'N/A';

        const precoLojas = {
            loja1: precoLoja1,
            loja2: precoLoja2,
            loja3: precoLoja3
        };

        const categoria = categoriaSelect.value;

        // Verifique se todos os valores necessários estão preenchidos
        if (item && quantidade && precoLojas.loja1 && categoria) {
            adicionarItemNaLista(item, quantidade, precoLojas, categoria);

            // Limpa os campos do formulário
            itemInput.value = '';
            quantidadeInput.value = '';
            precoLoja1Input.value = '';
            if (precoLoja2Input) precoLoja2Input.value = '';
            if (precoLoja3Input) precoLoja3Input.value = '';
            categoriaSelect.value = '';
        } else {
            console.error('Preencha todos os campos obrigatórios.');
        }
    });

    // Função auxiliar para adicionar um item na lista visualmente e para salvar
    function adicionarItemNaLista(item, quantidade, precoLojas, categoria) {
        const li = document.createElement('li');
        li.innerHTML = `${item} - Quantidade: ${quantidade} - 
        Preços: Loja 1: R$${parseFloat(precoLojas.loja1).toFixed(2)}, 
        Loja 2: ${precoLojas.loja2 !== 'N/A' ? `R$${parseFloat(precoLojas.loja2).toFixed(2)}` : 'N/A'}, 
        Loja 3: ${precoLojas.loja3 !== 'N/A' ? `R$${parseFloat(precoLojas.loja3).toFixed(2)}` : 'N/A'} 
        <span class="categoria">(${categoria})</span> <button class="remover">Remover</button>`;

        listaCompras.appendChild(li);

        const botaoRemover = li.querySelector('.remover');
        botaoRemover.addEventListener('click', function() {
            listaCompras.removeChild(li);
            salvarLista();
        });

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

    carregarLista();
    botaoSalvar.addEventListener('click', salvarLista);
});
