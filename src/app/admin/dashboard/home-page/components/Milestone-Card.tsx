"use client";

import CardTitle from "@/components/admin/CardTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { MilestoneContentSchema, milestoneContentSchema } from "../schema";
import { toast } from "sonner";
import { storeMilestoneContent } from "../actions";

export default function MileStoneCard() {
    const milestoneForm = useForm({
        resolver: zodResolver(milestoneContentSchema),
        defaultValues: {
            milestone_title: "",
            milestone_description: "",
            milestone_stats: [],
        },
    });
    const { fields, append, remove } = useFieldArray({
        name: "milestone_stats",
        control: milestoneForm.control,
    });
    async function submitMilestoneContent(values: MilestoneContentSchema) {
        try {
            const response = await storeMilestoneContent(values);
            if (response.status === 200) {
                toast(response.message, {
                    className: "!bg-green-700",
                });
            }
            if (response.status === 400) {
                Object.entries(response.errors).forEach(([field, errors]) => {
                    milestoneForm.setError(field as keyof MilestoneContentSchema, {
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
                <CardTitle>Milestone Content</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...milestoneForm}>
                    <form onSubmit={milestoneForm.handleSubmit(submitMilestoneContent)}>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="">
                                <FormField
                                    name="milestone_title"
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
                                    name="milestone_description"
                                    render={({ field }) => (
                                        <FormItem className="mt-4">
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid col-span-3 grid-cols-subgrid gap-4 grid-rows-[auto_1fr]">
                                {fields.map(({ id }, index) => (
                                    <div className="grid grid-cols-subgrid col-span-3 gap-y-0 items-end" key={id}>
                                        <FormField
                                            control={milestoneForm.control}
                                            name={`milestone_stats.${index}.title`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>MileStone Title</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={milestoneForm.control}
                                            name={`milestone_stats.${index}.value`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>MileStone Value</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button variant="destructive" onClick={() => remove(index)}>
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    className="col-span-full"
                                    variant="outline"
                                    type="button"
                                    onClick={() =>
                                        append({
                                            title: "",
                                            value: "",
                                        })
                                    }
                                >
                                    Add MileStone
                                </Button>
                            </div>
                        </div>
                        <Button className="mt-4">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
