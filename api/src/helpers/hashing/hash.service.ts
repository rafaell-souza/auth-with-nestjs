import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class HashService {
    hashData(data: string, salt: number): string {
        const hashedData = bcrypt.hashSync(data, salt);
        return hashedData;
    }

    compareData(data: string, hashedData: string): boolean {
        const result = bcrypt.compareSync(data, hashedData);
        return result;
    }
}