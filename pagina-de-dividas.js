// pagina-de-dividas.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "sua-api-key",
    authDomain: "seu-auth-domain",
    projectId: "seu-project-id",
    storageBucket: "seu-storage-bucket",
    messagingSenderId: "seu-messaging-sender-id",
    appId: "seu-app-id"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para listar dívidas
async function listarDividas() {
    const debtsList = document.getElementById("debtsList");
    const debtsCol = collection(db, "dividas");
    const debtSnapshot = await getDocs(debtsCol);
    debtSnapshot.forEach(doc => {
        const li = document.createElement("li");
        li.innerText = `${doc.id}: ${JSON.stringify(doc.data())}`;
        debtsList.appendChild(li);
    });
}

// Chama a função para listar dívidas
listarDividas();
