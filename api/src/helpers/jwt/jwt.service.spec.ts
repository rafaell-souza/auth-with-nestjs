import { before } from "node:test";
import { JwtService } from "./jwt.service";
import { UnauthorizedException } from "@nestjs/common";

describe("JwtService", () => {
    let jwtService: JwtService;
    beforeAll(() => jwtService = new JwtService())

    it("should return a accessToken as string", () => {
        const user = {
            firstName: "Jhon",
            lastName: "Doe",
            email: "example.com",
            id: "123"
        }

        expect(typeof jwtService.createToken(user)).toBe("string")
    })

    it("should throw if token verification fails", () => {
        try { jwtService.verifyToken("token"); }
        catch (err) {
            expect(err).toBeInstanceOf(UnauthorizedException);
            expect(err.message).toBe("Jwt verified with errors")
        }
    })
})