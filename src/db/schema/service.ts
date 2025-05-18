import { boolean, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { timestamps } from "./common";

export const serviceTable = mysqlTable("service", {
    id: int().primaryKey().autoincrement(),
    name: varchar({ length: 256 }).notNull(),
    active: boolean().notNull().default(false),
    ...timestamps,
});
