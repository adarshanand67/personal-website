import React from "react";

interface SkeletonProps {
    className?: string;
    variant?: "text" | "rect" | "circle";
    animation?: "pulse" | "wave" | "none";
    width?: string | number;
    height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    className = "",
    variant = "rect",
    animation = "pulse",
    width,
    height,
}) => {
    const baseClasses = "bg-gray-200 dark:bg-gray-800 pointer-events-none";
    const variantClasses = {
        text: "rounded h-4 w-full mb-2",
        rect: "rounded-lg",
        circle: "rounded-full",
    };

    const animationClasses = {
        pulse: "animate-pulse",
        wave: "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 dark:before:via-white/10 before:to-transparent",
        none: "",
    };

    const style: React.CSSProperties = {
        width: width,
        height: height,
    };

    return (
        <div
            className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${animationClasses[animation]} 
        ${className}
      `}
            style={style}
        />
    );
};

export const CardSkeleton = () => (
    <div className="glass p-4 rounded-xl border border-gray-200 dark:border-gray-800 w-full">
        <Skeleton variant="rect" height={160} className="mb-4" />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
    </div>
);

export const SectionSkeleton = () => (
    <div className="space-y-4 w-full">
        <Skeleton variant="text" width="30%" height={32} className="mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CardSkeleton />
            <CardSkeleton />
        </div>
    </div>
);
