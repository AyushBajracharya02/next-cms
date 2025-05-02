"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SocialMediaSchema, socialMediaSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Nullable } from "@/types/utility";
import { updateSocials } from "./actions";
import CardTitle from "@/components/admin/CardTitle";

export default function SocialsCard({ facebook, instagram, linkedin, threads, tiktok, youtube }: Nullable<SocialMediaSchema>) {
    const socialMediaForm = useForm({
        resolver: zodResolver(socialMediaSchema),
        defaultValues: {
            facebook: facebook ?? "",
            instagram: instagram ?? "",
            linkedin: linkedin ?? "",
            tiktok: tiktok ?? "",
            youtube: youtube ?? "",
            threads: threads ?? "",
        },
    });

    async function handleSubmit(values: SocialMediaSchema) {
        try {
            socialMediaSchema.parse(values);
            const response = await updateSocials(values);
            if (response.status === 200) {
                console.log("updated");
            }
            if (response.status === 400) {
                Object.entries(response.errors).forEach(([fields, errorMessages]) => {
                    if (!errorMessages) {
                        return;
                    }
                    socialMediaForm.setError(fields as keyof SocialMediaSchema, { message: errorMessages[0] });
                });
            }
            if (response.status === 500) {
                console.log("Internal Server Error");
            }
        } catch (e) {}
    }
    return (
        <Card className="@container mt-6">
            <CardHeader>
                <CardTitle>Social Medias</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...socialMediaForm}>
                    <form onSubmit={socialMediaForm.handleSubmit(handleSubmit)}>
                        <div className="grid grid-cols-1 @3xl:grid-cols-2 @5xl:grid-cols-4 gap-4">
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
                            />
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
    );
}
