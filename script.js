let totalDebt = 0;
let debts = [];
let debtChart; // Variável para armazenar o gráfico

$(document).ready(function() {
    // Adicionar dívida
    $('#debtForm').on('submit', function(event) {
        event.preventDefault();
        const debtName = $('#debtName').val();
        const debtAmount = parseFloat($('#debtAmount').val());
        const debtDueDate = $('#debtDueDate').val();

        if (debtName && !isNaN(debtAmount) && debtDueDate) {
            addDebt(debtName, debtAmount, debtDueDate);
            updateTotalDebt();
            updateChart();
            $('#debtForm')[0].reset(); // Reseta o formulário
        }
    });
});

// Função para adicionar dívida à lista
function addDebt(name, amount, dueDate) {
    debts.push({ name, amount, dueDate });
    const debtList = $('#debtList');
    const listItem = $(`<li>${name} - R$ ${amount.toFixed(2)} - Vencimento: ${new Date(dueDate).toLocaleDateString()}</li>`);
    
    // Botão para remover dívida
    const removeButton = $('<button>Remover</button>').addClass('remove-btn');
    removeButton.on('click', function() {
        removeDebt(debts.indexOf(debts.find(debt => debt.name === name && debt.amount === amount)));
    });

    listItem.append(removeButton);
    debtList.append(listItem);
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
    $('#totalDebt').text(`R$ ${totalDebt.toFixed(2)}`);
}

// Renderizar lista de dívidas
function renderDebtList() {
    const debtList = $('#debtList');
    debtList.empty(); // Limpa a lista antes de renderizar
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

    const ctx = $('#debtChart')[0].getContext('2d');
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
