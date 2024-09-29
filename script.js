let totalDebt = 0;
let debts = [];

// Carregar dívidas do LocalStorage ao carregar a página
window.onload = function() {
    loadDebtsFromLocalStorage();
    updateTotalDebt();
};

// Adicionar dívida ao enviar o formulário
document.getElementById('debtForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const debtName = document.getElementById('debtName').value;
    const debtAmount = parseFloat(document.getElementById('debtAmount').value);

    if (debtName && debtAmount) {
        addDebt(debtName, debtAmount);
        saveDebtToLocalStorage(debtName, debtAmount);
        document.getElementById('debtName').value = '';
        document.getElementById('debtAmount').value = '';
    }
});

// Função para adicionar a dívida à lista na página
function addDebt(name, amount) {
    const debtList = document.getElementById('debtList');
    const debtItem = document.createElement('li');
    debtItem.innerHTML = `${name} - R$ ${amount.toFixed(2)}`;
    debtList.appendChild(debtItem);

    totalDebt += amount;
    updateTotalDebt();
}

// Atualizar o total de dívidas na interface
function updateTotalDebt() {
    document.getElementById('totalDebt').innerText = `R$ ${totalDebt.toFixed(2)}`;
}

// Salvar dívidas no LocalStorage
function saveDebtToLocalStorage(name, amount) {
    const debt = { name, amount };
    debts.push(debt);
    localStorage.setItem('debts', JSON.stringify(debts));
}

// Carregar dívidas do LocalStorage
function loadDebtsFromLocalStorage() {
    const storedDebts = localStorage.getItem('debts');
    if (storedDebts) {
        debts = JSON.parse(storedDebts);
        debts.forEach(debt => {
            addDebt(debt.name, debt.amount);
        });
    }
}
