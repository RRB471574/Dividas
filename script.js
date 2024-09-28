function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none'; // Esconde todas as abas
    });
    document.getElementById(tabName).style.display = 'block'; // Mostra a aba selecionada
}

function addDebt() {
    const description = document.getElementById('debtDescription').value;
    const amount = parseFloat(document.getElementById('debtAmount').value);
    const dueDate = document.getElementById('debtDueDate').value;

    if (description && !isNaN(amount) && dueDate) {
        const debts = JSON.parse(localStorage.getItem('debts')) || [];
        debts.push({ description, amount, dueDate });
        localStorage.setItem('debts', JSON.stringify(debts));
        document.getElementById('debtDescription').value = '';
        document.getElementById('debtAmount').value = '';
        document.getElementById('debtDueDate').value = '';
        loadDebts();
    } else {
        alert('Preencha todos os campos corretamente.');
    }
}

function loadDebts() {
    const debtList = document.getElementById('debtList');
    debtList.innerHTML = ''; // Limpa a lista atual
    const debts = JSON.parse(localStorage.getItem('debts')) || [];
    let total = 0;

    debts.forEach((debt, index) => {
        const li = document.createElement('li');
        li.textContent = `${debt.description}: R$ ${debt.amount.toFixed(2)} (Vencimento: ${debt.dueDate})`;
       
