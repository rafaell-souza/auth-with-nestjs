import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { HashService } from "src/helpers/hashing/hash.service";
import { JwtService } from "src/helpers/jwt/jwt.service";
import { ISigninUser } from "src/interfaces/isignin-user";

@Injectable()
export class Signincase {
    constructor(
        private prisma: PrismaService,
        private hashService: HashService,
        private jwtService: JwtService
    ) { }

    async signin(data: ISigninUser) {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email }
        })

        if (!user?.checked) throw new NotFoundException("Email not signed up");

        const isEqual = this.hashService.compareData(data.password, user.password);
        if (!isEqual) throw new BadRequestException("Incorrect email or password");

        const accessToken = this.jwtService.createToken({
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`
        })

        return accessToken;
    }
}