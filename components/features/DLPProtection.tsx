"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { Copy, EyeOff, Camera, ShieldAlert, Terminal } from "lucide-react";
import { useStore } from "@/lib/store";

type NotificationType = {
  id: string;
  message: string;
  type: "warning" | "error" | "info";
  icon: React.ReactNode;
};

const DLPNotification = ({
  notifications,
}: {
  notifications: NotificationType[];
}) => {
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

export function DLPProtection() {
  const [isBlur, setIsBlur] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [violationCount, setViolationCount] = useState(0);
  const violationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isMainWebsite =
    typeof window !== "undefined" &&
    window.location.hostname === "adarshanand67.github.io";
  const shouldDisableDLP = !isMainWebsite;

  const { isPlaying, setIsPlaying } = useStore();
  const wasPlayingRef = useRef(false);

  const addNotification = useCallback(
    (message: string, icon: React.ReactNode) => {
      const id = Math.random().toString(36).substring(7);
      const newNotif: NotificationType = { id, message, type: "warning", icon };
      setNotifications((prev) => [...prev, newNotif]);
      setViolationCount((prev) => prev + 1);
      if (violationTimeoutRef.current)
        clearTimeout(violationTimeoutRef.current);
      violationTimeoutRef.current = setTimeout(
        () => setViolationCount(0),
        10000,
      );
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 3000);
    },
    [],
  );

  useEffect(() => {
    if (shouldDisableDLP) return;
    if (isBlur) {
      if (isPlaying) {
        wasPlayingRef.current = true;
        setIsPlaying(false);
      }
    } else if (wasPlayingRef.current) {
      setIsPlaying(true);
      wasPlayingRef.current = false;
    }
  }, [isBlur, isPlaying, setIsPlaying, shouldDisableDLP]);

  useEffect(() => {
    if (shouldDisableDLP) return;
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      addNotification(
        "Right-click context menu is disabled for security compliance.",
        <ShieldAlert size={16} />,
      );
      e.stopPropagation();
      return false;
    };
    const handleCopyCutPaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      )
        return;
      addNotification("Copy/Paste actions are blocked.", <Copy size={16} />);
      e.preventDefault();
      if (e.clipboardData)
        e.clipboardData.setData(
          "text/plain",
          "Security Violation: Content copying is prohibited.",
        );
      return false;
    };
    const handleDragStart = (e: DragEvent) => {
      if (e.dataTransfer) {
        e.dataTransfer.clearData();
        e.dataTransfer.setData("text/plain", "Protected Content");
        e.dataTransfer.effectAllowed = "none";
      }
    };
    const handleDragEnd = (e: DragEvent) => {
      e.preventDefault();
      addNotification(
        "Dragging content is prohibited.",
        <ShieldAlert size={16} />,
      );
    };
    const handleMouseUp = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      )
        return;
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        selection.removeAllRanges();
        addNotification(
          "Text selection is restricted.",
          <ShieldAlert size={16} />,
        );
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen") {
        setIsBlur(true);
        setTimeout(() => setIsBlur(false), 2000);
        if (typeof navigator !== "undefined" && navigator.clipboard)
          navigator.clipboard.writeText("").catch(() => {});
        addNotification(
          "Screen capture attempt detected and blocked.",
          <Camera size={16} />,
        );
        return;
      }
      const target = e.target as HTMLElement;
      const isEditable =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if ((e.ctrlKey || e.metaKey) && !isEditable) {
        if (e.key === "a") {
          addNotification("Select All is disabled.", <ShieldAlert size={16} />);
          e.preventDefault();
          return false;
        }
        if (e.key === "s") {
          addNotification(
            "Saving content is disabled.",
            <ShieldAlert size={16} />,
          );
          e.preventDefault();
          return false;
        }
        if (e.key === "p") {
          addNotification("Printing is disabled.", <EyeOff size={16} />);
          e.preventDefault();
          return false;
        }
        if (e.key === "u") {
          addNotification(
            "Viewing source is disabled.",
            <Terminal size={16} />,
          );
          e.preventDefault();
          return false;
        }
      }
      if (
        ((e.ctrlKey || e.metaKey) &&
          e.shiftKey &&
          ["i", "j", "c"].includes(e.key.toLowerCase())) ||
        e.key === "F12"
      ) {
        addNotification("Inspector tools are blocked.", <Terminal size={16} />);
        e.preventDefault();
        return false;
      }
    };
    const handleWindowFocus = () => setIsBlur(false);
    const handleBeforePrint = (e: Event) => {
      addNotification("Printing is disabled.", <EyeOff size={16} />);
      e.preventDefault();
      if (!document.getElementById("print-blocker")) {
        const s = document.createElement("style");
        s.id = "print-blocker";
        s.innerHTML = "@media print { body { display: none !important; } }";
        document.head.appendChild(s);
      }
    };
    const style = document.createElement("style");
    style.id = "dlp-style";
    style.innerHTML = `body { -webkit-touch-callout: none; scrollbar-width: none; } ::-webkit-scrollbar { display: none; } ${isBlur ? "body { overflow: hidden !important; }" : ""}`;
    document.head.appendChild(style);

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopyCutPaste);
    document.addEventListener("cut", handleCopyCutPaste);
    document.addEventListener("paste", handleCopyCutPaste);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("dragend", handleDragEnd);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("focus", handleWindowFocus);
    window.addEventListener("beforeprint", handleBeforePrint);

    return () => {
      const s = document.getElementById("dlp-style");
      if (s) s.remove();
      const pb = document.getElementById("print-blocker");
      if (pb) pb.remove();
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopyCutPaste);
      document.removeEventListener("cut", handleCopyCutPaste);
      document.removeEventListener("paste", handleCopyCutPaste);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("dragend", handleDragEnd);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("focus", handleWindowFocus);
      window.removeEventListener("beforeprint", handleBeforePrint);
    };
  }, [addNotification, isBlur, shouldDisableDLP]);

  if (shouldDisableDLP) return null;

  return (
    <>
      <Link
        href="/admin-trap-honeytoken"
        aria-hidden="true"
        style={{ display: "none", visibility: "hidden" }}
        rel="nofollow"
      >
        Admin Access Key
      </Link>
      <DLPNotification notifications={notifications} />
      {isBlur && (
        <div className="fixed inset-0 z-[99999] bg-black pointer-events-none" />
      )}
    </>
  );
}
