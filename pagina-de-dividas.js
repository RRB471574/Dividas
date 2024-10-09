// Configurações do Firebase (substitua pelos valores da sua API Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyC3TUyXwtc9mD5463fEJd82BLGik9hwHrk",
  authDomain: "dividas1-fed53.firebaseapp.com",
  projectId: "dividas1-fed53",
  storageBucket: "dividas1-fed53.appspot.com",
  messagingSenderId: "350859669404",
  appId: "1:350859669404:web:9b9ba5f6320ec92923a259"
};

// Inicializando Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Exibindo as dívidas
db.collection('dividas').get().then((snapshot) => {
    const dividasDiv = document.getElementById('dividas');
    snapshot.forEach(doc => {
        const divida = doc.data();
        dividasDiv.innerHTML += `<p>${divida.descricao}: R$${divida.valor}</p>`;
    });
}).catch(error => {
    console.error("Erro ao buscar dívidas: ", error);
});
