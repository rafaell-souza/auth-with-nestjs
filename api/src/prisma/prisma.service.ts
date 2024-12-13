import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService implements OnModuleInit {
    constructor(private prisam: PrismaClient) { }
    async onModuleInit() {
        await this.prisam.$connect();
    }
}