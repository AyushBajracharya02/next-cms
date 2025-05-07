"use client";

import { DataTable } from "@/components/admin/DataTable";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Blog } from "../schema";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { updateBlog } from "../actions";
import { toast } from "sonner";
import Link from "next/link";

export default function BlogTable({ blogs }: { blogs: Blog[] }) {
    const columns: ColumnDef<Blog>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "title",
            header: "Title",
        },
        {
            accessorKey: "author",
            header: "Author",
        },
        {
            accessorKey: "active_status",
            header: "Active",
            cell: ({ row }) => <BlogSwitch row={row} />,
        },
        {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <>
                    <Link href={`/admin/dashboard/blogs/edit/${row.original.id}`}>Edit</Link>
                </>
            ),
        },
    ];
    return <DataTable columns={columns} data={blogs} />;
}

function BlogSwitch({ row }: { row: Row<Blog> }) {
    const [checked, setChecked] = useState(row.original.active_status);
    async function handleCheckedChange(value: boolean) {
        const prevValue = checked;
        setChecked(value);
        try {
            await updateBlog({ id: row.original.id, active_status: value });
        } catch (e) {
            toast((e as Error).message);
            setChecked(prevValue);
        }
    }
    return <Switch onCheckedChange={handleCheckedChange} checked={checked} />;
}
