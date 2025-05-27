import { Nullable } from "@/types/utility";
import Link from "next/link";

type BannerParams = Nullable<{
    title: string;
    subtitle: string;
    video: string;
}>;

export default function HomeBanner({ title, subtitle, video }: BannerParams) {
    return (
        <section className="relative pt-16 pb-24 bg-blue-950">
            <div className="absolute">
                <div className="grid grid-cols-[repeat(auto-fill,100px)]"></div>
            </div>
            <div className="container">
                <div className="text-white">
                    <h1 className="text-6xl text-center font-bold leading-[1.3] max-w-[850px] mx-auto">{title}</h1>
                    <p className="text-center mt-6">{subtitle}</p>
                    <div className="flex justify-center mt-8">
                        <Link href="" className="btn btn-highlight rounded-full px-8 py-3 font-medium">
                            Start a Project
                        </Link>
                    </div>
                </div>
                <div className="[&_video]:w-full [&_video]:aspect-video relative z-2 mt-8">
                    <video muted autoPlay loop>
                        <source src={video ?? ""} />
                    </video>
                </div>
            </div>
        </section>
    );
}
