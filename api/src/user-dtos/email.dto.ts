import { PickType } from "@nestjs/mapped-types";
import { CreateUsrDto } from "./create-user.dto";

export class EmailDto extends PickType(CreateUsrDto, ["email"] as const) { }