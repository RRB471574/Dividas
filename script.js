// 1. Espera a página carregar completamente antes de rodar o código.
document.addEventListener('DOMContentLoaded', function() {
    
    // 2. Cria um botão para o usuário mudar o tema.
    // O ideal seria colocar um <button> no HTML, mas vamos criá-lo via JS para simplificar.
    const themeButton = document.createElement('button');
    themeButton.textContent = '🌙 Mudar Tema';
    themeButton.id = 'theme-toggle-button';
    
    // Estilo básico para o botão aparecer bem na tela
    themeButton.style.position = 'fixed';
    themeButton.style.top = '10px';
    themeButton.style.right = '10px';
    themeButton.style.padding = '10px';
    themeButton.style.backgroundColor = '#000000'; // Fundo preto
    themeButton.style.color = 'white';
    themeButton.style.border = 'none';
    themeButton.style.cursor = 'pointer';
    themeButton.style.zIndex = '1000';
    
    // Adiciona o botão no topo da página
    document.body.appendChild(themeButton);

    // 3. Função que faz a mudança de tema
    function toggleTheme() {
        // Se o <body> tem a classe 'dark-mode', ele remove. Se não tem, ele adiciona.
        document.body.classList.toggle('dark-mode'); 
    }

    // 4. Adiciona um "ouvinte" ao botão. Quando ele é clicado, a função 'toggleTheme' roda.
    themeButton.addEventListener('click', toggleTheme);

});
