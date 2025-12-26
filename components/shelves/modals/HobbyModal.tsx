/**
 * @fileoverview Hobby Modal Component - compact modal for displaying hobby details.
 * Provides a centered modal with icon, name, description, and optional external link.
 */

"use client";

import {
    X,
    ExternalLink,
    Dumbbell,
    Tv,
    Trophy,
    Bike,
    Mountain,
    Dices,
    Plane,
    Coffee,
    Users,
    Mic,
} from "lucide-react";
import { motion } from "framer-motion";

/**
 * Icon mapping for hobby categories.
 * Maps icon names to their corresponding Lucide React components.
 * @constant
 */
const iconMap: Record<string, React.ElementType> = {
    Dumbbell,
    Tv,
    Book: Tv,
    Trophy,
    Bike,
    Mountain,
    Dices,
    Plane,
    Coffee,
    Users,
    Mic,
};

/**
 * Retrieves the appropriate icon component for a hobby.
 * Returns a fallback emoji if the icon name is not found in the map.
 *
 * @param {string} iconName - Name of the icon to retrieve
 * @returns {JSX.Element} Icon component or fallback emoji
 */
const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName];
    if (!IconComponent) return <span className="text-4xl mb-4">🎮</span>;
    return <IconComponent className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />;
};

/**
 * Props for HobbyModal component.
 * @interface HobbyModalProps
 * @property {any} item - Hobby data object containing name, icon, description, and optional link
 * @property {Function} onClose - Callback function to close the modal
 */
interface HobbyModalProps {
    item: any;
    onClose: () => void;
}

/**
 * Hobby Modal Component - compact centered modal for hobby details.
 * Features animated backdrop, icon display, centered content layout,
 * and optional external link button.
 *
 * @component
 * @param {HobbyModalProps} props - Component props
 * @returns {JSX.Element} Rendered modal with hobby details
 *
 * @example
 * ```tsx
 * <HobbyModal
 *   item={{
 *     name: "Photography",
 *     icon: "Camera",
 *     description: "Capturing moments through the lens",
 *     link: "https://instagram.com/..."
 *   }}
 *   onClose={() => setShowModal(false)}
 * />
 * ```
 */
export function HobbyModal({ item, onClose }: HobbyModalProps) {
    return (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-md"
                onClick={onClose}
            />
            <motion.div
                layoutId={`hobby-${item.name}`}
                className="bg-white dark:bg-zinc-900 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-gray-200 dark:border-white/10"
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors z-20"
                >
                    <X size={20} />
                </button>
                <div className="p-10 flex flex-col items-center text-center">
                    {getIcon(item.icon)}
                    <h2 className="text-3xl font-bold mb-3">{item.name}</h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-6">
                        {item.description}
                    </p>
                    {item.link && (
                        <a
                            href={item.link}
                            target={item.link?.startsWith("http") ? "_blank" : undefined}
                            rel={item.link?.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            <ExternalLink size={16} /> Explore More
                        </a>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
