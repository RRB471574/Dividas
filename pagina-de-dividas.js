// pagina-de-dividas.js

import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";

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

// Lógica para exibir as dívidas e realizar logout
document.addEventListener("DOMContentLoaded", () => {
    const dividasList = document.getElementById("dividas-list");
    const logoutButton = document.getElementById("logout");

    logoutButton.addEventListener("click", () => {
        signOut(auth).then(() => {
            console.log("Usuário deslogado");
            window.location.href = "index.html"; // Redireciona para a página de login
        }).catch((error) => {
            console.error("Erro ao deslogar:", error);
        });
    });

    // Aqui você pode adicionar lógica para carregar e exibir as dívidas
});
