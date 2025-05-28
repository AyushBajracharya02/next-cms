"use client";

import CardTitle from "@/components/admin/CardTitle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { WhoWeAreSchema, whoWeAreSchema } from "../schema";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { storeWhoWeAre } from "../actions";
import { Button } from "@/components/ui/button";
import { Nullable } from "@/types/utility";
import Image from "next/image";
import Tiptap from "@/components/admin/TipTap";

export default function WhoWeAreCard({ title, description, image }: Nullable<Omit<WhoWeAreSchema, "image"> & { image: string }>) {
    const whoWeAreForm = useForm({
        resolver: zodResolver(whoWeAreSchema),
        defaultValues: {
            title: title ?? "",
            description: description ?? "",
            image: undefined,
        },
    });
    async function submitWhoWeAre(data: WhoWeAreSchema) {
        try {
            const response = await storeWhoWeAre(data);
            if (response.status === 200) {
                toast(response.message, {
                    className: "!bg-green-700",
                });
            }
            if (response.status === 400) {
                Object.entries(response.errors).forEach(([field, errors]) => {
                    whoWeAreForm.setError(field as keyof WhoWeAreSchema, {
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
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Who We Are Content</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...whoWeAreForm}>
                    <form onSubmit={whoWeAreForm.handleSubmit(submitWhoWeAre)}>
                        <div className="grid grid-cols-2 gap-4">
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
                            {image && <Image className="row-span-2" src={image} alt="" width={200} height={100} />}
                            <FormField
                                name="image"
                                render={({ field: { name, onBlur, onChange, ref, disabled } }) => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                name={name}
                                                onBlur={onBlur}
                                                onChange={e => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        onChange(file);
                                                    }
                                                }}
                                                ref={ref}
                                                disabled={disabled}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="description"
                                render={({ field, fieldState }) => (
                                    <FormItem className="col-span-full">
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Tiptap<WhoWeAreSchema, "description"> {...field} {...fieldState} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button className="mt-4">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
