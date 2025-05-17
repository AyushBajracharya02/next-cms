"use server";

import fs from "fs/promises";

export async function storeFile(file: File, url: string) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filePath = `${url}/${file.name}`;
    await fs.writeFile(filePath, buffer);
}
