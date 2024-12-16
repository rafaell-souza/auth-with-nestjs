import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ConfirmUserCase {
    constructor(private prisma: PrismaService) { }
    async confirmUser(userId: string) {
        await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id: userId },
                data: { checked: true }
            }),

            this.prisma.authCache.update({
                where: { userId: userId },
                data: { hashedVt: null }
            })
        ])
    }
}