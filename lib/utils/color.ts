/**
 * @fileoverview Color utilities for generating consistent gradients and styles.
 */

const bookPatterns = [
    'bg-red-900', 'bg-blue-900', 'bg-green-900', 'bg-amber-900',
    'bg-slate-800', 'bg-purple-900', 'bg-indigo-900', 'bg-rose-900'
];

const bookGradients = [
    "from-red-900 to-red-950",
    "from-blue-900 to-blue-950",
    "from-green-900 to-green-950",
    "from-amber-900 to-amber-950",
    "from-slate-800 to-slate-900",
    "from-purple-900 to-purple-950",
    "from-indigo-900 to-indigo-950",
    "from-rose-900 to-rose-950"
];

/**
 * Generates a consistent background color/pattern for a book based on its title.
 * @param {string} title - Book title
 * @returns {string} Tailwind background class
 */
export const getBookStyle = (title: string) => {
    let hash = 0;
    for (let i = 0; i < title.length; i++) hash = title.charCodeAt(i) + ((hash << 5) - hash);
    const colorIndex = Math.abs(hash) % bookPatterns.length;
    return bookPatterns[colorIndex];
};

/**
 * Generates a consistent gradient for a book based on its title.
 * @param {string} title - Book title
 * @returns {string} Tailwind gradient classes
 */
export const getBookGradient = (title: string) => {
    let hash = 0;
    for (let i = 0; i < title.length; i++) hash = title.charCodeAt(i) + ((hash << 5) - hash);
    const colorIndex = Math.abs(hash) % bookGradients.length;
    return bookGradients[colorIndex];
};
