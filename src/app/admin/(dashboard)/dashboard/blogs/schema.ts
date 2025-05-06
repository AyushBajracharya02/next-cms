import { z } from "zod";

export const blogSchema = z.object({
    title: z.string().min(1, "Title cannot be empty."),
    author: z.string().min(1, "Author cannot be empty."),
    content: z
        .string()
        .min(1, "Content cannot be empty.")
        .refine(value => value.trim() !== "<p></p>", {
            message: "Content cannot be empty.",
        }),
});

export type BlogSchema = z.infer<typeof blogSchema>;
export type Blog = Omit<BlogSchema, "content"> & { id: number } & { active_status: boolean };
