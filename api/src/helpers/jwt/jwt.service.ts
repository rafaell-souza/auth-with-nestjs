import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { ICreateToken } from "src/interfaces/ICreate-token";
import { ITokenStructure } from "src/interfaces/itoken-structure";

@Injectable()
export class JwtService {
    private readonly secret = process.env.JWT_SECRET;

    createToken(data: ICreateToken): string {
        const accessToken = jwt.sign({
            id: data.id,
            name: data.name,
            email: data.email,
            iat: Math.floor(Date.now() / 1000)
        }, this.secret)

        return accessToken;
    }

    verifyToken(token: string): ITokenStructure | Error {
        try {
            return jwt.verify(token, this.secret) as ITokenStructure;
        } catch (err) {
            throw new UnauthorizedException("Jwt verified with errors");
        }
    }
}