"use client";

import CardTitle from "@/components/admin/CardTitle";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectContent, SelectLabel } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useProjectServiceContext } from "../hooks/use-project-service";
import { ProjectSchema, projectSchema } from "../schema";
import { addProject } from "../actions";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Service } from "@/db/schema/service";

export default function ProjectsCardHeader({ services }: { services: Service[] }) {
    const addProjectForm = useForm({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: "",
            description: "",
            service_id: "",
        },
    });
    const [dialogOpen, setDialogOpen] = useState(false);
    const { refresh } = useProjectServiceContext();
    async function submitProject(data: ProjectSchema) {
        try {
            const response = await addProject(data);
            if (response.status === 200) {
                refresh();
                setDialogOpen(false);
                toast(response.message, {
                    className: "!bg-green-700",
                    closeButton: true,
                });
            }
            if (response.status === 400) {
                Object.entries(response.errors).forEach(([field, errors]) => {
                    addProjectForm.setError(field as keyof ProjectSchema, {
                        message: errors[0],
                    });
                });
            }
            if (response.status === 500) {
                toast(response.message, {
                    className: "!bg-red-800",
                    closeButton: true,
                });
            }
        } catch (e) {
            toast((e as Error).message, {
                className: "!bg-red-800",
                closeButton: true,
            });
        }
    }
    return (
        <CardHeader>
            <div className="flex justify-between">
                <CardTitle>Projects</CardTitle>
                <Dialog
                    open={dialogOpen}
                    onOpenChange={open => {
                        setDialogOpen(open);
                        addProjectForm.reset();
                    }}
                >
                    <DialogTrigger asChild>
                        <Button>
                            <Plus /> Add Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Project</DialogTitle>
                        </DialogHeader>
                        <div>
                            <Form {...addProjectForm}>
                                <form onSubmit={addProjectForm.handleSubmit(submitProject)}>
                                    <FormField
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem className="mt-4">
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea {...field}></Textarea>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="service_id"
                                        render={({ field: { name, onBlur, onChange, ref, value, disabled } }) => (
                                            <FormItem className="mt-4">
                                                <FormLabel>Service</FormLabel>
                                                <Select value={value} onValueChange={onChange} name={name} disabled={disabled}>
                                                    <SelectTrigger className="w-full" ref={ref} onBlur={onBlur}>
                                                        <SelectValue placeholder="Select a service" />
                                                    </SelectTrigger>
                                                    <SelectContent className="w-full">
                                                        <SelectGroup>
                                                            <SelectLabel>Services</SelectLabel>
                                                            {services.map((service, index) => (
                                                                <SelectItem value={`${service.id}`} key={index}>
                                                                    {service.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button className="mt-4">Submit</Button>
                                </form>
                            </Form>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </CardHeader>
    );
}
