// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, push, onValue, remove } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3TUyXwtc9mD5463fEJd82BLGik9hwHrk",
  authDomain: "dividas1-fed53.firebaseapp.com",
  projectId: "dividas1-fed53",
  storageBucket: "dividas1-fed53.appspot.com",
  messagingSenderId: "350859669404",
  appId: "1:350859669404:web:9b9ba5f6320ec92923a259",
  measurementId: "G-7HGSN6TC3Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Função para registrar usuário
document.getElementById('registrarButton').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            // Sucesso ao registrar
            console.log('Usuário registrado:', userCredential.user);
            alert('Usuário registrado com sucesso!');
        })
        .catch((error) => {
            console.error('Erro ao registrar:', error);
            alert(error.message);
        });
});

// Função para fazer login
document.getElementById('loginButton').addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            // Sucesso ao fazer login
            console.log('Usuário logado:', userCredential.user);
            document.getElementById('auth').style.display = 'none';
            document.getElementById('overview').style.display = 'block';
            document.getElementById('detailedDebts').style.display = 'block';
            listarDividas(); // Carregar as dívidas após login
        })
        .catch((error) => {
            console.error('Erro ao fazer login:', error);
            alert(error.message);
        });
});

// Função para listar dívidas
function listarDividas() {
    const dividasRef = ref(db, 'dividas/');

    onValue(dividasRef, (snapshot) => {
        const listaDividas = document.getElementById('debtList');
        listaDividas.innerHTML = '';  // Limpar a lista antes de exibir

        let totalDividas = 0;
        snapshot.forEach((childSnapshot) => {
            const divida = childSnapshot.val();
            totalDividas += parseFloat(divida.valor);

            const li = document.createElement('li');
            li.innerHTML = `<span>${divida.nome}</span> - R$ ${divida.valor} - Vencimento: ${divida.vencimento}
                            <button onclick="removerDivida('${childSnapshot.key}')">Remover</button>`;
            listaDividas.appendChild(li);
        });

        // Atualizar o total de dívidas
        document.getElementById('totalDividas').textContent = `R$ ${totalDividas.toFixed(2)}`;
    });
}

// Função para remover dívida
function removerDivida(id) {
    const dividaRef = ref(db, 'dividas/' + id);

    remove(dividaRef).then(() => {
        console.log('Dívida removida com sucesso!');
        listarDividas();  // Atualizar a lista após remoção
    }).catch((error) => {
        console.error('Erro ao remover dívida:', error);
    });
}

// Evento para adicionar nova dívida
document.getElementById('addDebtButton').addEventListener('click', () => {
    const nome = prompt('Nome da dívida:');
    const valor = parseFloat(prompt('Valor da dívida:'));
    const vencimento = prompt('Data de vencimento (dd/mm/yyyy):');

    if (nome && valor && vencimento) {
        salvarDivida(nome, valor, vencimento);
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

// Função para salvar dívida
function salvarDivida(nome, valor, vencimento) {
    const dividasRef = ref(db, 'dividas/');
    const novaDividaRef = push(dividasRef);
    
    set(novaDividaRef, {
        nome: nome,
        valor: valor,
        vencimento: vencimento,
        userId: auth.currentUser.uid // Associar a dívida ao usuário autenticado
    }).then(() => {
        console.log('Dívida salva com sucesso!');
        listarDividas();  // Atualizar a lista após salvar
    }).catch((error) => {
        console.error('Erro ao salvar a dívida:', error);
    });
}

// Monitorar o estado de autenticação
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('Usuário está autenticado:', user);
        document.getElementById('auth').style.display = 'none';
        document.getElementById('overview').style.display = 'block';
        document.getElementById('detailedDebts').style.display = 'block';
        listarDividas(); // Carregar as dívidas após autenticação
    } else {
        console.log('Usuário não está autenticado.');
        document.getElementById('auth').style.display = 'block';
        document.getElementById('overview').style.display = 'none';
        document.getElementById('detailedDebts').style.display = 'none';
    }
});
