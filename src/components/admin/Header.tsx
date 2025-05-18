"use client";

import { Session } from "next-auth";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "../ui/navigation-menu";
import Image from "next/image";
import { LogOut, User2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { Card, CardContent } from "../ui/card";

export default function Header({ session }: { session: Session }) {
    return (
        <header>
            <Card>
                <CardContent>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="h-auto">
                                    <div className="flex items-center gap-2">
                                        <div className="w-9 aspect-square rounded-full grid place-items-center bg-primary">
                                            {session.user?.image ? <Image src={session.user.image} alt="" /> : <User2 className="text-black" />}
                                        </div>
                                        <span>{session.user?.name}</span>
                                    </div>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <NavigationMenuLink asChild>
                                        <button className="flex" onClick={() => signOut({ callbackUrl: "/admin/login" })}>
                                            <LogOut />
                                            <span>Logout</span>
                                        </button>
                                    </NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </CardContent>
            </Card>
        </header>
    );
}
