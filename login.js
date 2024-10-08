// Inicializar o Firebase
// Substitua com sua própria configuração Firebase
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_AUTH_DOMAIN",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_STORAGE_BUCKET",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",
    appId: "SEU_APP_ID"
};
firebase.initializeApp(firebaseConfig);

// Função de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Autenticar com Firebase
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log("Login bem-sucedido:", user);
            // Redirecionar para a página de dívidas
            window.location.href = "pagina-de-dividas.html";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error("Erro ao fazer login:", errorCode, errorMessage);
            alert("Erro ao fazer login: " + errorMessage);
        });
});
