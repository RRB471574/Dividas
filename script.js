// Exemplo básico para adicionar uma dívida
document.getElementById('addDebtButton').addEventListener('click', function() {
    let novaDivida = {
        nome: prompt('Nome da dívida:'),
        valor: prompt('Valor da dívida:'),
        vencimento: prompt('Data de vencimento (dd/mm/yyyy):')
    };

    let listaDividas = document.getElementById('debtList');
    let novaDividaElement = document.createElement('li');
    novaDividaElement.textContent = `${novaDivida.nome} - R$ ${novaDivida.valor} - Vencimento: ${novaDivida.vencimento}`;
    listaDividas.appendChild(novaDividaElement);

    // Aqui você pode adicionar o código para salvar no Firebase
});
