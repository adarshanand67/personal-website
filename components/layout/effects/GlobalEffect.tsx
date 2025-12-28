"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store/useStore";

/**
 * Global Effect Component - sets mounted state for SSR safety.
 * Runs once on client mount to enable client-only features.

 */
export const GlobalEffect = () => {
    const { setIsMounted } = useStore();

    useEffect(() => {
        setIsMounted(true);
    }, [setIsMounted]);

    return null;
};
