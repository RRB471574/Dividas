const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rota para adicionar dívida (sem e-mail)
app.post('/add-debt', (req, res) => {
    // Lógica para adicionar dívida (ainda precisa ser implementada)
    res.status(200).send('Dívida adicionada com sucesso');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
