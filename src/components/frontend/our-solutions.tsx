import Image, { StaticImageData } from "next/image";

type OurSolutionProps = {
    index: number;
    heading: string;
    description: string;
    src: string | StaticImageData;
};

export default function OurSolution({ index, heading, description, src }: OurSolutionProps) {
    return (
        <div className="grid grid-cols-[100px_1fr_minmax(0,285px)_auto] gap-x-6 items-center">
            <div className="text-4xl font-medium rounded-full border border-black aspect-square text-center content-center">{index}</div>
            <div>
                <h3 className="text-4xl font-medium">{heading}</h3>
                <p className="text-gray-700 mt-2">{description}</p>
            </div>
            <div className="rounded-xl overflow-hidden">
                <Image className="aspect-video object-cover" src={src} alt="" />
            </div>
            <div>
                <button className="btn btn-highlight rounded-full">Learn More</button>
            </div>
        </div>
    );
}
