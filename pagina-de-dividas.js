// Aqui você pode adicionar a lógica para gerenciar as dívidas
// Exemplo de código para listar as dívidas
const dividasList = document.getElementById("dividas-list");

const dividas = [
    { descricao: "Conta de luz", valor: "R$ 100,00" },
    { descricao: "Aluguel", valor: "R$ 500,00" },
];

dividas.forEach(divida => {
    const div = document.createElement("div");
    div.textContent = `${divida.descricao}: ${divida.valor}`;
    dividasList.appendChild(div);
});
