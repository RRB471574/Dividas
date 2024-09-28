function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none'; // Esconde todas as abas
    });
    document.getElementById(tabName).style.display = 'block'; // Mostra a aba selecionada
}

// Funções para Gerenciar Dívidas
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
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => {
            debts.splice(index, 1);
            localStorage.setItem('debts', JSON.stringify(debts));
            loadDebts();
        };
        li.appendChild(removeButton);
        debtList.appendChild(li);
        total += debt.amount; // Soma o valor da dívida
    });

    document.getElementById('totalDebts').textContent = total.toFixed(2); // Atualiza o total das dívidas
}

// Função para calcular o plano de pagamento
function calculatePaymentPlan() {
    const monthlyIncome = parseFloat(document.getElementById('monthlyIncome').value);
    const debts = JSON.parse(localStorage.getItem('debts')) || [];
    const totalDebt = debts.reduce((sum, debt) => sum + debt.amount, 0);
    
    const paymentPlanList = document.getElementById('paymentPlan');
    paymentPlanList.innerHTML = ''; // Limpa a lista do plano de pagamento

    if (!isNaN(monthlyIncome) && monthlyIncome > 0) {
        if (totalDebt === 0) {
            paymentPlanList.innerHTML = '<li>Nenhuma dívida registrada.</li>';
            return;
        }
        
        let remainingDebt = totalDebt;
        const monthlyPayment = Math.min(monthlyIncome, remainingDebt);
        const months = Math.ceil(remainingDebt / monthlyPayment);

        for (let i = 1; i <= months; i++) {
            const li = document.createElement('li');
            li.textContent = `Mês ${i}: Pagar R$ ${monthlyPayment.toFixed(2)}`;
            paymentPlanList.appendChild(li);
            remainingDebt -= monthlyPayment;

            if (remainingDebt <= 0) break; // Se a dívida foi paga
        }
    } else {
        alert('Por favor, insira um valor válido de renda mensal.');
    }
}

// Funções para Lista de Compras
function addItem() {
    const itemDescription = document.getElementById('itemDescription').value;
    if (itemDescription) {
        const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
        shoppingList.push(itemDescription);
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        document.getElementById('itemDescription').value = '';
        loadShoppingList();
        searchForItem(itemDescription); // Abre a pesquisa ao adicionar o item
    } else {
        alert('Por favor, insira a descrição do item.');
    }
}

function loadShoppingList() {
    const shoppingList = document.getElementById('shoppingList');
    shoppingList.innerHTML = ''; // Limpa a lista atual
    const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => {
            items.splice(index, 1);
            localStorage.setItem('shoppingList', JSON.stringify(items));
            loadShoppingList();
        };
        li.appendChild(removeButton);
        shoppingList.appendChild(li);
    });
}

// Nova função para pesquisar o item
