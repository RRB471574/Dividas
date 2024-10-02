// Importar as funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

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

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Função para registrar um novo usuário
document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // O usuário foi registrado
            const user = userCredential.user;
            console.log('Usuário registrado:', user);

            // Enviar e-mail de verificação
            sendEmailVerification(user)
                .then(() => {
                    console.log('E-mail de verificação enviado!');
                    alert('E-mail de verificação enviado! Verifique sua caixa de entrada.');
                })
                .catch((error) => {
                    console.error('Erro ao enviar o e-mail de verificação:', error);
                });
        })
        .catch((error) => {
            console.error('Erro ao registrar:', error);
            alert(error.message); // Mostra a mensagem de erro para o usuário
        });
});
