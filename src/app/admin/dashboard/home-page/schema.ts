import { homepage_service_entries } from "@/db/schema/homepage_service";
import { number, z } from "zod";

export const bannerContentSchema = z.object({
    banner_title: z.string(),
    banner_subtitle: z.string(),
    banner_video: z
        .instanceof(File)
        .refine(file => file.size <= 7 * 1024 * 1024, { message: "File size should be less than 7MB." })
        .refine(file => file.type.startsWith("video/"), { message: "File type should be a video." })
        .optional(),
});

export type BannerContentSchema = z.infer<typeof bannerContentSchema>;

export const purposeContentSchema = z.object({
    purpose_title: z.string(),
    purpose_content: z.string(),
    purpose_tagline: z.string(),
    purpose_image: z
        .instanceof(File)
        .refine(file => file.size <= 7 * 1024 * 1024, { message: "File size should be less than 7MB." })
        .refine(file => file.type.startsWith("image/"), { message: "File type should be a video." })
        .optional(),
    purpose_stats: z.array(
        z.object({
            title: z.string(),
            subtitle: z.string(),
            icon: z.string(),
        })
    ),
});

export type PurposeContentSchema = z.infer<typeof purposeContentSchema>;

export const serviceSectionSchema = z.object({
    service_id: z.preprocess(id => (typeof id === "string" ? Number(id) : id), z.number().int().positive("Please select a valid service.")),
    description: z.string().min(1, "Description must be atleast 1 character."),
    image: z
        .instanceof(File, { message: "Please select an image file." })
        .refine(file => file.size <= 2 * 1024 * 1024, "File must be less than 2MB")
        .refine(file => file.type.startsWith("image/"), "File must be an image"),
});

export type ServiceSectionSchema = z.infer<typeof serviceSectionSchema>;

export const serviceSectionUpdateSchema = serviceSectionSchema
    .extend({
        active_status: z.boolean(),
    })
    .partial()
    .extend({
        id: z.number().positive().int(),
    });

export type ServiceSectionUpdateSchema = z.infer<typeof serviceSectionUpdateSchema>;

export type HomepageServiceContent = typeof homepage_service_entries.$inferSelect;

export const homepageProjectSchema = z.object({
    project_id: z.preprocess(val => (typeof val === "string" ? Number(val) : val), z.number().int().positive()),
    description: z.string().min(1, "Description is required"),
    image: z
        .instanceof(File)
        .refine(file => file.size < 2 * 1024 * 1024, {
            message: "Image size must be less than 2MB",
        })
        .refine(file => file.type.startsWith("image/"), {
            message: "File must be an image.",
        }),
});

export type HomepageProjectSchema = z.infer<typeof homepageProjectSchema>;

export const homepageProjectUpdateSchema = homepageProjectSchema
    .extend({
        active_status: z.boolean(),
    })
    .partial()
    .extend({ id: number().int().positive() });

export type HomepageProjectUpdateSchema = z.infer<typeof homepageProjectUpdateSchema>;

export const whoWeAreSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    image: z
        .instanceof(File)
        .refine(file => file.size < 2 * 1024 * 1024, {
            message: "Image must be less than 2MB",
        })
        .refine(file => file.type.startsWith("image/"), {
            message: "File must be an image",
        })
        .optional(),
});

export type WhoWeAreSchema = z.infer<typeof whoWeAreSchema>;

export const milestoneContentSchema = z.object({
    milestone_title: z.string().min(1, "Title is required"),
    milestone_description: z.string().min(1, "Description is required"),
    milestone_stats: z.array(
        z.object({
            title: z.string().min(1),
            value: z.string().min(1),
        })
    ),
});

export type MilestoneContentSchema = z.infer<typeof milestoneContentSchema>;
