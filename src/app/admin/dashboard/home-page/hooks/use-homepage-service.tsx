import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { HomepageServiceContent } from "../schema";
import { Service } from "@/db/schema/service";

export type HomepageServiceContentRow = HomepageServiceContent & { service_name: string; service_active_status: boolean };

type HomepageServiceContextType = {
    availableServices: Service[];
    serviceContent: HomepageServiceContentRow[];
    refresh: () => void;
};

const HomepageServiceContext = createContext<HomepageServiceContextType | null>(null);

export function useHomepageServiceContext() {
    const ctx = useContext(HomepageServiceContext);
    if (!ctx) throw new Error("useHomepageServiceContext must be used inside <HomepageServiceProvider>");
    return ctx;
}

type HomepageServiceProviderParams = {
    initialAvailableServices: Service[];
    initalServiceContent: HomepageServiceContentRow[];
    children: ReactNode;
};

export function HomepageServiceProvider({ initialAvailableServices, children, initalServiceContent }: HomepageServiceProviderParams) {
    const [availableServices, setAvailableServices] = useState(initialAvailableServices);
    const [serviceContent, setServiceContent] = useState(initalServiceContent);

    const refresh = useCallback(async () => {
        const serviceResponse = await fetch("/api/services?unreferenced_in=homepage_service_entries&active_status=true");
        const serviceData = await serviceResponse.json();
        setAvailableServices(serviceData);
        const serviceContentResponse = await fetch("/api/homepage-service-content");
        const serviceContentData = await serviceContentResponse.json();
        setServiceContent(serviceContentData);
    }, []);

    return <HomepageServiceContext.Provider value={{ availableServices, refresh, serviceContent }}>{children}</HomepageServiceContext.Provider>;
}
