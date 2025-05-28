import { DataTable } from "@/components/admin/DataTable";
import { HomepageServiceContentRow, useHomepageServiceContext } from "../hooks/use-homepage-service";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";
import { updateHomepageService } from "../actions";

export default function HomepageServiceTable() {
    const { serviceContent } = useHomepageServiceContext();
    const columns: ColumnDef<HomepageServiceContentRow>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "service_name",
            header: "Service Name",
        },
        {
            accessorKey: "service_active_status",
            header: "Service Active",
            cell: ({ row }) => <Switch checked={row.original.service_active_status} disabled />,
        },
        {
            accessorKey: "description",
            header: "Description",
        },
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) => <Image src={row.original.image} alt="" width={350} height={75} />,
        },
        {
            accessorKey: "active_status",
            header: "Show in Homepage",
            cell: ({ row }) => <HomepageServiceSwitch active_status={row.original.active_status} id={row.original.id} />,
        },
    ];

    return <DataTable data={serviceContent} columns={columns} />;
}

function HomepageServiceSwitch({ active_status, id }: { active_status: boolean; id: number }) {
    const [checked, setChecked] = useState(active_status);
    async function handleCheckedChange(value: boolean) {
        const prevValue = checked;
        setChecked(value);
        try {
            await updateHomepageService({ id: id, active_status: value });
        } catch (e) {
            toast((e as Error).message);
            setChecked(prevValue);
        }
    }
    return <Switch checked={checked} onCheckedChange={handleCheckedChange} />;
}
