// Verificar se o usuário está autenticado
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // Exibir mensagem de boas-vindas
        document.getElementById("welcome-message").textContent = `Bem-vindo, ${user.email}`;

        // Buscar dívidas do Firestore
        const db = firebase.firestore();
        const debtsRef = db.collection("debts").where("userId", "==", user.uid);

        debtsRef.get().then((querySnapshot) => {
            const debtList = document.getElementById("debt-list");
            debtList.innerHTML = ""; // Limpa a lista antes de exibir novas dívidas

            querySnapshot.forEach((doc) => {
                const debt = doc.data();
                const li = document.createElement("li");
                li.textContent = `${debt.name}: R$ ${debt.amount.toFixed(2)}`;
                debtList.appendChild(li);
            });
        }).catch((error) => {
            console.error("Erro ao buscar dívidas: ", error);
        });
    } else {
        // Redirecionar para a página de login se o usuário não estiver autenticado
        window.location.href = "login.html";
    }
});

// Função para adicionar nova dívida
document.getElementById("add-debt-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const debtName = document.getElementById("debt-name").value;
    const debtAmount = parseFloat(document.getElementById("debt-amount").value);

    const user = firebase.auth().currentUser;
    if (user) {
        const db = firebase.firestore();
        db.collection("debts").add({
            userId: user.uid,
            name: debtName,
            amount: debtAmount,
        }).then(() => {
            alert("Dívida adicionada com sucesso!");
            // Recarregar a página para exibir a nova dívida
            window.location.reload();
        }).catch((error) => {
            console.error("Erro ao adicionar dívida: ", error);
        });
    } else {
        alert("Você precisa estar logado para adicionar dívidas.");
    }
});

// Função para logout
document.getElementById("logout-btn").addEventListener("click", () => {
    firebase.auth().signOut().then(() => {
        window.location.href = "login.html";
    }).catch((error) => {
        console.error("Erro ao fazer logout: ", error);
    });
});
