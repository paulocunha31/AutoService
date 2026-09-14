/*
  Warnings:

  - You are about to drop the column `servico` on the `agendamentos` table. All the data in the column will be lost.
  - Added the required column `servicoId` to the `agendamentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "agendamentos" DROP COLUMN "servico",
ADD COLUMN     "servicoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "servicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
