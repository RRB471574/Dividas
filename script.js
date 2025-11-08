// O Firebase (variável 'database') é inicializado no index.html.
// Este código JavaScript só deve começar a rodar depois que o HTML for carregado.

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 1. FUNÇÕES DE TEMA (MODO CLARO/ESCURO)
    // ==========================================
    
    // Cria o botão de tema dinamicamente
    const themeButton = document.createElement('button');
    themeButton.textContent = '🌙 Mudar Tema';
    themeButton.id = 'theme-toggle-button';
    
    // Estilos do botão (Mantidos aqui para garantir que ele apareça)
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
    // 6. FUNÇÃO DO TERMÔMETRO DA TORCIDA (AGORA USANDO VARIÁVEL GLOBAL DO index.html)
    // ==========================================

    // A variável 'database' é criada no <script> do index.html.
    const votoBotoes = document.querySelectorAll('.voto-btn');
    const chaveVotoUnico = 'spfc_voto_dado'; 

    // Checa se a conexão com o Firebase está disponível (se 'database' foi criada)
    if (typeof database !== 'undefined') { 
        const refVotos = database.ref('votos_spfc'); 

        // 1. LÊ OS DADOS DO FIREBASE E ATUALIZA O GRÁFICO (Tempo Real)
        // O Firebase inicializa o voto em 0 se ainda não existir
        refVotos.on('value', (snapshot) => {
            const votosAtuais = snapshot.val() || {fogo: 0, equilibrio: 0, gelo: 0};
            atualizarTermometro(votosAtuais);
        });

        // 2. ATUALIZA O GRÁFICO NA TELA
        function atualizarTermometro(votos) {
            const totalVotos = votos.fogo + votos.equilibrio + votos.gelo;

            const calcularPercentual = (contagem) => 
                totalVotos === 0 ? 0 : Math.round((contagem / totalVotos) * 100);

            const percFogo = calcularPercentual(votos.fogo);
            const percEquilibrio = calcularPercentual(votos.equilibrio);
            const percGelo = calcularPercentual(votos.gelo);

            document.getElementById('barra-fogo').style.width = percFogo + '%';
            document.getElementById('perc-fogo').textContent = percFogo + '%';
            document.getElementById('barra-equilibrio').style.width = percEquilibrio + '%';
            document.getElementById('perc-equilibrio').textContent = percEquilibrio + '%';
            document.getElementById('barra-gelo').style.width = percGelo + '%';
            document.getElementById('perc-gelo').textContent = percGelo + '%';
        }


        // 3. LIDA COM O CLIQUE DO USUÁRIO (ENVIA O VOTO PARA O FIREBASE)
        function lidarComVoto(e) {
            if (localStorage.getItem(chaveVotoUnico)) {
                alert('Você já expressou seu sentimento! A votação é única.');
                return;
            }

            const tipoVoto = e.currentTarget.getAttribute('data-voto');
            
            // Incrementa o voto (usando once('value') e set() para a lógica V8)
            refVotos.child(tipoVoto).once('value', (snapshot) => {
                const votoAtual = snapshot.val() || 0;
                refVotos.child(tipoVoto).set(votoAtual + 1)
                    .then(() => {
                        localStorage.setItem(chaveVotoUnico, 'sim');
                        alert('Seu voto foi registrado e atualizado para todos em tempo real!');
                        desabilitarVotacao();
                    })
                    .catch((error) => {
                        alert('Erro ao votar. Verifique o console do navegador.');
                        console.error("Erro ao enviar voto: ", error);
                    });
            });
        }

        // 4. DESABILITA OS BOTÕES
        function desabilitarVotacao() {
            votoBotoes.forEach(btn => btn.disabled = true);
        }

        // 5. INICIALIZAÇÃO E CHECAGEM (Adiciona o Event Listener)
        if (localStorage.getItem(chaveVotoUnico)) {
            desabilitarVotacao();
        } else {
            votoBotoes.forEach(btn => btn.addEventListener('click', lidarComVoto));
        }

    } else {
        console.error("Firebase NÃO está disponível. A variável 'database' não foi definida. Verifique o index.html.");
        // Se a conexão falhar, apenas desabilita a votação
        votoBotoes.forEach(btn => btn.disabled = true);
    }


}); // Fim do document.addEventListener
