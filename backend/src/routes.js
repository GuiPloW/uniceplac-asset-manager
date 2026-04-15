const express = require('express');
const routes = express.Router();
const prisma = require('./database/prisma');

routes.get('/health', (req, res) => {
    return res.json({ message: "API Uniceplac está online!" });
});

routes.post('/equipamentos', async (req, res) => {
    try {
        const { nome, tipo, dataAquisicao, status } = req.body;

        if (!nome || nome.trim().length < 3) {
            return res.status(400).json({ error: "Nome é obrigatório e deve ter mais de 3 caracteres." });
        }

        const novoEquipamento = await prisma.equipamento.create({
            data: { nome, tipo, dataAquisicao: new Date(dataAquisicao), status }
        });
        
        return res.status(201).json(novoEquipamento);
    } catch (error) {
        return res.status(400).json({ error: "Erro na validação dos dados." });
    }
});

routes.get('/equipamentos', async (req, res) => {
    const { tipo, status } = req.query;
    
    try {
        const equipamentos = await prisma.equipamento.findMany({
            where: {
                tipo: tipo ? tipo : undefined,
                status: status ? status : undefined
            }
        });
        return res.json(equipamentos);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar equipamentos." });
    }
});

routes.put('/equipamentos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, tipo, dataAquisicao, status } = req.body;

    try {
        const atualizado = await prisma.equipamento.update({
            where: { id },
            data: { 
                nome, 
                tipo, 
                dataAquisicao: dataAquisicao ? new Date(dataAquisicao) : undefined, 
                status 
            }
        });
        return res.json(atualizado);
    } catch (error) {
        return res.status(404).json({ error: "Equipamento não encontrado." });
    }
});

routes.delete('/equipamentos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.equipamento.delete({ where: { id } });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: "Erro ao deletar: Equipamento não existe." });
    }
});

// extra json
routes.get('/exportar', async (req, res) => {
    try {
        const equipamentos = await prisma.equipamento.findMany();
        
        res.setHeader('Content-disposition', 'attachment; filename=relatorio_uniceplac.json');
        res.setHeader('Content-type', 'application/json');
        
        return res.send(JSON.stringify(equipamentos, null, 2));
    } catch (error) {
        return res.status(500).json({ error: "Erro ao gerar relatório." });
    }
});

module.exports = routes;

// O arquivo routes.js funciona como Painel de Controle backend. 
// É ele quem recebe os pedidos do Frontend e decide qual ação tomar.