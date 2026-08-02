-- CreateEnum
CREATE TYPE "status_agendamento" AS ENUM ('AGENDADO', 'CONFIRMADO', 'EM_ATENDIMENTO', 'CONCLUIDO', 'CANCELADO');

-- CreateTable
CREATE TABLE "agendamentos" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "veiculoId" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "servico" TEXT NOT NULL,
    "observacoes" TEXT,
    "status" "status_agendamento" NOT NULL DEFAULT 'AGENDADO',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agendamentos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "veiculos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
