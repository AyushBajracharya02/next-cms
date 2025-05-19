import db from "@/db";
import { homepage_service_entries } from "@/db/schema/homepage_service";
import { serviceTable } from "@/db/schema/service";
import { NextRequest, NextResponse } from "next/server";
import { eq, isNull } from "drizzle-orm";
import { parseBool } from "@/lib/utils";

export async function GET(req: NextRequest) {
    // const fieldsParams = req.nextUrl.searchParams.get("fields");
    const unreferencedTableParams = req.nextUrl.searchParams.get("unreferenced_in");
    const active_status = parseBool(req.nextUrl.searchParams.get("active_status") ?? "");
    try {
        let query = db
            .select({
                id: serviceTable.id,
                name: serviceTable.name,
                active_status: serviceTable.active_status,
                created_at: serviceTable.created_at,
                updated_at: serviceTable.updated_at,
            })
            .from(serviceTable)
            .$dynamic();

        // const fields = fieldsParams?.split(",").map(field => field.trim()) ?? [];

        // const columnMap = {
        //     id: serviceTable.id,
        //     name: serviceTable.name,
        //     active_status: serviceTable.active_status,
        //     created_at: serviceTable.created_at,
        //     updated_at: serviceTable.updated_at,
        // };

        // const selectedColumns =
        //     fields.length > 0
        //         ? fields.reduce((filteredColumns, field) => {
        //               filteredColumns[field] = columnMap[field];
        //               return filteredColumns;
        //           }, {})
        //         : columnMap;

        const unreferenced_in = unreferencedTableParams?.split(",").map(table => table.trim()) ?? [];

        const referencedTables = {
            homepage_service_entries: homepage_service_entries,
        };

        for (const tableName of unreferenced_in) {
            const table = referencedTables[tableName as keyof typeof referencedTables];
            if (!table) continue;
            query = query.leftJoin(table, eq(serviceTable.id, table.service_id)).where(isNull(table.id));
        }

        query = query.where(eq(serviceTable.active_status, active_status));

        const services = await query;

        return NextResponse.json(services);
    } catch (error) {
        return new NextResponse((error as Error).message, { status: 500 });
    }
}
