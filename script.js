// Aguarda até que o DOM seja carregado
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-lista');
    const listaCompras = document.getElementById('lista-compras');
    const botaoSalvar = document.getElementById('salvar-lista');

    // Função para carregar a lista do localStorage
    function carregarLista() {
        const listaSalva = localStorage.getItem('listaCompras');
        if (listaSalva) {
            const itens = JSON.parse(listaSalva);
            itens.forEach(item => adicionarItemNaLista(item.nome, item.quantidade, item.precoLojas, item.categoria));
        }
    }

    // Função para adicionar um item à lista
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita que o formulário recarregue a página

        const item = document.getElementById('item').value;
        const quantidade = document.getElementById('quantidade').value;

        // Captura os preços das lojas
        const precoLoja1 = document.getElementById('preco-loja1').value;
        const precoLoja2 = document.getElementById('preco-loja2').value || 'N/A';
        const precoLoja3 = document.getElementById('preco-loja3').value || 'N/A';

        const precoLojas = {
            loja1: precoLoja1,
            loja2: precoLoja2,
            loja3: precoLoja3
        };

        const categoria
