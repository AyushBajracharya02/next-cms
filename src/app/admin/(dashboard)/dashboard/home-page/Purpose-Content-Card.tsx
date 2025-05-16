"use client";

import CardTitle from "@/components/admin/CardTitle";
import Tiptap from "@/components/admin/TipTap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { PurposeContentSchema, purposeContentSchema } from "./schema";

export default function PurposeContentCard() {
    const form = useForm({
        resolver: zodResolver(purposeContentSchema),
        defaultValues: {
            purpose_title: "",
            purpose_content: "",
            purpose_tagline: "",
            purpose_image: undefined,
            purpose_stats: [],
        },
    });
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "purpose_stats",
    });
    async function updatePurposeContent(values: PurposeContentSchema) {
        try {
            // const response = u
        } catch (error) {}
    }
    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Purpose Section Content</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(updatePurposeContent)}>
                        <div className="grid grid-cols-4 gap-4">
                            <FormField
                                name="purpose_title"
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
                                name="purpose_image"
                                render={({ field: { name, onBlur, ref, disabled, onChange } }) => (
                                    <FormItem>
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
                            <FormField
                                name="purpose_tagline"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tagline</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="purpose_content"
                                render={({ field, fieldState }) => (
                                    <FormItem className="col-span-full">
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <Tiptap<PurposeContentSchema, "purpose_content"> {...field} {...fieldState} />
                                        </FormControl>
                                        <FormMessage className="col-start-2" />
                                    </FormItem>
                                )}
                            />
                            <Card className="col-span-full grid grid-cols-subgrid">
                                <CardHeader className="col-span-full">
                                    <CardTitle>Purpose Statistics</CardTitle>
                                </CardHeader>
                                <CardContent className="col-span-full grid grid-cols-subgrid space-y-4">
                                    {fields.map(({ id }, index) => (
                                        <div key={id} className="col-span-full grid grid-cols-subgrid items-end">
                                            <FormField
                                                control={form.control}
                                                name={`purpose_stats.${index}.title`}
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
                                                control={form.control}
                                                name={`purpose_stats.${index}.subtitle`}
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
                                                control={form.control}
                                                name={`purpose_stats.${index}.icon`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Icon</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button
                                                variant="destructive"
                                                type="button"
                                                onClick={() => {
                                                    remove(index);
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        variant="outline"
                                        type="button"
                                        onClick={() => {
                                            append({ title: "", subtitle: "", icon: "" });
                                        }}
                                    >
                                        Add Statistics
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                        <Button className="mt-4">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
