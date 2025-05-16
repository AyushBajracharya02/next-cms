import { z } from "zod";

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
