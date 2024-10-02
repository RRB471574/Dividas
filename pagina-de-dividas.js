// Lógica para manipulação de dívidas (este é um exemplo básico)
document.addEventListener("DOMContentLoaded", () => {
    const debtList = document.getElementById("debtList");

    // Exemplo de dívida - aqui você deve pegar as dívidas do Firebase ou do seu backend
    const debts = [
        { name: "Aluguel", amount: "500,00" },
        { name: "Conta de Luz", amount: "100,00" },
        { name: "Conta de Água", amount: "65,40" },
    ];

    debts.forEach(debt => {
        const debtItem = document.createElement("div");
        debtItem.textContent = `${debt.name}: R$ ${debt.amount}`;
        debtList.appendChild(debtItem);
    });
});
