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

// Validação de Formulário
document.getElementById('form-contato').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;
    
    if (nome.length < 3) {
        alert('O nome deve ter pelo menos 3 caracteres.');
        return;
    }
    
    if (!email.includes('@')) {
        alert('Por favor, insira um email válido.');
        return;
    }
    
    if (mensagem.length < 10) {
        alert('A mensagem deve ter pelo menos 10 caracteres.');
        return;
    }
    
    alert('Mensagem enviada com sucesso!');
    document.getElementById('form-contato').reset();
});

// API de Clima
const apiKey = '4e9138941760bea82980f83a2034d408'; // Sua chave de API
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
