import db from "@/db";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { accountsTable, usersTable } from "@/db/schema/auth";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const handler = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async credentials => {
                if (!credentials) {
                    return null;
                }
                const [user] = await db.select().from(usersTable).where(eq(usersTable.email, credentials.email)).limit(1);
                if (!user) {
                    throw new Error("Email or Password does not match");
                }
                const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
                if (!passwordsMatch) {
                    throw new Error("Email or Password does not match");
                }
                return user;
            },
        }),
    ],
    adapter: DrizzleAdapter(db, {
        usersTable,
        accountsTable,
    }),
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
});

export { handler as GET, handler as POST };
