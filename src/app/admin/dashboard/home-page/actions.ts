"use server";

import { ServerResponse } from "@/types/utility";
import {
    BannerContentSchema,
    bannerContentSchema,
    homepageProjectSchema,
    HomepageProjectSchema,
    homepageProjectUpdateSchema,
    HomepageProjectUpdateSchema,
    milestoneContentSchema,
    MilestoneContentSchema,
    purposeContentSchema,
    PurposeContentSchema,
    serviceSectionSchema,
    ServiceSectionSchema,
    ServiceSectionUpdateSchema,
    serviceSectionUpdateSchema,
    whoWeAreSchema,
    WhoWeAreSchema,
} from "./schema";
import { ZodError } from "zod";
import db from "@/db";
import fs from "fs/promises";
import { homepageTable } from "@/db/schema/homepage";
import { storeFile } from "@/lib/server-utils";
import { homepage_service_entries } from "@/db/schema/homepage_service";
import { homepage_project_table } from "@/db/schema/homepage_project";
import { eq } from "drizzle-orm";

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
        await storeFile(values.image, "public/uploads/homepage");
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

export async function updateHomepageService(values: ServiceSectionUpdateSchema): Promise<ServerResponse<ServiceSectionUpdateSchema>> {
    try {
        serviceSectionUpdateSchema.parse(values);
        const valuesToStore: Partial<typeof homepage_service_entries.$inferInsert> = {};
        if (values.description !== undefined) {
            valuesToStore.description = values.description;
        }
        if (values.image !== undefined) {
            await storeFile(values.image, "public/uploads/homepage");
            valuesToStore.image = `/uploads/homepage/${values.image.name}`;
        }
        if (values.active_status !== undefined) {
            valuesToStore.active_status = values.active_status;
        }
        if (values.service_id !== undefined) {
            valuesToStore.service_id = values.service_id;
        }
        await db
            .update(homepage_service_entries)
            .set({ ...valuesToStore, updated_at: new Date() })
            .where(eq(homepage_service_entries.id, values.id));
        return {
            status: 200,
            message: "Content Updated Successfully",
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

export async function storeHomepageProject(values: HomepageProjectSchema): Promise<ServerResponse<HomepageProjectSchema>> {
    try {
        homepageProjectSchema.parse(values);
        await storeFile(values.image, "public/uploads/homepage");
        const image = `/uploads/homepage/${values.image.name}`;
        await db.insert(homepage_project_table).values({ ...values, image });
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

export async function updateHomepageProject(values: HomepageProjectUpdateSchema): Promise<ServerResponse<HomepageProjectUpdateSchema>> {
    try {
        homepageProjectUpdateSchema.parse(values);
        const valuesToStore: Partial<typeof homepage_project_table.$inferInsert> = {};
        if (values.description !== undefined) {
            valuesToStore.description = values.description;
        }
        if (values.active_status !== undefined) {
            valuesToStore.active_status = values.active_status;
        }
        if (values.project_id !== undefined) {
            valuesToStore.project_id = values.project_id;
        }
        if (values.image !== undefined) {
            await storeFile(values.image, "public/uploads/homepage");
            valuesToStore.image = `/uploads/homepage/${values.image.name}`;
        }
        await db
            .update(homepage_project_table)
            .set({ ...valuesToStore, updated_at: new Date() })
            .where(eq(homepage_project_table.id, values.id));
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

export async function storeWhoWeAre(values: WhoWeAreSchema): Promise<ServerResponse<WhoWeAreSchema>> {
    try {
        whoWeAreSchema.parse(values);
        let image: string | undefined = undefined;
        if (values.image) {
            await storeFile(values.image, "public/uploads/homepage");
            image = `/uploads/homepage/${values.image.name}`;
        }
        const valuesToStore: typeof homepageTable.$inferInsert = {
            who_we_are_title: values.title,
            who_we_are_description: values.description,
        };
        if (image) {
            valuesToStore.who_we_are_image = image;
        }
        const [currentValues] = await db.select().from(homepageTable).limit(1);
        if (currentValues) {
            await db.update(homepageTable).set(valuesToStore);
        } else {
            await db.insert(homepageTable).values(valuesToStore);
        }
        return {
            status: 200,
            message: "Content Stored Successfully",
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

export async function storeMilestoneContent(values: MilestoneContentSchema): Promise<ServerResponse<MilestoneContentSchema>> {
    try {
        milestoneContentSchema.parse(values);
        const [currentValues] = await db.select().from(homepageTable).limit(1);
        if (currentValues) {
            await db.update(homepageTable).set(values);
        } else {
            await db.insert(homepageTable).values(values);
        }
        return {
            status: 200,
            message: "Content Stored Successfully",
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
