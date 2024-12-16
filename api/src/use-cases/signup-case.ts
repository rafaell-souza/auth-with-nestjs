import { PrismaService } from "src/prisma/prisma.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ISignupUser } from "src/interfaces/isignup-user";
import { HashService } from "src/helpers/hashing/hash.service";
import { JwtService } from "src/helpers/jwt/jwt.service";
import { IGoogleCreate } from "src/interfaces/IGoogle.-create";

@Injectable()
export class SignupCase {
    private salt = 10;
    constructor(
        private prisma: PrismaService,
        private hashSrvice: HashService,
        private jwtService: JwtService
    ) { }

    async signup(data: ISignupUser) {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email }
        })

        if (user) throw new BadRequestException("User already signed up");

        const vToken = this.jwtService.createVToken(data.id);
        const hasehdVToken = this.hashSrvice.hashData(vToken, this.salt);

        data.password = this.hashSrvice.hashData(data.password, this.salt);

        const newUser = await this.prisma.user.create({
            data: {
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                type: 'local_auth_account',
                authCache: {
                    create: {
                        hashedVt: hasehdVToken
                    }
                }
            },
            select: {
                firstName: true,
                lastName: true,
                email: true,
                checked: true
            }
        })

        return { newUser, vToken };
    }

    async googleSignup(data: IGoogleCreate) {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email }
        })

        if (user) {
            const newAccessToken = this.jwtService.createToken({
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                id: data.id
            })
            return newAccessToken;
        }

        await this.prisma.user.create({
            data: {
                ...data,
                type: "google_oauth_account",
                checked: true,
                authCache: { create: {} }
            }
        })

        const accessToken = this.jwtService.createToken({
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            id: data.id
        })
        return accessToken;
    }
}