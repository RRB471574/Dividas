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
    const progressBar = document.createElement('progress');

    progressBar.id = 'barra-progresso';
    progressBar.value = 0;
    progressBar.max = 100;
    document.body.insertBefore(progressBar, listaCompras);

    // Carregar a lista ao iniciar
    carregarLista();

    // Atualizar o tema com base no localStorage
    const temaSalvo = localStorage.getItem('tema') || 'tema1';
    temaSelect.value = temaSalvo;
    mudarTema(temaSalvo);

    temaSelect.addEventListener('change', function() {
        mudarTema(temaSelect.value);
        localStorage.setItem('tema', temaSelect.value);
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const item = itemInput.value;
        const quantidade = quantidadeInput.value;
        const imagem = imagemInput.files[0];
        const precoLoja1 = precoLoja1Input.value;
        const precoLoja2 = precoLoja2Input.value || 'N/A';
        const precoLoja3 = precoLoja3Input.value || 'N/A';
        const categoria = categoriaSelect.value;

        if (!imagem) {
            alert('Por favor, selecione uma imagem.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const precoLojas = {
                loja1: parseFloat(precoLoja1).toFixed(2),
                loja2: precoLoja2 !== 'N/A' ? parseFloat(precoLoja2).toFixed(2) : 'N/A',
                loja3: precoLoja3 !== 'N/A' ? parseFloat(precoLoja3).toFixed(2) : 'N/A'
            };
            const dataHora = new Date().toLocaleString();
            adicionarItemNaLista(item, quantidade, precoLojas, categoria, event.target.result, dataHora);

            itemInput.value = '';
            quantidadeInput.value = '';
            imagemInput.value = '';
            precoLoja1Input.value = '';
            precoLoja2Input.value = '';
            precoLoja3Input.value = '';
            categoriaSelect.value = '';
        };
        reader.readAsDataURL(imagem);
    });

    botaoSalvar.addEventListener('click', function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text("Lista de Compras", 10, 10);

        listaCompras.querySelectorAll('li').forEach((li, index) => {
            const itemTexto = li.querySelector('strong').textContent;
            const quantidade = li.querySelector('.quantidade').textContent;
            const categoria = li.querySelector('.categoria').textContent;
            const dataHora = li.querySelector('.dataHora').textContent;

            doc.text(`${index + 1}. ${itemTexto} - ${quantidade} - ${categoria} - ${dataHora}`, 10, 20 + (index * 10));
        });
        
        doc.save('lista_de_compras.pdf');
    });

    function adicionarItemNaLista(item, quantidade, precoLojas, categoria, imagemSrc, dataHora) {
        const li = document.createElement('li');
        li.className = 'fade-in'; // Classe de animação de entrada
        li.innerHTML = `
            <input type="checkbox" class="comprado-checkbox">
            <img src="${imagemSrc}" alt="Imagem de ${item}" class="item-imagem">
            <div>
                <strong>${item}</strong> <span class="quantidade">(Quantidade: ${quantidade})</span>
                <p>Preços: 
                Loja 1: R$${precoLojas.loja1}, 
                Loja 2: ${precoLojas.loja2 !== 'N/A' ? `R$${precoLojas.loja2}` : 'N/A'}, 
                Loja 3: ${precoLojas.loja3 !== 'N/A' ? `R$${precoLojas.loja3}` : 'N/A'}
                </p>
                <span class="categoria">(${categoria})</span>
                <small class="dataHora">${dataHora}</small>
            </div>
            <button class="remover">Remover</button>
        `;
        listaCompras.appendChild(li);

        li.querySelector('.comprado-checkbox').addEventListener('change', atualizarBarraProgresso);
        li.querySelector('.remover').addEventListener('click', function() {
            listaCompras.removeChild(li);
            salvarLista();
            atualizarBarraProgresso();
        });

        salvarLista();
        atualizarBarraProgresso();
    }

    function atualizarBarraProgresso() {
        const totalItens = listaCompras.querySelectorAll('li').length;
        const itensComprados = listaCompras.querySelectorAll('.comprado-checkbox:checked').length;
        progressBar.value = totalItens ? (itensComprados / totalItens) * 100 : 0;
    }

    function salvarLista() {
        const itens = [];
        listaCompras.querySelectorAll('li').forEach(li => {
            const itemNome = li.querySelector('strong').textContent;
            const quantidade = li.querySelector('.quantidade').textContent.replace(/[^0-9]/g, '');
            const categoria = li.querySelector('.categoria').textContent.replace(/[()]/g, '');
            const dataHora = li.querySelector('.dataHora').textContent;
            itens.push({ itemNome, quantidade, categoria, dataHora });
        });
        localStorage.setItem('listaCompras', JSON.stringify(itens));
    }

    function carregarLista() {
        const itensSalvos = JSON.parse(localStorage.getItem('listaCompras')) || [];
        itensSalvos.forEach(({ itemNome, quantidade, categoria, dataHora }) => {
            const precoLojas = {
                loja1: '0.00',
                loja2: 'N/A',
                loja3: 'N/A'
            };
            adicionarItemNaLista(itemNome, quantidade, precoLojas, categoria, '', dataHora);
        });
    }

    function mudarTema(tema) {
        document.body.className = tema;
    }
});
