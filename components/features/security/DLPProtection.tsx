"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Copy, AlertTriangle, EyeOff, Camera, ShieldAlert, Terminal, RefreshCw } from "lucide-react";
import { useStore } from "@/lib/store/useStore";

// --- Notifications Component ---
type NotificationType = {
    id: string;
    message: string;
    type: "warning" | "error" | "info";
    icon: React.ReactNode;
};

const DLPNotification = ({ notifications }: { notifications: NotificationType[] }) => {
    if (notifications.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-[2147483647] flex flex-col gap-2 pointer-events-none">
            {notifications.map((notif) => (
                <div
                    key={notif.id}
                    className="bg-black/80 backdrop-blur-md border border-red-500/50 text-red-100 px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 max-w-sm"
                >
                    <div className="p-2 bg-red-500/20 rounded-full shrink-0">
                        {notif.icon}
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-red-400 uppercase tracking-wider">Security Alert</h4>
                        <p className="text-xs text-gray-300 leading-tight mt-0.5">{notif.message}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};



export function DLPProtection() {
    const [isBlur, setIsBlur] = useState(false);
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [violationCount, setViolationCount] = useState(0);
    const violationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const { isPlaying, setIsPlaying } = useStore();
    const wasPlayingRef = useRef(false);

    const addNotification = useCallback((message: string, icon: React.ReactNode) => {
        const id = Math.random().toString(36).substring(7);
        const newNotif: NotificationType = { id, message, type: "warning", icon };

        setNotifications((prev) => [...prev, newNotif]);

        // Rate Limiting Logic: excessive violations trigger a stricter response
        setViolationCount(prev => prev + 1);
        if (violationTimeoutRef.current) clearTimeout(violationTimeoutRef.current);
        violationTimeoutRef.current = setTimeout(() => setViolationCount(0), 10000); // Reset after 10s

        // Auto dismiss
        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 3000);
    }, []);

    useEffect(() => {
        if (isBlur) {
            if (isPlaying) {
                wasPlayingRef.current = true;
                setIsPlaying(false);
            }
        } else {
            if (wasPlayingRef.current) {
                setIsPlaying(true);
                wasPlayingRef.current = false;
            }
        }
    }, [isBlur, isPlaying, setIsPlaying]);

    // Violation Lockout Effect
    useEffect(() => {
        if (violationCount > 5) {
            setIsBlur(true);
            setTimeout(() => {
                setViolationCount(0);
                setIsBlur(false);
            }, 5000); // 5s lockout for aggressive behavior
        }
    }, [violationCount]);

    useEffect(() => {
        // 1. Disable Right Click
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            addNotification("Right-click context menu is disabled for security compliance.", <ShieldAlert size={16} />);
            e.stopPropagation(); // Stop event bubbling
            return false;
        };

        // 2. Disable Copy/Cut/Paste
        const handleCopyCutPaste = (e: ClipboardEvent) => {
            addNotification("Copy/Paste actions are blocked.", <Copy size={16} />);
            e.preventDefault();
            if (e.clipboardData) {
                e.clipboardData.setData("text/plain", "Security Violation: Content copying is strictly prohibited.");
            }
            return false;
        };

        // 3. Disable Dragging
        const handleDragStart = (e: DragEvent) => {
            addNotification("Dragging content (text or images) to external sources is prohibited.", <ShieldAlert size={16} />);
            e.preventDefault();
            if (e.dataTransfer) {
                e.dataTransfer.clearData();
            }
            return false;
        };

        // 4. Keydown Restrictions
        const handleKeyDown = (e: KeyboardEvent) => {
            // Print Screen
            if (e.key === "PrintScreen") {
                setIsBlur(true);
                setTimeout(() => setIsBlur(false), 2000);
                navigator.clipboard.writeText(""); // Clear clipboard
                addNotification("Screen capture attempt detected and blocked.", <Camera size={16} />);
                return;
            }

            // Block generic shortcuts with specific messages
            if (e.ctrlKey || e.metaKey) {
                if (e.key === "a") {
                    addNotification("Select All is disabled to prevent bulk data extraction.", <ShieldAlert size={16} />);
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
                if (e.key === "s") {
                    addNotification("Saving content is disabled.", <ShieldAlert size={16} />);
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
                if (e.key === "p") {
                    addNotification("Printing is disabled.", <EyeOff size={16} />);
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
                if (e.key === "u") {
                    addNotification("Viewing source is disabled.", <Terminal size={16} />);
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
                if (e.key === "g") {
                    addNotification("Search function is limited.", <ShieldAlert size={16} />);
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            }

            // Block DevTools Shortcuts (Cmd+Option+I, J, C or Ctrl+Shift+I, J, C)
            // Block DevTools Shortcuts (Cmd+Option+I, J, C or Ctrl+Shift+I, J, C)
            // Also blocking Cmd+Shift+Number keys (2,3,4,5) for Screenshots/Debug
            if (
                (e.ctrlKey || e.metaKey) &&
                e.shiftKey &&
                (
                    e.key === "i" || e.key === "j" || e.key === "c" ||
                    e.key === "4" || e.key === "3" || e.key === "5" || e.key === "2" ||
                    e.code === "Digit3" || e.code === "Digit4" || e.code === "Digit5" || e.code === "Digit2"
                )
            ) {
                addNotification("Inspector tools are blocked.", <Terminal size={16} />);
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            // Block F12
            if (e.key === "F12") {
                addNotification("Developer tools are disabled.", <ShieldAlert size={16} />);
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        };

        // 5. Blur on Window Focus Loss
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setIsBlur(true);
                // document.title = "⚠️ SECURITY VIOLATION";
            } else {
                setIsBlur(false);
                // document.title = "Adarsh Anand";
            }
        };

        const handleWindowBlur = () => setIsBlur(true);
        const handleWindowFocus = () => setIsBlur(false);

        // 6. Print Handling
        const handleBeforePrint = (e: Event) => {
            addNotification("Printing is disabled on this page.", <EyeOff size={16} />);
            e.preventDefault();
            // Forcefully hide everything stylistically just in case
            const style = document.createElement('style');
            style.id = 'print-blocker';
            style.innerHTML = '@media print { body { display: none !important; } }';
            document.head.appendChild(style);
        };

        // Inject CSS for user-select: none
        const style = document.createElement("style");
        style.id = "dlp-style";
        style.innerHTML = `
      body {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
      }
      /* Hide scrollbar for Chrome, Safari and Opera */
      ::-webkit-scrollbar {
        display: none;
      }
      input, textarea, [contenteditable] {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }
      /* Hide scrollbars during blur to prevent peeking */
      ${isBlur ? 'body { overflow: hidden !important; }' : ''}

      /* Image/Media Protection - Disable interaction BUT allow events to bubble for JS trapping */
      img, video, canvas {
        -webkit-user-drag: none !important;
        user-drag: none !important;
      }
    `;
        document.head.appendChild(style);

        // Listeners
        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("copy", handleCopyCutPaste);
        document.addEventListener("cut", handleCopyCutPaste);
        document.addEventListener("paste", handleCopyCutPaste);
        document.addEventListener("dragstart", handleDragStart);
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("blur", handleWindowBlur);
        window.addEventListener("focus", handleWindowFocus);
        window.addEventListener("beforeprint", handleBeforePrint);

        // DevTools Detection (Simple Interval)
        const devToolsCheck = setInterval(() => {
            // Basic check for window resize diff which often indicates devtools docked
            const threshold = 160;
            const widthDiff = window.outerWidth - window.innerWidth > threshold;
            const heightDiff = window.outerHeight - window.innerHeight > threshold;

            if ((widthDiff || heightDiff) && !isBlur) {
                // Can't be 100% sure, but we can warn
                // addNotification("Debugger environment detected.", <Terminal size={16} />);
            }
        }, 2000);

        return () => {
            // Cleanup
            const existingStyle = document.getElementById("dlp-style");
            const printBlock = document.getElementById("print-blocker");
            if (existingStyle) existingStyle.remove();
            if (printBlock) printBlock.remove();

            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("copy", handleCopyCutPaste);
            document.removeEventListener("cut", handleCopyCutPaste);
            document.removeEventListener("paste", handleCopyCutPaste);
            document.removeEventListener("dragstart", handleDragStart);
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("blur", handleWindowBlur);
            window.removeEventListener("focus", handleWindowFocus);
            window.removeEventListener("beforeprint", handleBeforePrint);
            clearInterval(devToolsCheck);
        };
    }, [addNotification, isBlur]);

    return (
        <>
            {/* Honeytoken for bots */}
            <a href="/admin-trap-honeytoken" aria-hidden="true" style={{ display: 'none', visibility: 'hidden' }} rel="nofollow">
                Admin Access Key
            </a>

            <DLPNotification notifications={notifications} />

            {isBlur && (
                <div
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl text-center p-8 transition-all duration-300"
                >
                    <div className="bg-red-500/10 p-6 rounded-full border border-red-500/20 mb-6 animate-pulse">
                        <EyeOff size={64} className="text-red-500" />
                    </div>
                    <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-4 tracking-tight">
                        SESSION SUSPENDED
                    </h1>
                    <p className="text-gray-400 max-w-md text-lg">
                        {violationCount > 5
                            ? "Suspicious activity detected. Access temporarily limited."
                            : "This window has been secured. Content is hidden while the application is in the background."
                        }
                    </p>

                    <div className="mt-12 flex gap-4 text-xs font-mono text-gray-600">
                        <span>ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                        <span>•</span>
                        <span>SECURE_CONNECTION</span>
                        <span>•</span>
                        <span className="text-green-500 font-bold">ENCRYPTED</span>
                    </div>
                </div>
            )}
        </>
    );
}
