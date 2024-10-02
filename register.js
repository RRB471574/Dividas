// register.js

// Função para lidar com o envio do formulário de registro
async function handleRegister(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        // Aqui você pode adicionar a lógica para registrar o usuário
        console.log(`Email registrado: ${email}, Senha: ${password}`);

        // Exemplo de uso de uma API de autenticação (substitua pelo seu código)
        // const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        // const user = userCredential.user;
        // console.log('Registro bem-sucedido:', user);
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Erro ao registrar:', errorCode, errorMessage);
    }
}

// Adiciona o ouvinte de eventos ao formulário
document.getElementById('register-form').addEventListener('submit', handleRegister);
