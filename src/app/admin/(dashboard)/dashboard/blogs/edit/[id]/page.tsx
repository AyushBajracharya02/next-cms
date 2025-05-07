import db from "@/db";
import { blogTable } from "@/db/schema/blog";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const [blog] = await db
        .select()
        .from(blogTable)
        .where(eq(blogTable.id, parseInt(params.id)))
        .limit(1);

    if (!blog) {
        notFound();
    }
    return;
}
