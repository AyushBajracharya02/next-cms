"use client";

import Tiptap from "@/components/admin/TipTap";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Blog, blogUpdateSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { updateBlog } from "../actions";

export default function Editform({ blog }: { blog: Blog }) {
    const blogForm = useForm({
        resolver: zodResolver(blogUpdateSchema),
        defaultValues: blog,
    });
    async function submitBlog(values: Blog) {
        try {
            const response = await updateBlog(values);
            if (response.status === 200) {
                toast(response.message, {
                    closeButton: true,
                    className: "!bg-green-700",
                });
            }
            if (response.status === 400) {
                Object.entries(response.errors).forEach(([fields, errorMessages]) => {
                    if (!errorMessages) {
                        return;
                    }
                    blogForm.setError(fields as keyof Blog, { message: errorMessages[0] });
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
                                    <Tiptap {...field} {...fieldState} value={field.value ?? ""} />
                                </FormControl>
                                <FormMessage className="col-start-2" />
                            </FormItem>
                        )}
                    />
                </div>
                <Button className="mt-4">Submit</Button>
            </form>
        </Form>
    );
}
