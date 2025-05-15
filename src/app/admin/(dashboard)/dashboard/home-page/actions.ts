"use server";

import { ServerResponse } from "@/types/utility";
import { BannerContentSchema, bannerContentSchema } from "./schema";
import { ZodError } from "zod";
import db from "@/db";
import fs from "fs/promises";
import { homepageTable } from "@/db/schema/homepage";

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
            banner_video = `uploads/homepage/${videoFile.name}`;
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
