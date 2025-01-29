document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os dados do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Aqui você pode adicionar lógica para enviar os dados para um servidor, se necessário

    // Exibe uma mensagem de sucesso
    alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso.`);
    
    // Limpa o formulário
    this.reset();
});
