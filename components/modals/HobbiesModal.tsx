"use client";

import { useStore } from "@/lib/store/useStore";
import { hobbyData } from "@/data";
import { X, Dumbbell, Tv, Book, Trophy, Bike, Mountain, Dices, Plane, Coffee, Users, Mic } from "lucide-react";
import { useEffect, useRef } from "react";

const iconMap: Record<string, React.ElementType> = {
    Dumbbell, Tv, Book, Trophy, Bike, Mountain, Dices, Plane, Coffee, Users, Mic
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
        const IconComponent = iconMap[iconName];
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
                className="w-full max-w-2xl bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-800/50 p-6 max-h-[80vh] overflow-y-auto"
            >
                <div className="flex items-center justify-between mb-6 sticky top-0 bg-white/90 dark:bg-black/90 backdrop-blur-xl py-2 z-10 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-2xl font-bold font-mono flex items-center gap-2">
                        <span className="text-green-600">~/</span> Hobbies
                    </h2>
                    <button
                        onClick={() => {
                            toggleHobbiesModal();
                        }}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {hobbyData.map((hobby, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-green-50 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-green-500/20"
                        >
                            <div className="shrink-0 p-2 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                                {getIcon(hobby.icon)}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                                    {hobby.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-balance">
                                    {hobby.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
