"use client";

import { DataTable } from "@/components/admin/DataTable";
import { Switch } from "@radix-ui/react-switch";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

type Service = { id: number; name: string; active_status: boolean };

export default function ServiceTable() {
    const columns: ColumnDef<Service>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "active_status",
            header: "Active",
            cell: ({ row }) => <ServiceSwitch row={row} />,
        },
    ];
    return <DataTable columns={columns} data={[]} />;
}

function ServiceSwitch({ row }: { row: Row<Service> }) {
    const [checked, setChecked] = useState(row.original.active_status);
    async function handleCheckedChange(value: boolean) {
        const prevValue = checked;
        setChecked(value);
        try {
            // await updateBlog({ id: row.original.id, active_status: value });
        } catch (e) {
            toast((e as Error).message);
            setChecked(prevValue);
        }
    }
    return <Switch onCheckedChange={handleCheckedChange} checked={checked} />;
}
