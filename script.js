const sugestoesLista = [
    "Maçã", "Banana", "Laranja", "Leite", "Pão", "Queijo",
    "Ovo", "Arroz", "Feijão", "Frango", "Carne", "Cenoura",
    "Batata", "Cebola", "Alho"
];

document.addEventListener('DOMContentLoaded', function () {
    const inputItem = document.getElementById('item');
    const sugestoesDiv = document.getElementById('sugestoes');
    const formItem = document.getElementById('form-item');
    const listaCompras = document.getElementById('lista-compras');
    const listaCompartilhamento = document.getElementById('lista-compartilhamento');
    const copiarListaButton = document.getElementById('copiar-lista');

    // Carregar a lista do localStorage
    function carregarLista() {
        const listaSalva = JSON.parse(localStorage.getItem("listaCompras")) || [];
        listaSalva.forEach(item => {
            adicionarItem(item.nome, item.quantidade, item.imagem);
        });
    }

    // Adicionar item na lista
    function adicionarItem(nome, quantidade, imagem) {
        const li = document.createElement('li');
        li.classList.add('item-lista');

        const nomeItem = document.createElement('span');
        nomeItem.classList.add('nome-item');
        nomeItem.textContent = `${nome} (x${quantidade})`;

        const img = document.createElement('img');
        if (imagem) {
            img.src = imagem;
        }

        const btnComprado = document.createElement('button');
        btnComprado.textContent = "Marcar como comprado";
        btnComprado.addEventListener('click', function () {
            li.classList.toggle('comprado-item');
            atualizarListaCompartilhamento();
            salvarLista(); // Atualiza localStorage
        });

        const btnRemover = document.createElement('button');
        btnRemover.textContent = "Remover";
        btnRemover.addEventListener('click', function () {
            li.remove(); // Remove do DOM
            salvarLista(); // Atualiza localStorage
        });

        li.appendChild(nomeItem);
        li.appendChild(img);
        li.appendChild(btnComprado);
        li.appendChild(btnRemover);
        listaCompras.appendChild(li);
        salvarLista(); // Salva no localStorage após adicionar
    }

    // Salvar lista no localStorage
    function salvarLista() {
        const items = listaCompras.getElementsByTagName('li');
        const lista = [];
        for (let item of items) {
            const nome = item.getElementsByClassName('nome-item')[0].textContent.split(' (')[0];
            const quantidade = item.getElementsByClassName('nome-item')[0].textContent.split(' (x')[1].replace(')', '');
            const img = item.getElementsByTagName('img')[0] ? item.getElementsByTagName('img')[0].src : null;
            lista.push({ nome, quantidade, imagem: img });
        }
        localStorage.setItem("listaCompras", JSON.stringify(lista));
        atualizarListaCompartilhamento(); // Atualiza o textarea com a lista
    }

    // Atualizar textarea de compartilhamento
    function atualizarListaCompartilhamento() {
        const items = listaCompras.getElementsByTagName('li');
        let listaTexto = '';
        for (let item of items) {
            const nome = item.getElementsByClassName('nome-item')[0].textContent;
            listaTexto += nome + (item.classList.contains('comprado-item') ? ' (comprado)' : '') + '\n';
        }
        listaCompartilhamento.value = listaTexto.trim();
    }

    // Mostrar sugestões
    function mostrarSugestoes(valor) {
        sugestoesDiv.innerHTML = '';
        const sugestoesFiltradas = sugestoesLista.filter(item =>
            item.toLowerCase().startsWith(valor.toLowerCase())
        );

        sugestoesFiltradas.forEach(sugestao => {
            const divSugestao = document.createElement('div');
            divSugestao.classList.add('sugestao-item');
            divSugestao.textContent = sugestao;
            divSugestao.addEventListener('click', function () {
                inputItem.value = sugestao;
                sugestoesDiv.innerHTML = '';
            });
            sugestoesDiv.appendChild(divSugestao);
        });
    }

    inputItem.addEventListener('input', function () {
        const valor = inputItem.value;
        if (valor) {
            mostrarSugestoes(valor);
        } else {
            sugestoesDiv.innerHTML = '';
        }
    });

    formItem.addEventListener('submit', function (event) {
        event.preventDefault();

        const itemNome = inputItem.value;
        const quantidade = document.getElementById('quantidade').value;
        const imagem = document.getElementById('imagem').files[0];

        if (itemNome && quantidade) {
            const reader = new FileReader();
            reader.onload = function (e) {
                adicionarItem(itemNome, quantidade, e.target.result);
                // Limpa os campos após adicionar
                inputItem.value = '';
                document.getElementById('quantidade').value = '';
                document.getElementById('imagem').value = '';
                sugestoesDiv.innerHTML = ''; // Limpa sugestões após adicionar
            };
            if (imagem) {
                reader.readAsDataURL(imagem);
            } else {
                adicionarItem(itemNome, quantidade, null);
                inputItem.value = '';
                document.getElementById('quantidade').value = '';
                document.getElementById('imagem').value = '';
            }
        }
    });

    copiarListaButton.addEventListener('click', function () {
        listaCompartilhamento.select();
        document.execCommand('copy');
        alert("Lista copiada para a área de transferência!");
    });

    // Carregar a lista ao iniciar
    carregarLista();
});
