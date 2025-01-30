// Configuração do Firebase
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_DOMÍNIO.firebaseapp.com",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_BUCKET.appspot.com",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Configuração do EmailJS
emailjs.init('URYyrh8lQg0eZHUi2');

// Função para mostrar feedback
function showFeedback(message, type) {
    const feedback = document.createElement('div');
    feedback.className = `feedback ${type}`;
    feedback.textContent = message;
    document.body.appendChild(feedback);

    setTimeout(() => feedback.remove(), 3000);
}

// Formulário de Newsletter
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Verificar reCAPTCHA
    if (!grecaptcha.getResponse()) {
        showFeedback('Confirme que você não é um robô!', 'error');
        return;
    }

    // Validação de e-mail
    const email = this.newsletter_email.value.trim();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        showFeedback('Por favor, insira um e-mail válido!', 'error');
        return;
    }

    // Bloquear e-mails temporários
    const blockedDomains = ['10minutemail.com', 'tempmail.com'];
    const domain = email.split('@')[1];
    if (blockedDomains.includes(domain)) {
        showFeedback('E-mails temporários não são aceitos!', 'error');
        return;
    }

    // Capturar interesses
    const interesses = Array.from(this.querySelectorAll('input[type="checkbox"]:checked'))
                            .map(input => input.name);

    // Gerar link de confirmação
    const confirmationCode = Math.random().toString(36).substr(2, 15);
    const confirmationLink = `https://seusite.com/confirmar?code=${confirmationCode}`;

    // Salvar no Firebase
    db.collection('inscritos').add({
        email: email,
        interesses: interesses,
        confirmationCode: confirmationCode,
        confirmado: false,
        data: new Date().toISOString()
    }).then(() => {
        // Enviar e-mail de confirmação
        emailjs.send('service_auxnbu7', 'template_confirmacao', {
            newsletter_email: email,
            confirmationLink: confirmationLink
        }).then(() => {
            showFeedback('Enviamos um link de confirmação para seu e-mail!', 'success');
            this.reset();
        }).catch(err => showFeedback('Erro: ' + err.text, 'error'));
    }).catch(err => showFeedback('Erro: ' + err.message, 'error'));
});
