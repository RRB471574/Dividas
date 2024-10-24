document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-lista');
    const listaCompras = document.getElementById('lista-compras');
    const botaoSalvar = document.getElementById('salvar-lista');

    const itemInput = document.getElementById('item');
    const quantidadeInput = document.getElementById('quantidade');
    const imagemInput = document.getElementById('imagem');
    const precoLoja1Input = document.getElementById('preco-loja1');
    const precoLoja2Input = document.getElementById('preco-loja2');
    const precoLoja3Input = document.getElementById('preco-loja3');
    const categoriaSelect = document.getElementById('categoria');

    // Carregar a lista do localStorage
    function carregarLista() {
        const listaSalva = localStorage.getItem('listaCompras');
        if (listaSalva) {
            const itens = JSON.parse(listaSalva);
            itens.forEach(item => adicionarItemNaLista(item.nome, item.quantidade, item.precoLojas, item.categoria, item.imagem));
        }
    }

    // Adicionar item à lista
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const item = itemInput.value;
        const quantidade = quantidadeInput.value;
        const imagem = imagemInput.files[0];

        // Verifique se a imagem foi selecionada
        if (!imagem) {
            console.error('Por favor, selecione uma imagem.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const precoLoja1 = precoLoja1Input.value;
            const precoLoja2 = precoLoja2Input.value || 'N/A';
            const precoLoja3 = precoLoja3Input.value || 'N/A';

            const precoLojas = {
                loja1: precoLoja1,
                loja2: precoLoja2,
                loja3: precoLoja3
            };

            const categoria = categoriaSelect.value;

            if (item && quantidade && precoLojas.loja1 && categoria) {
                adicionarItemNaLista(item, quantidade, precoLojas, categoria, event.target.result);

                // Limpa os campos do formulário
                itemInput.value = '';
                quantidadeInput.value = '';
                imagemInput.value = '';
                precoLoja1Input.value = '';
                precoLoja2Input.value = '';
                precoLoja3Input.value = '';
                categoriaSelect.value = '';
            } else {
                console.error('Preencha todos os campos obrigatórios.');
            }
        };

        reader.readAsDataURL(imagem);
    });

    // Função auxiliar para adicionar um item na lista
    function adicionarItemNaLista(item, quantidade, precoLojas, categoria, imagemSrc) {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${imagemSrc}" alt="${item}" class="imagem-produto">
            <div>
                ${item} - Quantidade: ${quantidade} - 
                Preços: Loja 1: R$${parseFloat(precoLojas.loja1).toFixed(2)}, 
                Loja 2: ${precoLojas.loja2 !== 'N/A' ? `R$${parseFloat(precoLojas.loja2).toFixed(2)}` : 'N/A'}, 
                Loja 3: ${precoLojas.loja3 !== 'N/A' ? `R$${parseFloat(precoLojas.loja3).toFixed(2)}` : 'N/A'} 
                <span class="categoria">(${categoria})</span> 
                <button class="remover">Remover</button>
            </div>`;

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
            const imagemSrc = li.querySelector('.imagem-produto').src;
            const itemTexto = li.childNodes[1].textContent.split(' - ');
            const nome = itemTexto[0];
            const quantidade = parseFloat(itemTexto[1].replace('Quantidade: ', ''));

            const precoTexto = itemTexto[2].replace('Preços: ', '').split(', ');
            const precoLojas = {
                loja1: parseFloat(precoTexto[0].replace('Loja 1: R$', '')),
                loja2: precoTexto[1].includes('R$') ? parseFloat(precoTexto[1].replace('Loja 2: R$', '')) : 'N/A',
                loja3: precoTexto[2].includes('R$') ? parseFloat(precoTexto[2].replace('Loja 3: R$', '')) : 'N/A'
            };

            const categoria = li.querySelector('.categoria').textContent.replace(/[()]/g, '');

            itens.push({ nome, quantidade, precoLojas, categoria, imagem: imagemSrc });
        });

        localStorage.setItem('listaCompras', JSON.stringify(itens));
    }

    carregarLista();
    botaoSalvar.addEventListener('click', salvarLista);
});
