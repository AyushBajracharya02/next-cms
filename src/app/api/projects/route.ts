import db from "@/db";
import { homepage_project_table } from "@/db/schema/homepage_project";
import { projectTable } from "@/db/schema/project";
import { serviceTable } from "@/db/schema/service";
import { and, eq, isNull } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const conditions = [];
    const unreferencedTableParams = req.nextUrl.searchParams.get("unreferenced_in");
    let query = db
        .select({
            id: projectTable.id,
            name: projectTable.name,
            description: projectTable.description,
            service_name: serviceTable.name,
            service_active_status: serviceTable.active_status,
        })
        .from(projectTable)
        .innerJoin(serviceTable, eq(projectTable.service_id, serviceTable.id))
        .$dynamic();
    const unreferenced_in = unreferencedTableParams?.split(",").map(table => table.trim()) ?? [];

    const referencedTables = {
        homepage_project: homepage_project_table,
    };

    for (const tableName of unreferenced_in) {
        const table = referencedTables[tableName as keyof typeof referencedTables];
        if (!table) continue;
        query = query.leftJoin(table, eq(projectTable.id, table.project_id));
        conditions.push(isNull(table.id));
    }
    try {
        const projects = await query.where(and(...conditions));

        return NextResponse.json(projects);
    } catch (e) {
        return new NextResponse((e as Error).message, { status: 500 });
    }
}
