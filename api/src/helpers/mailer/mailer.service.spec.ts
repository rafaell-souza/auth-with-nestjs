import { MailerService } from "./mailer.service";
import { transporter } from "./mailer.config";
import { BadRequestException } from "@nestjs/common";

jest.mock("./mailer.config.ts", () => ({
    transporter: {
        sendMail: jest.fn(() => "ók")
    }
}))

describe("MailerService", () => {
    let mailerService: MailerService;
    beforeAll(() => mailerService = new MailerService())

    it("should throw if template not found", async () => {
        await expect(
            mailerService.send({
                name: "Jhon Doe",
                email: "jhondoe123@example.com",
                subject: "error",
                hashedVt: "token's hash"
            }, "a")
        ).rejects.toThrow(BadRequestException)
    })

    it("should be called with correct data", async () => {
        const data = {
            name: "example",
            email: "example",
            subject: "example",
            hashedVt: "example"
        }

        const template = "forgot-password";
        await mailerService.send(data, template);

        expect(transporter.sendMail).toHaveBeenCalledTimes(1);
        expect(transporter.sendMail).toHaveBeenCalledWith({
            to: data.email,
            subject: data.subject,
            html: expect.any(String),
            from: "dev project <noreply@example.com>"
        })
    })
})