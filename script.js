// Importando e inicializando o Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getDatabase, ref, set, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC3TUyXwtc9mD5463fEJd82BLGik9hwHrk",
    authDomain: "dividas1-fed53.firebaseapp.com",
    projectId: "dividas1-fed53",
    storageBucket: "dividas1-fed53.appspot.com",
    messagingSenderId: "350859669404",
    appId: "1:350859669404:web:9b9ba5f6320ec92923a259",
    measurementId: "G-7HGSN6TC3Y",
    databaseURL: "https://dividas1-fed53-default-rtdb.firebaseio.com/"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Funções de autenticação
document.getElementById('loginButton').addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Login bem-sucedido
            console.log('Login realizado:', userCredential.user);
            document.getElementById('authSection').style.display = 'none';
            document.getElementById('debtSection').style.display = 'block';
            listarDividas();
            document.getElementById('logoutButton').style.display = 'inline'; // Exibir botão de logout
        })
        .catch((error) => {
            console.error('Erro ao fazer login:', error);
            alert(error.message);
        });
});

document.getElementById('registerButton').addEventListener('click', () => {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Registro bem-sucedido
            console.log('Registro realizado:', userCredential.user);
            alert('Verifique seu e-mail para confirmar a conta.');
            sendEmailVerification(userCredential.user); // Enviar e-mail de verificação
        })
        .catch((error) => {
            console.error('Erro ao registrar:', error);
            alert(error.message);
        });
});

// Função para adicionar nova dívida
document.getElementById('addDebtButton').addEventListener('click', () => {
    const nome = document.getElementById('debtName').value;
    const valor = parseFloat(document.getElementById('debtValue').value);
    const vencimento = document.getElementById('debtDueDate').value;

    if (nome && !isNaN(valor) && vencimento) {
        salvarDivida(nome, valor, vencimento);
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
});

// Função para salvar dívida
function salvarDivida(nome, valor, vencimento) {
    const userId = auth.currentUser.uid; // Obtendo o ID do usuário autenticado
    const dividasRef = ref(db, 'dividas/');
    const novaDividaRef = push(dividasRef);

    set(novaDividaRef, {
        userId: userId, // Associando a dívida ao usuário
        nome: nome,
        valor: valor,
        vencimento: vencimento
    }).then(() => {
        console.log('Dívida salva com sucesso!');
        listarDividas();  // Atualizar a lista após salvar
    }).catch((error) => {
        console.error('Erro ao salvar a dívida:', error);
    });
}

// Função para listar dívidas
function listarDividas() {
    const userId = auth.currentUser.uid; // Obtendo o ID do usuário autenticado
    const dividasRef = ref(db, 'dividas/');

    onValue(dividasRef, (snapshot) => {
        const listaDividas = document.getElementById('debtList');
        listaDividas.innerHTML = '';  // Limpar a lista antes de exibir

        snapshot.forEach((childSnapshot) => {
            const divida = childSnapshot.val();
            if (divida.userId === userId) { // Verifica se a dívida pertence ao usuário autenticado
                const li = document.createElement('li');
                li.innerHTML = `<span>${divida.nome}</span> - R$ ${divida.valor} - Vencimento: ${divida.vencimento}
                                <button onclick="removerDivida('${childSnapshot.key}')">Remover</button>`;
                listaDividas.appendChild(li);
            }
        });
    });
}

// Função para remover dívida
function removerDivida(id) {
    const dividaRef = ref(db, 'dividas/' + id);

    remove(dividaRef).then(() => {
        console
