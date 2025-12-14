import { basePath } from "@/lib/constants";

export function getAssetPath(path: string): string {
    if (path.startsWith(basePath)) {
        return path;
    }
    return `${basePath}${path}`;
}
