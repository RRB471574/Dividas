document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const formData = new FormData(this);

    fetch('send_email.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('formResponse').innerText = data;
        this.reset(); // Limpa o formulário após o envio
    })
    .catch(error => {
        document.getElementById('formResponse').innerText = 'Erro ao enviar a mensagem.';
    });
});
