import { string, z } from "zod";

export const contactSchema = z.object({
    email: string().email("Enter a valid email."),
    contact_number_1: string().length(10, "Contact Number must be 10 characters."),
    contact_number_2: string().length(10, "Contact Number must be 10 characters."),
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
