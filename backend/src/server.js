require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

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

// O server.js é o Gerenciador Central do backend. 
// Configura o ambiente para que o servidor consiga viver e aceitar conexões.