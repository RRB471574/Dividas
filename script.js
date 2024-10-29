document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-item');
    const listaCompras = document.getElementById('lista-compras');
    const itemInput = document.getElementById('item');
    const quantidadeInput = document.getElementById('quantidade');

    if (!form || !listaCompras || !itemInput || !quantidadeInput) {
        console.error("Erro: Um ou mais elementos não foram encontrados.");
        return;
    }

    function salvarListaNoLocalStorage() {
        const itens = [];
        document.querySelectorAll('#lista-compras li').forEach((li) => {
            itens.push(li.textContent.replace("Remover", "").trim());
        });
        localStorage.setItem('listaCompras', JSON.stringify(itens));
    }

    function carregarListaDoLocalStorage() {
        const itens = JSON.parse(localStorage.getItem('listaCompras'));
        if (itens) {
            itens.forEach((texto) => {
                adicionarItemNaLista(texto);
            });
        }
    }

    function adicionarItemNaLista(texto) {
        const li = document.createElement('li');
        li.textContent = texto;

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.style.marginLeft = '10px';
        
        botaoRemover.addEventListener('click', function() {
            li.remove();
            salvarListaNoLocalStorage();
        });

        li.appendChild(botaoRemover);
        listaCompras.appendChild(li);
    }

    carregarListaDoLocalStorage();

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const item = itemInput.value;
        const quantidade = quantidadeInput.value;

        if (item && quantidade) {
            const texto = `${quantidade} x ${item}`;
            adicionarItemNaLista(texto);

            salvarListaNoLocalStorage();

            itemInput.value = '';
            quantidadeInput.value = '';
        } else {
            alert('Por favor, preencha ambos os campos.');
        }
    });
});
