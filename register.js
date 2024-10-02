// register.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC3TUyXwtc9mD5463fEJd82BLGik9hwHrk",
    authDomain: "dividas1-fed53.firebaseapp.com",
    projectId: "dividas1-fed53",
    storageBucket: "dividas1-fed53.appspot.com",
    messagingSenderId: "350859669404",
    appId: "1:350859669404:web:9b9ba5f6320ec92923a259",
    measurementId: "G-7HGSN6TC3Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const errorMessage = document.getElementById("error-message");

    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = registerForm.querySelector('input[name="email"]').value;
        const password = registerForm.querySelector('input[name="password"]').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Usuário registrado:", userCredential.user);
                window.location.href = "pagina-de-dividas.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessageText = error.message;

                console.error("Erro de registro:", errorMessageText);
                
                if (errorCode === "auth/email-already-in-use") {
                    errorMessage.textContent = "Este e-mail já está em uso. Por favor, tente outro.";
                } else {
                    errorMessage.textContent = "Erro ao registrar: " + errorMessageText;
                }
            });
    });
});
