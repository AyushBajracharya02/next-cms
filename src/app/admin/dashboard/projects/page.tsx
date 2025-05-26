import ProjectsCard from "./components/Projects-Card";
import db from "@/db";
import { serviceTable } from "@/db/schema/service";
import { projectTable } from "@/db/schema/project";
import { eq } from "drizzle-orm";

export default async function Page() {
    const services = await db
        .select({
            id: serviceTable.id,
            name: serviceTable.name,
            active_status: serviceTable.active_status,
            created_at: serviceTable.created_at,
            updated_at: serviceTable.updated_at,
        })
        .from(serviceTable);
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

    return (
        <>
            <ProjectsCard services={services} projects={projects} />
        </>
    );
}
