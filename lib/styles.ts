/**
 * Reusable CSS class constants for consistent styling
 * Use with cn() utility for conditional classes
 */

// Button Styles
export const BUTTON_STYLES = {
    ICON_BUTTON: 'hover:text-green-400 text-gray-300 transition-colors',
    PRIMARY: 'bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors',
    SECONDARY: 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded transition-colors',
} as const;

// Position Styles
export const POSITION_STYLES = {
    FIXED_BOTTOM_RIGHT: 'fixed bottom-4 right-4',
    FIXED_TOP_LEFT: 'fixed top-0 left-0',
    FIXED_TOP_RIGHT: 'fixed top-0 right-0',
} as const;

// Container Styles
export const CONTAINER_STYLES = {
    SECTION: 'section max-w-4xl mx-auto px-4 mb-24',
    SECTION_WIDE: 'section max-w-6xl mx-auto px-4 mb-24',
    CARD: 'p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
} as const;

// Text Styles
export const TEXT_STYLES = {
    HEADING_1: 'text-4xl md:text-5xl font-bold',
    HEADING_2: 'text-2xl md:text-3xl font-bold',
    HEADING_3: 'text-xl md:text-2xl font-bold',
    BODY: 'text-base leading-relaxed',
    SMALL: 'text-sm text-gray-600 dark:text-gray-400',
} as const;

// Link Styles
export const LINK_STYLES = {
    PRIMARY: 'text-green-700 dark:text-green-400 hover:underline transition-colors',
    SECONDARY: 'text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors',
} as const;

// Animation Classes
export const ANIMATION_STYLES = {
    FADE_IN: 'animate-fadeIn',
    SLIDE_UP: 'animate-slideUp',
    SPIN_SLOW: 'animate-spin-slow',
    PULSE: 'animate-pulse',
} as const;
