-- CreateEnum
CREATE TYPE "Account" AS ENUM ('google_oauth_account', 'local_auth_account');

-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(36) NOT NULL,
    "firstName" VARCHAR(40) NOT NULL,
    "lastName" VARCHAR(40) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(12),
    "lastLogOutAt" TIMESTAMP(3),
    "type" "Account" NOT NULL,
    "checked" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "AuthCache" (
    "id" SERIAL NOT NULL,
    "hashedVt" TEXT,
    "hashedRt" TEXT,
    "userId" VARCHAR(36) NOT NULL,

    CONSTRAINT "AuthCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AuthCache_id_key" ON "AuthCache"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AuthCache_userId_key" ON "AuthCache"("userId");

-- AddForeignKey
ALTER TABLE "AuthCache" ADD CONSTRAINT "AuthCache_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
