// --- FUNCIONALIDADE 1: ALERTA DE BOAS-VINDAS ---
window.onload = function() {
    alert("BORA! Olá e seja muito bem-vindo ao nosso site!");
};


// --- FUNCIONALIDADE 2: BOTÃO VOLTAR AO TOPO ---
let meuBotao = document.getElementById("btnTopo");

// Detecta a rolagem da página
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  // Se rolou mais de 200px, mostra o botão
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    meuBotao.style.display = "block";
  } else {
    meuBotao.style.display = "none";
  }
}

// Rola a página para o topo
function topFunction() {
  document.body.scrollTop = 0; // Para Safari
  document.documentElement.scrollTop = 0; // Para outros navegadores
}


// --- FUNCIONALIDADE 3: MODO ESCURO ---
const temaToggle = document.getElementById('temaToggle');

temaToggle.addEventListener('click', () => {
    // Adiciona ou remove a classe 'dark-mode' no <body>
    document.body.classList.toggle('dark-mode');
    
    // Mudar o texto do botão
    if (document.body.classList.contains('dark-mode')) {
        temaToggle.textContent = 'Mudar para Modo Claro';
    } else {
        temaToggle.textContent = 'Mudar para Modo Escuro';
    }
});


// --- FUNCIONALIDADE 4: CARROSSEL DE IMAGENS ---

let slideIndex = 1;
showSlides(slideIndex);

// Função chamada pelos botões "anterior" e "próximo"
function mudarSlide(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let slides = document.getElementById("carouselSlide").getElementsByTagName('img');
  
  if (slides.length === 0) return; 
  
  // Lógica para ir da última imagem para a primeira e vice-versa
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  
  // Pega o contêiner de slides
  let slideContainer = document.getElementById("carouselSlide");
  
  // Verifica se há slides antes de calcular a largura
  if (slides[0]) {
    // Pega a largura do primeiro slide para saber quanto mover
    let slideWidth = slides[0].clientWidth; 
    
    // Move a "pista" das imagens (carousel-slide)
    // Multiplica a largura do slide pela posição atual (slideIndex - 1)
    slideContainer.style.transform = `translateX(${-slideWidth * (slideIndex - 1)}px)`;
  }
}

// Opcional: Para fazer o carrossel avançar automaticamente a cada 4 segundos
// Descomente a linha abaixo (remova as duas barras //) se quiser ativar o avanço automático:
// setInterval(() => mudarSlide(1), 4000);
