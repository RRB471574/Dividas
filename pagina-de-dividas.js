// pagina-de-dividas.js

// Exemplo de dados de dívidas
const dividas = [
    { nome: "Santander", valor: 373.87 },
    { nome: "Mercado Pago Duda", valor: 146.17 },
    { nome: "Will", valor: 560 },
    { nome: "Jeito", valor: 60 },
    { nome: "Nubank", valor: 44.54 },
    { nome: "Mercado Pago Robson", valor: 30.78 },
    { nome: "Nubank Robson", valor: 139.61 },
    { nome: "Água", valor: 65.40 },
    { nome: "Aluguel", valor: 500 },
    { nome: "Internet", valor: 100 },
    { nome: "Luz", valor: 100 },
    { nome: "Gato", valor: 100 }
];

// Exibir dívidas
const dividasContainer = document.getElementById('dividas');
dividas.forEach(divida => {
    const div = document.createElement('div');
    div.textContent = `${divida.nome}: R$ ${divida.valor.toFixed(2)}`;
    dividasContainer.appendChild(div);
});
