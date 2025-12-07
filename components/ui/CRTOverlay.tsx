export const CRTOverlay = () => {
    return (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden h-screen w-screen">
            {/* Scanlines */}
            <div
                className="absolute inset-0 z-[101] opacity-[0.15]"
                style={{
                    background:
                        "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
                    backgroundSize: "100% 2px, 3px 100%",
                }}
            />

            {/* Flicker Animation */}
            <div className="absolute inset-0 z-[102] bg-white opacity-[0.02] animate-flicker pointer-events-none mix-blend-overlay"></div>

            {/* Vignette */}
            <div
                className="absolute inset-0 z-[103]"
                style={{
                    background:
                        "radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4) 100%)",
                }}
            />

            {/* Screen Curvature (Subtle) */}
            <div className="absolute inset-0 z-[104] shadow-[inset_0_0_5rem_rgba(0,0,0,0.5)]"></div>
        </div>
    );
};
