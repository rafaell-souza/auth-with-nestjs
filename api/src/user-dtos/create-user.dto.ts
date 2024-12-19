import { IsString, Matches, Length, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUsrDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 40)
    @Matches(/^[\p{L}\s]+$/u)
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 40)
    @Matches(/^[\p{L}\s]+$/u)
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    @Length(1, 100)
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 12)
    @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[&%$#@+=<>?)(:;'",.\[\]|\\\/!^\*\_`-])[a-zA-Z0-9\s&%$#@+=<>?)(:;'",.\[\]|\\\/!^\*\_`-]{8,12}$/, { message: "Too weak. Mix letters, numbers and synbols." })
    password: string;
}