/**
 * Theme Configuration
 * 
 * Customize the visual appearance of your portfolio.
 * Colors, fonts, and visual effects can be configured here.
 */

export const themeConfig = {
    // Color Palette
    colors: {
        primary: "#00bf40",           // Main green color
        primaryDark: "#22c55e",       // Dark mode green
        accent: "#15803d",            // Accent green
        background: {
            light: "#f0f0f0",           // Light mode background
            dark: "#050505",            // Dark mode background
        },
        foreground: {
            light: "#111111",           // Light mode text
            dark: "#e0e0e0",            // Dark mode text
        },
    },

    // Typography
    fonts: {
        sans: "Assistant",            // Sans-serif font
        mono: "JetBrains Mono",       // Monospace font for terminal
        serif: "var(--font-mono)",    // Serif font
    },

    // Visual Effects
    effects: {
        matrixRain: true,             // Enable Matrix rain background
        glitchText: true,             // Enable glitch effect on text
        terminalCursor: true,         // Enable custom terminal cursor
        glassmorphism: true,          // Enable glassmorphic navbar
    },

    // Animation Settings
    animations: {
        enablePageTransitions: false, // Page transitions (not implemented yet)
        enableScrollAnimations: false, // Scroll-triggered animations (not implemented yet)
        enableHoverEffects: true,     // Hover micro-interactions
    },
} as const;

// Type export for use in components
export type ThemeConfig = typeof themeConfig;
