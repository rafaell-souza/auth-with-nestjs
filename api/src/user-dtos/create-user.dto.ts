import { IsString, Matches, Length, IsEmail, MaxLength, IsNotEmpty } from "class-validator";

export class CreateUsrDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 40)
    @Matches(/^[\p{L}\s]+$/u)
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 40)
    @Matches(/^[\p{L}\s]+$/u)
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 12)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[&%$#@])[a-zA-Z0-9&%$#@]{8,12}$/g, { message: "Password must contain at least one uppercase and lowercase letter, a number and a special character ( &%$#@ )" })
    password: string;
}