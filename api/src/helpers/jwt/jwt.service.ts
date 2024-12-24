import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { ICreateToken } from "src/interfaces/ICreate-token";
import { ITokenStructure } from "src/interfaces/itoken-structure";

@Injectable()
export class JwtService {
    private readonly tokenKey = process.env.TOKEN_KEY
    private readonly vTokenKey = process.env.VTOKEN_KEY

    createToken(data: ICreateToken): string {
        const accessToken = jwt.sign({
            sub: data.id,
            name: data.name,
            email: data.email,
            iat: Math.floor(Date.now() / 1000)
        }, this.tokenKey, {
            expiresIn: "1d"
        })

        return accessToken
    }

    createVToken(userId: string): string {
        const accessToken = jwt.sign({
            sub: userId,
            iat: Math.floor(Date.now() / 1000)
        }, this.vTokenKey, {
            expiresIn: "3h"
        })

        return accessToken
    }

    verifyToken(token: string, key: string): ITokenStructure | Error {
        try {
            return jwt.verify(token, key) as ITokenStructure;
        } catch (err) {
            throw new UnauthorizedException("Jwt verified with errors");
        }
    }
}