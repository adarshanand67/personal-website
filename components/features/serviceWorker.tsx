"use client";

import { useEffect } from "react";

/**
 * PWA Registration Component - registers service worker for Progressive Web App.
 * Only registers in production environment. Runs once on mount.
 * @component
 */
export function PWARegistration() {
    useEffect(() => {
        if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
            navigator.serviceWorker
                .register("/sw.js")
                .then((registration) => {
                    console.log("PWA Service Worker registered:", registration);
                })
                .catch((error) => {
                    console.error("PWA Service Worker registration failed:", error);
                });
        }
    }, []);

    return null;
}
