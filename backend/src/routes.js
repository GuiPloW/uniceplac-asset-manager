const express = require('express');
const routes = express.Router();
const prisma = require('./database/prisma');

// 1. Rota de teste (Health Check)
routes.get('/health', (req, res) => {
    return res.json({ message: "API Uniceplac está online!" });
});

// 2. CRIAR Equipamento (POST)
routes.post('/equipamentos', async (req, res) => {
    try {
        const { nome, tipo, dataAquisicao, status } = req.body;

        // Validação Simples (O diferencial que pediram!)
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

// 3. LISTAR e FILTRAR Equipamentos (GET) - Requisito do PDF
routes.get('/equipamentos', async (req, res) => {
    const { tipo, status } = req.query; // Pega filtros da URL: ?tipo=Monitor
    
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

// 4. ATUALIZAR Equipamento (PUT)
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

// 5. DELETAR Equipamento (DELETE)
routes.delete('/equipamentos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.equipamento.delete({ where: { id } });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: "Erro ao deletar: Equipamento não existe." });
    }
});

// 6. DESAFIO EXTRA: Exportar para JSON (Relatório Coordenação)
routes.get('/exportar', async (req, res) => {
    try {
        const equipamentos = await prisma.equipamento.findMany();
        
        // Define o cabeçalho para download de arquivo
        res.setHeader('Content-disposition', 'attachment; filename=relatorio_uniceplac.json');
        res.setHeader('Content-type', 'application/json');
        
        return res.send(JSON.stringify(equipamentos, null, 2));
    } catch (error) {
        return res.status(500).json({ error: "Erro ao gerar relatório." });
    }
});

module.exports = routes;