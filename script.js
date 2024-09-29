let debts = []; // Array para armazenar as dívidas

// Função para atualizar a lista de dívidas
function updateDebtList() {
    const debtList = document.getElementById('debtList');
    debtList.innerHTML = '';
    let totalDebt = 0;

    debts.forEach((debt, index) => {
        const li = document.createElement('li');
        li.innerText = `${debt.name} - R$ ${debt.amount.toFixed(2)} - Vencimento: ${debt.dueDate}`;
        const removeBtn = document.createElement('button');
        removeBtn.innerText = 'Remover';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = () => {
            debts.splice(index, 1); // Remove a dívida do array
            updateDebtList(); // Atualiza a lista
            updateChart(); // Atualiza o gráfico
        };
        li.appendChild(removeBtn);
        debtList.appendChild(li);
        totalDebt += debt.amount; // Soma o total
    });

    // Atualiza o total em Dívidas
    document.getElementById('totalDebt').innerText = `R$ ${totalDebt.toFixed(2)}`;
}

// Função para atualizar o gráfico
function updateChart() {
    const ctx = document.getElementById('debtChart').getContext('2d');
    const labels = debts.map(debt => debt.name);
    const data = debts.map(debt => debt.amount);

    if (window.debtChart) {
        window.debtChart.destroy(); // Destrói o gráfico anterior se existir
    }

    window.debtChart = new Chart(ctx, {
        type: 'bar', // Tipo do gráfico
        data: {
            labels: labels,
            datasets: [{
                label: 'Dívidas',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
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

// Função para adicionar nova dívida
document.getElementById('debtForm').onsubmit = function(event) {
    event.preventDefault(); // Impede o envio do formulário
    const debtName = document.getElementById('debtName').value;
    const debtAmount = parseFloat(document.getElementById('debtAmount').value);
    const debtDueDate = document.getElementById('debtDueDate').value;

    if (debtName && !isNaN(debtAmount) && debtDueDate) {
        debts.push({ name: debtName, amount: debtAmount, dueDate: debtDueDate });
        updateDebtList(); // Atualiza a lista
        updateChart(); // Atualiza o gráfico
    }

    // Limpa os campos do formulário
    document.getElementById('debtName').value = '';
    document.getElementById('debtAmount').value = '';
    document.getElementById('debtDueDate').value = '';
};

// Função para mostrar/ocultar a seção de ajuda
document.getElementById('helpLink').onclick = function(event) {
    event.preventDefault(); // Previne o comportamento padrão do link
    const ajudaSection = document.getElementById('ajuda');
    ajudaSection.style.display = ajuda
