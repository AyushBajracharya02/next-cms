import { literal, string, union, z } from "zod";

export const contactSchema = z.object({
    email: union([string().email("Enter a valid email."), literal("")]),
    contact_number_1: union([
        string().length(10, "Contact Number must be 10 characters.").regex(/^\d+$/, {
            message: "Enter a valid contact number.",
        }),
        literal(""),
    ]),
    contact_number_2: union([
        string().length(10, "Contact Number must be 10 characters.").regex(/^\d+$/, {
            message: "Enter a valid contact number.",
        }),
        literal(""),
    ]),
    address: string(),
});

export const socialMediaSchema = z.object({
    facebook: string(),
    instagram: string(),
    youtube: string(),
    linkedin: string(),
    tiktok: string(),
    threads: string(),
});

export type ContactSchema = z.infer<typeof contactSchema>;
export type SocialMediaSchema = z.infer<typeof socialMediaSchema>;
