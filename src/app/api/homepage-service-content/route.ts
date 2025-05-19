import db from "@/db";
import { homepage_service_entries } from "@/db/schema/homepage_service";
import { serviceTable } from "@/db/schema/service";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET() {
    try {
        const content = await db
            .select({
                id: homepage_service_entries.id,
                service_id: homepage_service_entries.service_id,
                service_name: serviceTable.name,
                description: homepage_service_entries.description,
                image: homepage_service_entries.image,
                created_at: homepage_service_entries.created_at,
                updated_at: homepage_service_entries.updated_at,
            })
            .from(homepage_service_entries)
            .innerJoin(serviceTable, eq(homepage_service_entries.service_id, serviceTable.id));
        return NextResponse.json(content);
    } catch (error) {
        return new NextResponse((error as Error).message, { status: 500 });
    }
}
