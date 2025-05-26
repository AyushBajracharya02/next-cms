import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { timestamps } from "./common";
import { serviceTable } from "./service";

export const projectTable = mysqlTable("project", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 2048 }).notNull(),
    service_id: int()
        .references(() => serviceTable.id)
        .notNull(),
    ...timestamps,
});

export type Project = typeof projectTable.$inferSelect;
