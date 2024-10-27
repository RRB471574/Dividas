document.addEventListener('DOMContentLoaded', function () {
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

    // Carregar a lista ao iniciar
    carregarLista();

    // Atualizar o tema com base no localStorage
    const temaSalvo = localStorage.getItem('tema') || 'tema1';
    temaSelect.value = temaSalvo;
    mudarTema(temaSalvo);

    temaSelect.addEventListener('change', function () {
        mudarTema(temaSelect.value);
        localStorage.setItem('tema', temaSelect.value);
    });

    form.addEventListener('submit', function (e) {
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
        reader.onload = function (event) {
            const precoLojas = {
                loja1: parseFloat(precoLoja1).toFixed(2),
                loja2: precoLoja2 !== 'N/A' ? parseFloat(precoLoja2).toFixed(2) : 'N/A',
                loja3: precoLoja3 !== 'N/A' ? parseFloat(precoLoja3).toFixed(2) : 'N/A'
            };
            const dataHora = new Date().toLocaleString();
            adicionarItemNaLista(item, quantidade, precoLojas, categoria, event.target.result, dataHora);

            // Limpar os campos do formulário
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

    botaoSalvar.addEventListener('click', function () {
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
        li.classList.add('fade-in');

        li.innerHTML = `
            <img src="${imagemSrc}" alt="${item}" class="item-imagem">
            <strong>${item}</strong>
            <span class="quantidade">${quantidade}</span>
            <span class="categoria">${categoria}</span>
            <span class="dataHora">${dataHora}</span>
            <div>
                <span>Preço Loja 1: R$ ${precoLojas.loja1}</span>
                <span>Preço Loja 2: R$ ${precoLojas.loja2}</span>
                <span>Preço Loja 3: R$ ${precoLojas.loja3}</span>
            </div>
        `;

        listaCompras.appendChild(li);
        li.classList.add('fade-in');
        salvarLista();
    }

    function salvarLista() {
        const itens = Array.from(listaCompras.querySelectorAll('li')).map(li => {
            return {
                item: li.querySelector('strong').textContent,
                quantidade: li.querySelector('.quantidade').textContent,
                categoria: li.querySelector('.categoria').textContent,
                dataHora: li.querySelector('.dataHora').textContent,
                imagem: li.querySelector('img').src,
                precos: {
                    loja1: li.querySelector('span:nth-of-type(1)').textContent,
                    loja2: li.querySelector('span:nth-of-type(2)').textContent,
                    loja3: li.querySelector('span:nth-of-type(3)').textContent,
                }
            };
        });

        localStorage.setItem('listaCompras', JSON.stringify(itens));
    }

    function carregarLista() {
        const listaSalva = localStorage.getItem('listaCompras');
        if (listaSalva) {
            const itens = JSON.parse(listaSalva);
            itens.forEach(item => {
                adicionarItemNaLista(item.item, item.quantidade, item.precos, item.categoria, item.imagem, item.dataHora);
            });
        }
    }

    function mudarTema(tema) {
        document.body.className = tema;
    }
});
