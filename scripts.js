document.addEventListener('DOMContentLoaded', () => {
    // ========== Inicialização do EmailJS ==========
    emailjs.init('URYyrh8lQg0eZHUi2');

    // ========== Loader ==========
    window.addEventListener('load', () => {
        document.getElementById('loader').style.display = 'none';
    });

    // ========== Modo Escuro ==========
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.toggleAttribute('data-theme');
            localStorage.setItem('theme', document.body.hasAttribute('data-theme') ? 'dark' : 'light');
        });
        
        // Carregar tema salvo
        if (localStorage.getItem('theme') === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
        }
    }

    // ========== Formulário de Contato ==========
    const contactForm = document.getElementById('form-contato');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            emailjs.sendForm('service_auxnbu7', 'template_3rpgdr9', this)
                .then(() => {
                    alert('Mensagem enviada com sucesso!');
                    this.reset();
                })
                .catch(err => alert('Erro: ' + err.text));
        });
    }

    // ========== Newsletter ==========
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.newsletter_email.value.trim();
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return alert('Por favor, insira um e-mail válido!');
            }

            emailjs.sendForm('service_auxnbu7', 'template_klw1iyl', this)
                .then(() => {
                    alert('Inscrição realizada! 🎉');
                    this.reset();
                })
                .catch(err => alert('Erro: ' + err.text));
        });
    }

    // ========== Sistema de Comentários ==========
    const commentForm = document.getElementById('form-comentario');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const comment = {
                nome: this.nome.value.trim(),
                texto: this.comentario.value.trim(),
                data: new Date().toLocaleString()
            };

            const comments = JSON.parse(localStorage.getItem('comments') || '[]');
            comments.push(comment);
            localStorage.setItem('comments', JSON.stringify(comments));
            
            loadComments();
            this.reset();
        });

        // Carregar comentários ao iniciar
        loadComments();
    }

    // ========== Lightbox ==========
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        document.querySelectorAll('.gallery img').forEach(img => {
            img.addEventListener('click', () => {
                document.getElementById('lightbox-img').src = img.src;
                lightbox.style.display = 'block';
            });
        });

        document.querySelector('.close-lightbox').addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    // ========== Navegação Ativa ==========
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('nav-active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('nav-active');
                    }
                });
            }
        });
    });
});

// ========== Função para Carregar Comentários ==========
function loadComments() {
    const commentList = document.getElementById('comentarios-lista');
    if (commentList) {
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        commentList.innerHTML = comments.map(comment => `
            <div class="comment">
                <h4>${comment.nome} <small>${comment.data}</small></h4>
                <p>${comment.texto}</p>
            </div>
        `).join('');
    }
}
