// Inicialize o Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC3TUyXwtc9mD5463fEJd82BLGik9hwHrk",
    authDomain: "dividas1-fed53.firebaseapp.com",
    projectId: "dividas1-fed53",
    storageBucket: "dividas1-fed53.appspot.com",
    messagingSenderId: "350859669404",
    appId: "1:350859669404:web:9b9ba5f6320ec92923a259",
    measurementId: "G-7HGSN6TC3Y"
};

// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// Verificar autenticação
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("Usuário autenticado:", user);
        // Aqui você pode carregar as dívidas do usuário
        loadDebts(user.uid);
    } else {
        window.location.href = 'index.html';
    }
});

// Carregar dívidas (exemplo)
function loadDebts(userId) {
    const userDebts = [
        { description: 'Cartão de crédito', amount: 1200.50 },
        { description: 'Aluguel', amount: 500.00 },
        { description: 'Conta de luz', amount: 100.30 }
    ];

    const debtList = document.getElementById("debt-list");
    userDebts.forEach(debt => {
        const debtItem = document.createElement('div');
        debtItem.textContent = `${debt.description}: R$ ${debt.amount.toFixed(2)}`;
        debtList.appendChild(debtItem);
    });
}

// Logout
document.getElementById("logout").addEventListener("click", () => {
    auth.signOut().then(() => {
        alert("Des
