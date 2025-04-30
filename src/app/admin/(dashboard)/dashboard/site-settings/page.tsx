"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ContactSchema, contactSchema, socialMediaSchema } from "./schema";
import { UpdateContact } from "./actions";

export default function Page() {
    const contactForm = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            email: "",
            contact_number_1: "",
            contact_number_2: "",
            address: "",
        },
    });

    const socialMediaForm = useForm({
        resolver: zodResolver(socialMediaSchema),
        defaultValues: {
            facebook: "",
            instagram: "",
            linkedin: "",
            tiktok: "",
            youtube: "",
            threads: "",
        },
    });

    async function contactSubmit(values: ContactSchema) {
        const response = await UpdateContact(values);
        if (response?.status == 400) {
            Object.entries(response.errors).forEach(([fields, errorMessages]) => {
                if (!errorMessages) {
                    return;
                }
                contactForm.setError(fields as keyof ContactSchema, { message: errorMessages[0] });
            });
        }
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-medium">Contact Details</h2>
                </CardHeader>
                <CardContent>
                    <Form {...contactForm}>
                        <form onSubmit={contactForm.handleSubmit(contactSubmit)}>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={contactForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="grid-rows-subgrid row-span-3">
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />{" "}
                                <FormField
                                    control={contactForm.control}
                                    name="contact_number_1"
                                    render={({ field }) => (
                                        <FormItem className="grid-rows-subgrid row-span-3">
                                            <FormLabel>Contact Number 1</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={contactForm.control}
                                    name="contact_number_2"
                                    render={({ field }) => (
                                        <FormItem className="grid-rows-subgrid row-span-3">
                                            <FormLabel>Contact Number 2</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={contactForm.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem className="grid-rows-subgrid row-span-3">
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
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
            <Card className="mt-6">
                <CardHeader>
                    <h2 className="text-xl font-medium">Social Medias</h2>
                </CardHeader>
                <CardContent>
                    <Form {...socialMediaForm}>
                        <form onSubmit={socialMediaForm.handleSubmit(() => {})}>
                            <div className="grid grid-cols-3 gap-4">
                                <FormField
                                    control={socialMediaForm.control}
                                    name="facebook"
                                    render={({ field }) => (
                                        <FormItem className="grid-rows-subgrid row-span-3">
                                            <FormLabel>Facebook</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />{" "}
                                <FormField
                                    control={socialMediaForm.control}
                                    name="instagram"
                                    render={({ field }) => (
                                        <FormItem className="grid-rows-subgrid row-span-3">
                                            <FormLabel>Instagram</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={socialMediaForm.control}
                                    name="linkedin"
                                    render={({ field }) => (
                                        <FormItem className="grid-rows-subgrid row-span-3">
                                            <FormLabel>Linkedin</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={socialMediaForm.control}
                                    name="tiktok"
                                    render={({ field }) => (
                                        <FormItem className="grid-rows-subgrid row-span-3">
                                            <FormLabel>Tiktok</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={socialMediaForm.control}
                                    name="youtube"
                                    render={({ field }) => (
                                        <FormItem className="grid-rows-subgrid row-span-3">
                                            <FormLabel>Youtube</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={socialMediaForm.control}
                                    name="threads"
                                    render={({ field }) => (
                                        <FormItem className="grid-rows-subgrid row-span-3">
                                            <FormLabel>Threads</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
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
        </>
    );
}
