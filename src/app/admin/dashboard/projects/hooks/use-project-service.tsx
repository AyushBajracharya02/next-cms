import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { Service } from "../../home-page/schema";

type ProjectServiceContextType = {
    availableServices: Service[];
    projects: [];
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
    initialAvailableServices: Service[];
    initialProjects: [];
};

export function ProjectServiceProvider({ children, initialAvailableServices, initialProjects }: ProjectServiceParams) {
    const [availableServices, setAvailableServices] = useState(initialAvailableServices);
    const [projects, setProjects] = useState(initialProjects);
    const refresh = useCallback(async () => {
        const serviceResponse = await fetch("/api/services?unreferenced_in=project&active_status=true");
        const serviceData = await serviceResponse.json();
        setAvailableServices(serviceData);

        const projectResponse = await fetch("/api/projects");
        const projectData = await projectResponse.json();
        setProjects(projectData);
    }, []);
    return <ProjectServiceContext.Provider value={{ availableServices, projects, refresh }}>{children}</ProjectServiceContext.Provider>;
}
