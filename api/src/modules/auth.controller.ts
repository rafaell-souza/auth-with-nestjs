import { Body, Controller, Post, Put } from "@nestjs/common";
import { CreateUsrDto } from "src/user-dtos/create-user.dto";
import { v4 as uuid } from "uuid";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("signup")
    async signup(@Body() dto: CreateUsrDto) {
        dto.password = dto.password.trim();
        const result = await this.authService.signup({ id: uuid(), ...dto });
        return {
            message: "User signed up",
            success: true,
            checked: result.checked
        }
    }
}