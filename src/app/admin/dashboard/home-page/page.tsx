import { homepageTable } from "@/db/schema/homepage";
import BannerContentCard from "./components/Banner-Content-Card";
import db from "@/db/index";
import PurposeContentCard from "./components/Purpose-Content-Card";
import { serviceTable } from "@/db/schema/service";
import { eq } from "drizzle-orm";
import { ServiceContentCard } from "./components/Service-Content-Card";

export default async function Page() {
    let [homepageContent] = await db.select().from(homepageTable).limit(1);
    homepageContent = homepageContent ?? {};
    const services = await db.select().from(serviceTable).where(eq(serviceTable.active_status, true));
    return (
        <>
            <BannerContentCard banner_title={homepageContent.banner_title} banner_subtitle={homepageContent.banner_subtitle} />
            <PurposeContentCard
                purpose_title={homepageContent.purpose_title}
                purpose_tagline={homepageContent.purpose_tagline}
                purpose_content={homepageContent.purpose_content}
                purpose_stats={homepageContent.purpose_stats}
            />
            <ServiceContentCard services={services} />
        </>
    );
}
