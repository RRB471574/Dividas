// ========== Configurações Iniciais ==========
emailjs.init('URYyrh8lQg0eZHUi2'); // User ID do EmailJS

// ========== Loader ==========
window.addEventListener('load', () => {
    document.getElementById('loader').style.display = 'none';
});

// ========== Modo Escuro ==========
document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.toggleAttribute('data-theme');
    localStorage.setItem('theme', document.body.hasAttribute('data-theme') ? 'dark' : 'light');
});

// ========== Navegação Ativa ==========
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
            navLinks.forEach(link => {
                link.classList.remove('nav-active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('nav-active');
                }
            });
        }
    });
});

// ========== Lightbox ==========
document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', () => {
        document.getElementById('lightbox-img').src = img.src;
        document.getElementById('lightbox').style.display = 'block';
    });
});

document.querySelector('.close-lightbox').addEventListener('click', () => {
    document.getElementById('lightbox').style.display = 'none';
});

// ========== Sistema de Comentários ==========
document.getElementById('form-comentario').addEventListener('submit', function(e) {
    e.preventDefault();
    const comentario = {
        nome: this.nome.value,
        texto: this.comentario.value,
        data: new Date().toLocaleString()
    };
    
    const comentarios = JSON.parse(localStorage.getItem('comentarios') || '[]');
    comentarios.push(comentario);
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
    
    carregarComentarios();
    this.reset();
});

function carregarComentarios() {
    const lista = document.getElementById('comentarios-lista');
    lista.innerHTML = JSON.parse(localStorage.getItem('comentarios') || '[]')
        .map(coment => `
            <div class="comentario">
                <h4>${coment.nome} <span>${coment.data}</span></h4>
                <p>${coment.texto}</p>
            </div>
        `).join('');
}

// ========== Newsletter ==========
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    emailjs.sendForm('service_auxnbu7', 'template_3rpgdr9', this)
        .then(() => alert('Inscrito com sucesso! 🎉'))
        .catch(err => alert('Erro: ' + err.text));
});

// ========== Inicialização ==========
carregarComentarios(); // Carrega comentários ao iniciar
