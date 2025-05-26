import { createContext, useCallback, useContext, useState } from "react";

const HomepageProjectContext = createContext(null);

export function useHomepageServiceContext() {
    const ctx = useContext(HomepageProjectContext);
    if (!ctx) throw new Error("useHomepageServiceContext must be used inside <HomepageProjectProvider>");
    return ctx;
}

export function HomepageProjectProvider({ children, initialHomepageProjects }) {
    const [homepageProjects, setHomepageProjects] = useState(initialHomepageProjects);
    const refresh = useCallback(async () => {
        const homepageProjectResponse = await fetch("/api/homepage-projects");
        const homepageProjectData = await homepageProjectResponse.json();
        setHomepageProjects(homepageProjectData);
    }, []);
    return <HomepageProjectContext.Provider value={{ homepageProjects, refresh }}>{children}</HomepageProjectContext.Provider>;
}
