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

export const companySchema = z.object({
    logo: z
        .instanceof(File)
        .refine(file => file.size <= 2 * 1024 * 1024, { message: "File size should be less than 2MB." })
        .refine(file => file.type.startsWith("image/"), { message: "File type should be an image." })
        .optional(),
    company_name: z.string().min(1, "Company Name is required."),
});

export type ContactSchema = z.infer<typeof contactSchema>;
export type SocialMediaSchema = z.infer<typeof socialMediaSchema>;
export type CompanySchema = z.infer<typeof companySchema>;
