"use client";

import { Card, CardContent } from "@/components/ui/card";
import ProjectsCardHeader from "./Projects-Card-Header";
import { ProjectServiceProvider } from "../hooks/use-project-service";

export default function ProjectsCard({ services, projects }) {
    return (
        <Card>
            <ProjectServiceProvider initialAvailableServices={services} initialProjects={projects}>
                <ProjectsCardHeader />
                <CardContent></CardContent>
            </ProjectServiceProvider>
        </Card>
    );
}
