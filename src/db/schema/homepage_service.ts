import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { serviceTable } from "./service";
import { timestamps } from "./common";

export const homepage_service_entries = mysqlTable("homepage_service_entries", {
    id: int().primaryKey().autoincrement(),
    service_id: int()
        .references(() => serviceTable.id)
        .notNull(),
    description: varchar({ length: 2048 }),
    image: varchar({ length: 2048 }),
    ...timestamps,
});
