-- CreateEnum
CREATE TYPE "tipo_movimentacao_estoque" AS ENUM ('ENTRADA', 'SAIDA');

-- CreateTable
CREATE TABLE "movimentacoes_estoque" (
    "id" SERIAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "ordem_servico_id" INTEGER,
    "tipo" "tipo_movimentacao_estoque" NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "estoque_anterior" INTEGER NOT NULL,
    "estoque_atual" INTEGER NOT NULL,
    "observacao" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movimentacoes_estoque_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "movimentacoes_estoque_produtoId_idx" ON "movimentacoes_estoque"("produtoId");

-- CreateIndex
CREATE INDEX "movimentacoes_estoque_usuarioId_idx" ON "movimentacoes_estoque"("usuarioId");

-- CreateIndex
CREATE INDEX "movimentacoes_estoque_ordem_servico_id_idx" ON "movimentacoes_estoque"("ordem_servico_id");

-- CreateIndex
CREATE INDEX "movimentacoes_estoque_created_at_idx" ON "movimentacoes_estoque"("created_at");

-- AddForeignKey
ALTER TABLE "movimentacoes_estoque" ADD CONSTRAINT "movimentacoes_estoque_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimentacoes_estoque" ADD CONSTRAINT "movimentacoes_estoque_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimentacoes_estoque" ADD CONSTRAINT "movimentacoes_estoque_ordem_servico_id_fkey" FOREIGN KEY ("ordem_servico_id") REFERENCES "ordens_servico"("id") ON DELETE SET NULL ON UPDATE CASCADE;
