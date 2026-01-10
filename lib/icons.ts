import {
  Code,
  Globe,
  Database,
  Terminal,
  Cpu,
  Shield,
  Layout,
  Server,
  Box,
  Layers,
  FileCode,
  Hash,
  Gamepad2,
  Book,
} from "lucide-react";

export const getTechIcon = (techName: string) => {
  const normalized = techName.toLowerCase();

  if (normalized.includes("react") || normalized.includes("frontend"))
    return Globe;
  if (normalized.includes("next")) return Layout;
  if (normalized.includes("python")) return Hash;
  if (normalized.includes("c++") || normalized.includes("c")) return FileCode;
  if (normalized.includes("security") || normalized.includes("encryption"))
    return Shield;
  if (normalized.includes("database") || normalized.includes("sql"))
    return Database;
  if (normalized.includes("docker") || normalized.includes("kubernetes"))
    return Box;
  if (normalized.includes("aws") || normalized.includes("cloud")) return Server;
  if (normalized.includes("linux") || normalized.includes("ubuntu"))
    return Terminal;

  return Code;
};
