// Importando e inicializando o Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, set, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Configurações do Firebase (substitua pelos dados do seu projeto)
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

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Função para salvar dívida
function salvarDivida(nome, valor, vencimento) {
    const dividasRef = ref(db, 'dividas/');
    const novaDividaRef = push(dividasRef);
    
    set(novaDividaRef, {
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
    }, {
        onlyOnce: false
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

// Carregar a lista de dívidas ao iniciar
listarDividas();
