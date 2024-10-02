// register.js

// Inicializa o Firebase
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
const registerForm = document.getElementById('registerForm');
const errorMessage = document.getElementById('errorMessage');

// Adiciona o evento de submit no formulário de registro
registerForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Previne o envio do formulário

    const email = registerForm.email.value;
    const password = registerForm.password.value;

    // Tenta registrar o usuário
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Registro bem-sucedido, redireciona para a página de dívidas
            window.location.href = "pagina-de-dividas.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            let errorMsg = '';

            // Verifica o código de erro
            if (errorCode === 'auth/email-already-in-use') {
                errorMsg = 'Este e-mail já está em uso. Por favor, tente outro.';
            } else {
                errorMsg = 'Erro de registro: ' + error.message;
            }

            // Exibe a mensagem de erro
            errorMessage.innerText = errorMsg;
            console.error('Erro de registro:', error);
        });
});
