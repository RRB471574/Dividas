// dividas.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

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
const auth = getAuth(app);

document.getElementById("logoutButton").addEventListener("click", () => {
    signOut(auth).then(() => {
        console.log("Usuário desconectado");
        alert("Logout bem-sucedido!");
        window.location.href = 'index.html'; // Redireciona para a página de login
    }).catch((error) => {
        console.error("Erro ao desconectar:", error.message);
    });
});

// Adicione aqui o código para gerenciar e exibir as dívidas
