"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ContactSchema, contactSchema } from "./schema";
import { updateContact } from "./actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Nullable } from "@/types/utility";

export default function ContactCard({ email, contact_number_1, contact_number_2, address }: Nullable<ContactSchema>) {
    const contactForm = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            email: email ?? "",
            contact_number_1: contact_number_1 ?? "",
            contact_number_2: contact_number_2 ?? "",
            address: address ?? "",
        },
    });
    async function contactSubmit(values: ContactSchema) {
        const response = await updateContact(values);
        if (response.status === 200) {
            console.log("updated");
        }
        if (response.status === 400) {
            Object.entries(response.errors).forEach(([fields, errorMessages]) => {
                if (!errorMessages) {
                    return;
                }
                contactForm.setError(fields as keyof ContactSchema, { message: errorMessages[0] });
            });
        }
        if (response.status === 500) {
            console.log("Internal Server Error");
        }
    }
    return (
        <Card className="@container mt-6">
            <CardHeader>
                <h2 className="text-xl font-medium">Contact Details</h2>
            </CardHeader>
            <CardContent>
                <Form {...contactForm}>
                    <form onSubmit={contactForm.handleSubmit(contactSubmit)}>
                        <div className="grid grid-cols-1 @3xl:grid-cols-2 @5xl:grid-cols-4 gap-4">
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
                                            <Input {...field} type="number" />
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
                                            <Input {...field} type="number" />
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
    );
}
