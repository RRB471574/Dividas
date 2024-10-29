document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-item');
    const listaCompras = document.getElementById('lista-compras');
    const itemInput = document.getElementById('item');
    const quantidadeInput = document.getElementById('quantidade');

    // Verifica se os elementos foram encontrados
    if (!form || !listaCompras || !itemInput || !quantidadeInput) {
        console.error("Erro: Um ou mais elementos não foram encontrados.");
        return;
    }

    // Função para salvar a lista no Local Storage
    function salvarListaNoLocalStorage() {
        const itens = [];
        document.querySelectorAll('#lista-compras li').forEach((li) => {
            itens.push(li.textContent);
        });
        localStorage.setItem('listaCompras', JSON.stringify(itens));
    }

    // Função para carregar a lista do Local Storage
    function carregarListaDoLocalStorage() {
        const itens = JSON.parse(localStorage.getItem('listaCompras'));
        if (itens) {
            itens.forEach((texto) => {
                const li = document.createElement('li');
                li.textContent = texto;
                listaCompras.appendChild(li);
            });
        }
    }

    // Carrega a lista salva ao carregar a página
    carregarListaDoLocalStorage();

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Pega os valores dos campos de entrada
        const item = itemInput.value;
        const quantidade = quantidadeInput.value;

        // Verifica se os campos de entrada não estão vazios
        if (item && quantidade) {
            // Cria um novo item da lista
            const li = document.createElement('li');
            li.textContent = `${quantidade} x ${item}`; // Formata o texto

            // Adiciona o novo item à lista de compras
            listaCompras.appendChild(li);

            // Salva a lista atualizada no Local Storage
            salvarListaNoLocalStorage();

            // Limpa os campos de entrada
            itemInput.value = '';
            quantidadeInput.value = '';
        } else {
            alert('Por favor, preencha ambos os campos.');
        }
    });
});
