let totalDebt = 0;

document.getElementById('debtForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const debtName = document.getElementById('debtName').value;
    const debtAmount = parseFloat(document.getElementById('debtAmount').value);

    if (debtName && debtAmount) {
        addDebt(debtName, debtAmount);
        document.getElementById('debtName').value = '';
        document.getElementById('debtAmount').value = '';
    }
});

function addDebt(name, amount) {
    const debtList = document.getElementById('debtList');
    const debtItem = document.createElement('li');
    debtItem.innerHTML = `${name} - R$ ${amount.toFixed(2)}`;
    debtList.appendChild(debtItem);

    totalDebt += amount;
    document.getElementById('totalDebt').innerText = `R$ ${totalDebt.toFixed(2)}`;
}
