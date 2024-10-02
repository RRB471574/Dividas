// script.js

// Inicializa o Firebase
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC3TUyXwtc9mD5463fEJd82BLGik9hwHrk",
    authDomain: "dividas1-fed53.firebaseapp.com",
    projectId: "dividas1-fed53",
    storageBucket: "dividas1-fed53.appspot.com",
    messagingSenderId: "350859669404",
    appId: "1:350859669404:web:9b9ba5f6320ec92923a259",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Seleciona os elementos do DOM
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

// Adiciona o evento de submit no formulário de login
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Previne o envio do formulário

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    // Tenta fazer login
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Login bem-sucedido, redireciona para a página de dívidas
            window.location.href = "pagina-de-dividas.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            let errorMsg = 'Erro de login: ' + error.message;
            if (errorCode === 'auth/wrong-password') {
                errorMsg = 'Senha incorreta. Tente novamente.';
            } else if (errorCode === 'auth/user-not-found') {
                errorMsg = 'Usuário não encontrado. Verifique o e-mail.';
            }
            errorMessage.innerText = errorMsg;
            console.error('Erro de login:', error);
        });
});
