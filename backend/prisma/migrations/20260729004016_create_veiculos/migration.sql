-- CreateTable
CREATE TABLE "veiculos" (
    "id" SERIAL NOT NULL,
    "placa" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "cor" TEXT,
    "combustivel" TEXT,
    "quilometragem" INTEGER,
    "clienteId" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "veiculos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "veiculos_placa_key" ON "veiculos"("placa");

-- AddForeignKey
ALTER TABLE "veiculos" ADD CONSTRAINT "veiculos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
