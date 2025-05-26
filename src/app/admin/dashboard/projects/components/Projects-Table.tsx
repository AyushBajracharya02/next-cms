import { DataTable } from "@/components/admin/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { ProjectRow, useProjectServiceContext } from "../hooks/use-project-service";
import { Switch } from "@/components/ui/switch";

export default function ProjectsTable() {
    const { projects } = useProjectServiceContext();
    const columns: ColumnDef<ProjectRow>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "name",
            header: "Project Name",
        },
        {
            accessorKey: "description",
            header: "Description",
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
    return <DataTable columns={columns} data={projects} />;
}
