-- AlterTable
ALTER TABLE "User" ADD COLUMN "plan" TEXT NOT NULL DEFAULT 'FREE';

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN "email" TEXT;
ALTER TABLE "Profile" ADD COLUMN "phone" TEXT;
