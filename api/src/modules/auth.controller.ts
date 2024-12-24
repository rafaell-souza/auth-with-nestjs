import { BadRequestException, Body, Controller, Get, HttpCode, Param, Post, Put, Req, Request, Res, UseGuards } from "@nestjs/common";
import { CreateUsrDto } from "src/user-dtos/create-user.dto";
import { v4 as uuid } from "uuid";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "src/user-dtos/login-user.dto";
import { EmailDto } from "src/user-dtos/email.dto";
import { ForgotPasswordDto } from "src/user-dtos/forgot-password.dto";
import { VerificationGuard } from "src/guards/VerificationGuard.guard";
import { GoogleOAuthGuard } from "src/guards/google-oauth.guard";
import { Throttle } from "@nestjs/throttler";
import { Response } from "express";

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
        const result = await this.authService.signup({ id: uuid(), ...dto });
        return {
            success: true,
            email: result.email,
            date: new Date()
        }
    }

    @Post("signin")
    async signin(@Body() dto: LoginUserDto) {
        const token = await this.authService.signin(dto);
        return { accessToken: token };
    }

    @Get("google/auth")
    @UseGuards(GoogleOAuthGuard)
    async googleAuth(@Request() request: any) { }

    @Get("google/callback")
    @UseGuards(GoogleOAuthGuard)
    async googleCallback(
        @Res() res: Response,
        @Req() req: any
    ) {
        const token = await this.authService.googleCallback({
            id: uuid(), ...req.user
        })
        return res.redirect(`http://localhost:5173/token=${token}`)
    }

    @Throttle({ default: { limit: 6, ttl: 36000 } })
    @HttpCode(200)
    @Post("verification/send/:templateName")
    async send(
        @Param("templateName") templateName: string,
        @Body() dto: EmailDto
    ) {
        if (!this.allowedTemplates.includes(templateName))
            throw new BadRequestException(`Tempate: ${templateName} in not valid`)

        const email = await this.authService.send(templateName, dto.email);
        return { success: true, date: new Date(), email: email }
    }

    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @Put("verification/confirm")
    @UseGuards(VerificationGuard)
    async confirmUser(@Request() request: any) {
        const userId = request.user.id
        await this.authService.confirmUser(userId);
        return { success: true, date: new Date() }
    }

    @Throttle({ default: { limit: 3, ttl: 600000 } })
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