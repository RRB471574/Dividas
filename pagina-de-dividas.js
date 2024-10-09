// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC3TUyXwtc9mD5463fEJd82BLGik9hwHrk",
  authDomain: "dividas1-fed53.firebaseapp.com",
  projectId: "dividas1-fed53",
  storageBucket: "dividas1-fed53.appspot.com",
  messagingSenderId: "350859669404",
  appId: "1:350859669404:web:9b9ba5f6320ec92923a259"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

document.getElementById('logout').addEventListener('click', function() {
    auth.signOut().then(() => {
        window.location.href = 'login.html';
    });
});
