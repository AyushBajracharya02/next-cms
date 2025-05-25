"use client";

import CardTitle from "@/components/admin/CardTitle";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectContent, SelectLabel } from "@radix-ui/react-select";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useProjectServiceContext } from "../hooks/use-project-service";
import { ProjectSchema, projectSchema } from "../schema";
import { addProject } from "../actions";
import { toast } from "sonner";

export default function ProjectsCardHeader() {
    const addProjectForm = useForm({
        resolver: zodResolver(projectSchema),
    });
    const { refresh, availableServices } = useProjectServiceContext();
    async function submitProject(data: ProjectSchema) {
        try {
            const response = await addProject(data);
            if (response.status === 200) {
                refresh();
            }
        } catch (e) {
            toast((e as Error).message, {
                className: "bg-red-800",
                closeButton: true,
            });
        }
    }
    return (
        <CardHeader>
            <div className="flex justify-between">
                <CardTitle>Projects</CardTitle>
                <Dialog>
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
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="service"
                                        render={({ field: { name, onBlur, onChange, ref, value, disabled } }) => (
                                            <FormItem>
                                                <FormLabel>Service</FormLabel>
                                                <Select value={value} onValueChange={onChange} name={name} disabled={disabled}>
                                                    <SelectTrigger className="w-full" ref={ref} onBlur={onBlur}>
                                                        <SelectValue placeholder="Select a service" />
                                                    </SelectTrigger>
                                                    <SelectContent className="w-full">
                                                        <SelectGroup>
                                                            <SelectLabel>Services</SelectLabel>
                                                            {availableServices.map((service, index) => (
                                                                <SelectItem value={`${service.id}`} key={index}>
                                                                    {service.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </Form>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </CardHeader>
    );
}
