"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema, loginSchema } from "./schema";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function Login() {
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const router = useRouter();
    async function onSubmit(values: LoginSchema) {
        try {
            const response = await signIn("credentials", {
                redirect: false,
                ...values,
            });
            if (!response) {
                return;
            }
            if (!response.ok) {
                if (!response.error) {
                    response.error = "Email or Password does not match";
                }
                form.setError("email", {});
                form.setError(
                    "password",
                    { message: response.error },
                    {
                        shouldFocus: true,
                    }
                );
            } else {
                router.push("/admin/dashboard");
            }
        } catch (e) {
            toast((e as Error).message);
        }
    }
    return (
        <section className="min-h-screen content-center">
            <Card className="max-w-lg mx-auto">
                <CardHeader>
                    <CardTitle>
                        <h1 className="text-2xl text-center">Log In</h1>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                                        <div className="flex justify-between">
                                            <FormLabel>Password</FormLabel>
                                            <Link className="text-sm leading-none font-medium" href="admin/forgot-password">
                                                Forgot Password?
                                            </Link>
                                        </div>
                                        <FormControl>
                                            <Input placeholder="Password" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="block mx-auto">Log in</Button>
                        </form>
                    </Form>
                    <div className="mt-4">
                        <p className="text-center text-sm">
                            <span>Don&apos;t have an account? </span>
                            <Link className="underline" href="/admin/signup">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
