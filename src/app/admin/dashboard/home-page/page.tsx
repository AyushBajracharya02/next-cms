import { homepageTable } from "@/db/schema/homepage";
import BannerContentCard from "./components/Banner-Content-Card";
import db from "@/db/index";
import PurposeContentCard from "./components/Purpose-Content-Card";
import { serviceTable } from "@/db/schema/service";
import { eq, isNull, and } from "drizzle-orm";
import { ServiceContentCard } from "./components/Service-Content-Card";
import { homepage_service_entries } from "@/db/schema/homepage_service";
import ProjectsCard from "./components/Projects-Card";
import { homepage_project_table } from "@/db/schema/homepage_project";
import { projectTable } from "@/db/schema/project";
import WhoWeAreCard from "./components/Who-We-Are-Card";
import MileStoneCard from "./components/Milestone-Card";

export default async function Page() {
    let [homepageContent] = await db.select().from(homepageTable).limit(1);
    homepageContent = homepageContent ?? {};

    const services = await db
        .select({
            id: serviceTable.id,
            name: serviceTable.name,
            active_status: serviceTable.active_status,
            created_at: serviceTable.created_at,
            updated_at: serviceTable.updated_at,
        })
        .from(serviceTable)
        .leftJoin(homepage_service_entries, eq(serviceTable.id, homepage_service_entries.service_id))
        .where(and(eq(serviceTable.active_status, true), isNull(homepage_service_entries.service_id)));

    const homepageServiceContent = await db
        .select({
            id: homepage_service_entries.id,
            service_name: serviceTable.name,
            description: homepage_service_entries.description,
            image: homepage_service_entries.image,
            created_at: homepage_service_entries.created_at,
            updated_at: homepage_service_entries.updated_at,
            service_id: homepage_service_entries.service_id,
            service_active_status: serviceTable.active_status,
            active_status: homepage_service_entries.active_status,
        })
        .from(homepage_service_entries)
        .innerJoin(serviceTable, eq(homepage_service_entries.service_id, serviceTable.id));

    const homepageProjects = await db
        .select({
            id: homepage_project_table.id,
            project_name: projectTable.name,
            description: homepage_project_table.description,
            image: homepage_project_table.image,
            service_name: serviceTable.name,
            service_active_status: serviceTable.active_status,
            active_status: homepage_project_table.active_status,
        })
        .from(homepage_project_table)
        .innerJoin(projectTable, eq(homepage_project_table.project_id, projectTable.id))
        .innerJoin(serviceTable, eq(projectTable.service_id, serviceTable.id));

    const projects = await db
        .select({
            id: projectTable.id,
            name: projectTable.name,
        })
        .from(projectTable)
        .leftJoin(homepage_project_table, eq(projectTable.id, homepage_project_table.project_id))
        .where(isNull(homepage_project_table.project_id));

    return (
        <>
            <BannerContentCard banner_title={homepageContent.banner_title} banner_subtitle={homepageContent.banner_subtitle} />
            <PurposeContentCard
                purpose_title={homepageContent.purpose_title}
                purpose_tagline={homepageContent.purpose_tagline}
                purpose_content={homepageContent.purpose_content}
                purpose_stats={homepageContent.purpose_stats}
            />
            <ServiceContentCard services={services} homepageServiceContent={homepageServiceContent} />
            <ProjectsCard availableProjects={projects} homepageProjects={homepageProjects} />
            <WhoWeAreCard
                title={homepageContent.who_we_are_title}
                description={homepageContent.who_we_are_description}
                image={homepageContent.who_we_are_image}
            />
            <MileStoneCard />
        </>
    );
}
