import { IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class ForgotPasswordDto {
    @IsNotEmpty()
    @IsString()
    @Length(8, 12)
    @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[&%$#@+=<>?\)\(:;'",.\[\]|\\\/!^\*\_`-])[a-zA-Z0-9&%$#@+=<>?\)\(:;'",.\[\]|\\\/!^\*\_`-]{8,12}$/, { message: "Too weak. Mix letters, numbers and synbols." })
    newPassword: string
}