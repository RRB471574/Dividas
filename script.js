// script.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

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
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("error-message");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = loginForm.querySelector('input[name="email"]').value;
        const password = loginForm.querySelector('input[name="password"]').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Usuário autenticado:", userCredential.user);
                window.location.href = "pagina-de-dividas.html";
            })
            .catch((error) => {
                const errorMessageText = error.message;
                console.error("Erro de autenticação:", errorMessageText);
                errorMessage.textContent = "Erro: " + errorMessageText;
            });
    });
});
