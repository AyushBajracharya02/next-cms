import { ReactNode } from "react";

export default function CardTitle({ children }: { children: ReactNode }) {
    return <h2 className="text-xl font-medium">{children}</h2>;
}
