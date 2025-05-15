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
