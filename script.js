// Import the functions you need from the SDKs you need
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Initialize Firebase Authentication
const auth = getAuth();

// Adiciona um ouvinte para o formulário de login
document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Evita o envio do formulário

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Usuário autenticado:", user);
            alert("Login bem-sucedido!");
            window.location.href = 'pagina-de-dividas.html'; // Redireciona após login
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error("Erro ao fazer login:", errorMessage);
            alert("Erro de login: " + errorMessage);
        });
});
