// Inicialize o Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC3TUyXwtc9mD5463fEJd82BLGik9hwHrk",
    authDomain: "dividas1-fed53.firebaseapp.com",
    projectId: "dividas1-fed53",
    storageBucket: "dividas1-fed53.appspot.com",
    messagingSenderId: "350859669404",
    appId: "1:350859669404:web:9b9ba5f6320ec92923a259",
    measurementId: "G-7HGSN6TC3Y"
};

// Inicialize o app Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Redirecionar para a página de dívidas
            window.location.href = "pagina-de-dividas.html";
        })
        .catch((error) => {
            console.error("Erro ao fazer login:", error);
            alert("Erro ao fazer login: " + error.message);
        });
});
