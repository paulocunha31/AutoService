/*
  Warnings:

  - You are about to drop the column `produtoId` on the `ordens_servico` table. All the data in the column will be lost.
  - You are about to drop the column `servicoId` on the `ordens_servico` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ordens_servico" DROP CONSTRAINT "ordens_servico_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "ordens_servico" DROP CONSTRAINT "ordens_servico_servicoId_fkey";

-- AlterTable
ALTER TABLE "ordens_servico" DROP COLUMN "produtoId",
DROP COLUMN "servicoId";
