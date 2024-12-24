import { z } from "zod";

export const emailSchema = z.object({
    email: z.string()
        .nonempty()
        .email()
        .min(1)
        .max(100)
        .toLowerCase()
        .trim(),
})