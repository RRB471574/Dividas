// Configuração do Firebase
const firebaseConfig = {
    apiKey: "SUA_API_KEY_AQUI",
    authDomain: "SEU_AUTH_DOMAIN_AQUI",
    projectId: "SEU_PROJECT_ID_AQUI",
    storageBucket: "SEU_STORAGE_BUCKET_AQUI",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID_AQUI",
    appId: "SEU_APP_ID_AQUI"
};

// Inicializar o Firebase
firebase.initializeApp(firebaseConfig);

// Referência ao Firestore
const db = firebase.firestore();

// Função para buscar as dívidas do usuário
function buscarDividas() {
    const dividaContainer = document.getElementById('lista-de-dividas');

    db.collection('dividas').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const divida = doc.data();
            const dividaItem = document.createElement('p');
            dividaItem.textContent = `Nome: ${divida.nome}, Valor: ${divida.valor}`;
            dividaContainer.appendChild(dividaItem);
        });
    }).catch((error) => {
        console.error("Erro ao buscar dívidas: ", error);
    });
}

// Chamar a função ao carregar a página
window.onload = function() {
    buscarDividas();
};
