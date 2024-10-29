document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-item");
    const listaCompras = document.getElementById("lista-compras");
    const itemInput = document.getElementById("item");
    const suggestionsBox = document.getElementById("suggestions");

    const suggestions = ["Maçã", "Banana", "Leite", "Pão", "Ovos", "Arroz", "Feijão", "Café"];

    // Função para exibir sugestões enquanto o usuário digita
    itemInput.addEventListener("input", () => {
        const query = itemInput.value.toLowerCase();
        suggestionsBox.innerHTML = ""; // Limpa as sugestões anteriores

        if (query) {
            const filteredSuggestions = suggestions.filter((sugestao) => 
                sugestao.toLowerCase().startsWith(query)
            );

            filteredSuggestions.forEach((sugestao) => {
                const suggestionItem = document.createElement("div");
                suggestionItem.textContent = sugestao;
                suggestionItem.onclick = () => {
                    itemInput.value = sugestao;
                    suggestionsBox.innerHTML = ""; // Fecha o dropdown após seleção
                };
                suggestionsBox.appendChild(suggestionItem);
            });
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const item = itemInput.value.trim();
        const quantidade = document.getElementById("quantidade").value.trim();
        const imagem = document.getElementById("imagem").files[0];

        if (item && quantidade) {
            adicionarItem(item, quantidade, imagem);
            itemInput.value = '';
            document.getElementById("quantidade").value = '';
            document.getElementById("imagem").value = ''; // Limpa o campo de imagem
            suggestionsBox.innerHTML = ""; // Fecha o dropdown após envio
        }
    });

    // Função para adicionar item à lista
    function adicionarItem(item, quantidade, imagem) {
        const li = document.createElement("li");
        li.className = "item-lista";

        const nomeItem = document.createElement("span");
        nomeItem.className = "nome-item";
        nomeItem.textContent = item;

        const quantidadeItem = document.createElement("span");
        quantidadeItem.className = "quantidade-item";
        quantidadeItem.textContent = `Quantidade: ${quantidade}`;

        // Adiciona imagem, se existir
        if (imagem) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(imagem);
            img.alt = item;
            li.appendChild(img);
        }

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.onclick = () => {
            li.classList.add('removing');
            setTimeout(() => {
                listaCompras.removeChild(li);
                salvarLista();
            }, 500);
        };

        li.appendChild(nomeItem);
        li.appendChild(quantidadeItem);
        li.appendChild(botaoRemover);

        listaCompras.appendChild(li);
        setTimeout(() => {
            li.classList.add('added');
        }, 10);

        salvarLista();
    }

    function salvarLista() {
        const items = [];
        listaCompras.querySelectorAll("li").forEach(li => {
            const nomeItem = li.querySelector(".nome-item").textContent;
            const quantidadeItem = li.querySelector(".quantidade-item").textContent;
            const imagem = li.querySelector("img") ? li.querySelector("img").src : '';
            items.push({ nome: nomeItem, quantidade: quantidadeItem, imagem });
        });
        localStorage.setItem("listaCompras", JSON.stringify(items));
    }

    function carregarLista() {
        const items = JSON.parse(localStorage.getItem("listaCompras")) || [];
        items.forEach(({ nome, quantidade, imagem }) => {
            adicionarItem(nome, quantidade.replace('Quantidade: ', ''), imagem);
        });
    }

    carregarLista();
});
