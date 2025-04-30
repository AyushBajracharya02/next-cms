"use server";

import db from "@/db";
import { contactSchema, ContactSchema } from "./schema";
import { site_settings } from "@/db/schema/site_settings";
import { ZodError } from "zod";

export async function UpdateContact(values: ContactSchema) {
    try {
        contactSchema.parse(values);
        const [currentValues] = await db.select().from(site_settings).limit(1);
        if (currentValues) {
            await db.update(site_settings).set(values);
        } else {
            await db.insert(site_settings).values({ ...values, updated_at: new Date() });
        }
    } catch (e) {
        if (e instanceof ZodError) {
            return {
                status: 400,
                message: "Validation Error",
                errors: e.flatten().fieldErrors as {
                    [K in keyof ContactSchema]?: string[];
                },
            };
        }
    }
}
