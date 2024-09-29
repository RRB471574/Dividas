let totalDebt = 0;
let debts = [];
let debtChart; // Variável para armazenar o gráfico

// Adicionar dívida
document.getElementById('debtForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const debtName = document.getElementById('debtName').value;
    const debtAmount = parseFloat(document.getElementById('debtAmount').value);
    const debtDueDate = document.getElementById('debtDueDate').value;

    if (debtName && !isNaN(debtAmount) && debtDueDate) {
        addDebt(debtName, debtAmount, debtDueDate);
        updateTotalDebt();
        updateChart();
        document.getElementById('debtForm').reset();
    }
});

// Função para adicionar dívida à lista
function addDebt(name, amount, dueDate) {
    debts.push({ name, amount, dueDate });
    const debtList = document.getElementById('debtList');
    const listItem = document.createElement('li');
    listItem.innerText = `${name} - R$ ${amount.toFixed(2)} - Vencimento: ${new Date(dueDate).toLocaleDateString()}`;

    // Botão para remover dívida
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remover';
    removeButton.className = 'remove-btn';
    removeButton.onclick = function() {
        removeDebt(debts.indexOf(debts.find(debt => debt.name === name && debt.amount === amount)));
    };

    listItem.appendChild(removeButton);
    debtList.appendChild(listItem);
}

// Função para remover dívida
function removeDebt(index) {
    if (index > -1) {
        debts.splice(index, 1);
        updateTotalDebt();
        updateChart();
        renderDebtList();
    }
}

// Atualizar total de dívidas
function updateTotalDebt() {
    totalDebt = debts.reduce((total, debt) => total + debt.amount, 0);
    document.getElementById('totalDebt').innerText = `R$ ${totalDebt.toFixed(2)}`;
}

// Renderizar lista de dívidas
function renderDebtList() {
    const debtList = document.getElementById('debtList');
    debtList.innerHTML = '';
    debts.forEach(debt => {
        addDebt(debt.name, debt.amount, debt.dueDate);
    });
}

// Função para atualizar o gráfico
function updateChart() {
    const labels = debts.map(debt => debt.name);
    const data = debts.map(debt => debt.amount);

    if (debtChart) {
        debtChart.destroy(); // Destrói o gráfico anterior, se existir
    }

    const ctx = document.getElementById('debtChart').getContext('2d');
    debtChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Valor das Dívidas',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
