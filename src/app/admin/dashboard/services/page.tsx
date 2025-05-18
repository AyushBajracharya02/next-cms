import CardTitle from "@/components/admin/CardTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";
import ServiceTable from "./components/ServiceTable";

export default function Page() {
    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Services</CardTitle>
                        <Button variant="outline">
                            <Plus />
                            Add Service
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <ServiceTable />
                </CardContent>
            </Card>
        </>
    );
}
