// register.js

// Importar funções do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

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

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Executa o código após o DOM estar completamente carregado
document.addEventListener("DOMContentLoaded", () => {
    // Manipulador de envio do formulário
    document.getElementById("registerForm").addEventListener("submit", (e) => {
        e.preventDefault(); // Impede o envio padrão do formulário

        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;

        // Chama a função de criação de usuário
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Registro bem-sucedido
                const user = userCredential.user;
                console.log("Usuário registrado:", user);

                // Redireciona para a página de login
                window.location.href = "index.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Erro de registro:", errorCode, errorMessage);
                alert("Erro ao registrar: " + errorMessage);
            });
    });
});
