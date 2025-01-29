// ========== Configuração do EmailJS ==========
emailjs.init('URYyrh8lQg0eZHUi2'); // Seu User ID

// ========== Formulário de Contato ==========
document.getElementById('form-contato').addEventListener('submit', function(e) {
    e.preventDefault();

    // Validação
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (nome.length < 3) return alert('Nome deve ter pelo menos 3 caracteres!');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('E-mail inválido!');
    if (mensagem.length < 10) return alert('Mensagem muito curta!');

    // Envio com o NOVO TEMPLATE ID
    emailjs.sendForm(
        'service_auxnbu7', // Service ID
        'template_3rpgdr9', // Template ID atualizado
        this
    )
    .then(() => {
        alert('Mensagem enviada! Verifique seu e-mail (incluindo spam).');
        this.reset();
    }, (err) => {
        console.error('Erro detalhado:', err);
        alert('Erro ao enviar: ' + err.text);
    });
});

// ========== Carrossel de Depoimentos ==========
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
    });
}

document.getElementById('next').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
});

document.getElementById('prev').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
});

// ========== API de Clima ==========
const apiKey = '4e9138941760bea82980f83a2034d408';
fetch(`https://api.openweathermap.org/data/2.5/weather?q=São Paulo&appid=${apiKey}&units=metric&lang=pt`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('weather-info').innerHTML = `
            <p>Temperatura: ${data.main.temp}°C</p>
            <p>Condição: ${data.weather[0].description}</p>
        `;
    });

// ========== Botão "Voltar ao Topo" ==========
window.addEventListener('scroll', () => {
    const btn = document.getElementById('back-to-top');
    btn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== Modal ==========
document.querySelectorAll('#servicos li').forEach(item => {
    item.addEventListener('click', () => {
        document.getElementById('modal').style.display = 'block';
    });
});

document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});
