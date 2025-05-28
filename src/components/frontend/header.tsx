import Link from "next/link";
import Image from "next/image";

export default function Header({ logo }: { logo: string | null }) {
    return (
        <header className="px-4">
            <nav className="container grid grid-cols-[auto_auto_auto] justify-between h-20">
                <div className="flex items-center">
                    <Link href={`/`}>{logo && <Image src={logo} alt="" width={150} height={80} />}</Link>
                </div>
                <ul className="flex">
                    <li className="flex">
                        <Link className="flex items-center px-2" href={`/`}>
                            Home
                        </Link>
                    </li>
                    <li className="flex">
                        <Link className="flex items-center px-2" href={`/about`}>
                            About
                        </Link>
                    </li>
                    <li className="flex">
                        <Link className="flex items-center px-2" href={`/services`}>
                            Services
                        </Link>
                    </li>
                    <li className="flex">
                        <Link className="flex items-center px-2" href={`/contact`}>
                            Contact
                        </Link>
                    </li>
                    <li className="flex">
                        <Link className="flex items-center px-2" href={`/blogs`}>
                            Blogs
                        </Link>
                    </li>
                </ul>
                <div className="flex items-center">
                    <Link className="btn btn-dark rounded-full px-8 py-4 font-medium" href={`/contact`}>
                        Start a Project
                    </Link>
                </div>
            </nav>
        </header>
    );
}
