// Configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC3TUyXwtc9mD5463fEJd82BLGik9hwHrk",
  authDomain: "dividas1-fed53.firebaseapp.com",
  projectId: "dividas1-fed53",
  storageBucket: "dividas1-fed53.appspot.com",
  messagingSenderId: "350859669404",
  appId: "1:350859669404:web:9b9ba5f6320ec92923a259"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

db.collection("dividas").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const dividaData = doc.data();
        const dividaElement = document.createElement("div");
        dividaElement.textContent = `Valor: ${dividaData.valor}, Descrição: ${dividaData.descricao}`;
        document.getElementById("dividas").appendChild(dividaElement);
    });
});
