// login.js

// Importando os métodos do Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';

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

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Manipulação do formulário de login
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Login bem-sucedido
      console.log('Login bem-sucedido:', userCredential.user);
      window.location.href = 'pagina-de-dividas.html'; // Redirecionar após login
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessageText = error.message;

      if (errorCode === 'auth/wrong-password') {
        errorMessage.textContent = 'Senha incorreta. Tente novamente.';
      } else if (errorCode === 'auth/user-not-found') {
        errorMessage.textContent = 'Usuário não encontrado. Verifique seu e-mail.';
      } else {
        errorMessage.textContent = errorMessageText;
      }
    });
});
