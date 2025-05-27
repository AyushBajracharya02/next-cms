import db from "@/db";
import { homepage_project_table } from "@/db/schema/homepage_project";
import { projectTable } from "@/db/schema/project";
import { serviceTable } from "@/db/schema/service";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const homepageProjects = await db
            .select({
                id: homepage_project_table.id,
                project_name: projectTable.name,
                description: homepage_project_table.description,
                image: homepage_project_table.image,
                service_name: serviceTable.name,
                service_active_status: serviceTable.active_status,
            })
            .from(homepage_project_table)
            .innerJoin(projectTable, eq(homepage_project_table.project_id, projectTable.id))
            .innerJoin(serviceTable, eq(projectTable.service_id, serviceTable.id));
        return NextResponse.json(homepageProjects);
    } catch (error) {
        return new NextResponse((error as Error).message, { status: 500 });
    }
}
