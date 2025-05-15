"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BannerContentSchema, bannerContentSchema } from "./schema";
import { storeBannerContent } from "./actions";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Nullable } from "@/types/utility";

export default function BannerContentCard({ banner_title, banner_subtitle }: Nullable<Omit<BannerContentSchema, "logo">>) {
    const bannerForm = useForm({
        resolver: zodResolver(bannerContentSchema),
        defaultValues: {
            banner_title: banner_title ?? "",
            banner_subtitle: banner_subtitle ?? "",
            banner_video: undefined,
        },
    });
    async function submitBannerContent(values: BannerContentSchema) {
        try {
            const response = await storeBannerContent(values);
            if (response.status == 200) {
                toast(response.message, {
                    closeButton: true,
                    className: "!bg-green-700",
                });
            }
            if (response.status == 400) {
                toast(response.message, {
                    closeButton: true,
                    className: "!bg-green-700",
                });
                Object.entries(response.errors).forEach(([fields, errors]) => {
                    if (!errors) {
                        return;
                    }
                    bannerForm.setError(fields as keyof BannerContentSchema, { message: errors[0] });
                });
            }
            if (response.status === 500) {
                toast(response.message, {
                    closeButton: true,
                    className: "!bg-red-800",
                });
            }
        } catch (e) {
            toast((e as Error).message, {
                closeButton: true,
                className: "!bg-green-700",
            });
        }
    }
    return (
        <Card className="@container">
            <CardHeader>Banner Content</CardHeader>
            <CardContent>
                <Form {...bannerForm}>
                    <form onSubmit={bannerForm.handleSubmit(submitBannerContent)}>
                        <div className="grid grid-cols-1 @3xl:grid-cols-2 @5xl:grid-cols-4 gap-4">
                            <FormField
                                name="banner_title"
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
                                name="banner_subtitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Subtitle</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="banner_video"
                                render={({ field: { name, onBlur, ref, disabled, onChange } }) => (
                                    <FormItem>
                                        <FormLabel>Banner Video</FormLabel>
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
                                                accept="video/*"
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
