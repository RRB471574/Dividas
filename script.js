// script.js

// Lista de sugestões
const sugestoes = [
    "Maçã", "Banana", "Leite", "Pão", "Arroz", "Feijão", "Ovo", "Carne", "Cenoura", "Batata"
];

// Função para adicionar item à lista
function adicionarItem(item, quantidade, imagem) {
    const listaCompras = document.getElementById("lista-compras");
    
    const li = document.createElement("li");
    li.className = "item-lista";
    
    const img = document.createElement("img");
    img.src = imagem ? URL.createObjectURL(imagem) : ''; // Mostra a imagem, se disponível
    img.alt = item;
    
    const nomeItem = document.createElement("span");
    nomeItem.className = "nome-item";
    nomeItem.textContent = `${item} (${quantidade})`;
    
    const botaoMarcar = document.createElement("button");
    botaoMarcar.textContent = "Marcar como Comprado";
    botaoMarcar.onclick = () => {
        li.classList.toggle("comprado-item");
        salvarLista(); // Salva a lista após marcar/desmarcar
    };

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.onclick = () => {
        listaCompras.removeChild(li);
        atualizarMensagemVazia();
        salvarLista(); // Salva a lista após remoção
    };

    li.appendChild(img);
    li.appendChild(nomeItem);
    li.appendChild(botaoMarcar);
    li.appendChild(botaoRemover);
    listaCompras.appendChild(li);
    
    // Adiciona gestos ao item da lista
    const hammer = new Hammer(li);
    
    hammer.on("swipeleft", () => {
        listaCompras.removeChild(li); // Remove o item da lista ao deslizar para a esquerda
        atualizarMensagemVazia();
        salvarLista(); // Salva a lista após remoção
    });

    hammer.on("swiperight", () => {
        alert(`Você deslizou para a direita em ${item}`);
    });
    
    atualizarMensagemVazia(); // Atualiza a mensagem de lista vazia
}

// Atualiza a mensagem quando a lista está vazia
function atualizarMensagemVazia() {
    const listaCompras = document.getElementById("lista-compras");
    const mensagemVazia = document.getElementById("mensagem-vazia");
    if (listaCompras.children.length === 0) {
        mensagemVazia.style.display = "block"; // Exibe a mensagem se a lista estiver vazia
    } else {
        mensagemVazia.style.display = "none"; // Esconde a mensagem se houver itens
    }
}

// Função para salvar a lista no localStorage
function salvarLista() {
    const listaCompras = [];
    document.querySelectorAll("#lista-compras li").forEach(li => {
        const nome = li.querySelector(".nome-item").textContent;
        const imagem = li.querySelector("img") ? li.querySelector("img").src : '';
        listaCompras.push({ nome, imagem });
    });
    localStorage.setItem("listaCompras", JSON.stringify(listaCompras));
}

// Função para carregar a lista do localStorage
function carregarLista() {
    const listaCompras = JSON.parse(localStorage.getItem("listaCompras")) || [];
    listaCompras.forEach(item => {
        const match = item.nome.match(/(.*) (\d+)/);
        if (match) {
            adicionarItem(match[1], match[2], item.imagem); // Nome e quantidade
        }
    });
}

// Função para sugerir itens ao digitar
function sugerirItens() {
    const inputItem = document.getElementById("item");
    inputItem.addEventListener("input", function() {
        const valor = this.value.toLowerCase();
        const sugestõesFiltradas = sugestoes.filter(sugestao => 
            sugestao.toLowerCase().includes(valor)
        );

        // Aqui você pode exibir as sugestões em um dropdown ou similar
        console.log("Sugestões:", sugestõesFiltradas); // Exibir no console como exemplo
    });
}

// Ao carregar a página, carregue a lista e configure sugestões
window.onload = () => {
    carregarLista();
    sugerirItens();
};

// Captura o evento de submit do formulário
document.getElementById("form-item").addEventListener("submit", function(e) {
    e.preventDefault();
    const item = document.getElementById("item").value;
    const quantidade = document.getElementById("quantidade").value;
    const imagemInput = document.getElementById("imagem");
    const imagem = imagemInput.files[0];

    if (item && quantidade) {
        adicionarItem(item, quantidade, imagem);
        salvarLista(); // Salva a lista após adicionar
        this.reset(); // Limpa o formulário
    }
});
