// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3TUyXwtc9mD5463fEJd82BLGik9hwHrk",
    authDomain: "dividas1-fed53.firebaseapp.com",
    projectId: "dividas1-fed53",
    storageBucket: "dividas1-fed53.appspot.com",
    messagingSenderId: "350859669404",
    appId: "1:350859669404:web:9b9ba5f6320ec92923a259",
    measurementId: "G-7HGSN6TC3Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Função para registrar um usuário
document.getElementById("registerForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Evita o envio do formulário

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Usuário registrado:", user);
            alert("Registro bem-sucedido!");
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error("Erro ao registrar:", errorMessage);
            alert("Erro de registro: " + errorMessage);
        });
});

// Função para fazer login
document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Evita o envio do formulário

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Usuário autenticado:", user);
            alert("Login bem-sucedido!");
            // Redirecionar para a página de dívidas ou outra ação
            window.location.href = 'pagina-de-dividas.html'; // Redireciona após login
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error("Erro ao fazer login:", errorMessage);
            alert("Erro de login: " + errorMessage);
        });
});
