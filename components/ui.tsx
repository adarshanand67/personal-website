"use client";

import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronRight, Home, Shuffle } from "lucide-react";
import { motion, useSpring, useScroll, useTransform } from "framer-motion";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";

// ============================================================================
// Breadcrumbs Component
// ============================================================================

interface BreadcrumbsProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-6 bg-gray-50/50 dark:bg-white/5 py-2 px-4 rounded-full w-fit">
      <Link
        href="/"
        className="hover:text-foreground transition-colors flex items-center gap-1"
      >
        <Home size={12} className="text-black dark:text-gray-400" />
        <span>~</span>
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight
            size={12}
            className="text-black/30 dark:text-gray-600"
          />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 dark:text-gray-200 font-bold">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}

// ============================================================================
// PillTag Component
// ============================================================================

interface PillTagProps {
  label: string;
  selected?: boolean;
  dimmed?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  variant?: "default" | "filter";
}

export function PillTag({
  label,
  selected = false,
  dimmed = false,
  onClick,
}: PillTagProps) {
  const displayLabel = label || "Tag";
  const baseClasses =
    "px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap";

  const variantClasses = selected
    ? "bg-gray-200 dark:bg-gray-700 text-black dark:text-white shadow-md scale-105 opacity-100 font-bold"
    : `${
        dimmed
          ? "bg-gray-100/60 dark:bg-gray-800/60 text-black/40 dark:text-white/40 opacity-70"
          : "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
      } hover:bg-gray-200 dark:hover:bg-gray-700 hover:opacity-100 hover:scale-102`;

  const classes = `${baseClasses} ${variantClasses}`;

  if (onClick) {
    return (
      <button onClick={onClick} className={classes}>
        {displayLabel}
      </button>
    );
  }

  return <span className={classes}>{displayLabel}</span>;
}

// ============================================================================
// ScrollProgress Component
// ============================================================================

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 dark:from-zinc-700 dark:via-zinc-600 dark:to-zinc-800 z-[10001] origin-left"
      style={{ scaleX }}
    />
  );
}

// ============================================================================
// Skeleton Components
// ============================================================================

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

  const style: React.CSSProperties = { width, height };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
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

// ============================================================================
// TiltWrapper Component
// ============================================================================

interface TiltWrapperProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export const TiltWrapper: React.FC<TiltWrapperProps> = ({
  children,
  className = "",
  intensity = 15,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useSpring(0, { stiffness: 400, damping: 30 });
  const y = useSpring(0, { stiffness: 400, damping: 30 });

  const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

      x.set(relativeX);
      y.set(relativeY);
    },
    [x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  );
};

// ============================================================================
// RandomizerButton Component
// ============================================================================

interface RandomizerButtonProps {
  items: unknown[];
  onPick: (item: unknown) => void;
}

export function RandomizerButton({ items, onPick }: RandomizerButtonProps) {
  const { isRandomizing, setIsRandomizing } = useStore();
  const [displayIndex, setDisplayIndex] = useState<number | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const handleRandomize = () => {
    if (items.length === 0 || isRandomizing) return;

    setIsRandomizing(true);
    setDisplayIndex(null);
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    const totalDuration = 800;
    let interval = 30;
    let elapsed = 0;

    const spin = () => {
      const randomIndex = Math.floor(Math.random() * items.length);
      setDisplayIndex(randomIndex);

      elapsed += interval;
      interval *= 1.1;

      if (elapsed < totalDuration) {
        const timeout = setTimeout(spin, interval);
        timeoutsRef.current.push(timeout);
      } else {
        const finalIndex = Math.floor(Math.random() * items.length);
        setDisplayIndex(finalIndex);
        setTimeout(() => {
          setIsRandomizing(false);
          onPick(items[finalIndex]);
        }, 200);
      }
    };

    spin();
  };

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <button
      onClick={handleRandomize}
      disabled={isRandomizing || items.length === 0}
      className={`
                relative group flex items-center gap-2 px-4 py-2 
                bg-gray-100 dark:bg-gray-800 
                border border-gray-200 dark:border-gray-700 
                rounded-lg font-mono text-sm font-bold
                hover:border-foreground transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                ${isRandomizing ? "border-foreground text-foreground" : "text-gray-700 dark:text-gray-300"}
            `}
    >
      <Shuffle
        size={16}
        className={`transition-transform duration-500 ${isRandomizing ? "animate-spin" : "group-hover:rotate-12"}`}
      />
      <span>{isRandomizing ? "Picking..." : "Pick for Me"}</span>
      {isRandomizing && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-foreground"></span>
        </span>
      )}
    </button>
  );
}

// ============================================================================
// Slider Component
// ============================================================================

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

// ============================================================================
// Visualizer Hook
// ============================================================================

interface ExtendedHTMLAudioElement extends HTMLAudioElement {
  _sourceNode?: MediaElementAudioSourceNode;
}

interface ExtendedWindow extends Window {
  webkitAudioContext?: typeof AudioContext;
}

function useVisualizer(
  audioRef: React.RefObject<HTMLAudioElement | null>,
  _isPlaying: boolean,
) {
  const contextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const initAudio = () => {
    if (!contextRef.current) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as ExtendedWindow).webkitAudioContext;
      if (!AudioContextClass) return null;
      contextRef.current = new AudioContextClass();
    }

    const ctx = contextRef.current;
    if (ctx.state === "suspended") ctx.resume();

    if (!analyserRef.current) {
      analyserRef.current = ctx.createAnalyser();
      analyserRef.current.fftSize = 64;
    }

    if (!sourceRef.current && audioRef.current) {
      const audio = audioRef.current as ExtendedHTMLAudioElement;
      try {
        if (!audio._sourceNode) {
          sourceRef.current = ctx.createMediaElementSource(audio);
          audio._sourceNode = sourceRef.current;
        } else {
          sourceRef.current = audio._sourceNode;
        }
        if (sourceRef.current) {
          sourceRef.current.connect(analyserRef.current);
          analyserRef.current.connect(ctx.destination);
        }
      } catch (e) {
        console.error("Audio source creation failed:", e);
      }
    }

    return analyserRef.current;
  };

  return { initAudio, analyserRef };
}

// ============================================================================
// Visualizer Component
// ============================================================================

interface VisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
}

export function Visualizer({ audioRef, isPlaying }: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const { initAudio, analyserRef } = useVisualizer(audioRef, isPlaying);

  useEffect(() => {
    if (!audioRef.current || !canvasRef.current) return;

    let dataArray: Uint8Array;

    const render = () => {
      if (!canvasRef.current || !analyserRef.current || !dataArray) return;

      analyserRef.current.getByteFrequencyData(dataArray as any);

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const barWidth = (width / analyserRef.current.frequencyBinCount) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < analyserRef.current.frequencyBinCount; i++) {
        barHeight = (dataArray[i] / 255) * height;
        const gradient = ctx.createLinearGradient(
          0,
          height,
          0,
          height - barHeight,
        );
        gradient.addColorStop(0, "#15803d");
        gradient.addColorStop(1, "#4ade80");

        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.6;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }

      if (isPlaying) {
        rafRef.current = requestAnimationFrame(render);
      }
    };

    if (isPlaying) {
      const analyser = initAudio();
      if (analyser) {
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        render();
      }
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [audioRef, isPlaying, initAudio, analyserRef]);

  return (
    <canvas
      ref={canvasRef}
      width={120}
      height={40}
      className="w-full h-full opacity-50"
    />
  );
}

// ============================================================================
// SpotlightCard Component
// ============================================================================

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}
