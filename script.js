let totalDebt = 0; // Variável para armazenar o total das dívidas

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
    };
    
    li.appendChild(removeButton);
    debtList.appendChild(li);
    
    totalDebt += amount; // Adiciona o valor da nova dívida ao total
    updateTotalDebt();
}

function updateTotalDebt() {
    const totalDebtElement = document.getElementById('total-debt');
    totalDebtElement.textContent = `Total de Dívidas: R$ ${totalDebt.toFixed(2)}`; // Atualiza o texto com o total
}
