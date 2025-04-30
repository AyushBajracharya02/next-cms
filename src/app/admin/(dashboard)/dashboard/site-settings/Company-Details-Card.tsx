"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function CompanyDetailCard({}) {
    const companyDetailForm = useForm({
        resolver: zodResolver(
            z.object({
                logo: z.string(),
                company_name: z.string().min(1, "Company Name is required."),
            })
        ),
        defaultValues: {
            logo: "",
            company_name: "",
        },
    });
    return (
        <Card className="@container">
            <CardHeader>
                <h2 className="text-xl font-medium">Company Details</h2>
            </CardHeader>
            <CardContent>
                <Form {...companyDetailForm}>
                    <form
                        onSubmit={companyDetailForm.handleSubmit(values => {
                            console.log(values);
                        })}
                    >
                        <div className="grid grid-cols-1 @3xl:grid-cols-2 @5xl:grid-cols-4 gap-4">
                            <FormField
                                name="company_name"
                                control={companyDetailForm.control}
                                render={({ field }) => (
                                    <FormItem className="grid-rows-subgrid row-span-3">
                                        <FormLabel>Company Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" accept="image/*" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="logo"
                                control={companyDetailForm.control}
                                render={({ field }) => (
                                    <FormItem className="grid-rows-subgrid row-span-3">
                                        <FormLabel>Logo</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="file" accept="image/*" />
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
