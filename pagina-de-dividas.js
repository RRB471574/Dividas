// Importar os módulos do Firebase via CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC3TUyXwtc9mD5463fEJd82BLGik9hwHrk",
    authDomain: "dividas1-fed53.firebaseapp.com",
    projectId: "dividas1-fed53",
    storageBucket: "dividas1-fed53.appspot.com",
    messagingSenderId: "350859669404",
    appId: "1:350859669404:web:9b9ba5f6320ec92923a259",
    measurementId: "G-7HGSN6TC3Y"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const dividasList = document.getElementById("dividas-list");

async function loadDividas() {
    try {
        const querySnapshot = await getDocs(collection(db, "dividas"));
        querySnapshot.forEach((doc) => {
            const divida = doc.data();
            const listItem = document.createElement("div");
            listItem.classList.add("divida-item");
            listItem.innerHTML = `<strong>${divida.descricao}</strong>: ${divida.valor}`;
            dividasList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Erro ao carregar as dívidas:", error);
        const errorMessage = document.createElement("div");
        errorMessage.textContent = "Erro ao carregar as dívidas.";
        dividasList.appendChild(errorMessage);
    }
}

// Chama a função para carregar as dívidas ao carregar a página
loadDividas();
