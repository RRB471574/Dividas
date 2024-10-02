// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC3TUyXwtc9mD5463fEJd82BLGik9hwHrk",
    authDomain: "dividas1-fed53.firebaseapp.com",
    projectId: "dividas1-fed53",
    storageBucket: "dividas1-fed53.appspot.com",
    messagingSenderId: "350859669404",
    appId: "1:350859669404:web:9b9ba5f6320ec92923a259",
};

// Inicializar o Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// Função para registrar usuário
document.getElementById('registerButton').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (email && senha) {
        auth.createUserWithEmailAndPassword(email, senha)
            .then((userCredential) => {
                const user = userCredential.user;
                // Enviar email de verificação
                user.sendEmailVerification().then(() => {
                    alert('Email de verificação enviado! Verifique sua caixa de entrada.');
                });
            })
            .catch((error) => {
                console.error('Erro ao registrar: ', error);
                alert('Erro: ' + error.message);
            });
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});
