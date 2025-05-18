import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ServiceTable from "./ServiceTable";
import ServiceCardHeader from "./ServiceCardHeader";
import { ServiceUpdateSchema } from "../schema";
import { ServiceContextProvider } from "../hooks/useServiceContext";

export default function ServiceCard({ services }: { services: ServiceUpdateSchema[] }) {
    return (
        <ServiceContextProvider initialServices={services}>
            <Card>
                <CardHeader>
                    <ServiceCardHeader />
                </CardHeader>
                <CardContent>
                    <ServiceTable />
                </CardContent>
            </Card>
        </ServiceContextProvider>
    );
}
