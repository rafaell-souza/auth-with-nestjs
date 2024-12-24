import { z } from "zod";

export const resetPasswordSchema = z.object({
    newPassword: z.string()
        .min(8, { message: "Password is too short." })
        .nonempty({ message: "Choose a strong password" })
        .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[&%$#@+=<>?\)\(:;'",.\[\]|\\\/!^\*\_`-])[a-zA-Z0-9&%$#@+=<>?\)\(:;'",.\[\]|\\\/!^\*\_`-]{8,12}$/, { message: "Too weak. Mix letters, numbers and synbols." }),

    confirmNewPassword: z.string()
        .nonempty()
        .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[&%$#@+=<>?\)\(:;'",.\[\]|\\\/!^\*\_`-])[a-zA-Z0-9&%$#@+=<>?\)\(:;'",.\[\]|\\\/!^\*\_`-]{8,12}$/, { message: "Too weak. Mix letters, numbers and synbols." }),
}).refine(data => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})