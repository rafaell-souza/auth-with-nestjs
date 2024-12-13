import { BadGatewayException, BadRequestException, Injectable } from "@nestjs/common";
import { IMailer } from "src/interfaces/imailer";
import { transporter } from "./mailer.config";
import * as path from "path";
import * as fs from "fs";
import hbs from "handlebars";

@Injectable()
export class MailerService {
    private loadTemplate(
        templateName: string,
        name: string,
        hashedVt: string
    ): string {

        const filePath = path.resolve(process.cwd(), `src/helpers/mailer/templates/${templateName}.hbs`);
        if (!fs.existsSync(filePath))
            throw new BadRequestException("Template name does not match any result");

        const templateContent = fs.readFileSync(filePath, 'utf-8');
        const compiledTemplate = hbs.compile(templateContent);

        return compiledTemplate({ name, hashedVt });
    }

    async send(data: IMailer, templateName: string) {
        const templateHtml = this.loadTemplate(templateName, data.name, data.hashedVt);

        const sent = await transporter.sendMail({
            from: "dev project <noreply@example.com>",
            to: data.email,
            subject: data.subject,
            html: templateHtml,
        });

        if (!sent) throw new BadGatewayException("Sending email failed");
    }
}
