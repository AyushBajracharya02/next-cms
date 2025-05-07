import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import db from "@/db";
import { blogTable } from "@/db/schema/blog";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import EditForm from "../../components/EditForm";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const [blog] = await db
        .select()
        .from(blogTable)
        .where(eq(blogTable.id, parseInt(id)))
        .limit(1);

    if (!blog) {
        notFound();
    }
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Blog</CardTitle>
                </CardHeader>
                <CardContent>
                    <EditForm blog={blog} />
                </CardContent>
            </Card>
        </>
    );
}
