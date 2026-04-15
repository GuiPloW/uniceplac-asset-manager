const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;

// Inicializa o Prisma Client para permitir a comunicação entre o Node.js e o banco PostgreSQL.
// Esta instância será utilizada em todas as rotas para realizar operações de CRUD.