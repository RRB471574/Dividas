// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "sua-api-key",
    authDomain: "seu-auth-domain",
    projectId: "seu-project-id",
    storageBucket: "seu-storage-bucket",
    messagingSenderId: "seu-messaging-sender-id",
    appId: "seu-app-id"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Função para registrar um usuário
document.getElementById("registerForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Evita o envio do formulário

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Usuário registrado com sucesso
            const user = userCredential.user;
            console.log("Usuário registrado:", user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === 'auth/email-already-in-use') {
                alert("Este e-mail já está em uso. Por favor, tente outro.");
            } else {
                console.error("Erro ao registrar:", errorMessage);
            }
        });
});
