import HomeBanner from "@/components/frontend/homepage/banner";
import OurSolution from "@/components/frontend/our-solutions";
import SuccessfulProject from "@/components/frontend/successfull-projects";
import db from "@/db";
import { homepageTable } from "@/db/schema/homepage";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
    let [homepageContent] = await db.select().from(homepageTable).limit(1);
    homepageContent = homepageContent ?? {};
    return (
        <>
            <HomeBanner title={homepageContent.banner_title} subtitle={homepageContent.banner_subtitle} video={homepageContent.banner_video} />
            <section className="pt-[250px] pb-24 -mt-72 bg-gray-300 z-1 relative">
                <div className="container">
                    <div className="grid grid-cols-2 gap-x-10 items-center">
                        <div className="">
                            <div className="">{homepageContent.purpose_image && <Image src={homepageContent.purpose_image} alt="" />}</div>
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
                        <li className="py-4">{/* <OurSolution description="lorem ipsum" heading="Brand Design" src={OurPurpose} index={0} /> */}</li>
                        <li className="py-4">{/* <OurSolution description="lorem ipsum" heading="Brand Design" src={OurPurpose} index={0} /> */}</li>
                    </ul>
                </div>
            </section>
            <section className="py-20 bg-gray-50">
                <div className="container">
                    <h2 className="text-center text-5xl font-semibold">Our Successful Projects</h2>
                    <ul className="grid grid-cols-2 gap-10 mt-10">
                        <li>
                            {/* <SuccessfulProject description="lorem ipsum" heading="EcoBrand - Green Initiative" tag="Branding" src={SuccessfulProjectImg} /> */}
                        </li>
                        <li>
                            {/* <SuccessfulProject description="lorem ipsum" heading="EcoBrand - Green Initiative" tag="Branding" src={SuccessfulProjectImg} /> */}
                        </li>
                    </ul>
                    <div className="flex justify-center mt-10">
                        <Link href="" className="btn btn-highlight rounded-full">
                            View All Projects
                        </Link>
                    </div>
                </div>
            </section>
            <section className="relative pt-40">
                <div className="absolute inset-0 pb-20">{/* <Image className="w-full h-full object-cover" src={WhoWeAreImg} alt="" /> */}</div>
                <div className="container relative z-1">
                    <div className="bg-brand-highlight-1 p-12 max-w-xl ml-auto space-y-10">
                        <h2 className="text-5xl font-semibold">Who We Are</h2>
                        <div className="prose">
                            <p>
                                We are passionate digital pioneers dedicated to transforming your ideas into impactful realities. With a strong foundation in
                                creativity and innovation, we specialize in delivering tailored solutions that empower brands to thrive in the digital age.
                            </p>
                            <p>
                                Our team of seasoned experts brings together a wealth of experience in brand design, web development, digital marketing, and app
                                development. We believe in a client-centric approach, working closely with you to understand your vision and craft strategies
                                that align with your goals.
                            </p>
                        </div>
                        <Link className="btn btn-dark rounded-full" href="">
                            More About Us
                        </Link>
                    </div>
                </div>
            </section>
            <section className="py-10">
                <div className="container">
                    <div className="max-w-xl">
                        <h2 className="text-5xl font-semibold">Bring Your Ideas to life</h2>
                        <p className="mt-4">
                            From startups to established enterprises, we partner with businesses across industries to create exceptional digital experiences.
                        </p>
                    </div>
                    <hr className="my-10 border-black" />
                    <ul className="grid grid-cols-4 gap-x-8">
                        <li>
                            <div className="flex items-center gap-x-6">
                                <span className="text-7xl">10</span>
                                <span>Years of Experience</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
            <section className="py-10">
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
