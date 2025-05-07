import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await getServerSession();
    if (session) {
        redirect("/admin/dashboard");
    } else {
        redirect("/admin/login");
    }
}
