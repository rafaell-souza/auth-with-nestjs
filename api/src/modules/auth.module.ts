import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupCase } from "src/use-cases/signup-case";
import { AuthController } from "./auth.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { HashService } from "src/helpers/hashing/hash.service";
import { JwtService } from "src/helpers/jwt/jwt.service";
import { MailerService } from "src/helpers/mailer/mailer.service";
import { SendCase } from "src/use-cases/send-case";
import { ConfirmUserCase } from "src/use-cases/confirm-case";
import { ForgotPasswordCase } from "src/use-cases/forgot-password-case";
import { Signincase } from "src/use-cases/signin-case";
import { GoogleStrategy } from "src/helpers/strategies/google.strategy";

@Module({
    controllers: [AuthController],
    providers: [
        AuthService, PrismaService, HashService,
        JwtService, SignupCase, MailerService,
        SendCase, ConfirmUserCase, ForgotPasswordCase,
        Signincase, GoogleStrategy
    ]
})
export class AuthModule { }