// Audio Configuration
export const AUDIO_CONFIG = {
    AUTOPLAY_DELAY_MS: 1000,
    VOLUME_STEP: 0.1,
    MIN_VOLUME: 0,
    MAX_VOLUME: 1,
    DEFAULT_VOLUME: 0.5,
} as const;

// Design Tokens - Z-Index
export const Z_INDEX = {
    NAVBAR: 50,
    MUSIC_PLAYER: 50,
    MODAL: 60,
    TOOLTIP: 70,
    MATRIX_RAIN: 40,
    TERMINAL_CURSOR: 50,
} as const;

// Design Tokens - Spacing
export const SPACING = {
    SECTION_VERTICAL: 'mb-24',
    SECTION_HORIZONTAL: 'px-4',
    MAX_WIDTH: 'max-w-4xl',
    MAX_WIDTH_WIDE: 'max-w-6xl',
} as const;

// Animation Durations (in ms)
export const ANIMATION = {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
} as const;

// Breakpoints (matches Tailwind defaults)
export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
} as const;
