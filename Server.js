const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // ou outro serviço de e-mail
    auth: {
        user: 'seuemail@gmail.com', // seu e-mail
        pass: 'suasenha' // sua senha ou senha de aplicativo
    }
});

// Rota para enviar e-mail
app.post('/send-notification', (req, res) => {
    const { email, debtName, dueDate } = req.body;

    const mailOptions = {
        from: 'seuemail@gmail.com',
        to: email,
        subject: 'Notificação de Vencimento de Dívida',
        text: `A dívida "${debtName}" vence em ${dueDate}. Por favor, não se esqueça de pagá-la.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Notificação enviada: ' + info.response);
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
