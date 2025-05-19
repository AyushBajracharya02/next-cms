"use client";

import CardTitle from "@/components/admin/CardTitle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { serviceTable } from "@/db/schema/service";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectValue, SelectTrigger, SelectLabel, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ServiceSectionSchema, serviceSectionSchema } from "../schema";
import { toast } from "sonner";

type Services = typeof serviceTable.$inferSelect;

export function ServiceContentCard({ services }: { services: Services[] }) {
    const serviceSectionForm = useForm({
        resolver: zodResolver(serviceSectionSchema),
        defaultValues: {
            service_id: undefined,
            description: "",
            image: undefined,
        },
    });
    const [dialogOpen, setDialogOpen] = useState(false);
    async function submitContent(values: ServiceSectionSchema) {
        try {
            const response = await storeHomepageServiceContent(values);
        } catch (error) {
            toast((error as Error).message, {
                closeButton: true,
                className: "!bg-red-800",
            });
        }
    }
    return (
        <Card className="mt-6">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Service Section</CardTitle>
                    <Dialog
                        open={dialogOpen}
                        onOpenChange={open => {
                            setDialogOpen(open);
                            serviceSectionForm.reset();
                        }}
                    >
                        <DialogTrigger asChild>
                            <Button>Add</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Service Content</DialogTitle>
                            </DialogHeader>
                            <div>
                                <Form {...serviceSectionForm}>
                                    <form onSubmit={serviceSectionForm.handleSubmit(submitContent)}>
                                        <FormField
                                            name="service_id"
                                            render={({ field: { name, onBlur, onChange, ref, value, disabled } }) => (
                                                <FormItem>
                                                    <FormLabel>Service</FormLabel>
                                                    <FormControl>
                                                        <Select value={value} onValueChange={onChange} name={name} disabled={disabled}>
                                                            <SelectTrigger className="w-full" ref={ref} onBlur={onBlur}>
                                                                <SelectValue placeholder="Select a service" />
                                                            </SelectTrigger>
                                                            <SelectContent className="w-full">
                                                                <SelectGroup>
                                                                    <SelectLabel>Services</SelectLabel>
                                                                    {services.map(service => (
                                                                        <SelectItem value={`${service.id}`} key={service.id}>
                                                                            {service.name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            name="description"
                                            render={({ field: { name, onBlur, onChange, ref, value, disabled } }) => (
                                                <FormItem className="mt-4">
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea name={name} onBlur={onBlur} ref={ref} disabled={disabled} value={value} onChange={onChange} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            name="image"
                                            render={({ field: { name, onBlur, ref, disabled, onChange } }) => (
                                                <FormItem className="mt-4">
                                                    <FormLabel>Image</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="file"
                                                            onChange={e => {
                                                                const file = e.target.files?.[0];
                                                                if (file) {
                                                                    onChange(file);
                                                                }
                                                            }}
                                                            name={name}
                                                            disabled={disabled}
                                                            onBlur={onBlur}
                                                            ref={ref}
                                                            accept="image/*"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button className="mt-4">Add Content</Button>
                                    </form>
                                </Form>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent></CardContent>
        </Card>
    );
}
