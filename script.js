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
firebase.initializeApp(firebaseConfig);

// Verifica o estado de autenticação e redireciona
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // Se o usuário está logado, redireciona para a página de dívidas
        window.location.href = "/pagina-de-dividas.html";  // Atualize o caminho conforme necessário
    }
});

// Lida com o formulário de login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Login bem-sucedido
            console.log('Usuário logado:', userCredential.user);
        })
        .catch((error) => {
            // Exibe mensagem de erro
            document.getElementById('error-message').innerText = error.message;
        });
});
