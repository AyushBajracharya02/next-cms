import { z } from "zod";

export const projectSchema = z.object({
    name: z.string().min(1, "Project title is required."),
    description: z.string(),
    service_id: z.preprocess(id => (typeof id === "string" ? Number(id) : id), z.number().int().positive("Please select a valid service.")),
});

export type ProjectSchema = z.infer<typeof projectSchema>;
