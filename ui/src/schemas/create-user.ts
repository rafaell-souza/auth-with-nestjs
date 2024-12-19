import { z } from "zod";

export const createUser = z.object({
    firstName: z.string()
        .nonempty()
        .regex(/^[\p{L}\s]{1,40}$/u)
        .trim(),

    lastName: z.string()
        .nonempty()
        .regex(/^[\p{L}\s]{1,40}$/u)
        .trim(),

    email: z.string()
        .nonempty()
        .email()
        .min(1)
        .max(100)
        .toLowerCase()
        .trim(),

    password: z.string()
        .min(9, {message: "Password is too short."})
        .nonempty({message: "Choose a strong password"})
        .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[&%$#@+=<>?)(:;'",.\[\]|\\\/!^\*\_`-])[a-zA-Z0-9\s&%$#@+=<>?)(:;'",.\[\]|\\\/!^\*\_`-]{8,12}$/, { message: "Too weak. Mix letters, numbers and synbols." }),

    confirmPassword: z.string()
        .nonempty()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[&%$#@+=<>?)(:;'",.\[\]|\\\/!^\*\_`-])[a-zA-Z0-9\s&%$#@+=<>?)(:;'",.\[\]|\\\/!^\*\_`-]{8,12}$/),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})