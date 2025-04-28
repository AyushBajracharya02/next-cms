import { z } from "zod";

export const signupSchema = z
    .object({
        name: z
            .string({
                required_error: "Name is required and must be at least 2 characters.",
            })
            .min(2, "Name must be at least 2 characters."),
        email: z
            .string({
                required_error: "Email is required.",
            })
            .email("Please enter a valid email."),
        password: z
            .string({
                required_error: "Password must be at least 6 characters.",
            })
            .min(6, "Password must be at least 6 characters."),
        confirmPassword: z
            .string({
                required_error: "Password must be at least 6 characters.",
            })
            .min(6, "Password must be at least 6 characters."),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

export type SignupSchema = z.infer<typeof signupSchema>;
