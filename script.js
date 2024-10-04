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

// Inicializando Firebase
firebase.initializeApp(firebaseConfig);

// Função de login de usuário
const loginForm = document.getElementById('login-form');
const loginErrorMessage = document.getElementById('login-error-message');

loginForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Login bem-sucedido
      const user = userCredential.user;
      console.log('Usuário logado:', user);
      window.location.href = 'pagina-de-dividas.html';  // Redireciona para a página de dívidas após login
    })
    .catch((error) => {
      // Tratamento de erros
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/wrong-password') {
        loginErrorMessage.textContent = 'Senha incorreta. Por favor, tente novamente.';
      } else if (errorCode === 'auth/user-not-found') {
        loginErrorMessage.textContent = 'Usuário não encontrado. Verifique o e-mail ou registre-se.';
      } else {
        loginErrorMessage.textContent = 'Erro ao fazer login: ' + errorMessage;
      }
      console.error('Erro de login:', error);
    });
});

// Função de deslogar o usuário
const logoutButton = document.getElementById('logout-button');

if (logoutButton) {
  logoutButton.addEventListener('click', function() {
    firebase.auth().signOut().then(() => {
      console.log('Usuário deslogado.');
      window.location.href = 'index.html';  // Redireciona para a página de login após logout
    }).catch((error) => {
      console.error('Erro ao deslogar:', error);
    });
  });
}

// Verificar estado de autenticação
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('Usuário autenticado:', user);
    // O usuário está autenticado, você pode exibir os dados ou a página de dívidas
  } else {
    console.log('Usuário não autenticado');
    // O usuário não está autenticado, redirecionar para login
    window.location.href = 'index.html';
  }
});
