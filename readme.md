# Uniceplac TI Asset Manager
> Teste Técnico: Desenvolvedor Full-Stack | Startup UNICEPLAC

Este projeto é uma plataforma de gerenciamento de ativos desenvolvida para o controle patrimonial dos laboratórios da UNICEPLAC. O sistema centraliza o monitoramento de equipamentos como monitores, CPUs e teclados, integrando funcionalidades de inventário e gestão de status.

## Tecnologias Utilizadas

### Backend
- Node.js e Express: API REST para gerenciamento de dados.
- Prisma ORM: Modelagem e integração com banco de dados.
- PostgreSQL: Banco de dados relacional para persistência.
- Docker e Docker Compose: Containerização do ambiente de banco de dados.

### Frontend
- React (Vite): Interface de usuário baseada em componentes.
- Lucide React: Biblioteca de ícones técnicos.
- Axios: Comunicação entre Frontend e Backend.
- CSS3: Estilização modularizada com variáveis personalizadas.

---

## Funcionalidades Implementadas

- CRUD Completo: Fluxo de criação, listagem e exclusão de ativos.
- Dashboard de Ativos: Busca em tempo real por nome do equipamento.
- Sistema de Filtros: Filtragem combinada por categoria (Tipo) e estado (Status).
- Persistência de Dados: Integração com banco de dados PostgreSQL via Docker.
- Interface Responsiva: Layout adaptável para diferentes resoluções.
- Exportação de Dados: Endpoint para geração de relatórios em formato JSON.

---

## Como Executar o Projeto

### 1. Pré-requisitos
Certifique-se de possuir em seu ambiente:
- Node.js (v18 ou superior)
- Docker e Docker Compose
- Certifique-se de possuir o Docker desktop rodando

### 2. Configuração do Backend
Siga os passos abaixo dentro da pasta backend:

1. Instale as dependências:
   npm install

2. Crie um arquivo chamado .env na raiz da pasta
   backend e copie o conteúdo do arquivo .env.example.

3. Inicie o banco de dados via Docker:
   (Certifique-se de que o Docker Desktop está aberto)
   docker-compose up -d

4. Prepare o banco de dados:
   Execute os comandos abaixo para gerar o cliente do banco e criar as tabelas:
   npx prisma generate
   npx prisma migrate dev --name init

5. Inicie o servidor:
   npm run dev

6. Acesse o localhost que ira gerar:
   http://localhost:3000

7. Caso queira ir para listagens so adicionar /equipamentos depois de 3000:
   http://localhost:3000/equipamentos


### 3. Configuração do Frontend
Siga os passos abaixo dentro da pasta frontend:
1. Instale as dependências:
   npm install
   
2. Inicie a aplicação:
   npm run dev

3. Acesse o sistema:
   Abra o navegador no endereço indicado no terminal
   geralmente http://localhost:5173

---

## Modelo de Dados

A entidade de equipamentos utiliza a seguinte estrutura:
- id: Identificador único (UUID).
- nome: Descrição do ativo.
- tipo: Categoria (Monitor, CPU, Teclado).
- dataAquisicao: Registro da data de compra.
- status: Estado atual (Ativo, Manutenção).

---

## Diferenciais Técnicos

1. Identidade Institucional: Implementação da paleta de cores oficial da UNICEPLAC.
2. Arquitetura: Separação clara entre lógica de negócio e camadas de estilo (CSS externo).
3. UX/UI: Customização de seletores (dropdowns) e badges informativos de status.
4. Portabilidade: Ambiente configurado para execução imediata via Docker.

---

## Documentação da API

A API foi estruturada seguindo os princípios REST:

- GET /equipamentos: Retorna a lista completa de ativos cadastrados.
- POST /equipamentos: Registra um novo ativo (requer nome, tipo, dataAquisicao e status).
- DELETE /equipamentos/:id: Remove um ativo permanentemente do banco de dados.
- GET /exportar: Gera um arquivo JSON estruturado para integração com sistemas da coordenação.

---

## Configuração do Ambiente (.env)

Para que o Backend funcione corretamente, certifique-se de que o arquivo .env na pasta /backend contenha a string de conexão com o PostgreSQL:

DATABASE_URL="postgresql://admin:password123@localhost:5432/ativos_ti?schema=public"

---

Desenvolvido por Guilherme Magalhaes para o processo seletivo da Startup UNICEPLAC.