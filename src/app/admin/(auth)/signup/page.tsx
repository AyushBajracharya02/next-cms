"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUp } from "./actions";
import { SignupSchema, signupSchema } from "./schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function SignUpPage() {
    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            confirmPassword: "",
            email: "",
            name: "",
            password: "",
        },
    });
    const router = useRouter();
    async function onSubmit(values: SignupSchema) {
        try {
            const response = await signUp(values);

            //validation errors
            if (response.status === 400) {
                Object.entries(response.errors).forEach(([fields, errorMessages]) => {
                    if (!errorMessages) {
                        return;
                    }
                    form.setError(fields as keyof SignupSchema, { message: errorMessages[0] });
                });
            }
            if (response.status === 409) {
                form.setError("email", { message: response.message });
            }
            if (response.status === 200) {
                router.push("/admin/dashboard");
            }
        } catch (error) {
            toast((error as Error).message);
        }
    }
    return (
        <section className="min-h-screen content-center">
            <Card className="max-w-lg mx-auto">
                <CardHeader>
                    <CardTitle>
                        <h1 className="text-2xl text-center">Sign Up</h1>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="example@gmail.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Password" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Confirm Password" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="block mx-auto">Sign Up</Button>
                        </form>
                    </Form>
                    <div className="mt-4">
                        <p className="text-center text-sm">
                            <span>Already have an account? </span>
                            <Link className="underline" href="/admin/login">
                                Log In
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
