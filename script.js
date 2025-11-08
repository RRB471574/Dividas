// O evento 'DOMContentLoaded' garante que o script só rode depois que o HTML estiver pronto.
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Configuração do Botão de Tema (A parte estática, que não se repete)
    const themeButton = document.createElement('button');
    themeButton.textContent = '🌙 Mudar Tema';
    themeButton.id = 'theme-toggle-button';
    
    // Estilos do botão para aparecer na tela
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

    
    // 2. FUNÇÃO QUE CARREGA OS DADOS DO data.json
    function carregarDados() {
        // Usa fetch() para buscar o arquivo data.json
        fetch('data.json')
            .then(response => {
                // Se a resposta não for OK (ex: arquivo não encontrado), dá um erro
                if (!response.ok) {
                    throw new Error('Erro ao carregar data.json: ' + response.statusText);
                }
                return response.json(); // Transforma o texto JSON em objeto
            })
            .then(data => {
                // Se deu certo, chamamos a função para colocar os dados na página
                renderizarNoticias(data);
                console.log('Dados atualizados com sucesso!');
            })
            .catch(error => console.error('Houve um problema com a operação de busca:', error));
    }
    
    // 3. FUNÇÃO QUE MONTA O HTML COM BASE NOS DADOS
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

        // B) RENDERIZA ÚLTIMAS NOTÍCIAS
        const ultimasNoticiasContainer = document.getElementById('ultimas-noticias-container');
        if (ultimasNoticiasContainer) {
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

    
    // 4. ATUALIZAÇÃO REPETITIVA (O "Polling")
    
    // Carrega os dados uma vez assim que a página abre
    carregarDados(); 

    // E depois, repete a função carregarDados a cada 10 segundos (10000 milissegundos)
    // Se o time estivesse jogando, você poderia mudar a informação no data.json 
    // e o site dos torcedores iria atualizar sozinho!
    const intervaloAtualizacao = 10000; 
    setInterval(carregarDados, intervaloAtualizacao); 

});
