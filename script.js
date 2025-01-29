// Configuração do EmailJS
emailjs.init('URYyrh8lQg0eZHUi2'); // Seu User ID

// Carrossel de Depoimentos
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

showTestimonial(currentTestimonial);

// Modal de Detalhes
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close');

document.querySelectorAll('#servicos li').forEach(item => {
    item.addEventListener('click', () => {
        modal.style.display = 'block';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Validação e Envio do Formulário
document.getElementById('form-contato').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    // Validações
    if (nome.length < 3) return alert('Nome precisa ter mais de 3 caracteres!');
    if (!email.includes('@')) return alert('E-mail inválido!');
    if (mensagem.length < 10) return alert('Mensagem muito curta!');

    // Envie o e-mail usando seu Service ID e Template ID
    emailjs.sendForm(
        'service_auxnbu7', // Seu Service ID
        'template_j90145b', // Seu Template ID
        this
    )
    .then(() => {
        alert('Mensagem enviada com sucesso!');
        document.getElementById('form-contato').reset();
    }, (error) => {
        alert('Erro ao enviar: ' + error.text);
    });
});

// API de Clima
const apiKey = '4e9138941760bea82980f83a2034d408'; // Sua chave de API do OpenWeatherMap
const city = 'São Paulo';

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt`)
    .then(response => response.json())
    .then(data => {
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = `
            <p>Cidade: ${data.name}</p>
            <p>Temperatura: ${data.main.temp}°C</p>
            <p>Condição: ${data.weather[0].description}</p>
        `;
    })
    .catch(error => {
        console.error('Erro ao buscar dados do clima:', error);
    });

// Botão "Voltar ao Topo"
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
