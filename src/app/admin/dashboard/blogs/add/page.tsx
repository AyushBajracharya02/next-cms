"use client";

import CardTitle from "@/components/admin/CardTitle";
import Tiptap from "@/components/admin/TipTap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BlogSchema, blogSchema } from "../schema";
import { storeBlog } from "../actions";
import { toast } from "sonner";

export default function Page() {
    const blogForm = useForm({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: "",
            author: "",
            content: "",
        },
    });
    async function submitBlog(values: BlogSchema) {
        try {
            const response = await storeBlog(values);
            if (response.status === 200) {
                toast(response.message, {
                    closeButton: true,
                    className: "!bg-green-700",
                });
                blogForm.reset();
            }
            if (response.status === 400) {
                Object.entries(response.errors).forEach(([fields, errorMessages]) => {
                    if (!errorMessages) {
                        return;
                    }
                    blogForm.setError(fields as keyof BlogSchema, { message: errorMessages[0] });
                });
            }
            if (response.status === 500) {
                toast(response.message, {
                    closeButton: true,
                    className: "!bg-red-800",
                });
            }
        } catch (error) {
            toast((error as Error).message, {
                closeButton: true,
                className: "!bg-red-800",
            });
        }
    }
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Add Blog</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...blogForm}>
                        <form onSubmit={blogForm.handleSubmit(submitBlog)}>
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
                                    render={({ field, fieldState }) => (
                                        <FormItem className="grid grid-cols-[100px_1fr] items-start">
                                            <FormLabel>Content</FormLabel>
                                            <FormControl>
                                                <Tiptap<BlogSchema, "content"> {...field} {...fieldState} />
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
