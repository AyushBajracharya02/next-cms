import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import fs from "fs/promises";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function storeFile(file: File, url: string) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filePath = `${url}/${file.name}`;
    await fs.writeFile(filePath, buffer);
}
