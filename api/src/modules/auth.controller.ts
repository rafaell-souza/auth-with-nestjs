import { BadRequestException, Body, Controller, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { CreateUsrDto } from "src/user-dtos/create-user.dto";
import { v4 as uuid } from "uuid";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "src/user-dtos/login-user.dto";
import { EmailDto } from "src/user-dtos/email.dto";
import { ForgotPasswordDto } from "src/user-dtos/forgot-password.dto";
import { VerificationGuard } from "src/guards/VerificationGuard.guard";

@Controller("auth")
export class AuthController {
    private readonly allowedTemplates = [
        'email-verification',
        'forgot-password',
    ];

    constructor(private authService: AuthService) { }

    @Post("signup")
    async signup(@Body() dto: CreateUsrDto) {
        dto.password = dto.password.trim();
        await this.authService.signup({ id: uuid(), ...dto });
        return { success: true, date: new Date() }
    }

    @Post("signin")
    async signin(@Body() dto: LoginUserDto) {
        const token = await this.authService.signin(dto);
        return { accessToken: token };
    }

    @Get("verification/send/:templateName")
    async send(
        @Param("templateName") templateName: string,
        @Body() dto: EmailDto
    ) {
        if (!this.allowedTemplates.includes(templateName))
            throw new BadRequestException(`Tempate: ${templateName} in not valid`)

        await this.authService.send(templateName, dto.email);
        return { success: true, date: new Date() }
    }

    @Put("verification/confirm")
    @UseGuards(VerificationGuard)
    async confirmUser(@Request() request: any) {
        const userId = request.user.id
        await this.authService.confirmUser(userId);
        return { success: true, date: new Date() }
    }

    @Put("forgot-password")
    @UseGuards(VerificationGuard)
    async forgotPassword(
        @Request() request: any,
        @Body() dto: ForgotPasswordDto
    ) {
        const userId = request.user.id
        await this.authService.forgotPassword(userId, dto.newPassword);
        return { success: true, date: new Date() }
    }
}