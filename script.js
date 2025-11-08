document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. FUNÇÕES DE TEMA (MODO CLARO/ESCURO)
    // ==========================================
    
    const themeButton = document.createElement('button');
    themeButton.textContent = '🌙 Mudar Tema';
    themeButton.id = 'theme-toggle-button';
    
    // Estilos do botão
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

    
    // ==========================================
    // 2. FUNÇÕES DE CARREGAMENTO DE NOTÍCIAS (Polling / "Tempo Real")
    // ==========================================
    
    function carregarDados() {
        fetch('data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar data.json: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                renderizarNoticias(data);
                console.log('Notícias atualizadas com sucesso! (Polling)');
            })
            .catch(error => console.error('Houve um problema com a busca de notícias:', error));
    }
    
    function renderizarNoticias(dados) {
        // RENDERIZA MANCHETE PRINCIPAL
        const mancheteElement = document.getElementById('manchete-principal');
        if (mancheteElement) {
             mancheteElement.innerHTML = `<div class="noticia" style="border-left: 5px solid #000000; background-color: #ffeaea;"><h3>${dados.manchete.titulo}</h3><p>${dados.manchete.resumo}</p><a href="${dados.manchete.link}">Saiba mais sobre a situação do DM</a></div>`;
        }

        // RENDERIZA ÚLTIMAS NOTÍCIAS
        const ultimasNoticiasContainer = document.getElementById('ultimas-noticias-container');
        if (ultimasNoticiasContainer) {
            ultimasNoticiasContainer.innerHTML = ''; 
            dados.ultimasNoticias.forEach(noticia => {
                ultimasNoticiasContainer.innerHTML += `<div class="noticia"><h3>${noticia.titulo}</h3><p>${noticia.resumo}</p><a href="${noticia.link}">Confira a matéria completa</a></div>`;
            });
        }
        
        // RENDERIZA OPINIÃO
        const opiniaoElement = document.getElementById('opiniao-spfc');
        if (opiniaoElement) {
             opiniaoElement.innerHTML = `<div class="noticia" style="border-left: 5px solid #FE0000;"><h3>🔴 ${dados.opiniao.titulo}</h3><p>${dados.opiniao.resumo}</p></div>`;
        }
    }

    // ATUALIZAÇÃO REPETITIVA (Polling: A cada 10s)
    carregarDados(); 
    const intervaloAtualizacao = 10000; 
    setInterval(carregarDados, intervaloAtualizacao); 
    
    
    // ==========================================
    // 3. FUNÇÕES DE CARROSSEL DE IMAGENS
    // ==========================================

    function carregarCarrossel() {
        fetch('fotos.json')
            .then(response => response.json())
            .then(data => {
                renderizarCarrossel(data.imagensCarrossel);
            })
            .catch(error => console.error('Erro ao carregar o carrossel:', error));
    }

    let indiceAtual = 0; 
    
    function renderizarCarrossel(imagens) {
        const container = document.getElementById('carrossel-container');
        if (!container || imagens.length === 0) return;

        container.innerHTML = `
            <div id="slideshow-image-wrapper">
                <img id="carrossel-imagem" src="" alt="Imagem do São Paulo FC" style="width: 100%; height: auto;">
                <p id="carrossel-legenda" style="text-align: center; font-style: italic;"></p>
            </div>
        `;
        
        const imagemElemento = document.getElementById('carrossel-imagem');
        const legendaElemento = document.getElementById('carrossel-legenda');
        
        function mostrarProximaImagem() {
            const foto = imagens[indiceAtual];
            imagemElemento.src = foto.src;
            legendaElemento.textContent = foto.legenda;
            
            indiceAtual = (indiceAtual + 1) % imagens.length;
        }

        mostrarProximaImagem(); 
        setInterval(mostrarProximaImagem, 3000); 
    }

    carregarCarrossel(); 
    
    
    // ==========================================
    // 4. FUNÇÃO DE CONTADOR REGRESSIVO (COUNTDOWN)
    // ==========================================
    
    const dataAlvo = new Date("November 8, 2025 21:00:00").getTime(); 

    function atualizarContador() {
        const agora = new Date().getTime();
        const diferenca = dataAlvo - agora;

        const container = document.getElementById('countdown-container');
        if (!container) return;
        
        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

        if (diferenca < 0) {
            clearInterval(intervaloContador); 
            container.innerHTML = `<p style="text-align: center; font-size: 1.5em; color: #FE0000; font-weight: bold;">JOGO EM ANDAMENTO OU ENCERRADO!</p>`;
        } else {
            container.innerHTML = `
                <p style="text-align: center; font-size: 1.8em; color: #00008b; margin: 5px;">
                    ${dias}d : ${horas}h : ${minutos}m : ${segundos}s
                </p>
                <p style="text-align: center; margin: 0;">Faltando para o jogo contra o **Red Bull Bragantino**</p>
            `;
        }
    }

    const intervaloContador = setInterval(atualizarContador, 1000);
    atualizarContador(); 
    
    
    // ==========================================
    // 5. FUNÇÃO DO MASCOTE FALANTE
    // ==========================================
    
    const mensagens = [
        "A base é forte! Confie em Cotia!",
        "Tricolor, o time da fé, o resto é detalhe!",
        "Não se esqueça: 3 mundiais, 3 Libertadores!",
        "O MorumBIS é nosso! Eu acredito!",
        "Saudades do Telê... Mas o futuro é nosso!",
        "A história é gigante. E o próximo título é logo ali!"
    ];

    const mascoteContainer = document.getElementById('mascote-falante-container');
    const balaoElement = document.getElementById('mascote-balao');
    
    if (mascoteContainer) {
        mascoteContainer.addEventListener('click', function() {
            const indice = Math.floor(Math.random() * mensagens.length);
            balaoElement.textContent = mensagens[indice];
            balaoElement.style.opacity = '1';
            setTimeout(() => {
                balaoElement.style.opacity = '0';
            }, 4000);
        });
    }

    
    // ==========================================
    // 6. FUNÇÃO DE PESQUISA SIMPLES (FILTRO DE NOTÍCIAS)
    // ==========================================
    
    const campoPesquisa = document.getElementById('campo-pesquisa');

    if (campoPesquisa) {
        campoPesquisa.addEventListener('keyup', function() {
            const termo = campoPesquisa.value.toLowerCase();
            
            // Seleciona todos os blocos de notícia dinâmicos
            const blocosNoticia = document.querySelectorAll('.container .noticia');

            blocosNoticia.forEach(bloco => {
                const textoDoBloco = bloco.textContent.toLowerCase();
                
                // Exibe ou esconde o bloco dependendo do termo
                if (textoDoBloco.includes(termo) || termo === '') {
                    bloco.style.display = 'block'; 
                } else {
                    bloco.style.display = 'none'; 
                }
            });
        });
    }

    
    // ==========================================
    // 7. MÍDIAS SOCIAIS NO RODAPÉ
    // ==========================================
    const socialContainer = document.getElementById('social-links');

    if (socialContainer) {
        socialContainer.innerHTML = `
            <a href="https://twitter.com/SaoPauloFC" target="_blank" style="color: white; margin: 0 10px; text-decoration: none; font-size: 24px;">
                <i class="fab fa-twitter" style="color: #1DA1F2;"></i>
            </a>
            <a href="https://www.instagram.com/saopaulofc/" target="_blank" style="color: white; margin: 0 10px; text-decoration: none; font-size: 24px;">
                <i class="fab fa-instagram" style="color: #E4405F;"></i>
            </a>
            <a href="https://www.youtube.com/user/saopaulofc" target="_blank" style="color: white; margin: 0 10px; text-decoration: none; font-size: 24px;">
                <i class="fab fa-youtube" style="color: #FF0000;"></i>
            </a>
        `;
        
        // Adiciona a biblioteca Font Awesome para os ícones
        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'stylesheet';
        fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
        document.head.appendChild(fontAwesomeLink);
    }
    

});
// ... (mantenha o restante do código igual) ...

    // ==========================================
    // 7. MÍDIAS SOCIAIS NO RODAPÉ
    // ==========================================
    const socialContainer = document.getElementById('social-links');

    if (socialContainer) {
        socialContainer.innerHTML = `
            <a href="https://twitter.com/SaoPauloFC" target="_blank" style="color: white; margin: 0 10px; text-decoration: none; font-size: 24px;">
                <i class="fab fa-x-twitter" style="color: white;"></i> <!-- Ícone X/Twitter -->
            </a>
            <a href="https://www.instagram.com/saopaulofc/" target="_blank" style="color: white; margin: 0 10px; text-decoration: none; font-size: 24px;">
                <i class="fab fa-instagram" style="color: #E4405F;"></i>
            </a>
            <a href="https://www.youtube.com/user/saopaulofc" target="_blank" style="color: white; margin: 0 10px; text-decoration: none; font-size: 24px;">
                <i class="fab fa-youtube" style="color: #FF0000;"></i>
            </a>
        `;
        
        // Adiciona a biblioteca Font Awesome para os ícones
        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'stylesheet';
        fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'; /* Versão mais nova */
        document.head.appendChild(fontAwesomeLink);
    }
    

});
