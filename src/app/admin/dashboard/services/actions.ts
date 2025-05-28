"use server";

import { ServerResponse } from "@/types/utility";
import { serviceSchema, ServiceSchema, serviceUpdateSchema, ServiceUpdateSchema } from "./schema";
import { ZodError } from "zod";
import db from "@/db";
import { serviceTable } from "@/db/schema/service";
import { eq } from "drizzle-orm";

export async function createService(values: ServiceSchema): Promise<ServerResponse<ServiceSchema>> {
    try {
        serviceSchema.parse(values);
        const [service] = await db.select().from(serviceTable).where(eq(serviceTable.name, values.name)).limit(1);
        if (service) {
            return {
                status: 409,
                message: "Service with same name already exists.",
            };
        }
        await db.insert(serviceTable).values(values);
        return {
            status: 200,
            message: "Service created successfully",
        };
    } catch (error) {
        if (error instanceof ZodError) {
            return {
                status: 400,
                message: "Validation Error",
                errors: error.flatten().fieldErrors as {
                    [K in keyof ServiceSchema]?: string[];
                },
            };
        }
        return {
            status: 500,
            message: (error as Error).message,
        };
    }
}

export async function updateService(values: ServiceUpdateSchema): Promise<ServerResponse<ServiceUpdateSchema>> {
    try {
        serviceUpdateSchema.parse(values);
        if (values.name) {
            const [service] = await db.select().from(serviceTable).where(eq(serviceTable.name, values.name)).limit(1);
            if (service) {
                return {
                    status: 409,
                    message: "Service with same name already exists.",
                };
            }
        }
        await db
            .update(serviceTable)
            .set({ ...values, updated_at: new Date() })
            .where(eq(serviceTable.id, values.id));
        return {
            status: 200,
            message: "Service updated successfully",
        };
    } catch (error) {
        if (error instanceof ZodError) {
            return {
                status: 400,
                message: "Validation Error",
                errors: error.flatten().fieldErrors as {
                    [K in keyof ServiceUpdateSchema]?: string[];
                },
            };
        }
        return {
            status: 500,
            message: (error as Error).message,
        };
    }
}
