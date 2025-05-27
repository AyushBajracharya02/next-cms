import { HomepageProject } from "@/db/schema/homepage_project";
import { Project } from "@/db/schema/project";
import { createContext, ReactNode, useCallback, useContext, useState } from "react";

export type HomepageProjectRow = Omit<HomepageProject, "created_at" | "updated_at" | "project_id"> & { project_name: string } & {
    service_name: string;
    service_active_status: boolean;
};

type HomepageProjectContextType = {
    availableProjects: Omit<Project, "created_at" | "updated_at" | "description" | "service_id">[];
    refresh: () => void;
    projects: HomepageProjectRow[];
};

const HomepageProjectContext = createContext<HomepageProjectContextType | null>(null);

export function useHomepageProjectContext() {
    const ctx = useContext(HomepageProjectContext);
    if (!ctx) throw new Error("useHomepageProjectContext must be used inside <HomepageProjectProvider>");
    return ctx;
}

type HomepageProjectProviderProps = {
    initialAvailableProjects: Omit<Project, "created_at" | "updated_at" | "description" | "service_id">[];
    children: ReactNode;
    initialHomepageProjects: HomepageProjectRow[];
};

export function HomepageProjectProvider({ children, initialHomepageProjects, initialAvailableProjects }: HomepageProjectProviderProps) {
    const [projects, setProjects] = useState(initialHomepageProjects);
    const [availableProjects, setAvailableProjects] = useState(initialAvailableProjects);
    const refresh = useCallback(async () => {
        const homepageProjectResponse = await fetch("/api/homepage-projects");
        const homepageProjectData = await homepageProjectResponse.json();
        setProjects(homepageProjectData);
        const availableProjectsResponse = await fetch("/api/projects?unreferenced_in=homepage_project");
        const availableProjectsData = await availableProjectsResponse.json();
        setAvailableProjects(availableProjectsData);
    }, []);
    return <HomepageProjectContext.Provider value={{ projects, refresh, availableProjects }}>{children}</HomepageProjectContext.Provider>;
}
