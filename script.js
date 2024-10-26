document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-lista');
    const listaCompras = document.getElementById('lista-compras');
    const botaoSalvar = document.getElementById('salvar-lista');
    const temaSelect = document.getElementById('tema');

    const itemInput = document.getElementById('item');
    const quantidadeInput = document.getElementById('quantidade');
    const imagemInput = document.getElementById('imagem');
    const precoLoja1Input = document.getElementById('preco-loja1');
    const precoLoja2Input = document.getElementById('preco-loja2');
    const precoLoja3Input = document.getElementById('preco-loja3');
    const categoriaSelect = document.getElementById('categoria');

    // Função para carregar a lista do localStorage
    function carregarLista() {
        const listaSalva = localStorage.getItem('listaCompras');
        if (listaSalva) {
            const itens = JSON.parse(listaSalva);
            itens.forEach(item => adicionarItemNaLista(item.nome, item.quantidade, item.precoLojas, item.categoria, item.imagem, item.dataHora));
        }
    }

    // Função para adicionar um item à lista
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const item = itemInput.value;
        const quantidade = quantidadeInput.value;
        const imagem = imagemInput.files[0];

        if (!imagem) {
            console.error('Por favor, selecione uma imagem.');
            return;
        }

        // Carregar a imagem e processar o formulário
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

            // Adicionar data e hora atuais
            const dataHora = new Date().toLocaleString();

            if (item && quantidade && precoLojas.loja1 && categoria) {
                adicionarItemNaLista(item, quantidade, precoLojas, categoria, event.target.result, dataHora);

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

        // Ler o arquivo de imagem como uma URL de dados base64
        reader.readAsDataURL(imagem);
    });

    // Função auxiliar para adicionar um item à lista visualmente e para salvar
    function adicionarItemNaLista(item, quantidade, precoLojas, categoria, imagemSrc, dataHora) {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${item}</strong> - Quantidade: ${quantidade} 
                <br> Preços: 
                Loja 1: R$${parseFloat(precoLojas.loja1).toFixed(2)}, 
                Loja 2: ${precoLojas.loja2 !== 'N/A' ? `R$${parseFloat(precoLojas.loja2).toFixed(2)}` : 'N/A'}, 
                Loja 3: ${precoLojas.loja3 !== 'N/A' ? `R$${parseFloat(precoLojas.loja3).toFixed(2)}` : 'N/A'}
                <span class="categoria">(${categoria})</span>
                <br><small>Adicionado em: ${dataHora}</small>
            </div>
            <img src="${imagemSrc}" alt="Imagem de ${item}" style="max-width: 100px; max-height: 100px;">
            <button class="remover">Remover</button>
        `;

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
            const itemTexto = li.querySelector('strong').textContent;
            const quantidade = parseFloat(li.querySelector('div').textContent.split(' - ')[1].replace('Quantidade: ', ''));
            
            const precoTexto = li.querySelector('div').textContent.split('Preços: ')[1].split(', ');
            const precoLojas = {
                loja1: parseFloat(precoTexto[0].replace('Loja 1: R$', '')),
                loja2: precoTexto[1].includes('R$') ? parseFloat(precoTexto[1].replace('Loja 2: R$', '')) : 'N/A',
                loja3: precoTexto[2].includes('R$') ? parseFloat(precoTexto[2].replace('Loja 3: R$', '')) : 'N/A'
            };

            const categoria = li.querySelector('.categoria').textContent.replace(/[()]/g, '');
            const imagem = li.querySelector('img').src;
            const dataHora = li.querySelector('small').textContent.replace('Adicionado em: ', '');

            itens.push({ nome: itemTexto, quantidade, precoLojas, categoria, imagem, dataHora });
        });

        localStorage.setItem('listaCompras', JSON.stringify(itens));
    }

    carregarLista();
    botaoSalvar.addEventListener('click', salvarLista);
});
