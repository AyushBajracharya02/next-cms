import db from "@/db";
import { serviceTable } from "@/db/schema/service";
import ServiceCard from "./components/ServiceCard";

export default async function Page() {
    const services = await db
        .select({
            id: serviceTable.id,
            name: serviceTable.name,
            active: serviceTable.active_status,
        })
        .from(serviceTable);
    return (
        <>
            <ServiceCard services={services} />
        </>
    );
}
