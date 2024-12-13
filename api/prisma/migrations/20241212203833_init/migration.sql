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
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "AuthCache" (
    "id" SERIAL NOT NULL,
    "otpCodeHash" VARCHAR(6),

    CONSTRAINT "AuthCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AuthCache_id_key" ON "AuthCache"("id");
