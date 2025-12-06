import { promises as fs } from "fs";
import path from "path";

export async function readData<T>(filename: string): Promise<T> {
    const filePath = path.join(process.cwd(), "data", filename);
    const fileContents = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContents);
}
