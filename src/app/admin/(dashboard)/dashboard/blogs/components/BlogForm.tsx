import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { blogSchema } from "../schema";

type HandleSubmit = (e?: React.BaseSyntheticEvent) => Promise<void>;

export default function BlogForm({ id, handleSubmit }: { id: number; handleSubmit: HandleSubmit }) {
    const blogForm = useForm({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: "",
            author: "",
            content: "",
        },
    });
    return (
        <Form {...blogForm}>
            <form onSubmit={blogForm.handleSubmit(handleSubmit)}>
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
                                    <Tiptap {...field} {...fieldState} />
                                </FormControl>
                                <FormMessage className="col-start-2" />
                            </FormItem>
                        )}
                    />
                    {id && <Input type="hidden" value={id} />}
                </div>
                <Button className="mt-4">Submit</Button>
            </form>
        </Form>
    );
}
