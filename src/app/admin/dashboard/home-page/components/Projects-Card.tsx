"use client";

import { Card, CardContent } from "@/components/ui/card";
import ProjectsCardHeader from "./Projects-CardHeader";
import { HomepageProjectProvider, HomepageProjectRow } from "../hooks/use-homepage-project";
import ProjectsTable from "./Projects-Table";
import { Project } from "@/db/schema/project";

export default function ProjectsCard({
    availableProjects,
    homepageProjects,
}: {
    availableProjects: Omit<Project, "created_at" | "updated_at" | "description" | "service_id">[];
    homepageProjects: HomepageProjectRow[];
}) {
    return (
        <Card className="mt-6">
            <HomepageProjectProvider initialAvailableProjects={availableProjects} initialHomepageProjects={homepageProjects}>
                <ProjectsCardHeader />
                <CardContent>
                    <ProjectsTable />
                </CardContent>
            </HomepageProjectProvider>
        </Card>
    );
}
