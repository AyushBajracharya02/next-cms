import { DataTable } from "@/components/admin/DataTable";
import { HomepageServiceContentRow, useHomepageServiceContext } from "../hooks/use-homepage-service";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";

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
    ];
    return <DataTable data={serviceContent} columns={columns} />;
}
