import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { timestamps } from "./common";

export const homepageTable = mysqlTable("homepage", {
    id: int().primaryKey().autoincrement(),
    banner_title: varchar({ length: 256 }),
    banner_subtitle: varchar({ length: 256 }),
    banner_video: varchar({ length: 2048 }),
    ...timestamps,
});
