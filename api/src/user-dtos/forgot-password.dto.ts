import { IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class ForgotPasswordDto {
    @IsNotEmpty()
    @IsString()
    @Length(8, 12)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[&%$#@])[a-zA-Z0-9&%$#@]{8,12}$/g, { message: "Password must contain at least one uppercase and lowercase letter, a number and a special character ( &%$#@ )" })
    newPassword: string
}