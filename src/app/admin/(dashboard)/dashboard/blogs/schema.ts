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

export const blogUpdateSchema = blogSchema
    .extend({
        active_status: z.boolean(),
    })
    .partial()
    .extend({
        id: z.number(),
    });

export type BlogSchema = z.infer<typeof blogSchema>;
export type Blog = z.infer<typeof blogUpdateSchema>;
