"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ExternalLink, Terminal, RefreshCw, Newspaper, ChevronDown } from "lucide-react";

// Categories configuration
const CATEGORIES = [
    { id: "technology", label: "Tech", apiCategory: "technology" },
    { id: "business", label: "Business", apiCategory: "business" },
    { id: "finance", label: "Finance", apiCategory: "business" },
    { id: "news", label: "News", apiCategory: "general" },
    { id: "politics", label: "Politics", apiCategory: "general" },
    { id: "science", label: "Science", apiCategory: "science" },
];

interface Article {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    source: {
        name: string;
    };
}

export default function NewsSection() {
    const [activeCategory, setActiveCategory] = useState("technology");
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    useEffect(() => {
        fetchNews(activeCategory);
    }, [activeCategory]);

    const fetchNews = async (categoryId: string) => {
        setLoading(true);
        setError(null);
        try {
            const categoryConfig = CATEGORIES.find((c) => c.id === categoryId);
            const apiCategory = categoryConfig ? categoryConfig.apiCategory : "general";

            // Default to India (in) based on user's location, generic fallback to us
            const country = "in";
            const response = await fetch(`https://saurav.tech/NewsAPI/top-headlines/category/${apiCategory}/${country}.json`);

            if (!response.ok) {
                throw new Error("Failed to fetch news");
            }

            const data = await response.json();

            // Filter/Process if needed (e.g. for Finance vs Business)
            let fetchedArticles = data.articles || [];

            // Simple client-side filtering to differentiate duplicated API categories slightly
            if (categoryId === 'finance') {
                fetchedArticles = fetchedArticles.filter((a: Article) =>
                    /market|stock|bank|economy|finance|money|invest/i.test(a.title + a.description)
                );
                // If filter is too aggressive, fallback to all business
                if (fetchedArticles.length === 0) fetchedArticles = data.articles;
            } else if (categoryId === 'politics') {
                fetchedArticles = fetchedArticles.filter((a: Article) =>
                    /minister|govt|parliament|election|party|congress|bjp|policy|vote/i.test(a.title + a.description)
                );
                if (fetchedArticles.length === 0) fetchedArticles = data.articles;
            }

            setArticles(fetchedArticles.slice(0, 6)); // Limit to 6 items
            setLastUpdated(new Date());
        } catch (err) {
            console.error(err);
            setError("Unable to load headlines at this moment.");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr: string) => {
        try {
            return new Date(dateStr).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return dateStr;
        }
    };

    const formatLastUpdated = () => {
        if (!lastUpdated) return '';
        return lastUpdated.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="section w-full relative group">
            {/* Gradient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div
                className="relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 hover:border-green-500/50 transition-all duration-300 overflow-hidden"
            >
                {/* Header */}
                <div
                    className="px-6 py-4 border-b border-gray-200/50 dark:border-gray-800/50 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="w-full text-left group mb-3">
                        <h2 className="text-2xl font-bold flex items-center gap-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-2">
                            <span className="text-primary">##</span> Daily Headlines
                            <ChevronDown
                                size={20}
                                className={`transition-transform duration-300 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
                            />
                            {lastUpdated && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        fetchNews(activeCategory);
                                    }}
                                    className="ml-auto p-1.5 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors"
                                    title="Refresh"
                                >
                                    <RefreshCw size={16} className={`text-gray-400 hover:text-green-500 ${loading ? 'animate-spin' : ''}`} />
                                </button>
                            )}
                        </h2>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                            <span className="text-green-500 font-bold">$</span>
                            <span>curl -s news.api/headlines | jq '.articles'</span>
                            <span className="animate-pulse inline-block w-2 h-4 bg-green-500 align-middle"></span>
                        </div>
                    </div>
                </div>

                {/* Expanded Content */}
                <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-6">
                        {/* Categories Tabs */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === cat.id
                                        ? "bg-green-600 text-white shadow-lg shadow-green-500/20 scale-105"
                                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Content Area */}
                        <div className="min-h-[200px]">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-12 gap-4 text-gray-400 animate-pulse">
                                    <RefreshCw size={24} className="animate-spin" />
                                    <span className="font-mono text-sm">Fetching latest updates...</span>
                                </div>
                            ) : error ? (
                                <div className="text-center py-10 text-red-500 font-mono text-sm">
                                    {error}
                                    <button onClick={() => fetchNews(activeCategory)} className="block mx-auto mt-2 text-green-500 hover:underline">Retry</button>
                                </div>
                            ) : articles.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {articles.map((article, index) => (
                                        <Link
                                            key={index}
                                            href={article.url}
                                            target="_blank"
                                            className="group/card flex flex-col p-4 rounded-xl bg-white dark:bg-black/40 border border-gray-100 dark:border-gray-800 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/5 transition-all duration-300 relative overflow-hidden"
                                        >
                                            <div className="flex items-start justify-between gap-3 mb-2">
                                                <span className="text-xs font-mono px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                                    {article.source.name}
                                                </span>
                                                <span className="text-xs text-gray-400 whitespace-nowrap">
                                                    {formatDate(article.publishedAt)}
                                                </span>
                                            </div>
                                            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2 line-clamp-2 group-hover/card:text-green-600 dark:group-hover/card:text-green-400 transition-colors">
                                                {article.title}
                                            </h3>
                                            <div className="mt-auto pt-2 flex items-center text-xs text-green-600 dark:text-green-500 font-medium opacity-0 group-hover/card:opacity-100 transition-opacity transform translate-y-2 group-hover/card:translate-y-0">
                                                Read Article <ExternalLink size={12} className="ml-1" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    No headlines found for this category.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
