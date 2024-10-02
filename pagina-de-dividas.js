const auth = firebase.auth();

auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("Usuário autenticado:", user);
    } else {
        window.location.href = 'index.html';
    }
});

const userDebts = [
    { description: 'Cartão de crédito', amount: 1200.50 },
    { description: 'Aluguel', amount: 500.00 },
    { description: 'Conta de luz', amount: 100.30 }
];

const debtList = document.createElement('ul');
userDebts.forEach(debt => {
    const debtItem = document.createElement('li');
    debtItem.textContent = `${debt.description}: R$ ${debt.amount.toFixed(2)}`;
    debtList.appendChild(debtItem);
});

document.body.appendChild(debtList);

document.getElementById("logout").addEventListener("click", () => {
    auth.signOut().then(() => {
        alert("Desconectado com sucesso!");
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error("Erro ao desconectar:", error.message);
        alert("Erro ao desconectar: " + error.message);
    });
});
