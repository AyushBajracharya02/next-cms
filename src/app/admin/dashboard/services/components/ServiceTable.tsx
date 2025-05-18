"use client";

import { DataTable } from "@/components/admin/DataTable";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";
import { ServiceUpdateSchema } from "../schema";
import { updateService } from "../actions";
import { Switch } from "@/components/ui/switch";
import { useServiceContext } from "../hooks/useServiceContext";

export default function ServiceTable() {
    const { services } = useServiceContext();
    const columns: ColumnDef<ServiceUpdateSchema>[] = [
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
    return <DataTable columns={columns} data={services} />;
}

function ServiceSwitch({ row }: { row: Row<ServiceUpdateSchema> }) {
    const [checked, setChecked] = useState(row.original.active_status);
    async function handleCheckedChange(value: boolean) {
        const prevValue = checked;
        setChecked(value);
        try {
            await updateService({ id: row.original.id, active_status: value });
        } catch (e) {
            toast((e as Error).message);
            setChecked(prevValue);
        }
    }
    return <Switch onCheckedChange={handleCheckedChange} checked={checked} />;
}
