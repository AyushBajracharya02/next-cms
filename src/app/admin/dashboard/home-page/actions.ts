"use server";

import { ServerResponse } from "@/types/utility";
import { BannerContentSchema, bannerContentSchema, purposeContentSchema, PurposeContentSchema, serviceSectionSchema, ServiceSectionSchema } from "./schema";
import { ZodError } from "zod";
import db from "@/db";
import fs from "fs/promises";
import { homepageTable } from "@/db/schema/homepage";
import { storeFile } from "@/lib/server-utils";
import { homepage_service_entries } from "@/db/schema/homepage_service";

export async function storeBannerContent(values: BannerContentSchema): Promise<ServerResponse<BannerContentSchema>> {
    try {
        bannerContentSchema.parse(values);
        let banner_video: string | undefined = undefined;
        if (values.banner_video) {
            const videoFile = values.banner_video as File;
            const arrayBuffer = await videoFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const filePath = `public/uploads/homepage/${videoFile.name}`;
            await fs.writeFile(filePath, buffer);
            banner_video = `/uploads/homepage/${videoFile.name}`;
        }
        const [currentValues] = await db.select().from(homepageTable).limit(1);
        if (currentValues) {
            await db.update(homepageTable).set({
                ...values,
                banner_video,
                updated_at: new Date(),
            });
        } else {
            await db.insert(homepageTable).values({
                ...values,
                banner_video,
            });
        }
        return {
            status: 200,
            message: "Banner Content Updated Successfully.",
        };
    } catch (error) {
        if (error instanceof ZodError) {
            return {
                status: 400,
                message: "Validation Error",
                errors: error.flatten().fieldErrors as {
                    [K in keyof BannerContentSchema]?: string[];
                },
            };
        }
        return {
            status: 500,
            message: "Internal Server Error",
        };
    }
}

export async function storePurposeSectionContent(values: PurposeContentSchema): Promise<ServerResponse<PurposeContentSchema>> {
    try {
        purposeContentSchema.parse(values);
        let purpose_image: string | undefined = undefined;
        if (values.purpose_image) {
            storeFile(values.purpose_image, `public/uploads/homepage/`);
            purpose_image = `/uploads/homepage/${values.purpose_image.name}`;
        }
        const [currentValues] = await db.select().from(homepageTable).limit(1);
        if (currentValues) {
            await db.update(homepageTable).set({
                ...values,
                purpose_image,
                updated_at: new Date(),
            });
        } else {
            await db.insert(homepageTable).values({
                ...values,
                purpose_image,
                updated_at: new Date(),
            });
        }
        return {
            status: 200,
            message: "Purpose Section Content Updated Successfully.",
        };
    } catch (error) {
        if (error instanceof ZodError) {
            return {
                status: 400,
                errors: error.flatten().fieldErrors as {
                    [K in keyof PurposeContentSchema]?: string[];
                },
                message: "Validation Error",
            };
        }
        return {
            status: 500,
            message: "Internal Server Error.",
        };
    }
}

export async function storeHomepageServiceContent(values: ServiceSectionSchema): Promise<ServerResponse<ServiceSectionSchema>> {
    try {
        serviceSectionSchema.parse(values);
        await storeFile(values.image, "/public/uploads/homepage");
        const image = `/uploads/homepage/${values.image.name}`;
        await db.insert(homepage_service_entries).values({ ...values, image });
        return {
            status: 200,
            message: "Stored Content Successfully",
        };
    } catch (error) {
        if (error instanceof ZodError) {
            return {
                status: 400,
                message: "Validation Error",
                errors: error.flatten().fieldErrors,
            };
        }
        return {
            status: 500,
            message: (error as Error).message,
        };
    }
}
