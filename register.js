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
    const registerForm = document.getElementById("registerForm");
    const errorMessage = document.getElementById("error-message"); // Elemento para exibir mensagens de erro

    registerForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Previne o envio padrão do formulário

        const email = registerForm.email.value;
        const password = registerForm.password.value;

        // Tenta criar um novo usuário
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Registro bem-sucedido
                console.log("Usuário registrado:", userCredential.user);
                // Redireciona para a página de dívidas ou para onde desejar
                window.location.href = "pagina-de-dividas.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessageText = error.message;

                console.error("Erro de registro:", errorMessageText);

                // Verifica se o erro é de e-mail já em uso
                if (errorCode === "auth/email-already-in-use") {
                    errorMessage.textContent = "Este e-mail já está em uso. Por favor, tente outro.";
                } else {
                    errorMessage.textContent = "Erro ao registrar: " + errorMessageText;
                }
            });
    });
});
