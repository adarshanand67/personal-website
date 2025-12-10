import { useEffect, useState, useRef } from 'react';

const KONAMI_CODE = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
];

export const useKonamiCode = (callback: () => void) => {
    // Use state for index to force re-renders if needed, but ref is efficient for listener
    const indexRef = useRef(0);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            // Check if key matches the expected key at current index
            if (e.key === KONAMI_CODE[indexRef.current]) {
                indexRef.current += 1;

                // If complete
                if (indexRef.current === KONAMI_CODE.length) {
                    callback();
                    indexRef.current = 0; // Reset
                }
            } else {
                // Reset if wrong key
                indexRef.current = 0;
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [callback]);
};
