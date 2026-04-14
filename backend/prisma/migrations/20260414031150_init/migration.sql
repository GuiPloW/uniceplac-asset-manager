-- CreateEnum
CREATE TYPE "TipoEquipamento" AS ENUM ('Monitor', 'CPU', 'Teclado');

-- CreateEnum
CREATE TYPE "StatusEquipamento" AS ENUM ('Ativo', 'Manutencao');

-- CreateTable
CREATE TABLE "Equipamento" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "TipoEquipamento" NOT NULL,
    "dataAquisicao" TIMESTAMP(3) NOT NULL,
    "status" "StatusEquipamento" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Equipamento_pkey" PRIMARY KEY ("id")
);
