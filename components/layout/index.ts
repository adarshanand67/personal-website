// Re-export from modular layouts
export { Hero } from "./hero/Hero";
export { Experience } from "./experience/Experience";
export { TechStack } from "./techstack/TechStack";
export { ShelvesSection } from "./shelves/ShelvesSection";
export { RecentSection } from "./recent/RecentSection";
export { ContactSection } from "./contact/ContactSection";

// Re-export from submodules
export * from "./navigation";
export * from "./effects";

// Re-export from terminal submodule
export { Terminal } from "./terminal";

// Re-export from theme submodule
export { ThemeProvider, ThemeToggle, ClientLinkedin, ClientGithub, ClientMail } from "./theme";

// Re-export from ui submodule
export { SectionHeader, SpotlightCard } from "./ui";
