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
const auth = firebase.auth();
const analytics = firebase.analytics();

// Registro de usuário
document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Usuário registrado:", userCredential.user);
            window.location.href = 'pagina-de-dividas.html'; // Redireciona para a página de dívidas
        })
        .catch((error) => {
            console.error("Erro ao registrar:", error);
        });
});

// Login de usuário
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Usuário logado:", userCredential.user);
            window.location.href = 'pagina-de-dividas.html'; // Redireciona para a página de dívidas
        })
        .catch((error) => {
            console.error("Erro ao fazer login:", error);
        });
});
