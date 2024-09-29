let debts = [];

function updateDebtList() {
    const debtList = document.getElementById('debtList');
    debtList.innerHTML = '';
    let totalDebt = 0;

    debts.forEach((debt, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerText = `${debt.name} - R$ ${debt.amount.toFixed(2)} - Vencimento: ${debt.dueDate}`;
        
        const removeBtn = document.createElement('button');
        removeBtn.innerText = 'Remover';
        removeBtn.className = 'btn btn-danger btn-sm';
        removeBtn.onclick = () => {
            li.classList.add('fade-out');
            setTimeout(() => {
                debts.splice(index, 1);
                updateDebtList();
            }, 300); // Tempo para animação
        };
        
        li.appendChild(removeBtn);
        debtList.appendChild(li);
        totalDebt += debt.amount;
    });

    document.getElementById('totalDebt').innerText = `R$ ${totalDebt.toFixed(2)}`;
}

document.getElementById('debtForm').onsubmit = function(event) {
    event.preventDefault();
    const debtName = document.getElementById('debtName').value;
    const debtAmount = parseFloat(document.getElementById('debtAmount').value);
    const debtDueDate = document.getElementById('debtDueDate').value;
    const notificationDays = parseInt(document.getElementById('notificationDays').value) || 0;

    if (debtName && !isNaN(debtAmount) && debtDueDate) {
        debts.push({ name: debtName, amount: debtAmount, dueDate: debtDueDate, notificationDays });
        updateDebtList();
    }

    document.getElementById('debtName').value = '';
    document.getElementById('debtAmount').value = '';
    document.getElementById('debtDueDate').value = '';
    document.getElementById('notificationDays').value = '';
};

document.getElementById('removeAllDebts').onclick = function() {
    debts = [];
    updateDebtList();
};

// Inicia AOS
AOS.init();
