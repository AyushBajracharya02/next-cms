import db from "@/db";
import ContactCard from "./Contact-Card";
import SocialsCard from "./Socials-Card";
import { site_settings } from "@/db/schema/site_settings";
import CompanyDetailCard from "./Company-Details-Card";

export default async function Page() {
    const [companyDetails] = await db
        .select({
            email: site_settings.email,
            contact_number_1: site_settings.contact_number_1,
            contact_number_2: site_settings.contact_number_2,
            address: site_settings.address,
            facebook: site_settings.facebook,
            instagram: site_settings.instagram,
            threads: site_settings.threads,
            youtube: site_settings.youtube,
            linkedin: site_settings.linkedin,
            tiktok: site_settings.tiktok,
            company_name: site_settings.company_name,
            logo: site_settings.logo,
        })
        .from(site_settings)
        .limit(1);

    return (
        <>
            <CompanyDetailCard company_name={companyDetails.company_name} logo={companyDetails.logo} />
            <ContactCard
                address={companyDetails.address}
                contact_number_1={companyDetails.contact_number_1}
                contact_number_2={companyDetails.contact_number_2}
                email={companyDetails.email}
            />
            <SocialsCard
                facebook={companyDetails.facebook}
                instagram={companyDetails.instagram}
                linkedin={companyDetails.linkedin}
                threads={companyDetails.threads}
                tiktok={companyDetails.tiktok}
                youtube={companyDetails.youtube}
            />
        </>
    );
}
