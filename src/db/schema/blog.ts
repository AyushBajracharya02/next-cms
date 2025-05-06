import { longtext, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { timestamps } from "./common";

export const blogTable = mysqlTable("blogs", {
    id: serial("id").primaryKey(),
    author: varchar({ length: 256 }).notNull(),
    title: varchar({ length: 256 }).notNull(),
    content: longtext().notNull(),
    ...timestamps,
});
