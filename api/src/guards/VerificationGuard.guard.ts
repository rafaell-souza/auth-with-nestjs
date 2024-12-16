import { Injectable, ExecutionContext, CanActivate, UnauthorizedException } from "@nestjs/common";
import { HashService } from "src/helpers/hashing/hash.service";
import { JwtService } from "src/helpers/jwt/jwt.service";
import { PrismaService } from "src/prisma/prisma.service";
import "dotenv/config";
import { ITokenStructure } from "src/interfaces/itoken-structure";

@Injectable()
export class VerificationGuard implements CanActivate {
    private readonly vTokenKey = process.env.VTOKEN_KEY
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private hashService: HashService
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = request.headers?.authorization?.split(" ")[1];
        if (!token) throw new UnauthorizedException("Verification token is missing");

        const decoded = this.jwtService.verifyToken(token, this.vTokenKey) as ITokenStructure

        const authCache = await this.prisma.authCache.findUnique({
            where: { userId: decoded.sub }
        })

        if (!authCache.hashedVt)
            throw new UnauthorizedException("Unauthorzed request");

        const isEqual = this.hashService.compareData(token, authCache.hashedVt);
        if (!isEqual) throw new UnauthorizedException("Unauthorized request");

        request.user = { id: decoded.sub }
        return true;
    }
}