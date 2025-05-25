"use server";

import { ZodError } from "zod";
import { projectSchema, ProjectSchema } from "./schema";
import { ServerResponse } from "@/types/utility";
import db from "@/db";
import { projectTable } from "@/db/schema/project";

export async function addProject(data: ProjectSchema): Promise<ServerResponse<ProjectSchema>> {
    try {
        projectSchema.parse(data);
        await db.insert(projectTable).values(data);
        return {
            status: 200,
            message: "Project added successfully",
        };
    } catch (e) {
        if (e instanceof ZodError) {
            return {
                status: 400,
                message: "Validation error",
                errors: e.flatten().fieldErrors,
            };
        }
        return {
            status: 500,
            message: (e as Error).message,
        };
    }
}
