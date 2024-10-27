document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-lista');
    const listaCompras = document.getElementById('lista-compras');
    const botaoSalvar = document.getElementById('salvar-lista');
    const temaSelect = document.getElementById('tema');

    // Função para adicionar um item à lista
    function adicionarItemNaLista(item, quantidade, precoLojas, categoria, imagemSrc, dataHora) {
        const li = document.createElement('li');
        li.classList.add('aparecer'); // Adiciona a classe para animação de entrada
        li.innerHTML = `
            <div>
                <strong>${item}</strong> - Quantidade: ${quantidade} 
                <br> Preços: 
                Loja 1: R$${parseFloat(precoLojas.loja1).toFixed(2)}, 
                Loja 2: ${precoLojas.loja2 !== 'N/A' ? `R$${parseFloat(precoLojas.loja2).toFixed(2)}` : 'N/A'}, 
                Loja 3: ${precoLojas.loja3 !== 'N/A' ? `R$${parseFloat(precoLojas.loja3).toFixed(2)}` : 'N/A'} 
                <span class="categoria">(${categoria})</span>
                <small>${dataHora}</small>
            </div>
            <img src="${imagemSrc}" alt="Imagem de ${item}">
            <button class="remover">Remover</button>
        `;

        // Evento para animação de remoção
        const botaoRemover = li.querySelector('.remover');
        botaoRemover.addEventListener('click', function() {
            li.style.animation = 'fadeOutDown 0.5s forwards'; // Aplica a animação de saída
            li.addEventListener('animationend', function() {
                listaCompras.removeChild(li);
                salvarLista();
            });
        });

        listaCompras.appendChild(li);
        salvarLista();
    }

    // Restante do código (funções de salvar, carregar lista, etc.)
});
