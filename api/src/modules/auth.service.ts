import { Injectable } from "@nestjs/common";
import { MailerService } from "src/helpers/mailer/mailer.service";
import { ISignupUser } from "src/interfaces/isignup-user";
import { SignupCase } from "src/use-cases/signup-case";

@Injectable()
export class AuthService {
    constructor(
        private signupCase: SignupCase,
        private mailerService: MailerService
    ) { }

    async signup(data: ISignupUser) {
        const { newUser, verificationToken } = await this.signupCase.signup(data);
        await this.mailerService.send({
            name: `${newUser.firstName} ${newUser.lastName}`,
            email: newUser.email,
            subject: "Email Verification",
            hashedVt: verificationToken
        }, "email-verification");

        return newUser;
    }
}