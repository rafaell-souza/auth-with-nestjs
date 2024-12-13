import { HashService } from "./hash.service";

describe("hashService", () => {
    let hashService: HashService
    let salt: number

    beforeAll(() => {
        hashService = new HashService()
        salt = 10
    })

    it("should return a hashed string", async () => {
        const data = "Hello!"
        expect(typeof hashService.hashData(data, salt)).toBe("string")
    })

    it("should be false if comparison fails", () => {
        const hasheddata = hashService.hashData("Hello!", salt)
        expect(typeof hashService.compareData("Hi!", hasheddata)).toBe("boolean")
    })
})