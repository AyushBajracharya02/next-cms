import ProjectsCard from "./components/Projects-Card";
import db from "@/db";
import { serviceTable } from "@/db/schema/service";
import { projectTable } from "@/db/schema/project";
import { and, eq, isNull } from "drizzle-orm";

export default async function Page() {
    const initialAvailableServices = await db
        .select({
            id: serviceTable.id,
            name: serviceTable.name,
            active_status: serviceTable.active_status,
            created_at: serviceTable.created_at,
            updated_at: serviceTable.updated_at,
        })
        .from(serviceTable)
        .leftJoin(projectTable, eq(serviceTable.id, projectTable.service_id))
        .where(and(eq(serviceTable.active_status, true), isNull(projectTable.service_id)));
    const projects = await db.select().from(projectTable);
    return (
        <>
            <ProjectsCard services={initialAvailableServices} projects={projects} />
        </>
    );
}
