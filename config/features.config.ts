/**
 * Features Configuration
 * 
 * Enable or disable specific features of your portfolio.
 * Set to `false` to completely remove a feature from the site.
 */

export const featuresConfig = {
    // Main Sections
    enableBlog: true,               // Blog posts section
    enableProjects: true,           // Projects showcase
    enableExperience: true,         // Work experience timeline
    enablePapers: true,             // Research papers section
    enableBooks: true,              // Reading list
    enableAnime: true,              // Entertainment (anime/movies)
    enableHobbies: true,            // Hobbies section
    enableUses: true,               // Tech stack / uses page

    // Interactive Widgets
    enableMusicPlayer: true,        // Background music player
    enableTerminal: true,           // Interactive terminal widget
    enableMatrixRain: true,         // Matrix rain background effect
    enableGitHubStats: true,        // GitHub statistics widget
    enableWeatherWidget: false,     // Weather widget (disabled by default)
    enableCommandMenu: true,        // Command palette (Cmd+K)

    // UI Components
    enableBackToTop: true,          // Back to top button
    enableThemeToggle: true,        // Dark/light mode toggle
    enableSearch: true,             // Search functionality

    // Social Features
    enableComments: false,          // Comments on blog posts (not implemented)
    enableNewsletter: false,        // Newsletter signup (not implemented)
    enableAnalytics: false,         // Analytics tracking (not implemented)
} as const;

// Type export for use in components
export type FeaturesConfig = typeof featuresConfig;

/**
 * Helper function to check if a feature is enabled
 * @param feature - The feature key to check
 * @returns boolean indicating if feature is enabled
 */
export function isFeatureEnabled(feature: keyof FeaturesConfig): boolean {
    return featuresConfig[feature];
}
