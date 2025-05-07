import Header from "@/components/admin/Header";
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession();

    if (!session) {
        redirect("/admin/login");
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="p-5 grow-1">
                <Header session={session} />
                <div className="container mt-4">{children}</div>
            </main>
            <Toaster />
        </SidebarProvider>
    );
}
