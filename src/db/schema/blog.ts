import { boolean, longtext, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { timestamps } from "./common";

export const blogTable = mysqlTable("blogs", {
    id: serial("id").primaryKey(),
    author: varchar({ length: 256 }).notNull(),
    title: varchar({ length: 256 }).notNull(),
    content: longtext().notNull(),
    active_status: boolean().notNull().default(false),
    ...timestamps,
});
