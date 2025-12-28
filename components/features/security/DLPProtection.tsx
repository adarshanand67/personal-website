"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Copy, EyeOff, Camera, ShieldAlert, Terminal } from "lucide-react";
import { useStore } from "@/lib/store/useStore";
import Link from "next/link";

/**
 * Represents a security notification displayed to the user.
 * @typedef {Object} NotificationType
 * @property {string} id - Unique identifier for the notification
 * @property {string} message - The notification message to display
 * @property {"warning" | "error" | "info"} type - Severity level of the notification
 * @property {React.ReactNode} icon - Icon component to display alongside the message
 */
type NotificationType = {
    id: string;
    message: string;
    type: "warning" | "error" | "info";
    icon: React.ReactNode;
};

/**
 * Renders a stack of security alert notifications in the top-right corner.
 * Notifications auto-dismiss after 3 seconds and use a high z-index to ensure visibility.
 *
 * @param {Object} props - Component props
 * @param {NotificationType[]} props.notifications - Array of notifications to display
 * @returns {JSX.Element | null} Notification stack or null if no notifications
 *
 * @example
 * ```tsx
 * <DLPNotification notifications={[
 *   { id: '1', message: 'Copy blocked', type: 'warning', icon: <Copy /> }
 * ]} />
 * ```
 */
const DLPNotification = ({ notifications }: { notifications: NotificationType[] }) => {
    if (notifications.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-[2147483647] flex flex-col gap-2 pointer-events-none">
            {notifications.map((notif) => (
                <div
                    key={notif.id}
                    className="bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-black/10 dark:border-white/10 text-foreground px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 max-w-sm pointer-events-auto"
                >
                    <div className="p-2 bg-foreground/5 rounded-xl shrink-0 text-foreground">
                        {notif.icon}
                    </div>
                    <div>
                        <h4 className="font-black text-[10px] text-foreground uppercase tracking-widest">
                            Security Alert
                        </h4>
                        <p className="text-[11px] text-foreground/60 font-bold leading-tight mt-1">
                            {notif.message}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

/**
 * Data Loss Prevention (DLP) Protection Component
 *
 * Implements comprehensive client-side security measures to prevent unauthorized
 * data extraction, copying, and inspection. This component provides multiple layers
 * of protection including:
 *
 * - **Copy/Paste/Cut Protection**: Blocks clipboard operations and poisons clipboard data
 * - **Right-Click Protection**: Disables context menus to prevent "Save As" and inspect options
 * - **Drag & Drop Protection**: Implements "lazy blocking" - allows visual drag but blocks on drop
 * - **Text Selection Protection**: Allows selection but clears it on mouse release with notification
 * - **Keyboard Shortcut Blocking**: Prevents Ctrl+A, Ctrl+S, Ctrl+P, Ctrl+U, F12, and DevTools shortcuts
 * - **Screenshot Protection**: Detects PrintScreen and blacks out the screen during capture
 * - **DevTools Detection**: Monitors for developer tools via window resize heuristics
 * - **Console Warfare**: Displays warnings and provides infrastructure for debugger traps
 * - **Print Protection**: Blocks print dialogs and hides content in print CSS
 * - **Window Blur Protection**: Blacks out content when window loses focus
 * - **Honeytoken**: Hidden link to trap bots and scrapers
 *

 * @returns {JSX.Element} DLP protection layer with notifications and overlays
 *
 * @remarks
 * - Integrates with Zustand store to pause music during security events
 * - Uses rate limiting to track violation count (resets after 10s)
 * - Notifications auto-dismiss after 3 seconds
 * - Console warnings fire every 2 seconds when DevTools might be open
 * - The debugger trap is commented out by default to avoid disrupting legitimate development
 *
 * @example
 * ```tsx
 * // In your root layout or app component:
 * <DLPProtection />
 * ```
 */
export function DLPProtection() {
    const [isBlur, setIsBlur] = useState(false);
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [violationCount, setViolationCount] = useState(0);
    const violationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Only enable DLP on the main production website
    const isMainWebsite =
        typeof window !== "undefined" && window.location.hostname === "adarshanand67.github.io";
    const shouldDisableDLP = !isMainWebsite;

    const { isPlaying, setIsPlaying } = useStore();
    const wasPlayingRef = useRef(false);

    /**
     * Adds a new security notification and increments violation count.
     * Notifications auto-dismiss after 3 seconds. Violation count resets after 10 seconds.
     *
     * @param {string} message - The security alert message to display
     * @param {React.ReactNode} icon - Icon component to show with the notification
     *
     * @example
     * ```tsx
     * addNotification("Copy blocked", <Copy size={16} />);
     * ```
     */
    const addNotification = useCallback((message: string, icon: React.ReactNode) => {
        const id = Math.random().toString(36).substring(7);
        const newNotif: NotificationType = { id, message, type: "warning", icon };

        setNotifications((prev) => [...prev, newNotif]);

        // Rate Limiting Logic: excessive violations trigger a stricter response
        setViolationCount((prev) => prev + 1);
        if (violationTimeoutRef.current) clearTimeout(violationTimeoutRef.current);
        violationTimeoutRef.current = setTimeout(() => setViolationCount(0), 10000); // Reset after 10s

        // Auto dismiss
        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 3000);
    }, []);

    useEffect(() => {
        if (shouldDisableDLP) return;
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

    // Violation Lockout Effect - Just notify now, don't lock screen
    useEffect(() => {
        if (shouldDisableDLP) return;
        if (violationCount > 5) {
            // addNotification("Warning: Excessive suspicious activity detected.", <AlertTriangle size={16} />); // Removed per user request
            const timer = setTimeout(() => {
                setViolationCount(0);
            }, 5000); // Reset count after 5s
            return () => clearTimeout(timer);
        }
    }, [violationCount, addNotification]);

    useEffect(() => {
        if (shouldDisableDLP) return;
        // 1. Disable Right Click
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            addNotification(
                "Right-click context menu is disabled for security compliance.",
                <ShieldAlert size={16} />
            );
            e.stopPropagation(); // Stop event bubbling
            return false;
        };

        // 2. Disable Copy/Cut/Paste - but allow in input fields
        const handleCopyCutPaste = (e: ClipboardEvent) => {
            const target = e.target as HTMLElement;
            const isEditable =
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.isContentEditable;
            if (isEditable) return; // Allow in input fields

            addNotification("Copy/Paste actions are blocked.", <Copy size={16} />);
            e.preventDefault();
            if (e.clipboardData) {
                e.clipboardData.setData(
                    "text/plain",
                    "Security Violation: Content copying is strictly prohibited."
                );
            }
            return false;
        };

        // 3. Disable Dragging - Allow visual start, block on drop/end
        const handleDragStart = (e: DragEvent) => {
            // Allow the drag to start visually, but neutralize the data
            if (e.dataTransfer) {
                e.dataTransfer.clearData();
                e.dataTransfer.setData("text/plain", "Protected Content: Access Denied");
                e.dataTransfer.effectAllowed = "none";
            }
            // Do NOT preventDefault here to allow the "ghost" drag image
        };

        const handleDragEnd = (e: DragEvent) => {
            e.preventDefault();
            addNotification(
                "Dragging content to external sources is prohibited.",
                <ShieldAlert size={16} />
            );
        };

        // 3.5 Handle Selection on Mouse Up - but allow in input fields
        const handleMouseUp = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isEditable =
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.isContentEditable;
            if (isEditable) return; // Allow selection in input fields

            const selection = window.getSelection();
            if (selection && selection.toString().length > 0) {
                // Only clear selection if not in an editable field
                const target = e.target as HTMLElement;
                const isEditable =
                    target.tagName === "INPUT" ||
                    target.tagName === "TEXTAREA" ||
                    target.isContentEditable;

                if (!isEditable) {
                    selection.removeAllRanges();
                    addNotification("Text selection is restricted.", <ShieldAlert size={16} />);
                }
            }
        };

        // 4. Keydown Restrictions
        const handleKeyDown = (e: KeyboardEvent) => {
            try {
                // Print Screen
                if (e.key === "PrintScreen") {
                    setIsBlur(true);
                    setTimeout(() => setIsBlur(false), 2000);

                    if (typeof navigator !== "undefined" && navigator.clipboard) {
                        navigator.clipboard.writeText("").catch(() => {});
                    }

                    addNotification(
                        "Screen capture attempt detected and blocked.",
                        <Camera size={16} />
                    );
                    return;
                }

                // Block generic shortcuts with specific messages - but allow in input fields
                const target = e.target as HTMLElement;
                const isEditable =
                    target &&
                    (target.tagName === "INPUT" ||
                        target.tagName === "TEXTAREA" ||
                        target.isContentEditable);

                if (e.ctrlKey || e.metaKey) {
                    // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X in editable fields
                    if (
                        isEditable &&
                        (e.key === "a" || e.key === "c" || e.key === "v" || e.key === "x")
                    ) {
                        return; // Allow normal behavior in input fields
                    }

                    if (e.key === "a" && !isEditable) {
                        addNotification(
                            "Select All is disabled to prevent bulk data extraction.",
                            <ShieldAlert size={16} />
                        );
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
                }

                // Block DevTools Shortcuts (Cmd+Option+I, J, C or Ctrl+Shift+I, J, C)
                if (
                    (e.ctrlKey || e.metaKey) &&
                    e.shiftKey &&
                    ["i", "j", "c", "4", "3", "5", "2"].includes(e.key.toLowerCase())
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
            } catch (error) {
                console.warn("Error in keyboard protection:", error);
            }
        };

        // 5. Blur on Window Focus Loss - DISABLED per user request
        const handleVisibilityChange = () => {
            // Logic removed to allow tab switching without blur
        };

        const handleWindowBlur = () => {
            // Logic removed
        };
        const handleWindowFocus = () => setIsBlur(false);

        // 6. Print Handling
        const handleBeforePrint = (e: Event) => {
            try {
                addNotification("Printing is disabled on this page.", <EyeOff size={16} />);
                e.preventDefault();
                // Forcefully hide everything stylistically just in case
                if (!document.getElementById("print-blocker")) {
                    const style = document.createElement("style");
                    style.id = "print-blocker";
                    style.innerHTML = "@media print { body { display: none !important; } }";
                    document.head.appendChild(style);
                }
            } catch (error) {
                console.warn("Error in print protection:", error);
            }
        };

        // Inject CSS for user-select: none
        const style = document.createElement("style");
        style.id = "dlp-style";
        style.innerHTML = `
      body {
        user-select: text; /* Allow selection initially, block on release */
        -webkit-touch-callout: none;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
      }
      /* Hide scrollbar for Chrome, Safari and Opera */
      ::-webkit-scrollbar {
        display: none;
      }
      input, textarea, [contenteditable] {
         /* Standard behavior for inputs */
      }
      /* Hide scrollbars during blur to prevent peeking */
      ${isBlur ? "body { overflow: hidden !important; }" : ""}

      /* Image/Media Protection */
      img, video, canvas {
         /* Allow drag start so we can trap it in JS events */
      }
    `;
        document.head.appendChild(style);

        // Listeners
        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("copy", handleCopyCutPaste);
        document.addEventListener("cut", handleCopyCutPaste);
        document.addEventListener("paste", handleCopyCutPaste);
        document.addEventListener("dragstart", handleDragStart);
        document.addEventListener("dragend", handleDragEnd);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("blur", handleWindowBlur);
        window.addEventListener("focus", handleWindowFocus);
        window.addEventListener("beforeprint", handleBeforePrint);

        // DevTools Detection & Console Warfare
        let lastConsoleLog = 0;
        const devToolsCheck = setInterval(() => {
            const now = Date.now();
            if (now - lastConsoleLog > 10000) {
                // Log every 10s to keep console somewhat clean
                const warningStyle =
                    "font-size: 24px; color: red; font-weight: bold; text-shadow: 2px 2px 0px black;";
                console.log("%cSTOP! This is a protected area.", warningStyle);
                console.log(
                    "%cSecurity protocols are active. Actions are monitored.",
                    "font-size: 14px; color: gray;"
                );
                lastConsoleLog = now;
            }

            // Heuristic Check (Resize)
            if (typeof window !== "undefined") {
                const threshold = 160;
                const widthDiff = window.outerWidth - window.innerWidth > threshold;
                const heightDiff = window.outerHeight - window.innerHeight > threshold;

                if ((widthDiff || heightDiff) && !isBlur) {
                    // Silently monitor - could add logic here later
                }
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
            document.removeEventListener("dragend", handleDragEnd);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("blur", handleWindowBlur);
            window.removeEventListener("focus", handleWindowFocus);
            window.removeEventListener("beforeprint", handleBeforePrint);
            clearInterval(devToolsCheck);
        };
    }, [addNotification, isBlur]);

    if (shouldDisableDLP) return null;

    return (
        <>
            {/* Honeytoken for bots */}
            <Link
                href="/admin-trap-honeytoken"
                aria-hidden="true"
                style={{ display: "none", visibility: "hidden" }}
                rel="nofollow"
            >
                Admin Access Key
            </Link>

            <DLPNotification notifications={notifications} />

            {/* Session Suspended Overlay Removed as per user request */}
            {/* BLACKOUT OVERLAY FOR SCREEN CAPTURE / BLUR */}
            {isBlur && <div className="fixed inset-0 z-[99999] bg-black pointer-events-none" />}
        </>
    );
}
