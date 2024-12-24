import { Injectable } from "@nestjs/common";
import { MailerService } from "src/helpers/mailer/mailer.service";
import { IGoogleCreate } from "src/interfaces/IGoogle.-create";
import { ISigninUser } from "src/interfaces/isignin-user";
import { ISignupUser } from "src/interfaces/isignup-user";
import { ConfirmUserCase } from "src/use-cases/confirm-case";
import { ForgotPasswordCase } from "src/use-cases/forgot-password-case";
import { SendCase } from "src/use-cases/send-case";
import { Signincase } from "src/use-cases/signin-case";
import { SignupCase } from "src/use-cases/signup-case";

@Injectable()
export class AuthService {
    constructor(
        private signupCase: SignupCase,
        private mailerService: MailerService,
        private signinCase: Signincase,
        private sendCase: SendCase,
        private confirmUserCase: ConfirmUserCase,
        private forgotPasswordCase: ForgotPasswordCase
    ) { }

    async signup(data: ISignupUser) {
        const { newUser, vToken } = await this.signupCase.signup(data);

        await this.mailerService.send({
            name: `${newUser.firstName} ${newUser.lastName}`,
            email: newUser.email,
            subject: "Email Verification",
            token: vToken
        }, "email-verification");

        return newUser;
    }

    async signin(dto: ISigninUser) {
        const accessToken = await this.signinCase.signin(dto);
        return accessToken
    }

    async googleCallback(data: IGoogleCreate) {
        return await this.signupCase.googleSignup(data);
    }

    async send(templateName: string, email: string) {
        const { user, vToken } = await this.sendCase.send(email, templateName);

        await this.mailerService.send({
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            subject: "Reset Password",
            token: vToken
        }, templateName)

        return user.email;
    }

    async confirmUser(userId: string) {
        await this.confirmUserCase.confirmUser(userId);
    }

    async forgotPassword(userId: string, newPassword: string) {
        await this.forgotPasswordCase.forgot(userId, newPassword);
    }
}