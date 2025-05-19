import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ServiceTable from "./ServiceTable";
import ServiceCardHeader from "./ServiceCardHeader";
import { ServiceUpdateSchema } from "../schema";
import { ServiceContextProvider } from "../hooks/useServiceContext";

export default function ServiceCard({ services }: { services: ServiceUpdateSchema[] }) {
    return (
        <Card>
            <ServiceContextProvider initialServices={services}>
                <CardHeader>
                    <ServiceCardHeader />
                </CardHeader>
                <CardContent>
                    <ServiceTable />
                </CardContent>
            </ServiceContextProvider>
        </Card>
    );
}
