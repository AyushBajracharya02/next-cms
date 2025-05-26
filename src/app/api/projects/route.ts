import db from "@/db";
import { projectTable } from "@/db/schema/project";
import { serviceTable } from "@/db/schema/service";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const projects = await db
            .select({
                id: projectTable.id,
                name: projectTable.name,
                description: projectTable.description,
                service_name: serviceTable.name,
                service_active_status: serviceTable.active_status,
            })
            .from(projectTable)
            .innerJoin(serviceTable, eq(projectTable.service_id, serviceTable.id));
        return NextResponse.json(projects);
    } catch (e) {
        return new NextResponse((e as Error).message, { status: 500 });
    }
}
