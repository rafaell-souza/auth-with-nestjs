/*
  Warnings:

  - You are about to drop the column `otpCodeHash` on the `AuthCache` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `AuthCache` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `AuthCache` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuthCache" DROP COLUMN "otpCodeHash",
ADD COLUMN     "hashedRt" TEXT,
ADD COLUMN     "hashedVt" TEXT,
ADD COLUMN     "userId" VARCHAR(36) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AuthCache_userId_key" ON "AuthCache"("userId");

-- AddForeignKey
ALTER TABLE "AuthCache" ADD CONSTRAINT "AuthCache_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
