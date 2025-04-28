import { int, mysqlTable, text } from "drizzle-orm/mysql-core";
import { timestamps } from "./common";

export const companyDetails = mysqlTable("company_details", {
    logo: text().notNull(),
    email: text().notNull(),
    address: text().notNull(),
    contact_number: int().notNull(),
    ...timestamps,
});
