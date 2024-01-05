/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `VoucherCode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VoucherCode_code_key" ON "VoucherCode"("code");
