import db from "@/db";
import { serviceTable } from "@/db/schema/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const fieldsParams = req.nextUrl.searchParams.get("fields");
    try {
        const fields = fieldsParams?.split(",").map(field => field.trim()) ?? [];

        const columnMap = {
            id: serviceTable.id,
            name: serviceTable.name,
            active_status: serviceTable.active_status,
            created_at: serviceTable.created_at,
            updated_at: serviceTable.updated_at,
        };

        // const selectedColumns =
        //     fields.length > 0
        //         ? fields.reduce((filteredColumns, field) => {
        //               filteredColumns[field] = columnMap[field];
        //               return filteredColumns;
        //           }, {})
        //         : columnMap;

        const services = await db.select().from(serviceTable);
        return NextResponse.json(services);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
