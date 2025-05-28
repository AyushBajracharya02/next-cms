import { DataTable } from "@/components/admin/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { HomepageProjectRow, useHomepageProjectContext } from "../hooks/use-homepage-project";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";
import { updateHomepageProject } from "../actions";

export default function ProjectsTable() {
    const columns: ColumnDef<HomepageProjectRow>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "project_name",
            header: "Project",
        },
        {
            accessorKey: "description",
            header: "Description",
        },
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) => <Image src={row.original.image} width={200} height={100} alt="" />,
        },
        {
            accessorKey: "service_name",
            header: "Service",
        },
        {
            accessorKey: "service_active_status",
            header: "Service Active",
            cell: ({ row }) => <Switch checked={row.original.service_active_status} disabled />,
        },
        {
            accessorKey: "active_status",
            header: "Show in Homepage",
            cell: ({ row }) => <HomepageProjectSwitch active_status={row.original.active_status} id={row.original.id} />,
        },
    ];
    const { projects } = useHomepageProjectContext();
    return <DataTable columns={columns} data={projects}></DataTable>;
}

function HomepageProjectSwitch({ active_status, id }: { active_status: boolean; id: number }) {
    const [checked, setChecked] = useState(active_status);
    async function handleCheckedChange(value: boolean) {
        const prevValue = checked;
        setChecked(value);
        try {
            await updateHomepageProject({ id: id, active_status: value });
        } catch (e) {
            toast((e as Error).message);
            setChecked(prevValue);
        }
    }
    return <Switch checked={checked} onCheckedChange={handleCheckedChange} />;
}
