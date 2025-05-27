import { DataTable } from "@/components/admin/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { HomepageProjectRow, useHomepageProjectContext } from "../hooks/use-homepage-project";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";

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
    ];
    const { projects } = useHomepageProjectContext();
    return <DataTable columns={columns} data={projects}></DataTable>;
}
