"use client";

import CardTitle from "@/components/admin/CardTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ProjectsCard() {
    const projectForm = useForm({
        resolver: zodResolver(z.object({})),
    });
    return (
        <Card className="mt-6">
            <CardHeader>
                <div className="flex justify-between items-end">
                    <CardTitle>Successfull Projects Section</CardTitle>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus /> Add Project
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Project to be shown in Homepage.</DialogTitle>
                            </DialogHeader>
                            <Form {...projectForm}>
                                <form onSubmit={projectForm.handleSubmit(() => {})}></form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent></CardContent>
        </Card>
    );
}
