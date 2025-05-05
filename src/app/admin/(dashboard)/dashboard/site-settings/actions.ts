"use server";

import db from "@/db";
import { CompanySchema, companySchema, contactSchema, ContactSchema, socialMediaSchema, SocialMediaSchema } from "./schema";
import { site_settings } from "@/db/schema/site_settings";
import { ZodError } from "zod";
import fs from "fs/promises";

type UpdateReturn<T> = (
    | {
          status: 200;
      }
    | { status: 500 }
    | {
          status: 400;
          errors: {
              [k in keyof T]?: string[];
          };
      }
) & { message: string };

export async function updateContact(values: ContactSchema): Promise<UpdateReturn<ContactSchema>> {
    try {
        contactSchema.parse(values);
        const [currentValues] = await db.select().from(site_settings).limit(1);
        if (currentValues) {
            await db.update(site_settings).set({ ...values, updated_at: new Date() });
        } else {
            await db.insert(site_settings).values({ ...values, updated_at: new Date() });
        }
        return {
            status: 200,
            message: "Contact information updated successfully.",
        };
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
        return {
            status: 500,
            message: "Internal Server Error",
        };
    }
}

export async function updateSocials(values: SocialMediaSchema): Promise<UpdateReturn<SocialMediaSchema>> {
    try {
        socialMediaSchema.parse(values);
        const [currentValues] = await db.select().from(site_settings).limit(1);
        if (currentValues) {
            await db.update(site_settings).set({ ...values, updated_at: new Date() });
        } else {
            await db.insert(site_settings).values({ ...values, updated_at: new Date() });
        }
        return {
            status: 200,
            message: "Social media information updated successfully.",
        };
    } catch (e) {
        if (e instanceof ZodError) {
            return {
                status: 400,
                message: "Validation Error",
                errors: e.flatten().fieldErrors as {
                    [K in keyof SocialMediaSchema]?: string[];
                },
            };
        }
        return {
            status: 500,
            message: "Internal Server Error",
        };
    }
}

export async function updateCompanyDetails(data: FormData): Promise<UpdateReturn<CompanySchema>> {
    try {
        const companyDetails = {
            company_name: data.get("company_name") as string,
            logo: data.get("logo") ?? undefined,
        };
        companySchema.parse(companyDetails);
        let logo: string | undefined = undefined;
        if (companyDetails.logo) {
            //store logo as file in public folder
            const logoFile = companyDetails.logo as File;
            const arrayBuffer = await logoFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const filePath = `public/uploads/${logoFile.name}`;
            await fs.writeFile(filePath, buffer);
            logo = `/uploads/${logoFile.name}`;
        }
        const [currentValues] = await db.select().from(site_settings).limit(1);
        if (currentValues) {
            await db.update(site_settings).set({ ...companyDetails, logo, updated_at: new Date() });
        } else {
            await db.insert(site_settings).values({ ...companyDetails, logo, updated_at: new Date() });
        }
        return {
            status: 200,
            message: "Company details updated successfully.",
        };
    } catch (e) {
        if (e instanceof ZodError) {
            return {
                status: 400,
                message: "Validation Error",
                errors: e.flatten().fieldErrors as {
                    [K in keyof CompanySchema]?: string[];
                },
            };
        }
        console.log(e);

        return {
            status: 500,
            message: "Internal Server Error",
        };
    }
}
