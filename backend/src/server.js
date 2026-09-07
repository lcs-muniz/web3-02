const express = require('express');
const cors = require('cors');
const { conectarBanco } = require('./instances/mysql'); 
const router = require('./routes/routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada.',
        metodo: req.method,
        caminho: req.originalUrl
    });
});

async function iniciarServidor() {
    try {
        await conectarBanco();
        app.listen(3000, () => {
            console.log('👍 Servidor rodando na porta 3000');
        });
    } catch (error) {
        console.error('❌ Falha:', error);
    }
}

iniciarServidor();