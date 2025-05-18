"use client";

import { createContext, useCallback, useContext, useState, ReactNode } from "react";
import { ServiceUpdateSchema } from "../schema";

type ServiceContextType = {
    services: ServiceUpdateSchema[];
    refreshServices: () => void;
};

const ServiceContext = createContext<ServiceContextType | null>(null);

export function useServiceContext() {
    const ctx = useContext(ServiceContext);
    if (!ctx) throw new Error("useServiceContext must be used inside <ServiceContextProvider>");
    return ctx;
}

type ServiceProviderProps = {
    initialServices: ServiceUpdateSchema[];
    children: ReactNode;
};

export function ServiceContextProvider({ initialServices, children }: ServiceProviderProps) {
    const [services, setServices] = useState(initialServices);

    const refreshServices = useCallback(async () => {
        const response = await fetch("/api/services?fields=id,name");

        const data = await response.json();
        setServices(data);
    }, []);

    return <ServiceContext.Provider value={{ services, refreshServices }}>{children}</ServiceContext.Provider>;
}
