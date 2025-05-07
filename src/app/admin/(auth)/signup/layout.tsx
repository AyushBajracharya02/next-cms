import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Digital Agency | Admin | SignUp",
    description: "SignUp page for the Content Management System admin panel of Digital Agency.",
};

export default async function SignupLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession();
    if (session) {
        redirect("/admin/dashboard");
    }
    return <>{children}</>;
}
