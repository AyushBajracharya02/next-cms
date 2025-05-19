"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Service } from "../schema";
import ServiceContentCardHeader from "./Service-Content-CardHeader";
import { HomepageServiceContentRow, HomepageServiceProvider } from "../hooks/use-homepage-service";
import HomepageServiceTable from "./Homepage-Service-Table";

export function ServiceContentCard({ services, homepageServiceContent }: { services: Service[]; homepageServiceContent: HomepageServiceContentRow[] }) {
    return (
        <Card className="mt-6">
            <HomepageServiceProvider initialAvailableServices={services} initalServiceContent={homepageServiceContent}>
                <CardHeader>
                    <ServiceContentCardHeader />
                </CardHeader>
                <CardContent>
                    <HomepageServiceTable />
                </CardContent>
            </HomepageServiceProvider>
        </Card>
    );
}
