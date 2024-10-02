// script.js

// Função para lidar com o envio do formulário de login
async function handleLogin(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Aqui você pode adicionar a lógica para autenticar o usuário
        console.log(`Email: ${email}, Senha: ${password}`);

        // Exemplo de uso de uma API de autenticação (substitua pelo seu código)
        // const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        // const user = userCredential.user;
        // console.log('Login bem-sucedido:', user);
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Erro ao fazer login:', errorCode, errorMessage);
    }
}

// Adiciona o ouvinte de eventos ao formulário
document.getElementById('login-form').addEventListener('submit', handleLogin);
