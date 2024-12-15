import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupCase } from "src/use-cases/signup-case";
import { AuthController } from "./auth.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { HashService } from "src/helpers/hashing/hash.service";
import { JwtService } from "src/helpers/jwt/jwt.service";
import { MailerService } from "src/helpers/mailer/mailer.service";

@Module({
    controllers: [AuthController],
    providers: [
        AuthService, PrismaService, HashService, 
        JwtService, SignupCase, MailerService
    ]
})
export class AuthModule { }