import { homepageTable } from "@/db/schema/homepage";
import BannerContentCard from "./Banner-Content-Card";
import db from "@/db/index";

export default async function Page() {
    let [homepageContent] = await db.select().from(homepageTable).limit(1);
    homepageContent = homepageContent ?? {};
    return <BannerContentCard banner_title={homepageContent.banner_title} banner_subtitle={homepageContent.banner_subtitle} />;
}
