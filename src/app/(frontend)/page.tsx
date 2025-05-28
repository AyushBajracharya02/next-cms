import HomeBanner from "@/components/frontend/homepage/banner";
import OurSolution from "@/components/frontend/our-solutions";
import SuccessfulProject from "@/components/frontend/successfull-projects";
import db from "@/db";
import { homepageTable } from "@/db/schema/homepage";
import { homepage_service_entries } from "@/db/schema/homepage_service";
import { serviceTable } from "@/db/schema/service";
import Image from "next/image";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { homepage_project_table } from "@/db/schema/homepage_project";
import { projectTable } from "@/db/schema/project";

export default async function Home() {
    let [homepageContent] = await db.select().from(homepageTable).limit(1);
    homepageContent = homepageContent ?? {};
    const homepage_service_content = await db
        .select({
            id: homepage_service_entries.id,
            service: serviceTable.name,
            description: homepage_service_entries.description,
            image: homepage_service_entries.image,
        })
        .from(homepage_service_entries)
        .where(eq(homepage_service_entries.active_status, true))
        .innerJoin(serviceTable, eq(homepage_service_entries.service_id, serviceTable.id));
    const projects = await db
        .select({
            id: homepage_project_table.id,
            project_name: projectTable.name,
            description: homepage_project_table.description,
            image: homepage_project_table.image,
            service_name: serviceTable.name,
        })
        .from(homepage_project_table)
        .where(eq(homepage_project_table.active_status, true))
        .innerJoin(projectTable, eq(homepage_project_table.project_id, projectTable.id))
        .innerJoin(serviceTable, eq(projectTable.service_id, serviceTable.id));
    return (
        <>
            <HomeBanner title={homepageContent.banner_title} subtitle={homepageContent.banner_subtitle} video={homepageContent.banner_video} />
            <section className="pt-[250px] pb-24 -mt-72 bg-gray-300 z-1 relative">
                <div className="container">
                    <div className="grid grid-cols-2 gap-x-10 items-center">
                        <div className="">
                            <div className="">
                                {homepageContent.purpose_image && <Image src={`${homepageContent.purpose_image}`} alt="" width={570} height={700} />}
                            </div>
                            {homepageContent.purpose_tagline && (
                                <div className="w-fit bg-brand-highlight-1 py-6 px-10 -mt-11 relative font-semibold text-2xl">
                                    {homepageContent.purpose_tagline}
                                </div>
                            )}
                        </div>
                        <div className="">
                            <h2 className="text-5xl font-semibold">{homepageContent.purpose_title}</h2>
                            <div className="space-y-6 mt-6" dangerouslySetInnerHTML={{ __html: homepageContent.purpose_content ?? "" }}></div>
                            {homepageContent.purpose_stats?.length ? (
                                <>
                                    <hr className="my-8 border-black" />
                                    <div className="grid grid-cols-2 gap-x-8">
                                        {homepageContent.purpose_stats?.map(({ title, subtitle }, index) => (
                                            <div key={index}>
                                                <div className="">
                                                    <h4 className="text-3xl font-semibold">{title}</h4>
                                                    <p className="mt-3 ">{subtitle}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20">
                <div className="container">
                    <h2 className="text-center text-5xl font-semibold leading-[1.3]">
                        Empowering Your Brand with
                        <br /> Comprehensive Solutions
                    </h2>
                    <ul className="mt-12 divide-y divide-black">
                        {homepage_service_content.map((content, index) => (
                            <li className="py-4" key={index}>
                                <OurSolution {...content} index={index + 1} />
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <section className="py-20 bg-gray-50">
                <div className="container">
                    <h2 className="text-center text-5xl font-semibold">Our Successful Projects</h2>
                    <ul className="grid grid-cols-2 gap-10 mt-10">
                        {projects.map(({ description, image, project_name, service_name }, index) => (
                            <li key={index}>
                                <SuccessfulProject description={description} heading={project_name} tag={service_name} src={image} />
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-center mt-10">
                        <Link href="" className="btn btn-highlight rounded-full">
                            View All Projects
                        </Link>
                    </div>
                </div>
            </section>
            <section className="relative pt-40">
                <div className="absolute inset-0 h-9/10 pb-20">
                    {homepageContent.who_we_are_image && <Image className="w-full h-full object-cover" src={homepageContent.who_we_are_image} fill alt="" />}
                </div>
                <div className="container relative z-1">
                    <div className="bg-brand-highlight-1 p-12 max-w-xl ml-auto space-y-10">
                        {homepageContent.who_we_are_title && <h2 className="text-5xl font-semibold">{homepageContent.who_we_are_title}</h2>}
                        <div
                            className="prose"
                            dangerouslySetInnerHTML={{
                                __html: homepageContent.who_we_are_description ?? "",
                            }}
                        ></div>
                        <Link className="btn btn-dark rounded-full" href="">
                            More About Us
                        </Link>
                    </div>
                </div>
            </section>
            <section className="py-10">
                <div className="container">
                    <div className="max-w-xl">
                        {homepageContent.milestone_title && <h2 className="text-5xl font-semibold">{homepageContent.milestone_title}</h2>}
                        {homepageContent.milestone_description && <p className="mt-4">{homepageContent.milestone_description}</p>}
                    </div>
                    <hr className="my-10 border-black" />
                    <ul className="grid grid-cols-4 gap-x-8">
                        {homepageContent.milestone_stats?.map(({ title, value }, index) => (
                            <li key={index}>
                                <div className="flex items-center gap-x-6">
                                    <span className="text-7xl">{value}</span>
                                    <span>{title}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <section className="py-10" hidden>
                <div className="container">
                    <div className="flex items-center justify-between">
                        <div className="max-w-xl">
                            <h2 className="text-5xl font-semibold">We are top Rated Agency on Clutch</h2>
                            <p className="mt-4">
                                We’re proud to be recognized as a top-rated agency on Clutch, a testament to our commitment to excellence and innovation.
                            </p>
                        </div>
                        <Link className="btn btn-highlight rounded-full" href={""}>
                            Read Reviews
                        </Link>
                    </div>
                    <ul className="mt-10">
                        <li>
                            <div className="py-10 grid grid-cols-[auto_1fr] gap-x-6 items-center">
                                <div className="row-span-3">{/* <Image src={TestimonialPerson} alt="" /> */}</div>
                                <div className="flex">
                                    <span className="text-2xl">&#9734;</span>
                                    <span className="text-2xl">&#9734;</span>
                                    <span className="text-2xl">&#9734;</span>
                                    <span className="text-2xl">&#9734;</span>
                                    <span className="text-2xl">&#9734;</span>
                                </div>
                                <div className="">
                                    <blockquote>
                                        “Working with Infinity Studio was a transformative experience. Their team not only understood our vision but also
                                        brought it to life with creativity and precision. The results exceeded our expectations, and the growth we’ve seen since
                                        partnering with them has been phenomenal. We couldn’t have chosen a better agency to work with!”
                                    </blockquote>
                                </div>
                                <div className="">
                                    <p className="text-2xl">Alex Mitchell</p>
                                    <span>CEO of Tech Innovators </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
}
