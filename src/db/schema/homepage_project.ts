import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { projectTable } from "./project";
import { timestamps } from "./common";

export const homepage_project_table = mysqlTable("homepage_project", {
    id: int().primaryKey().autoincrement(),
    project_id: int()
        .references(() => projectTable.id)
        .notNull()
        .unique(),
    description: varchar({ length: 2048 }).notNull(),
    image: varchar({ length: 2048 }).notNull(),
    ...timestamps,
});

export type HomepageProject = typeof homepage_project_table.$inferSelect;
