// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyC3TUyXwtc9mD5463fEJd82BLGik9hwHrk",
    authDomain: "dividas1-fed53.firebaseapp.com",
    projectId: "dividas1-fed53",
    storageBucket: "dividas1-fed53.appspot.com",
    messagingSenderId: "350859669404",
    appId: "1:350859669404:web:9b9ba5f6320ec92923a259",
    measurementId: "G-7HGSN6TC3Y"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.getElementById("register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Usuário registrado com sucesso
            window.location.href = "index.html";
        })
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                alert("Este e-mail já está em uso. Por favor, tente outro.");
            } else {
                console.error("Erro ao registrar:", error);
                alert("Erro ao registrar: " + error.message);
            }
        });
});
