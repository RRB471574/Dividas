document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. FUNÇÕES DE TEMA (MODO CLARO/ESCURO)
    // ==========================================
    const themeButton = document.createElement('button');
    themeButton.textContent = '🌙 Mudar Tema';
    themeButton.id = 'theme-toggle-button';
    
    // Estilos do botão para garantir que ele apareça
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
    
    // Data do próximo jogo: Sábado (08/11/2025) às 21:00 (Fuso horário do Brasil)
    const dataAlvo = new Date("November 8, 2025 21:00:00").getTime(); 

    function atualizarContador() {
        const agora = new Date().getTime();
        const diferenca = dataAlvo - agora;

        const container = document.getElementById('countdown-container');
        if (!container) return;
        
        // Lógica de cálculo:
        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

        // Se o tempo acabou (jogo começou ou terminou)
        if (diferenca < 0) {
            clearInterval(intervaloContador); 
            container.innerHTML = `<p style="text-align: center; font-size: 1.5em; color: #FE0000; font-weight: bold;">JOGO EM ANDAMENTO OU ENCERRADO!</p>`;
        } else {
            // Se o tempo ainda está correndo
            container.innerHTML = `
                <p style="text-align: center; font-size: 1.8em; color: #00008b; margin: 5px;">
                    ${dias}d : ${horas}h : ${minutos}m : ${segundos}s
                </p>
                <p style="text-align: center; margin: 0;">Faltando para o jogo contra o **Red Bull Bragantino**</p>
            `;
        }
    }

    // Roda a função a cada 1 segundo
    const intervaloContador = setInterval(atualizarContador, 1000);
    atualizarContador(); 

});
