// Configuração do Firebase
const firebaseConfig = {
    apiKey: "SUA_API_KEY_AQUI",
    authDomain: "SEU_AUTH_DOMAIN_AQUI",
    projectId: "SEU_PROJECT_ID_AQUI",
    storageBucket: "SEU_STORAGE_BUCKET_AQUI",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID_AQUI",
    appId: "SEU_APP_ID_AQUI"
};

// Inicializar o Firebase
firebase.initializeApp(firebaseConfig);

// Função de registro
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            window.location.href = 'index.html'; // Redireciona para o login após registro
        })
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                document.getElementById('error-message').textContent = 'Este e-mail já está em uso. Por favor, tente outro.';
            } else {
                document.getElementById('error-message').textContent = `Erro ao registrar: ${error.message}`;
            }
        });
});
