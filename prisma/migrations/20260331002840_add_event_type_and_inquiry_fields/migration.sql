-- AlterEnum
ALTER TYPE "ServiceType" ADD VALUE 'EVENT';

-- AlterTable
ALTER TABLE "inquiries" ADD COLUMN     "packageInterest" TEXT,
ADD COLUMN     "referralSource" TEXT,
ADD COLUMN     "servicesNeeded" TEXT[];
