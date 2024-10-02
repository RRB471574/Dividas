// Import the functions you need from the SDKs you need
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Initialize Firebase Authentication
const auth = getAuth();

// Adiciona um ouvinte para o formulário de registro
document.getElementById("registerForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Evita o envio do formulário

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Usuário registrado:", user);
            alert("Registro bem-sucedido!");
            window.location.href = 'index.html'; // Redireciona para a página de login após o registro
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error("Erro ao registrar:", errorMessage);
            alert("Erro de registro: " + errorMessage);
        });
});
