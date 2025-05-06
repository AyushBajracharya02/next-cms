"use server";

import { ZodError } from "zod";
import { blogSchema, BlogSchema } from "./schema";
import { blogTable } from "@/db/schema/blog";
import db from "@/db";
import { ServerResponse } from "@/types/utility";

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
