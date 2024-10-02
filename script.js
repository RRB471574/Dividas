// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC3TUyXwtc9mD5463fEJd82BLGik9hwHrk",
    authDomain: "dividas1-fed53.firebaseapp.com",
    projectId: "dividas1-fed53",
    storageBucket: "dividas1-fed53.appspot.com",
    messagingSenderId: "350859669404",
    appId: "1:350859669404:web:9b9ba5f6320ec92923a259",
    measurementId: "G-7HGSN6TC3Y"
};

// Inicializar o Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Inicializar o Firebase Auth e Firestore
const auth = firebase.auth();
const db = firebase.firestore();

// Função para registrar usuário
function registerUser(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Registro bem-sucedido
            const user = userCredential.user;
            console.log('Usuário registrado com sucesso:', user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Erro ao registrar usuário:', errorCode, errorMessage);
        });
}

// Captura o evento de envio do formulário
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtém o email e a senha dos campos de entrada
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Chama a função para registrar o usuário
    registerUser(email, password);
});
