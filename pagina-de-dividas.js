// Importando as funções necessárias do Firebase
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// Inicializando o Firebase
const auth = getAuth();

// Exemplo de dívidas
const dividas = [
    { nome: "Cartão de crédito", valor: 1250.43 },
    { nome: "Aluguel", valor: 500 },
    { nome: "Conta de luz", valor: 47.06 },
];

// Função para exibir dívidas
function exibirDividas() {
    const dividasContainer = document.getElementById('dividas');
    dividas.forEach(divida => {
        const dividaDiv = document.createElement('div');
        dividaDiv.innerText = `${divida.nome}: R$ ${divida.valor.toFixed(2)}`;
        dividasContainer.appendChild(dividaDiv);
    });
}

// Logout
document.getElementById('logout-button').addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('Usuário deslogado');
        window.location.href = 'index.html'; // Redirecionar para a página de login
    }).catch((error) => {
        console.error('Erro ao deslogar:', error);
    });
});

// Executar
document.addEventListener('DOMContentLoaded', exibirDividas); // Aguarda o carregamento do DOM
