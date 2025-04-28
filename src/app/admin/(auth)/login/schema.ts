import { string, z } from "zod";

export const loginSchema = z.object({
    email: string().email("Please enter a valid email."),
    password: string({
        required_error: "Password is required.",
    }).min(1, "Password is required."),
});

export type LoginSchema = z.infer<typeof loginSchema>;
