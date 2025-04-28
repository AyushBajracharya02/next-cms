import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Digital Agency | Admin | Login",
    description: "Login page for the Content Management System admin panel of Digital Agency.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
