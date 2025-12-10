"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { useGlobalState } from "@/components/common/GlobalProvider";
import { useUISound } from "@/hooks/useUISound";

interface GlitchLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function GlitchLink({ href, children, className = "", onClick }: GlitchLinkProps) {
    const { isSoundEnabled } = useGlobalState();
    const { playSound } = useUISound(isSoundEnabled);

    return (
        <Link
            href={href}
            className={`relative group inline-block overflow-hidden ${className}`}
            onClick={(e) => {
                playSound('click');
                if (onClick) onClick();
            }}
            onMouseEnter={() => playSound('hover')}
        >
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-[2px]">
                {children}
            </span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-green-500 opacity-0 group-hover:opacity-50 group-hover:animate-glitch-1 group-hover:translate-x-[2px]"
                aria-hidden="true"
            >
                {children}
            </span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-50 group-hover:animate-glitch-2 group-hover:-translate-x-[2px]"
                aria-hidden="true"
            >
                {children}
            </span>
        </Link>
    );
}
