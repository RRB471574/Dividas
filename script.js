// script.js

// Importar funções do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

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

// Manipulador de envio do formulário
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Chama a função de autenticação
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Autenticação bem-sucedida
            const user = userCredential.user;
            console.log("Usuário logado:", user);

            // Redireciona para a página de dívidas
            window.location.href = "pagina-de-dividas.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Erro de autenticação:", errorCode, errorMessage);
            alert("Erro ao fazer login: " + errorMessage);
        });
});
