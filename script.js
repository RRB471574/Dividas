document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-lista');
    const listaCompras = document.getElementById('lista-compras');
    const botaoSalvar = document.getElementById('salvar-lista');
    const botaoExportarPDF = document.createElement('button'); // Botão para exportar
    botaoExportarPDF.textContent = 'Exportar para PDF';
    botaoExportarPDF.style.marginLeft = '10px';
    botaoExportarPDF.style.backgroundColor = '#6200ea';
    botaoExportarPDF.style.color = 'white';
    botaoExportarPDF.style.border = 'none';
    botaoExportarPDF.style.cursor = 'pointer';
    botaoExportarPDF.style.borderRadius = '5px';

    botaoSalvar.insertAdjacentElement('afterend', botaoExportarPDF);

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

    // Função para exportar a lista em PDF
    botaoExportarPDF.addEventListener('click', function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Lista de Compras", 10, 10);

        let y = 20;

        listaCompras.querySelectorAll('li').forEach((li, index) => {
            const itemNome = li.querySelector('strong').textContent;
            const quantidade = li.querySelector('div').textContent.split(' - ')[1].replace('Quantidade: ', '');
            const categoria = li.querySelector('.categoria').textContent;
            const dataHora = li.querySelector('small').textContent.replace('Adicionado em: ', '');
            
            const precoTexto = li.querySelector('div').textContent.split('Preços: ')[1].split(', ');
            const precoLojas = {
                loja1: precoTexto[0],
                loja2: precoTexto[1],
                loja3: precoTexto[2]
            };

            doc.setFontSize(12);
            doc.text(`Item ${index + 1}: ${itemNome}`, 10, y);
            doc.text(`Quantidade: ${quantidade}`, 10, y + 10);
            doc.text(`Categoria: ${categoria}`, 10, y + 20);
            doc.text(`Data e Hora: ${dataHora}`, 10, y + 30);
            doc.text(`Preços - Loja 1: ${precoLojas.loja1}, Loja 2: ${precoLojas.loja2}, Loja 3: ${precoLojas.loja3}`, 10, y + 40);

            y += 50; // Ajusta a posição Y para o próximo item

            if (y > 270) { // Se chegar perto do fim da página
                doc.addPage();
                y = 10;
            }
        });

        doc.save("lista_de_compras.pdf");
    });

    // Demais funções de adicionar itens, salvar no localStorage, etc.
    // (Inclua aqui as funções carregarLista, adicionarItemNaLista, salvarLista conforme já implementadas)

    carregarLista();
    botaoSalvar.addEventListener('click', salvarLista);
});
