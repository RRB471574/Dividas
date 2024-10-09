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
const auth = firebase.auth();

// Formulário de Registro
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            // Registro bem-sucedido
            window.location.href = 'login.html';
        })
        .catch(error => {
            document.getElementById('error-message').innerText = error.message;
        });
});
