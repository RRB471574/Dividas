// pagina-de-dividas.js

// Importar funções do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

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
    // Verifica o estado de autenticação
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("Usuário autenticado:", user);
            // Aqui você pode buscar e exibir as dívidas do usuário
        } else {
            console.log("Nenhum usuário autenticado");
            // Redireciona para a página de login se não estiver autenticado
            window.location.href = "index.html";
        }
    });

    // Manipulador do botão de logout
    document.getElementById("logoutButton").addEventListener("click", () => {
        signOut(auth).then(() => {
            // Redireciona para a página de login após sair
            window.location.href = "index.html";
        }).catch((error) => {
            console.error("Erro ao fazer logout:", error);
        });
    });
});
