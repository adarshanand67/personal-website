import { promises as fs } from "fs";
import path from "path";

export async function readData<T>(filename: string): Promise<T> {
  const filePath = path.join(process.cwd(), "data", filename);
  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);
    return data as T;
  } catch (error) {
    console.error(`Error reading data from ${filename}:`, error);
    throw new Error(`Failed to read data from ${filename}`);
  }
}
