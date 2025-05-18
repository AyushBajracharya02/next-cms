"use client";

import CardTitle from "@/components/admin/CardTitle";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ServiceSchema, serviceSchema } from "../schema";
import { toast } from "sonner";
import { createService } from "../actions";
import { useServiceContext } from "../hooks/useServiceContext";
import { useState } from "react";

export default function ServiceCardHeader({}) {
    const addServiceForm = useForm({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            name: "",
        },
    });
    const { refreshServices } = useServiceContext();
    const [dialogOpen, setDialogOpen] = useState(false);
    async function handleSubmit(values: ServiceSchema) {
        try {
            const response = await createService(values);
            if (response.status === 200) {
                toast(response.message, {
                    closeButton: true,
                    className: "!bg-green-700",
                });
                refreshServices();
                setDialogOpen(false);
            }
            if (response.status === 409) {
                addServiceForm.setError("name", { message: response.message });
            }
            if (response.status === 400) {
                Object.entries(response.errors).forEach(([field, errors]) => {
                    addServiceForm.setError(field as keyof ServiceSchema, { message: errors[0] });
                });
            }
            if (response.status === 500) {
                toast(response.message, {
                    closeButton: true,
                    className: "!bg-red-800",
                });
            }
        } catch (error) {
            toast((error as Error).message, {
                closeButton: true,
                className: "!bg-red-800",
            });
        }
    }
    return (
        <div className="flex justify-between items-center">
            <CardTitle>Services</CardTitle>
            <Dialog
                open={dialogOpen}
                onOpenChange={open => {
                    setDialogOpen(open);
                    addServiceForm.reset();
                }}
            >
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <Plus />
                        Add Service
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Service</DialogTitle>
                    </DialogHeader>
                    <div>
                        <Form {...addServiceForm}>
                            <form onSubmit={addServiceForm.handleSubmit(handleSubmit)}>
                                <FormField
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Service Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="mt-6">Create</Button>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
