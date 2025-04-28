import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { dbCredentials } from "@/db";

export default defineConfig({
    out: "./src/db/migration",
    schema: "./src/db/schema",
    dialect: "mysql",
    dbCredentials,
});
