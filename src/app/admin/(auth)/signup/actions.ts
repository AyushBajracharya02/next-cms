"use server";

import { randomUUID } from "crypto";
import { ZodError } from "zod";
import { SignupSchema, signupSchema } from "./schema";
import db from "@/db";
import { usersTable } from "@/db/schema/auth";
import { eq } from "drizzle-orm";
import brcrypt from "bcrypt";

type SignUpReturn =
    | (
          | {
                status: 200;
            }
          | {
                status: 400;
                errors: {
                    [K in keyof SignupSchema]?: string[];
                };
            }
          | {
                status: 500;
            }
          | {
                status: 409;
            }
      ) & { message: string };

export async function signUp(values: SignupSchema): Promise<SignUpReturn> {
    try {
        signupSchema.parse(values);
        const [user] = await db.select().from(usersTable).where(eq(usersTable.email, values.email)).limit(1);

        if (user) {
            return {
                status: 409,
                message: "Email already exists.",
            };
        }
        const hash = await brcrypt.hash(values.password, 10);
        values.password = hash;

        await db.insert(usersTable).values({ ...values, id: randomUUID() });

        return {
            status: 200,
            message: "Sign up successfull.",
        };
    } catch (e) {
        if (e instanceof ZodError) {
            return {
                status: 400,
                message: "Validation Error",
                errors: e.flatten().fieldErrors as {
                    [K in keyof SignupSchema]?: string[];
                },
            };
        }

        return {
            status: 500,
            message: "Internal Server Error.",
        };
    } finally {
    }
}
