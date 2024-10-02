// pagina-de-dividas.js

// Inicializa o Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC3TUyXwtc9mD5463fEJd82BLGik9hwHrk",
    authDomain: "dividas1-fed53.firebaseapp.com",
    projectId: "dividas1-fed53",
    storageBucket: "dividas1-fed53.appspot.com",
    messagingSenderId: "350859669404",
    appId: "1:350859669404:web:9b9ba5f6320ec92923a259",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Verifica se o usuário está autenticado
auth.onAuthStateChanged((user) => {
    if (user) {
        document.getElementById('dividasList').innerText = `Usuário autenticado: ${user.email}`;
    } else {
        window.location.href = "index.html"; // Redireciona para a página de login se não estiver autenticado
    }
});
