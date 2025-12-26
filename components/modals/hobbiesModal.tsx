"use client";

import { useEffect, useRef } from "react";
import {
    X,
    Dumbbell,
    Tv,
    Book,
    Trophy,
    Bike,
    Mountain,
    Dices,
    Plane,
    Coffee,
    Users,
    Mic,
    ExternalLink,
} from "lucide-react";
import { useStore } from "@/lib/store/useStore";
import { hobbyData } from "@/data";
import Link from "next/link";

const iconMap: Record<string, React.ElementType> = {
    Dumbbell,
    Tv,
    Book,
    Trophy,
    Bike,
    Mountain,
    Dices,
    Plane,
    Coffee,
    Users,
    Mic,
};

export const HobbiesModal = () => {
    const { showHobbiesModal, toggleHobbiesModal } = useStore();
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && showHobbiesModal) {
                toggleHobbiesModal();
            }
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [showHobbiesModal, toggleHobbiesModal]);

    if (!showHobbiesModal) return null;

    const getIcon = (iconName: string) => {
        const IconComponent = iconMap[iconName] as any;
        if (IconComponent) {
            return <IconComponent className="w-6 h-6 text-green-600 dark:text-green-400" />;
        }
        return <span className="text-2xl">🎮</span>;
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={toggleHobbiesModal}
        >
            <div
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl glass rounded-2xl shadow-2xl border border-white/10 p-6 max-h-[80vh] overflow-y-auto"
            >
                <div className="flex items-center justify-between mb-6 sticky top-0 glass backdrop-blur-xl py-2 z-10 border-b border-white/10">
                    <h2 className="text-2xl font-bold font-mono flex items-center gap-2">
                        <span className="text-green-600">~/</span> Hobbies
                    </h2>
                    <button
                        onClick={() => {
                            toggleHobbiesModal();
                        }}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {hobbyData.map((hobby: any, index) => {
                        const isExternal = hobby.link?.startsWith("http");
                        const Component = isExternal ? "a" : Link;
                        const linkProps = isExternal
                            ? { href: hobby.link, target: "_blank", rel: "noopener noreferrer" }
                            : { href: hobby.link };

                        return (
                            <Component
                                key={index}
                                {...linkProps}
                                className="group flex items-start gap-4 p-4 rounded-xl glass hover:bg-green-500/10 transition-all duration-300 border border-transparent hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10 cursor-pointer"
                            >
                                <div className="shrink-0 p-2 bg-white/5 dark:bg-white/10 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                                    {getIcon(hobby.icon)}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1 flex items-center gap-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                        {hobby.name}
                                        {isExternal && (
                                            <ExternalLink
                                                size={14}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                            />
                                        )}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-balance">
                                        {hobby.description}
                                    </p>
                                </div>
                            </Component>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
