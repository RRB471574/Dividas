document.addEventListener('DOMContentLoaded', function() {
    
    // Função principal para carregar e exibir os jogadores
    function carregarElenco() {
        // Busca os dados no novo arquivo elenco.json
        fetch('elenco.json')
            .then(response => response.json())
            .then(data => {
                renderizarElenco(data.jogadores);
            })
            .catch(error => {
                console.error('Erro ao carregar o elenco:', error);
                document.getElementById('elenco-container').innerHTML = 
                    '<p style="color: red;">Não foi possível carregar a lista de jogadores. Tente novamente mais tarde.</p>';
            });
    }

    // Função que monta o HTML com os dados dos jogadores
    function renderizarElenco(jogadores) {
        const container = document.getElementById('elenco-container');
        let htmlContent = '';
        
        // Laço de repetição: para cada jogador, cria um bloco HTML
        jogadores.forEach(jogador => {
            htmlContent += `
                <div class="noticia" style="border-left: 5px solid red; margin-bottom: 10px;">
                    <h3>#${jogador.numero} - ${jogador.nome}</h3>
                    <p>Posição: <strong>${jogador.posicao}</strong></p>
                </div>
            `;
        });
        
        container.innerHTML = htmlContent;
    }
    
    // Inicia o carregamento quando a página está pronta
    carregarElenco(); 
});
