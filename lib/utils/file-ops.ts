import { promises as fs } from "fs";
import path from "path";

import { ZodType } from "zod";

export async function readData<T>(filename: string, schema: ZodType<T>): Promise<T> {
    const filePath = path.join(process.cwd(), "data", filename);
    try {
        const fileContents = await fs.readFile(filePath, "utf8");
        const data = JSON.parse(fileContents);
        return schema.parse(data);
    } catch (error) {
        console.error(`Error reading or validating ${filename}:`, error);
        throw new Error(`Failed to read data from ${filename}`);
    }
}
