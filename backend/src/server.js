require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors()); // Permite que o Frontend acesse a API
app.use(express.json()); // Permite que a API entenda JSON no corpo das requisições

// Rota de Status (Opção 2) - Evita a tela "Cannot GET /"
app.get('/', (req, res) => {
    res.status(200).json({
        status: "Online",
        projeto: "Sistema de Gestão de Ativos - UNICEPLAC",
        desenvolvedor: "Guilherme Magalhaes",
        endpoints: {
            listagem: "/equipamentos",
            relatorio: "/exportar"
        }
    });
});

app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});