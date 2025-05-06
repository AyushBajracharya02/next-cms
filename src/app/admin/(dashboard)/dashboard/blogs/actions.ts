"use server";

import { z, ZodError } from "zod";
import { Blog, blogSchema, BlogSchema } from "./schema";
import { blogTable } from "@/db/schema/blog";
import db from "@/db";
import { ServerResponse } from "@/types/utility";
import { eq } from "drizzle-orm";

export async function storeBlog(value: BlogSchema): Promise<ServerResponse<BlogSchema>> {
    try {
        blogSchema.parse(value);
        await db.insert(blogTable).values(value);
        return {
            status: 200,
            message: "Blog created successfully",
        };
    } catch (e) {
        if (e instanceof ZodError) {
            return {
                status: 400,
                message: "Validation Error",
                errors: e.flatten().fieldErrors as {
                    [K in keyof BlogSchema]?: string[];
                },
            };
        }
        return {
            status: 500,
            message: "Internal Server Error",
        };
    }
}

export async function updateBlog(value: Partial<Blog> & { id: number }) {
    try {
        blogSchema
            .partial()
            .extend({
                active_status: z.boolean(),
            })
            .parse(value);
        await db.update(blogTable).set(value).where(eq(blogTable.id, value.id));
        return {
            status: 200,
            message: "Blog updated successfully",
        };
    } catch (e) {
        if (e instanceof ZodError) {
            return {
                status: 400,
                message: "Validation Error",
                errors: e.flatten().fieldErrors as {
                    [K in keyof BlogSchema]?: string[];
                },
            };
        }
        return {
            status: 500,
            message: "Internal Server Error",
        };
    }
}
