import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { Project } from "@/db/schema/project";

export type ProjectRow = Omit<Project, "service_id" | "created_at" | "updated_at"> & { service_name: string; service_active_status: boolean };

type ProjectServiceContextType = {
    projects: ProjectRow[];
    refresh: () => void;
};

const ProjectServiceContext = createContext<ProjectServiceContextType | null>(null);

export function useProjectServiceContext() {
    const ctx = useContext(ProjectServiceContext);
    if (!ctx) {
        throw new Error("useProjectServiceContext must be used inside <ProjectServiceProvider>");
    }
    return ctx;
}

type ProjectServiceParams = {
    children: ReactNode;
    initialProjects: ProjectRow[];
};

export function ProjectServiceProvider({ children, initialProjects }: ProjectServiceParams) {
    const [projects, setProjects] = useState(initialProjects);
    const refresh = useCallback(async () => {
        const projectResponse = await fetch("/api/projects");
        const projectData = await projectResponse.json();
        setProjects(projectData);
    }, []);
    return <ProjectServiceContext.Provider value={{ projects, refresh }}>{children}</ProjectServiceContext.Provider>;
}
