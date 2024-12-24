import { z } from "zod";

export const loginUser = z.object({
    email: z.string()
        .nonempty()
        .email()
        .min(1)
        .max(100)
        .toLowerCase()
        .trim(),

    password: z.string()
        .min(8, { message: "Password is too short." })
        .nonempty({ message: "Choose a strong password" })
        .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[&%$#@+=<>?\)\(:;'",.\[\]|\\\/!^\*\_`-])[a-zA-Z0-9&%$#@+=<>?\)\(:;'",.\[\]|\\\/!^\*\_`-]{8,12}$/, { message: "Too weak. Mix letters, numbers and synbols." }),
})