import { homepageTable } from "@/db/schema/homepage";
import BannerContentCard from "./Banner-Content-Card";
import db from "@/db/index";
import PurposeContentCard from "./Purpose-Content-Card";

export default async function Page() {
    let [homepageContent] = await db.select().from(homepageTable).limit(1);
    homepageContent = homepageContent ?? {};
    return (
        <>
            <BannerContentCard banner_title={homepageContent.banner_title} banner_subtitle={homepageContent.banner_subtitle} />
            <PurposeContentCard
                purpose_title={homepageContent.purpose_title}
                purpose_tagline={homepageContent.purpose_tagline}
                purpose_content={homepageContent.purpose_content}
                purpose_stats={homepageContent.purpose_stats}
            />
        </>
    );
}
