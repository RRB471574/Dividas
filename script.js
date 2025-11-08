// O evento 'DOMContentLoaded' é o mais importante! Ele garante que o script só
// tente manipular (criar/achar) elementos depois que o HTML estiver pronto.
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. CRIAÇÃO E ADIÇÃO DO BOTÃO DE TEMA
    const themeButton = document.createElement('button');
    themeButton.textContent = '🌙 Mudar Tema';
    themeButton.id = 'theme-toggle-button';
    
    // Estilos do botão (copie e cole isso no seu style.css se preferir, 
    // mas deixamos aqui para garantir que o botão aparece)
    themeButton.style.position = 'fixed';
    themeButton.style.bottom = '20px'; // Mudei para baixo, mais discreto
    themeButton.style.right = '20px';
    themeButton.style.padding = '12px 20px';
    themeButton.style.backgroundColor = '#000000';
    themeButton.style.color = 'white';
    themeButton.style.border = '2px solid #FE0000'; // Borda vermelha
    themeButton.style.borderRadius = '5px';
    themeButton.style.cursor = 'pointer';
    themeButton.style.fontWeight = 'bold';
    themeButton.style.zIndex = '1000';
    
    // Adiciona o botão ao corpo do documento
    document.body.appendChild(themeButton);

    // 2. FUNÇÃO QUE ALTERNA O TEMA
    function toggleTheme() {
        // Esta linha é o coração do código. Ela procura a tag <body>
        // e, se ela tiver a classe 'dark-mode', remove. Se não tiver, adiciona.
        document.body.classList.toggle('dark-mode'); 
    }

    // 3. LIGAÇÃO DO EVENTO (Clique)
    themeButton.addEventListener('click', toggleTheme);

    // DICA EXTRA: Para manter o tema que o usuário escolheu ao recarregar a página,
    // você precisaria adicionar um código para salvar essa preferência
    // usando o localStorage do navegador.
});
