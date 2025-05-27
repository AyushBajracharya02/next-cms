import CardTitle from "@/components/admin/CardTitle";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useHomepageProjectContext } from "../hooks/use-homepage-project";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { HomepageProjectSchema, homepageProjectSchema } from "../schema";
import { toast } from "sonner";
import { storeHomepageProject } from "../actions";
import { useState } from "react";

export default function ProjectsCardHeader() {
    const { availableProjects, refresh } = useHomepageProjectContext();
    const [dialogOpen, setDialogOpen] = useState(false);

    const projectForm = useForm({
        resolver: zodResolver(homepageProjectSchema),
        defaultValues: {
            project_id: "",
            description: "",
            image: undefined,
        },
    });
    async function submitHomepageProject(values: HomepageProjectSchema) {
        try {
            const response = await storeHomepageProject(values);
            if (response.status === 200) {
                toast(response.message, {
                    className: "!bg-green-700",
                    closeButton: true,
                });
                refresh();
                setDialogOpen(false);
                projectForm.reset();
            }
            if (response.status === 400) {
                Object.entries(response.errors).forEach(([field, errors]) => {
                    projectForm.setError(field as keyof HomepageProjectSchema, {
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
        } catch (error) {
            toast((error as Error).message, {
                className: "!bg-red-800",
                closeButton: true,
            });
        }
    }
    return (
        <CardHeader>
            <div className="flex justify-between items-end">
                <CardTitle>Successfull Projects Section</CardTitle>
                <Dialog
                    open={dialogOpen}
                    onOpenChange={open => {
                        setDialogOpen(open);
                        projectForm.reset();
                    }}
                >
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
                            <form onSubmit={projectForm.handleSubmit(submitHomepageProject)}>
                                <FormField
                                    render={({ field: { name, onBlur, onChange, ref, value, disabled } }) => (
                                        <FormItem>
                                            <FormLabel>Select Project</FormLabel>
                                            <Select disabled={disabled} value={value} onValueChange={onChange} name={name}>
                                                <SelectTrigger className="w-full" onBlur={onBlur} ref={ref}>
                                                    <SelectValue placeholder="Select a Project." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Projects</SelectLabel>
                                                        {availableProjects.map(({ id, name }, index) => (
                                                            <SelectItem value={`${id}`} key={index}>
                                                                {name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    name="project_id"
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
                                    name="image"
                                    render={({ field: { name, onBlur, onChange, ref, disabled } }) => (
                                        <FormItem className="mt-4">
                                            <FormLabel>Image</FormLabel>
                                            <FormControl>
                                                <Input
                                                    name={name}
                                                    onBlur={onBlur}
                                                    onChange={e => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            onChange(file);
                                                        }
                                                    }}
                                                    disabled={disabled}
                                                    ref={ref}
                                                    type="file"
                                                    accept="image/*"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="mt-4">Submit</Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
        </CardHeader>
    );
}
