import { char, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { timestamps } from "./common";

export const site_settings = mysqlTable("site_settings", {
    ...timestamps,
    email: varchar({ length: 256 }),
    contact_number_1: char({
        length: 10,
    }),
    contact_number_2: char({
        length: 10,
    }),
    address: varchar({ length: 128 }),
    facebook: varchar({ length: 2048 }),
    instagram: varchar({ length: 2048 }),
    linkedin: varchar({ length: 2048 }),
    youtube: varchar({ length: 2048 }),
    tiktok: varchar({ length: 2048 }),
    threads: varchar({ length: 2048 }),
});
