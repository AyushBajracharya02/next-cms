"use client";

import CardTitle from "@/components/admin/CardTitle";
import Tiptap from "@/components/admin/TipTap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Page() {
    const blogForm = useForm({
        resolver: zodResolver(
            z.object({
                title: z.string().min(1, "Title cannot be empty."),
                author: z.string().min(1, "Author cannot be empty."),
                content: z.string().min(1, "Content cannot be empty."),
            })
        ),
        defaultValues: {
            title: "",
            author: "",
            content: "",
        },
    });
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Add Blog</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...blogForm}>
                        <form onSubmit={blogForm.handleSubmit(() => {})}>
                            <div className="space-y-4">
                                <FormField
                                    control={blogForm.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-[100px_1fr] items-start">
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage className="col-start-2" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={blogForm.control}
                                    name="author"
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-[100px_1fr] items-start">
                                            <FormLabel>Author</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage className="col-start-2" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={blogForm.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-[100px_1fr] items-start">
                                            <FormLabel>Content</FormLabel>
                                            <FormControl>
                                                <Tiptap />
                                            </FormControl>
                                            <FormMessage className="col-start-2" />
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
