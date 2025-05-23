import Link from "next/link";
import Image from "next/image";
import { Nullable } from "@/types/utility";
import db from "@/db";
import { serviceTable } from "@/db/schema/service";
import { eq } from "drizzle-orm";

type FooterParams = Nullable<{
    logo: string;
    instagram: string;
    facebook: string;
    youtube: string;
    tiktok: string;
    linkedin: string;
    address: string;
    contact_number_1: string;
    contact_number_2: string;
    email: string;
}>;

export default async function Footer({
    logo,
    instagram,
    facebook,
    linkedin,
    youtube,
    tiktok,
    address,
    contact_number_1,
    contact_number_2,
    email,
}: FooterParams) {
    const services = await db.select({ name: serviceTable.name }).from(serviceTable).where(eq(serviceTable.active_status, true));
    return (
        <footer className="bg-blue-950 py-10 text-white">
            <div className="container">
                <div className="flex items-center justify-between">
                    <div className="max-w-xl">
                        <h2 className="text-5xl font-semibold">Ready to Elevate Your Brand?</h2>
                        <p className="mt-4">Partner with Infinity Studio and take the first step towards transforming your digital presence.</p>
                    </div>
                    <Link className="btn btn-highlight rounded-full" href={""}>
                        Book Free Consultation
                    </Link>
                </div>
                <hr className="my-10 border-white" />
                <div className="grid grid-cols-[1fr_repeat(3,minmax(auto,200px))]">
                    <div className="">
                        <div className="">{logo && <Image src={logo ?? ""} alt="" width={150} height={80} />}</div>
                        <div className="flex mt-8 gap-x-6">
                            {instagram && (
                                <Link className="capitalize" href={instagram}>
                                    instagram
                                </Link>
                            )}
                            {facebook && (
                                <Link className="capitalize" href={facebook}>
                                    facebook
                                </Link>
                            )}
                            {linkedin && (
                                <Link className="capitalize" href={linkedin}>
                                    linkedin
                                </Link>
                            )}
                            {youtube && (
                                <Link className="capitalize" href={youtube}>
                                    youtube
                                </Link>
                            )}
                            {tiktok && (
                                <Link className="capitalize" href={tiktok}>
                                    tiktok
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="">
                        <h3 className="text-xl">Services</h3>
                        <ul className="space-y-8 mt-8">
                            {services.map(({ name }, index) => (
                                <li key={index}>
                                    <Link href="">{name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="">
                        <h3 className="text-xl">Company</h3>
                        <ul className="space-y-8 mt-8">
                            <li>
                                <Link href="">Home</Link>
                            </li>
                            <li>
                                <Link href="">About</Link>
                            </li>
                            <li>
                                <Link href="">Services</Link>
                            </li>
                            <li>
                                <Link href="">Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="">
                        <h3 className="text-xl">Contact</h3>
                        <ul className="space-y-8 mt-8">
                            {address && (
                                <li>
                                    <address>{address}</address>
                                </li>
                            )}
                            {contact_number_1 && (
                                <li>
                                    <Link href={`tel:${contact_number_1}`}>{contact_number_1}</Link>
                                </li>
                            )}
                            {contact_number_2 && (
                                <li>
                                    <Link href={`tel:${contact_number_2}`}>{contact_number_2}</Link>
                                </li>
                            )}

                            {email && (
                                <li>
                                    <Link href={`mailto:${email}`}>{email}</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
