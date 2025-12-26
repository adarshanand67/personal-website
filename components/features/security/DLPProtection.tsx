"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
    Copy,
    AlertTriangle,
    EyeOff,
    Camera,
    ShieldAlert,
    Terminal,
    RefreshCw,
} from "lucide-react";
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
                    className="bg-black/80 backdrop-blur-md border border-red-500/50 text-red-100 px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 max-w-sm"
                >
                    <div className="p-2 bg-red-500/20 rounded-full shrink-0">{notif.icon}</div>
                    <div>
                        <h4 className="font-bold text-sm text-red-400 uppercase tracking-wider">
                            Security Alert
                        </h4>
                        <p className="text-xs text-gray-300 leading-tight mt-0.5">
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
 * @component
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
        if (violationCount > 5) {
            // addNotification("Warning: Excessive suspicious activity detected.", <AlertTriangle size={16} />); // Removed per user request
            const timer = setTimeout(() => {
                setViolationCount(0);
            }, 5000); // Reset count after 5s
            return () => clearTimeout(timer);
        }
    }, [violationCount, addNotification]);

    useEffect(() => {
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

        // 2. Disable Copy/Cut/Paste
        const handleCopyCutPaste = (e: ClipboardEvent) => {
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

        // 3.5 Handle Selection on Mouse Up
        const handleMouseUp = () => {
            const selection = window.getSelection();
            if (selection && selection.toString().length > 0) {
                // selection.removeAllRanges(); // Optional: Clear it immediately?
                // User said "show them blocked action". Clearing it reinforces "blocked".
                selection.removeAllRanges();
                addNotification("Text selection is restricted.", <ShieldAlert size={16} />);
            }
        };

        // 4. Keydown Restrictions
        const handleKeyDown = (e: KeyboardEvent) => {
            // Print Screen
            if (e.key === "PrintScreen") {
                setIsBlur(true);
                setTimeout(() => setIsBlur(false), 2000);
                navigator.clipboard.writeText(""); // Clear clipboard
                addNotification(
                    "Screen capture attempt detected and blocked.",
                    <Camera size={16} />
                );
                return;
            }

            // Block generic shortcuts with specific messages
            if (e.ctrlKey || e.metaKey) {
                if (e.key === "a") {
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
                (e.key === "i" ||
                    e.key === "j" ||
                    e.key === "c" ||
                    e.key === "4" ||
                    e.key === "3" ||
                    e.key === "5" ||
                    e.key === "2" ||
                    e.code === "Digit3" ||
                    e.code === "Digit4" ||
                    e.code === "Digit5" ||
                    e.code === "Digit2")
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
            const style = document.createElement("style");
            style.id = "print-blocker";
            style.innerHTML = "@media print { body { display: none !important; } }";
            document.head.appendChild(style);
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
        const devToolsCheck = setInterval(() => {
            // 1. Console Clearing & Warning
            // console.clear(); // Aggressive clearing
            const warningStyle =
                "font-size: 24px; color: red; font-weight: bold; text-shadow: 2px 2px 0px black;";
            console.log("%cSTOP! This is a protected area.", warningStyle);
            console.log(
                "%cSecurity protocols are active. Actions are monitored.",
                "font-size: 14px; color: gray;"
            );

            // 2. Debugger Trap (The "Halt" Mechanism)
            // This forces the browser to pause if DevTools is open and breakpoints are active.
            // It makes inspection extremely annoying/impossible.
            try {
                (function antiDebug() {
                    // Force a breakpoint
                    // debugger; // Uncomment to active the hard trap
                })();
            } catch (e) {}

            // 3. Heuristic Check (Resize)
            const threshold = 160;
            const widthDiff = window.outerWidth - window.innerWidth > threshold;
            const heightDiff = window.outerHeight - window.innerHeight > threshold;

            if ((widthDiff || heightDiff) && !isBlur) {
                // If detected, we can trigger the trap harder or just warn
                addNotification(
                    "Debugger environment detected. Monitoring active.",
                    <Terminal size={16} />
                );
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
