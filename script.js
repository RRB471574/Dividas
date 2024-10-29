const sugestoesLista = [
    "Maçã",
    "Banana",
    "Laranja",
    "Leite",
    "Pão",
    "Queijo",
    "Ovo",
    "Arroz",
    "Feijão",
    "Frango",
    "Carne",
    "Cenoura",
    "Batata",
    "Cebola",
    "Alho"
];

document.addEventListener('DOMContentLoaded', function () {
    const inputItem = document.getElementById('item');
    const sugestoesDiv = document.getElementById('sugestoes');
    const formItem = document.getElementById('form-item');
    const listaCompras = document.getElementById('lista-compras');
    const listaCompartilhamento = document.getElementById('lista-compartilhamento');
    const copiarListaButton = document.getElementById('copiar-lista');

    // Função para carregar itens do Local Storage
    function carregarLista() {
        const itensSalvos = JSON.parse(localStorage.getItem('listaCompras')) || [];
        itensSalvos.forEach(item => adicionarItem(item.nome, item.quantidade, item.imagem));
    }

    // Função para adicionar item na lista
    function adicionarItem(nome, quantidade, imagem) {
        const li = document.createElement('li');
        li.classList.add('item-lista');

        const nomeItem = document.createElement('span');
        nomeItem.classList.add('nome-item');
        nomeItem.textContent = `${nome} (x${quantidade})`;

        const img = document.createElement('img');
        if (imagem) {
            img.src = imagem; // A imagem será uma URL base64
        }

        const btnComprado = document.createElement('button');
        btnComprado.textContent = "Marcar como comprado";
        btnComprado.addEventListener('click', function () {
            li.classList.toggle('comprado-item');
            atualizarListaCompartilhamento();
            salvarLista(); // Salva após marcar como comprado
        });

        const btnRemover = document.createElement('button');
        btnRemover.textContent = "Remover";
        btnRemover.addEventListener('click', function () {
            li.remove();
            atualizarListaCompartilhamento();
            salvarLista(); // Salva após remover um item
        });

        li.appendChild(nomeItem);
        li.appendChild(img);
        li.appendChild(btnComprado);
        li.appendChild(btnRemover);
        listaCompras.appendChild(li);
    }

    // Função para salvar a lista no Local Storage
    function salvarLista() {
        const itens = [];
        const items = listaCompras.getElementsByTagName('li');
        for (let item of items) {
            const nome = item.getElementsByClassName('nome-item')[0].textContent.split(' (')[0];
            const quantidade = item.getElementsByClassName('nome-item')[0].textContent.split(' (x')[1].replace(')', '');
            const img = item.getElementsByTagName('img')[0].src;
            itens.push({ nome, quantidade, imagem: img });
        }
        localStorage.setItem('listaCompras', JSON.stringify(itens));
    }

    // Função para mostrar sugestões
    function mostrarSugestoes(valor) {
        sugestoesDiv.innerHTML = ''; // Limpa as sugestões anteriores
        const sugestoesFiltradas = sugestoesLista.filter(item =>
            item.toLowerCase().startsWith(valor.toLowerCase())
        );

        sugestoesFiltradas.forEach(sugestao => {
            const divSugestao = document.createElement('div');
            divSugestao.classList.add('sugestao-item');
            divSugestao.textContent = sugestao;
            divSugestao.addEventListener('click', function () {
                inputItem.value = sugestao; // Preenche o campo de input com a sugestão
                sugestoesDiv.innerHTML = ''; // Limpa as sugestões após a seleção
            });
            sugestoesDiv.appendChild(divSugestao);
        });
    }

    inputItem.addEventListener('input', function () {
        const valor = inputItem.value;
        if (valor) {
            mostrarSugestoes(valor);
        } else {
            sugestoesDiv.innerHTML = ''; // Limpa as sugestões se o campo estiver vazio
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
                salvarLista(); // Salva a lista após adicionar um novo item

                inputItem.value = '';
                document.getElementById('quantidade').value = '';
                document.getElementById('imagem').value = '';
                sugestoesDiv.innerHTML = ''; // Limpa as sugestões após adicionar o item
                atualizarListaCompartilhamento();
            };
            if (imagem) {
                reader.readAsDataURL(imagem); // Converte a imagem para uma URL base64
            } else {
                adicionarItem(itemNome, quantidade, null);
                salvarLista(); // Salva a lista após adicionar um novo item
                atualizarListaCompartilhamento();
            }
        }
    });

    function atualizarListaCompartilhamento() {
        const items = listaCompras.getElementsByTagName('li');
        let listaTexto = '';
        for (let item of items) {
            const nome = item.getElementsByClassName('nome-item')[0].textContent;
            listaTexto += nome + '\n';
        }
        listaCompartilhamento.value = listaTexto;
    }

    copiarListaButton.addEventListener('click', function () {
        listaCompartilhamento.select();
        document.execCommand('copy');
        alert('Lista copiada para a área de transferência!');
    });

    // Carrega a lista ao iniciar
    carregarLista();
});
