import "./admin.css";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className="dark">
            <body>{children}</body>
        </html>
    );
}
