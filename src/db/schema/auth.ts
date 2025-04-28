import { int, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users", {
    id: varchar({ length: 36 }).primaryKey().notNull(),
    name: text().notNull(),
    email: varchar({ length: 254 }).unique().notNull(),
    emailVerified: timestamp(),
    image: text(),
    password: text().notNull(),
});

export const accountsTable = mysqlTable("accounts", {
    userId: varchar({ length: 36 }).notNull(),
    type: text().notNull(),
    provider: text().notNull(),
    providerAccountId: text().notNull(),
    refresh_token: text().notNull(),
    access_token: text().notNull(),
    expires_at: int().notNull(),
    token_type: text().notNull(),
    scope: text().notNull(),
    id_token: text().notNull(),
    session_state: text().notNull(),
});
