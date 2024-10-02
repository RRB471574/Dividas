// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// Your web app's Firebase configuration
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle registration form submission
const registerForm = document.getElementById('register-form');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = registerForm.email.value;
    const password = registerForm.password.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Registration successful
            console.log('User registered:', userCredential.user);
            successMessage.textContent = 'Registro bem-sucedido! Verifique seu e-mail para confirmar a conta!';
            errorMessage.textContent = '';

            // Send verification email
            sendEmailVerification(userCredential.user)
                .then(() => {
                    // Email sent
                    console.log('Email de verificação enviado!');
                })
                .catch((error) => {
                    console.error('Erro ao enviar o e-mail de verificação:', error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMsg = error.message;
            errorMessage.textContent = errorMsg;
            successMessage.textContent = '';
            console.error(`Error: ${errorCode}, ${errorMsg}`);
        });
});
