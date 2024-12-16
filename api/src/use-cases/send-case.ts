import { PrismaService } from "src/prisma/prisma.service";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { HashService } from "src/helpers/hashing/hash.service";
import { JwtService } from "src/helpers/jwt/jwt.service";

@Injectable()
export class SendCase {
    private readonly salt = 10
    constructor(
        private prisma: PrismaService,
        private hashService: HashService,
        private jwtService: JwtService
    ) { }

    async send(email: string, templateName: string) {
        const result = await this.prisma.$transaction(async tx => {
            const user = await tx.user.findUnique({
                where: { email: email },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true
                }
            });

            if (!user) throw new NotFoundException("Email not signed up");

            if(user && templateName.startsWith("email")) 
                throw new BadRequestException("Email already verified")

            const vToken = this.jwtService.createVToken(user.id);
            const hashedVt = this.hashService.hashData(vToken, this.salt);

            await tx.authCache.update({
                where: { userId: user.id },
                data: { hashedVt: hashedVt }
            })

            return { user, vToken }
        })

        return result;
    }
}