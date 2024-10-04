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

// Função de registro de usuário
const registerForm = document.getElementById('register-form');
const errorMessage = document.getElementById('error-message');

registerForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Registro bem-sucedido
      const user = userCredential.user;
      console.log('Usuário registrado:', user);
      window.location.href = 'pagina-de-dividas.html';  // Redireciona para a página de dívidas
    })
    .catch((error) => {
      // Tratamento de erros
      const errorCode = error.code;
      const errorMessageText = error.message;

      if (errorCode === 'auth/email-already-in-use') {
        errorMessage.textContent = 'Este e-mail já está em uso. Por favor, tente outro.';
      } else {
        errorMessage.textContent = 'Erro ao registrar: ' + errorMessageText;
      }
      console.error('Erro de registro:', error);
    });
});
