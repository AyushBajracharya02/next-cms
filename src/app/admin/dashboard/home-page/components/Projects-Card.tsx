"use client";

import CardTitle from "@/components/admin/CardTitle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ProjectsCard() {
    const projectForm = useForm({
        resolver: zodResolver(z.object({})),
    });
    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Successfull Projects</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...projectForm}>
                    <form></form>
                </Form>
            </CardContent>
        </Card>
    );
}
