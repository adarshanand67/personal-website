"use client";

import { useState } from "react";
import { useStore } from "@/lib/store/useStore";
import { GuestbookHeader } from "./guestbook-ui/GuestbookHeader";
import { GuestbookList } from "./guestbook-ui/GuestbookList";
import { GuestbookForm } from "./guestbook-ui/GuestbookForm";

export function Guestbook() {
    const { guestbookEntries, addGuestbookEntry } = useStore();
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) return;

        setIsSubmitting(true);
        setTimeout(() => {
            addGuestbookEntry({
                name: name.trim(),
                message: message.trim(),
                timestamp: new Date().toISOString(),
            });
            setMessage("");
            setIsSubmitting(false);
        }, 800);
    };

    return (
        <div className="section max-w-4xl mx-auto px-4 py-16 font-mono">
            <div className="border border-green-900/50 bg-black/80 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.1)] backdrop-blur-sm">
                <GuestbookHeader />
                <GuestbookList entries={guestbookEntries} />
                <GuestbookForm
                    name={name}
                    onNameChange={setName}
                    message={message}
                    onMessageChange={setMessage}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    );
}
