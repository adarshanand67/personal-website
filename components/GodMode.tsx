"use client";

import { useKonamiCode } from "@/hooks/useKonamiCode";
import { CRTOverlay } from "@/components/ui/CRTOverlay";

export const GodMode = () => {
    const isGodMode = useKonamiCode();

    if (!isGodMode) return null;

    return <CRTOverlay />;
};
