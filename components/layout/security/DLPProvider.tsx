"use client";

import React, { useEffect, useState } from 'react';

interface DLPProviderProps {
    children: React.ReactNode;
}

/**
 * DLPProvider implements multiple Data Loss Prevention (DLP) vectors:
 * 1. Disables context menu (right-click)
 * 2. Blocks common developer tools and save shortcuts
 * 3. Prevents dragging of images and text
 * 4. Blurs content when the window loses focus (deterrent for screen capture)
 */
export const DLPProvider: React.FC<DLPProviderProps> = ({ children }) => {
    const [isBlurred, setIsBlurred] = useState(false);

    useEffect(() => {
        // 1. Prevent right-click
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            return false;
        };

        // 2. Prevent common keyboard shortcuts
        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent F12
            if (e.key === 'F12') {
                e.preventDefault();
                return false;
            }

            // Prevent Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J (DevTools)
            // Prevent Ctrl+U (View Source)
            // Prevent Ctrl+S (Save Page)
            // Prevent Ctrl+P (Print - handled by CSS too)
            const ctrlOrMeta = e.ctrlKey || e.metaKey;
            const shift = e.shiftKey;

            if (ctrlOrMeta) {
                if (
                    (shift && (e.key === 'I' || e.key === 'i' || e.key === 'C' || e.key === 'c' || e.key === 'J' || e.key === 'j')) ||
                    e.key === 'U' || e.key === 'u' ||
                    e.key === 'S' || e.key === 's' ||
                    e.key === 'P' || e.key === 'p'
                ) {
                    e.preventDefault();
                    return false;
                }
            }
        };

        // 3. Prevent dragging content
        const handleDragStart = (e: DragEvent) => {
            e.preventDefault();
            return false;
        };

        // 4. Focus loss detection (Screen capture deterrent)
        const handleBlur = () => setIsBlurred(true);
        const handleFocus = () => setIsBlurred(false);

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                setIsBlurred(true);
            } else {
                setIsBlurred(false);
            }
        };

        // Attach listeners
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('dragstart', handleDragStart);
        window.addEventListener('blur', handleBlur);
        window.addEventListener('focus', handleFocus);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            // Clean up
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('dragstart', handleDragStart);
            window.removeEventListener('blur', handleBlur);
            window.removeEventListener('focus', handleFocus);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return (
        <div className="relative w-full h-full">
            <div
                className={`transition-all duration-300 w-full h-full ${isBlurred ? 'blur-[20px] select-none pointer-events-none grayscale opacity-50' : ''}`}
                aria-hidden={isBlurred}
            >
                {children}
            </div>

            {/* Overlay shown when blurred to indicate protection */}
            {isBlurred && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none">
                    <div className="px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white font-medium animate-pulse shadow-2xl">
                        Protected Content
                    </div>
                </div>
            )}
        </div>
    );
};
