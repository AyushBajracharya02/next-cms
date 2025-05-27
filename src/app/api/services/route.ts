import db from "@/db";
import { homepage_service_entries } from "@/db/schema/homepage_service";
import { serviceTable } from "@/db/schema/service";
import { NextRequest, NextResponse } from "next/server";
import { and, eq, isNull } from "drizzle-orm";
import { parseBool } from "@/lib/utils";

export async function GET(req: NextRequest) {
    let query = db
        .select({
            id: serviceTable.id,
            name: serviceTable.name,
            active_status: serviceTable.active_status,
        })
        .from(serviceTable)
        .$dynamic();
    const unreferencedTableParams = req.nextUrl.searchParams.get("unreferenced_in");
    const activeStatusParam = req.nextUrl.searchParams.get("active_status");

    const conditions = [];
    if (activeStatusParam) {
        const active_status = parseBool(activeStatusParam);
        conditions.push(eq(serviceTable.active_status, active_status));
    }
    const unreferenced_in = unreferencedTableParams?.split(",").map(table => table.trim()) ?? [];

    const referencedTables = {
        homepage_service_entries: homepage_service_entries,
    };

    for (const tableName of unreferenced_in) {
        const table = referencedTables[tableName as keyof typeof referencedTables];
        if (!table) continue;
        query = query.leftJoin(table, eq(serviceTable.id, table.service_id));
        conditions.push(isNull(table.id));
    }

    try {
        const services = await query.where(and(...conditions)).execute();

        return NextResponse.json(services);
    } catch (error) {
        return new NextResponse((error as Error).message, { status: 500 });
    }
}
