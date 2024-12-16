import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { HashService } from "src/helpers/hashing/hash.service";

@Injectable()
export class ForgotPasswordCase {
    private readonly salt = 10
    constructor(
        private prisma: PrismaService,
        private hashService: HashService
    ) { }
    async forgot(userId: string, newPassword: string) {
        const hashedPass = this.hashService.hashData(newPassword, this.salt);
        await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id: userId },
                data: { password: hashedPass }
            }),
            this.prisma.authCache.update({
                where: { userId: userId },
                data: { hashedVt: null }
            })
        ])
    }
}