import { boolean, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { timestamps } from "./common";

export const serviceTable = mysqlTable("service", {
    id: int().primaryKey().autoincrement(),
    name: varchar({ length: 256 }).notNull().unique(),
    active_status: boolean().notNull().default(false),
    ...timestamps,
});

export type Service = typeof serviceTable.$inferSelect;
