import Image, { StaticImageData } from "next/image";

type SuccessfulProjectProps = {
    tag: string;
    heading: string;
    description: string;
    src: string | StaticImageData;
};

export default function SuccessfulProject({ src, tag, heading, description }: SuccessfulProjectProps) {
    return (
        <div className="space-y-4">
            <div>
                <Image className="w-full object-cover" width={600} height={650} src={src} alt="" />
            </div>
            <div className="rounded-full border-2 px-4 py-1 text-sm w-fit">{tag}</div>
            <div className="text-xl font-semibold">{heading}</div>
            <div className="text-gray-800">{description}</div>
        </div>
    );
}
