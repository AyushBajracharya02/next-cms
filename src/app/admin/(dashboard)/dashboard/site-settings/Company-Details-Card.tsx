"use client";

import CardTitle from "@/components/admin/CardTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { companySchema, CompanySchema } from "./schema";
import { updateCompanyDetails } from "./actions";
import { Nullable } from "@/types/utility";

export default function CompanyDetailCard({ company_name, logo }: Nullable<CompanySchema>) {
    const companyDetailForm = useForm({
        resolver: zodResolver(companySchema),
        defaultValues: {
            company_name: company_name ?? "",
            logo: logo ?? undefined,
        },
    });
    async function submitCompanyDetails(data: CompanySchema) {
        const formData = new FormData();
        formData.append("company_name", data.company_name);
        if (data.logo) {
            formData.append("logo", data.logo);
        }
        try {
            const response = await updateCompanyDetails(formData);
            if (response.status === 200) {
                console.log("updated");
            }
            if (response.status === 400) {
                Object.entries(response.errors).forEach(([fields, errorMessages]) => {
                    if (!errorMessages) {
                        return;
                    }
                    companyDetailForm.setError(fields as keyof CompanySchema, { message: errorMessages[0] });
                });
            }
            if (response.status === 500) {
                console.log("Internal Server Error");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Card className="@container">
            <CardHeader>
                <CardTitle>Company Details</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...companyDetailForm}>
                    <form onSubmit={companyDetailForm.handleSubmit(submitCompanyDetails)}>
                        <div className="grid grid-cols-1 @3xl:grid-cols-2 @5xl:grid-cols-4 gap-4">
                            <FormField
                                name="company_name"
                                control={companyDetailForm.control}
                                render={({ field }) => (
                                    <FormItem className="grid-rows-subgrid row-span-3">
                                        <FormLabel>Company Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="logo"
                                control={companyDetailForm.control}
                                render={({ field: { name, onBlur, ref, disabled, onChange } }) => (
                                    <FormItem className="grid-rows-subgrid row-span-3">
                                        <FormLabel>Logo</FormLabel>
                                        <FormControl>
                                            <Input
                                                onChange={e => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        onChange(file);
                                                    }
                                                }}
                                                name={name}
                                                onBlur={onBlur}
                                                ref={ref}
                                                disabled={disabled}
                                                type="file"
                                                accept="image/*"
                                            />
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
