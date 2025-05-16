import { int, json, longtext, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { timestamps } from "./common";

export const homepageTable = mysqlTable("homepage", {
    id: int().primaryKey().autoincrement(),
    banner_title: varchar({ length: 256 }),
    banner_subtitle: varchar({ length: 256 }),
    banner_video: varchar({ length: 2048 }),
    purpose_title: varchar({ length: 512 }),
    purpose_content: longtext(),
    purpose_tagline: varchar({ length: 256 }),
    purpose_image: varchar({ length: 2048 }),
    purpose_stats: json().$type<
        {
            icon: string;
            title: string;
            subtitle: string;
        }[]
    >(),
    ...timestamps,
});
