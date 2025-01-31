// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBwSag7CFTN1ekbQS92qYJtTgEZaoWmzGA",
    authDomain: "meu-site-lele.firebaseapp.com",
    projectId: "meu-site-lele",
    storageBucket: "meu-site-lele.firebasestorage.app",
    messagingSenderId: "826289981557",
    appId: "1:826289981557:web:5020bb7802f83ba9aa103c",
    measurementId: "G-LLY0H000EL"
};

// Inicialize o Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Formulário de Newsletter
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Verificar reCAPTCHA
    const respostaRecaptcha = grecaptcha.getResponse();
    if (!respostaRecaptcha) {
        alert('Confirme que você não é um robô!');
        return;
    }

    // Dados do formulário
    const email = this.email.value.trim();

    // Validar reCAPTCHA no backend (simulação)
    validarRecaptcha(respostaRecaptcha).then(sucesso => {
        if (sucesso) {
            // Salvar e-mail no Firestore
            db.collection('inscritos').add({
                email: email,
                data: new Date().toISOString()
            }).then(() => {
                alert('Inscrição realizada com sucesso!');
                this.reset();
            }).catch(err => alert('Erro ao salvar: ' + err.message));
        } else {
            alert('reCAPTCHA inválido!');
        }
    }).catch(err => alert('Erro ao validar reCAPTCHA: ' + err.message));
});

// Função para validar reCAPTCHA (simulação)
function validarRecaptcha(resposta) {
    return fetch('https://seusite.com/validar-recaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resposta })
    }).then(response => response.json())
      .then(data => data.sucesso);
}
