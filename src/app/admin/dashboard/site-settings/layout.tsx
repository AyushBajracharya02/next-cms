import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Digital Agency | Admin | Site Settings",
    description: "",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
