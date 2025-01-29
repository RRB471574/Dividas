<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Captura e sanitiza os dados do formulário
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Seu e-mail para onde as mensagens serão enviadas
    $to = "robsonrichardbatista17@gmail.com"; // Substitua pelo seu e-mail real
    $subject = "Nova mensagem de contato";
    $body = "Nome: $name\nE-mail: $email\nMensagem: $message";
    $headers = "From: $email";

    // Envia o e-mail
    if (mail($to, $subject, $body, $headers)) {
        echo "Mensagem enviada com sucesso!";
    } else {
        echo "Falha ao enviar a mensagem.";
    }
} else {
    echo "Método de requisição inválido.";
}
?>
