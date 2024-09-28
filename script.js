let totalDebt = 0; // Variável para armazenar o total das dívidas

// Carregar dívidas do localStorage quando a página é carregada
document.addEventListener('DOMContentLoaded', loadDebts);

document.getElementById('debt-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const creditor = document.getElementById('creditor').value;
    const amount = parseFloat(document.getElementById('amount').value); // Parse para número
    const dueDate = document.getElementById('due-date').value;
    
    addDebt(creditor, amount, dueDate);
    
    this.reset();
});

function addDebt(creditor, amount, dueDate) {
    const debtList = document.getElementById('debt-list');
    
    const li = document.createElement('li');
    li.textContent = `${creditor} - R$ ${amount.toFixed(2)} - Vence em ${dueDate}`;
    
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.onclick = function() {
        totalDebt -= amount; // Subtrai o valor da dívida total
        updateTotalDebt();
        debtList.removeChild(li);
        removeDebtFromStorage(creditor, amount, dueDate);
    };
    
    li.appendChild(removeButton);
    debtList.appendChild(li);
    
    totalDebt += amount; // Adiciona o valor da nova dívida ao total
    updateTotalDebt();
    saveDebtToStorage(creditor, amount, dueDate); // Salva a nova dívida no localStorage
}

function updateTotalDebt() {
    const totalDebtElement = document.getElementById('total-debt');
    totalDebtElement.textContent = `Total de Dívidas: R$ ${totalDebt.toFixed(2)}`; // Atualiza o texto com o total
}

// Função para salvar dívida no localStorage
function saveDebtToStorage(creditor, amount, dueDate) {
    const debts = JSON.parse(localStorage.getItem('debts')) || [];
    debts.push({ creditor, amount, dueDate });
    localStorage.setItem('debts', JSON.stringify(debts));
}

// Função para remover dívida do localStorage
function removeDebtFromStorage(creditor, amount, dueDate) {
    const debts = JSON.parse(localStorage.getItem('debts')) || [];
    const updatedDebts = debts.filter(debt => !(debt.creditor === creditor && debt.amount === amount && debt.dueDate === dueDate));
    localStorage.setItem('debts', JSON.stringify(updatedDebts));
}

// Função para carregar dívidas do localStorage
function loadDebts() {
    const debts = JSON.parse(localStorage.getItem('debts')) || [];
    debts.forEach(debt => {
        addDebt(debt.creditor, debt.amount, debt.dueDate);
    });
}
