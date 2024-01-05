-- AlterTable
ALTER TABLE "UserEmailVerification" ALTER COLUMN "verifiedAt" DROP NOT NULL,
ALTER COLUMN "verifiedAt" DROP DEFAULT;
