// 1. Configuração do EmailJS
emailjs.init('URYyrh8lQg0eZHUi2'); // Seu User ID

// 2. Carrossel de Depoimentos (código mantido igual)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
// ... (funções do carrossel permanecem iguais)

// 3. Modal de Detalhes (código mantido igual)
const modal = document.getElementById('modal');
// ... (event listeners do modal permanecem iguais)

// 4. Formulário de Contato (ATUALIZADO)
document.getElementById('form-contato').addEventListener('submit', function(event) {
    event.preventDefault();

    // Validações
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!validarFormulario(nome, email, mensagem)) return;

    // Enviar e-mail
    emailjs.sendForm(
        'service_auxnbu7', // Seu Service ID
        'template_j90145b', // Seu Template ID corrigido
        this
    )
    .then(() => {
        alert('Mensagem enviada! Verifique seu e-mail (inclusive spam).');
        this.reset();
    })
    .catch((error) => {
        console.error('Erro detalhado:', error);
        alert('Falha no envio: ' + error.text);
    });
});

// Função de validação aprimorada
function validarFormulario(nome, email, mensagem) {
    if (nome.length < 3) {
        alert('Nome deve ter pelo menos 3 caracteres!');
        return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Formato de e-mail inválido!');
        return false;
    }
    
    if (mensagem.length < 10) {
        alert('Mensagem precisa ter pelo menos 10 caracteres!');
        return false;
    }
    
    return true;
}

// 5. API de Clima e Botão "Voltar ao Topo" (mantidos iguais)
// ... (código do clima e scroll permanecem idênticos)
