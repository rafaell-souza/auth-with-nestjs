import { CreateUsrDto } from "./create-user.dto";
import { OmitType } from "@nestjs/mapped-types";

export class GoogleCreateUserDto extends OmitType(CreateUsrDto, ["password"] as const) { }
