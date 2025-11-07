// --- FUNCIONALIDADE 1: ALERTA DE BOAS-VINDAS ---
window.onload = function() {
    alert("BORA! Olá e seja muito bem-vindo ao nosso site!");
};


// --- FUNCIONALIDADE 2: BOTÃO VOLTAR AO TOPO ---
let meuBotao = document.getElementById("btnTopo");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    meuBotao.style.display = "block";
  } else {
    meuBotao.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
}


// --- NOVIDADE: FUNCIONALIDADE 3: MODO ESCURO ---
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
