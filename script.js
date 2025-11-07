// --- FUNCIONALIDADE 1: ALERTA DE BOAS-VINDAS ---
// Ele espera um pouquinho, e quando a página está pronta, faz o alerta.
window.onload = function() {
    // A função 'alert()' abre uma janelinha na tela com a sua mensagem.
    alert("BORA! Olá e seja muito bem-vindo ao nosso site!");
};


// --- FUNCIONALIDADE 2: BOTÃO VOLTAR AO TOPO ---

// 1. Pega o botão do HTML pelo ID
let meuBotao = document.getElementById("btnTopo");

// 2. Quando o usuário rolar a página, verifica a posição
// O 'window.onscroll' detecta a rolagem da página
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  // 'document.body.scrollTop' é para navegadores mais antigos (Safari)
  // 'document.documentElement.scrollTop' é para navegadores modernos (Chrome, Firefox, etc.)
  
  // Se a página rolou mais de 200 pixels para baixo, o botão aparece (display: block)
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    meuBotao.style.display = "block";
  } else {
    // Se não, o botão fica escondido (display: none)
    meuBotao.style.display = "none";
  }
}

// 3. Quando o usuário clica no botão, a página volta para o topo
function topFunction() {
  document.body.scrollTop = 0; // Para Safari
  document.documentElement.scrollTop = 0; // Para outros navegadores
}
