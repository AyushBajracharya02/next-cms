import { z } from "zod";

export const serviceSchema = z.object({
    name: z.string().min(2, "Service name must be atleast 2 characters.").max(256, "Service name must be less than 2 characters."),
});

export type ServiceSchema = z.infer<typeof serviceSchema>;

export const serviceUpdateSchema = serviceSchema
    .extend({
        active_status: z.boolean(),
    })
    .partial()
    .extend({ id: z.number() });

export type ServiceUpdateSchema = z.infer<typeof serviceUpdateSchema>;
