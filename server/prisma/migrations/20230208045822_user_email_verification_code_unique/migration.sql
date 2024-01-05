/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `UserEmailVerification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserEmailVerification_code_key" ON "UserEmailVerification"("code");
