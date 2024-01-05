/*
  Warnings:

  - Added the required column `type` to the `UserEmailVerification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VerificationType" AS ENUM ('ACCOUNT_VERIFY', 'PASSWORD_RESET');

-- AlterTable
ALTER TABLE "UserEmailVerification" ADD COLUMN     "type" "VerificationType" NOT NULL;
