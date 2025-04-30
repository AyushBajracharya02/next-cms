import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const host = process.env.DATABASE_HOST;
const database = process.env.DATABASE_NAME;

if (!host || !database) {
    throw new Error("DATABASE_HOST and/or DATABASE_NAME environment variables not set.");
}

export const dbCredentials = {
    host,
    database,
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USERNAME,
    port: Number(process.env.DATABASE_PORT),
};

const pool = mysql.createPool(dbCredentials);

const db = drizzle(pool);

export default db;
