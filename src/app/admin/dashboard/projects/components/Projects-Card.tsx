"use client";

import { Card, CardContent } from "@/components/ui/card";
import ProjectsCardHeader from "./Projects-Card-Header";
import { ProjectRow, ProjectServiceProvider } from "../hooks/use-project-service";
import { Service } from "@/db/schema/service";
import ProjectsTable from "./Projects-Table";

export default function ProjectsCard({ services, projects }: { services: Service[]; projects: ProjectRow[] }) {
    return (
        <Card>
            <ProjectServiceProvider initialProjects={projects}>
                <ProjectsCardHeader services={services} />
                <CardContent>
                    <ProjectsTable />
                </CardContent>
            </ProjectServiceProvider>
        </Card>
    );
}
