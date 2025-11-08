document.addEventListener('DOMContentLoaded', function() {
    
    // Função auxiliar para calcular a idade exata com base na data de nascimento
    function calcularIdade(dataNascimento) {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        // Ajusta se o aniversário ainda não passou este ano
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade;
    }

    // Função principal para carregar e exibir os jogadores
    function carregarElenco() {
        fetch('elenco.json')
            .then(response => response.json())
            .then(data => {
                renderizarElenco(data.jogadores);
            })
            .catch(error => {
                console.error('Erro ao carregar o elenco:', error);
                document.getElementById('elenco-container').innerHTML = 
                    '<p style="color: red;">Não foi possível carregar a lista de jogadores.</p>';
            });
    }

    // Função que monta a TABELA com os dados
    function renderizarElenco(jogadores) {
        const tbody = document.querySelector('#tabela-elenco tbody');
        if (!tbody) return;
        
        // Ordena os jogadores por número da camisa
        jogadores.sort((a, b) => a.numero - b.numero);

        let htmlContent = '';
        
        jogadores.forEach(jogador => {
            // Calcula a idade de forma dinâmica
            const idade = calcularIdade(jogador.nascimento);
            
            htmlContent += `
                <tr>
                    <td>${jogador.numero}</td>
                    <td><strong>${jogador.nome}</strong></td>
                    <td>${jogador.posicao}</td>
                    <td>${jogador.nacionalidade}</td>
                    <td>${jogador.altura}</td>
                    <td>${idade} anos</td>
                </tr>
            `;
        });
        
        tbody.innerHTML = htmlContent;
    }
    
    // Inicia o carregamento quando a página está pronta
    carregarElenco(); 
});
