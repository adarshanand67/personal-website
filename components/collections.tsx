"use client";

import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
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
  Calendar,
  Star,
  Film,
  Play,
  Check,
  BookOpen,
  Quote,
  Command,
  ChevronUp,
  ChevronDown,
  CornerDownLeft,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { CollectionType, WatchStatus, Book } from "@/types/definitions";
import { CollectionConfig } from "@/lib/config";
import {
  CollectionStrategyFactory,
  CollectionItem,
} from "@/components/CollectionStrategies";
import { Breadcrumbs, PillTag, RandomizerButton } from "@/components/ui";
import { getBookGradient, getAssetPath } from "@/lib/utils";

// ============================================================================
// Hooks
// ============================================================================

interface FilterStrategy {
  filter(
    items: CollectionItem[],
    query: string,
    tag: string | null,
  ): CollectionItem[];
}

export function useCollectionFilter(
  items: unknown[],
  configType: CollectionType,
  strategy: FilterStrategy,
) {
  const {
    searchQuery,
    setSearchQuery,
    collectionSelectedTag,
    setCollectionSelectedTag,
  } = useStore();

  useEffect(() => {
    setSearchQuery("");
    setCollectionSelectedTag(null);
  }, [configType, setSearchQuery, setCollectionSelectedTag]);

  const filteredItems = useMemo(() => {
    return strategy.filter(
      items as CollectionItem[],
      searchQuery,
      collectionSelectedTag,
    );
  }, [items, searchQuery, strategy, collectionSelectedTag]);

  const randomizerItems = useMemo(() => {
    if (configType === CollectionType.Anime) {
      return filteredItems.filter((item: CollectionItem) => {
        return "status" in item && item.status === WatchStatus.Completed;
      });
    }
    return filteredItems;
  }, [filteredItems, configType]);

  return {
    filteredItems,
    randomizerItems,
    searchQuery,
    setSearchQuery,
    collectionSelectedTag,
    setCollectionSelectedTag,
  };
}

// ============================================================================
// Utils & Shared Components
// ============================================================================

export function CollectionTagFilter({
  items,
  selectedTag,
  onTagSelect,
}: {
  items: any[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}) {
  const hasRecommended = items.some((item) => item.recommended);
  const allTags = Array.from(
    new Set(items.flatMap((item) => item.tags || [])),
  ).sort();

  if (hasRecommended) {
    allTags.unshift("Recommended");
  }

  if (allTags.length === 0) return null;

  return (
    <div className="mb-8">
      <h4 className="text-xs font-bold text-gray-400 mb-3">Filter by Tag</h4>
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <PillTag
            key={tag}
            label={tag}
            selected={selectedTag === tag}
            dimmed={selectedTag !== tag}
            onClick={() => onTagSelect(selectedTag === tag ? null : tag)}
            variant="filter"
          />
        ))}
      </div>
    </div>
  );
}

export function CollectionHeader({
  title,
  description,
  count,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  onPickRandom,
  items,
  showClear,
  onClear,
}: {
  title: string;
  description?: string;
  count: number;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  onPickRandom?: (item: unknown) => void;
  items?: unknown[];
  showClear?: boolean;
  onClear?: () => void;
}) {
  const displayCount = typeof count === "number" ? count : 0;
  const currentSearchValue = searchValue || "";

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent tracking-tight">
            {title || "Collection"}
          </h1>
          {description && (
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl leading-relaxed font-medium">
              {description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {showClear && onClear && (
            <button
              onClick={onClear}
              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
            >
              Clear Filters
            </button>
          )}
          <div className="px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10 text-xs font-bold text-gray-500">
            {displayCount} {displayCount === 1 ? "Item" : "Items"}
          </div>
          {onPickRandom &&
            items &&
            Array.isArray(items) &&
            items.length > 0 && (
              <RandomizerButton items={items} onPick={onPickRandom} />
            )}
        </div>
      </div>
      <div className="relative group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-black dark:text-gray-400 group-focus-within:text-black dark:group-focus-within:text-gray-200 transition-colors"
          size={20}
        />
        <input
          type="text"
          value={currentSearchValue}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          placeholder={searchPlaceholder || "Search..."}
          className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl py-2.5 pl-12 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30 transition-all shadow-sm group-hover:shadow-md"
        />
      </div>
    </div>
  );
}

// ============================================================================
// Modals
// ============================================================================

function AnimeButtons({ item }: { item: any }) {
  return (
    <div className="w-full space-y-3 relative z-10">
      {item.status === WatchStatus.Completed && (
        <div className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full text-xs font-bold shadow-sm">
          <Check size={18} strokeWidth={3} />
          <span>Completed</span>
        </div>
      )}
      {item.recommended && (
        <div className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full text-xs font-bold shadow-sm">
          <Star size={18} fill="currentColor" />
          <span>Highly Recommended</span>
        </div>
      )}
      <a
        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + " anime official trailer")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full text-xs font-bold shadow-sm group"
      >
        <Play
          size={16}
          className="fill-current group-hover:scale-110 transition-transform"
        />
        Watch Trailer
      </a>
    </div>
  );
}

function AnimeSidebar({ item }: { item: any }) {
  return (
    <div className="w-full md:w-[350px] p-6 md:p-8 flex flex-col items-center justify-start border-b md:border-b-0 md:border-r border-foreground/10 relative overflow-hidden shrink-0">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-foreground/[0.02] pointer-events-none z-[1]" />

      {item.image ? (
        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + " anime official trailer")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-56 md:w-64 aspect-[2/3] shadow-2xl rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 mb-6 md:mb-8 transform hover:scale-[1.02] transition-transform duration-500 cursor-pointer group flex-shrink-0 z-10"
        >
          <Image
            src={getAssetPath(item.image)}
            alt={item.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <Play
              size={48}
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg"
              fill="currentColor"
            />
          </div>
        </a>
      ) : (
        <div className="w-56 md:w-64 aspect-[2/3] bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-8 shadow-inner z-10">
          <Tv className="text-gray-400" size={56} />
        </div>
      )}
      <div className="hidden md:block w-full z-10">
        <AnimeButtons item={item} />
      </div>
    </div>
  );
}

function AnimeContent({
  item,
  onTagClick,
}: {
  item: any;
  onTagClick: (tag: string) => void;
}) {
  return (
    <div className="flex-1 md:overflow-y-auto custom-scrollbar relative z-10">
      <div className="p-6 md:p-10 space-y-6 md:space-y-8 bg-transparent">
        <div>
          <div className="flex flex-wrap gap-3 mb-4">
            {item.year && (
              <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-foreground/50 bg-foreground/5 px-2.5 py-1 rounded-full border border-foreground/10 tracking-widest">
                <Calendar size={10} /> {item.year}
              </span>
            )}
            {item.rating && (
              <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-foreground/50 bg-foreground/5 px-2.5 py-1 rounded-full border border-foreground/10 tracking-widest">
                <Star size={10} /> {item.rating}
              </span>
            )}
            {item.seasons && (
              <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-foreground/50 bg-foreground/5 px-2.5 py-1 rounded-full border border-foreground/10 tracking-widest">
                <Film size={10} /> {item.seasons}
              </span>
            )}
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
            {item.title}
          </h2>
          {item.description && (
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
              {item.description}
            </p>
          )}
        </div>
        <div className="h-px w-full bg-gray-100 dark:bg-white/5" />
        {item.tags && item.tags.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-gray-400 mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag: string) => (
                <PillTag
                  key={tag}
                  label={tag}
                  onClick={() => onTagClick(tag)}
                />
              ))}
            </div>
          </div>
        )}
        {item.keyLearnings && item.keyLearnings.length > 0 && (
          <div className="bg-foreground/[0.02] rounded-3xl p-8 border border-foreground/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-foreground/5 rounded-lg border border-foreground/10">
                <Tv size={16} className="text-foreground/60" />
              </div>
              <h3 className="text-[11px] font-black text-foreground/80">
                Key Takeaways
              </h3>
            </div>
            <div className="space-y-4">
              {item.keyLearnings.map((learning: string, idx: number) => (
                <div key={idx} className="flex gap-4">
                  <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-foreground/30 shrink-0" />
                  <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                    {learning}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="md:hidden mt-4">
          <AnimeButtons item={item} />
        </div>
      </div>
    </div>
  );
}

export function AnimeModal({
  item,
  onClose,
  onTagClick,
}: {
  item: any;
  onClose: () => void;
  onTagClick: (tag: string) => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        layoutId={`anime-${item.title}`}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
        className="bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-3xl w-[92%] md:w-full max-w-5xl max-h-[85vh] rounded-[24px] md:rounded-[32px] shadow-2xl relative z-10 border border-white/20 dark:border-white/10 flex flex-col md:flex-row overflow-hidden"
      >
        {/* Full Modal Blurred Background Image */}
        {item.image && (
          <div className="absolute inset-0 z-0">
            <Image
              src={getAssetPath(item.image)}
              alt=""
              fill
              className="object-cover blur-3xl opacity-30 scale-110"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 dark:from-white/5 dark:via-transparent dark:to-black/30" />
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-all z-30 backdrop-blur-sm group"
        >
          <X
            size={20}
            className="text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white transition-colors"
          />
        </button>
        <div className="md:hidden flex-1 overflow-y-auto custom-scrollbar relative z-10">
          <div className="flex flex-col">
            <AnimeSidebar item={item} />
            <AnimeContent item={item} onTagClick={onTagClick} />
          </div>
        </div>
        <div className="hidden md:flex md:flex-row flex-1 overflow-hidden relative z-10">
          <AnimeSidebar item={item} />
          <AnimeContent item={item} onTagClick={onTagClick} />
        </div>
      </motion.div>
    </div>
  );
}

function BookSidebar({ item }: { item: Book }) {
  return (
    <div className="w-full md:w-[350px] bg-foreground/[0.02] p-6 md:p-8 flex flex-col items-center justify-start border-b md:border-b-0 md:border-r border-foreground/10 relative overflow-hidden shrink-0">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-foreground/[0.02] pointer-events-none" />
      {item.image ? (
        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + " " + item.author + " book review")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-40 md:w-64 aspect-[2/3] shadow-2xl rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 mb-6 md:mb-8 transform hover:scale-[1.02] transition-transform duration-500 cursor-pointer group flex-shrink-0"
        >
          <Image
            src={getAssetPath(item.image)}
            alt={item.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <Play
              size={48}
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg"
              fill="currentColor"
            />
          </div>
        </a>
      ) : (
        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + " " + item.author + " book review")}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative w-40 md:w-64 aspect-[2/3] bg-gradient-to-br ${getBookGradient(item.title)} rounded-r-md rounded-l-sm flex flex-col p-6 mb-6 md:mb-8 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 transform hover:scale-[1.02] transition-transform duration-500 cursor-pointer group`}
        >
          <div className="absolute top-1 left-0 w-4 h-[98%] -translate-x-3 bg-black/20 dark:bg-black/40 blur-[1px] rounded-l-sm" />
          <div className="flex-1 border-2 border-white/20 p-4 flex flex-col items-center justify-center text-center">
            <BookOpen className="text-white/40 mb-4" size={32} />
            <h3 className="text-white font-serif font-bold text-xl leading-tight line-clamp-4 drop-shadow-md">
              {item.title}
            </h3>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-white/80 font-mono truncate">
              {item.author}
            </p>
          </div>
          <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center rounded-r-md rounded-l-sm">
            <Play
              size={48}
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg"
              fill="currentColor"
            />
          </div>
        </a>
      )}
      <div className="w-full space-y-3 relative z-10">
        {item.recommended && (
          <div className="w-full flex items-center justify-center gap-2 py-2.5 bg-foreground/5 text-foreground/80 rounded-xl text-xs font-bold border border-foreground/10">
            <Star size={12} fill="currentColor" />
            <span>Must Read</span>
          </div>
        )}
        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + " " + item.author + " book review")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3 text-foreground/60 hover:text-foreground rounded-xl text-xs font-bold group transition-all hover:scale-[1.02] active:scale-[0.98] border border-foreground/10 hover:border-foreground hover:bg-foreground/5 shadow-sm"
        >
          <Play
            size={14}
            className="group-hover:scale-110 transition-transform fill-current"
          />
          <span>Watch Book Review</span>
        </a>
      </div>
    </div>
  );
}

function BookContent({
  item,
  onTagClick,
}: {
  item: any;
  onTagClick: (tag: string) => void;
}) {
  return (
    <div className="flex-1 md:overflow-y-auto custom-scrollbar">
      <div className="p-6 md:p-10 space-y-6 md:space-y-8">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
            {item.title}
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium mb-6">
            by {item.author}
          </p>
          {item.description && (
            <div className="relative">
              <Quote
                size={18}
                className="absolute -left-2 -top-2 text-foreground/10"
              />
              <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed italic pl-6">
                {item.description}
              </p>
            </div>
          )}
        </div>
        <div className="h-px w-full bg-gray-100 dark:bg-white/5" />
        {item.tags && item.tags.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-gray-400 mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag: string) => (
                <PillTag
                  key={tag}
                  label={tag}
                  onClick={() => onTagClick(tag)}
                />
              ))}
            </div>
          </div>
        )}
        {item.keyTakeaways && item.keyTakeaways.length > 0 && (
          <div className="bg-foreground/[0.02] rounded-3xl p-8 border border-foreground/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-foreground/5 rounded-lg border border-foreground/10">
                <BookOpen size={16} className="text-foreground/60" />
              </div>
              <h3 className="text-[11px] font-black text-foreground/80">
                Key Takeaways
              </h3>
            </div>
            <ul className="space-y-4">
              {item.keyTakeaways.map((takeaway: string, idx: number) => (
                <li
                  key={idx}
                  className="group flex items-start gap-4 text-sm md:text-base text-foreground/80 leading-relaxed font-normal p-3 rounded-xl transition-all hover:bg-foreground/5"
                >
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-foreground/20 group-hover:bg-foreground/50 shrink-0 transition-colors" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export function BookModal({
  item,
  onClose,
  onTagClick,
}: {
  item: any;
  onClose: () => void;
  onTagClick: (tag: string) => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        layoutId={`book-${item.title}`}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
        className="bg-[#fafafa] dark:bg-[#09090b] w-[92%] md:w-full max-w-5xl max-h-[85vh] rounded-[24px] md:rounded-[32px] shadow-2xl relative z-10 border border-white/20 dark:border-white/10 flex flex-col md:flex-row overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-all z-30 backdrop-blur-sm group"
        >
          <X
            size={20}
            className="text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white transition-colors"
          />
        </button>
        <div className="md:hidden flex-1 overflow-y-auto custom-scrollbar bg-[#fafafa] dark:bg-[#09090b]">
          <div className="flex flex-col">
            <BookSidebar item={item} />
            <BookContent item={item} onTagClick={onTagClick} />
          </div>
        </div>
        <div className="hidden md:flex md:flex-row flex-1 overflow-hidden">
          <BookSidebar item={item} />
          <BookContent item={item} onTagClick={onTagClick} />
        </div>
      </motion.div>
    </div>
  );
}

const iconMap: Record<string, React.ElementType> = {
  Dumbbell,
  Tv,
  Book: BookOpen,
  Trophy,
  Bike,
  Mountain,
  Dices,
  Plane,
  Coffee,
  Users,
  Mic,
};

export function HobbyModal({
  item,
  onClose,
}: {
  item: any;
  onClose: () => void;
}) {
  if (!item) return null;
  const IconComponent = iconMap[item.icon || ""] || null;

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
        layoutId={`hobby-${item.name || "unknown"}`}
        className="bg-white dark:bg-zinc-900 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-gray-200 dark:border-white/10"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors z-20"
        >
          <X size={20} />
        </button>
        <div className="p-10 flex flex-col items-center text-center">
          {IconComponent ? (
            <IconComponent className="w-12 h-12 text-foreground mb-4" />
          ) : (
            <span className="text-4xl mb-4">🎮</span>
          )}
          <h2 className="text-2xl font-bold mb-3 font-mono">
            {item.name || "Unknown Hobby"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base mb-6 font-mono">
            {item.description || "No description available"}
          </p>
          {item.link && (
            <a
              href={item.link}
              target={item.link?.startsWith("http") ? "_blank" : undefined}
              rel={
                item.link?.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/10 hover:border-foreground hover:bg-foreground/5 text-foreground/60 hover:text-foreground font-black text-xs rounded-full transition-all duration-300 hover:scale-105 uppercase tracking-widest"
            >
              <ExternalLink size={14} /> Explore More
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function CollectionSkeleton() {
  return (
    <div className="section max-w-6xl mx-auto px-6 md:px-12 mt-12 mb-12 font-mono">
      <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-8" />
      <div className="space-y-4 mb-12">
        <div className="h-12 w-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        <div className="h-6 w-full max-w-2xl bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="aspect-[2/3] bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// UniversalCollection
// ============================================================================

export function UniversalCollection({
  config,
  items,
}: {
  config: CollectionConfig;
  items: unknown[];
}) {
  const store = useStore();
  const [mounted, setMounted] = useState(false);

  const isValidConfig = config && config.type && config.title;
  const isValidItems = Array.isArray(items);

  const strategy = useMemo(() => {
    try {
      if (!isValidConfig) return null;
      return CollectionStrategyFactory.getStrategy(config.type);
    } catch (error) {
      console.error("Failed to get collection strategy:", error);
      return null;
    }
  }, [config?.type, isValidConfig]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    filteredItems,
    randomizerItems,
    searchQuery,
    setSearchQuery,
    collectionSelectedTag,
    setCollectionSelectedTag,
  } = useCollectionFilter(
    isValidItems ? items : [],
    config?.type,
    strategy as FilterStrategy,
  );

  const handlePickRandom = (item: any) => {
    if (!item) return;
    try {
      if (config.type === CollectionType.Anime)
        store.setAnimeSelectedItem(item);
      else if (config.type === CollectionType.Hobby)
        store.setHobbySelectedItem(item);
      else if (config.type === CollectionType.Book)
        store.setBookSelectedItem(item);
      else {
        const title = item.title || item.name;
        if (title) {
          const element = document.getElementById(`collection-item-${title}`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            element.classList.add("ring-2", "ring-foreground");
            setTimeout(
              () => element.classList.remove("ring-2", "ring-foreground"),
              2000,
            );
          }
        }
      }
    } catch (error) {
      console.error("Error picking random item:", error);
    }
  };

  if (!mounted) return <CollectionSkeleton />;

  if (!isValidConfig || !strategy) {
    return (
      <div className="section max-w-6xl mx-auto px-6 md:px-12 mt-12 mb-24 font-mono text-center py-24">
        <h1 className="text-2xl font-bold mb-4">
          Collection Configuration Error
        </h1>
        <p className="text-gray-500">
          The collection could not be loaded due to an invalid configuration.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block px-6 py-2 bg-foreground text-background rounded-full font-bold"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="section max-w-6xl mx-auto px-6 md:px-12 mt-12 mb-24 font-mono relative">
      <Breadcrumbs items={[{ label: config.title || "Collection" }]} />
      <CollectionHeader
        title={config.title || "Collection"}
        description={config.description}
        count={filteredItems?.length || 0}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder={config.searchPlaceholder}
        items={randomizerItems}
        onPickRandom={handlePickRandom}
        showClear={
          (config.type === CollectionType.Anime ||
            config.type === CollectionType.Book) &&
          !!(searchQuery || collectionSelectedTag)
        }
        onClear={() => {
          setSearchQuery("");
          setCollectionSelectedTag(null);
        }}
      />

      {(config.type === CollectionType.Anime ||
        config.type === CollectionType.Book) && (
        <CollectionTagFilter
          items={isValidItems ? items : []}
          selectedTag={collectionSelectedTag}
          onTagSelect={setCollectionSelectedTag}
        />
      )}

      {!filteredItems || filteredItems.length === 0 ? (
        <div className="py-24 text-center text-gray-500">
          {searchQuery
            ? `No items found matching "${searchQuery}"`
            : "No items available in this collection."}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {strategy.renderList(filteredItems as any[])}
        </motion.div>
      )}

      <AnimatePresence>
        {store.hobbySelectedItem && (
          <HobbyModal
            item={store.hobbySelectedItem}
            onClose={() => store.setHobbySelectedItem(null)}
          />
        )}
        {store.bookSelectedItem && (
          <BookModal
            item={store.bookSelectedItem}
            onClose={() => store.setBookSelectedItem(null)}
            onTagClick={(tag) => {
              setCollectionSelectedTag(tag);
              store.setBookSelectedItem(null);
            }}
          />
        )}
        {store.animeSelectedItem && (
          <AnimeModal
            item={store.animeSelectedItem}
            onClose={() => store.setAnimeSelectedItem(null)}
            onTagClick={(tag) => {
              setCollectionSelectedTag(tag);
              store.setAnimeSelectedItem(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
