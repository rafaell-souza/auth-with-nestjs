import { PickType } from "@nestjs/mapped-types";
import { CreateUsrDto } from "./create-user.dto";

export class LoginUserDto extends PickType(CreateUsrDto, ["email", "password"]) { }