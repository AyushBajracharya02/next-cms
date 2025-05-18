import CardTitle from "@/components/admin/CardTitle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import db from "@/db";
import { blogTable } from "@/db/schema/blog";
import BlogTable from "./components/BlogTable";

export default async function Page() {
    const blogs = await db
        .select({
            id: blogTable.id,
            title: blogTable.title,
            author: blogTable.author,
            active_status: blogTable.active_status,
        })
        .from(blogTable);
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Blog List</CardTitle>
                </CardHeader>
                <CardContent>
                    <BlogTable blogs={blogs} />
                </CardContent>
            </Card>
        </>
    );
}
