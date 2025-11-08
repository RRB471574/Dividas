// --- FUNÇÃO DE MUDAR TEMA (JÁ EXISTENTE) ---
document.addEventListener('DOMContentLoaded', function() {
    
    // Criação e adição do botão de tema (mantido para funcionalidade)
    const themeButton = document.createElement('button');
    themeButton.textContent = '🌙 Mudar Tema';
    themeButton.id = 'theme-toggle-button';
    
    // ... estilos do botão ...
    themeButton.style.position = 'fixed';
    themeButton.style.bottom = '20px';
    themeButton.style.right = '20px';
    themeButton.style.padding = '12px 20px';
    themeButton.style.backgroundColor = '#000000';
    themeButton.style.color = 'white';
    themeButton.style.border = '2px solid #FE0000';
    themeButton.style.borderRadius = '5px';
    themeButton.style.cursor = 'pointer';
    themeButton.style.fontWeight = 'bold';
    themeButton.style.zIndex = '1000';
    document.body.appendChild(themeButton);

    function toggleTheme() {
        document.body.classList.toggle('dark-mode'); 
    }
    themeButton.addEventListener('click', toggleTheme);

    
    // --- NOVO CÓDIGO PARA CARREGAR AS NOTÍCIAS DINAMICAMENTE ---
    
    // 1. O script vai ler o arquivo de dados (data.json)
    fetch('data.json')
        .then(response => response.json()) // Transforma o texto em objeto que o JS entende
        .then(data => {
            // Se deu certo, chamamos a função para colocar os dados na página
            renderizarNoticias(data);
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));

    
    // 2. FUNÇÃO QUE MONTA O HTML COM BASE NOS DADOS
    function renderizarNoticias(dados) {
        
        // A) RENDERIZA MANCHETE PRINCIPAL
        const mancheteElement = document.getElementById('manchete-principal');
        if (mancheteElement) {
             mancheteElement.innerHTML = `
                <div class="noticia" style="border-left: 5px solid #000000; background-color: #ffeaea;">
                    <h3>${dados.manchete.titulo}</h3>
                    <p>${dados.manchete.resumo}</p>
                    <a href="${dados.manchete.link}">Saiba mais sobre a situação do DM</a>
                </div>
            `;
        }

        // B) RENDERIZA ÚLTIMAS NOTÍCIAS (LAÇO DE REPETIÇÃO)
        const ultimasNoticiasContainer = document.getElementById('ultimas-noticias-container');
        if (ultimasNoticiasContainer) {
            // Limpa o conteúdo antigo (se houver)
            ultimasNoticiasContainer.innerHTML = ''; 
            
            dados.ultimasNoticias.forEach(noticia => {
                ultimasNoticiasContainer.innerHTML += `
                    <div class="noticia">
                        <h3>${noticia.titulo}</h3>
                        <p>${noticia.resumo}</p>
                        <a href="${noticia.link}">Confira a matéria completa</a>
                    </div>
                `;
            });
        }
        
        // C) RENDERIZA OPINIÃO
        const opiniaoElement = document.getElementById('opiniao-spfc');
        if (opiniaoElement) {
             opiniaoElement.innerHTML = `
                <div class="noticia" style="border-left: 5px solid #FE0000;">
                    <h3>🔴 ${dados.opiniao.titulo}</h3>
                    <p>${dados.opiniao.resumo}</p>
                </div>
            `;
        }
    }
});
