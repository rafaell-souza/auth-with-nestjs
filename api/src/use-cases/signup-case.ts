import { PrismaService } from "src/prisma/prisma.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ISignupUser } from "src/interfaces/isignup-user";
import { HashService } from "src/helpers/hashing/hash.service";
import { JwtService } from "src/helpers/jwt/jwt.service";

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

        const verificationToken = this.jwtService.createToken({
            id: data.id,
            name: `${data.firstName} ${data.lastName}`,
            email: data.email
        })

        const hashedToken = this.hashSrvice.hashData(verificationToken, this.salt);
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
                        hashedVt: hashedToken
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

        return { newUser, verificationToken };
    }

    googleSignup() { }
}