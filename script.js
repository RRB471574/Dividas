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
    if (description && !isNaN(amount)) {
        const debts = JSON.parse(localStorage.getItem('debts')) || [];
        debts.push({ description, amount });
        localStorage.setItem('debts', JSON.stringify(debts));
        document.getElementById('debtDescription').value = '';
        document.getElementById('debtAmount').value = '';
        loadDebts();
    } else {
        alert('Preencha todos os campos corretamente.');
    }
}

function loadDebts() {
    const debtList = document.getElementById('debtList');
    debtList.innerHTML = ''; // Limpa a lista atual
    const debts = JSON.parse(localStorage.getItem('debts')) || [];
    debts.forEach((debt, index) => {
        const li = document.createElement('li');
        li.textContent = `${debt.description}: R$ ${debt.amount.toFixed(2)}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => {
            debts.splice(index, 1);
            localStorage.setItem('debts', JSON.stringify(debts));
            loadDebts();
        };
        li.appendChild(removeButton);
        debtList.appendChild(li);
    });
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

// Carregar as listas ao iniciar
loadDebts();
loadShoppingList();
