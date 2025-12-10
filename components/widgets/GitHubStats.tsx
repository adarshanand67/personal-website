"use client";

import { getGithubRepos } from "@/lib/github";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function GitHubStats() {
  const [repos, setRepos] = useState<any[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    getGithubRepos().then(setRepos);
  }, []);

  if (repos.length === 0) return null;

  return (
    <section className="section max-w-4xl mx-auto px-4 mb-6 font-mono">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left group mb-2"
      >
        <h2 className="text-xl font-bold flex items-center gap-2 cursor-pointer hover:text-green-600 dark:hover:text-green-400 transition-colors">
          <span className="text-primary">##</span> <span className="text-green-700 dark:text-green-400">Open Source</span>
          <ChevronDown
            size={20}
            className={`transition-transform duration-300 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
          />
        </h2>
      </button>
      <p className="text-gray-600 dark:text-gray-400 mb-3 text-xs">$ ls ~/repos --sort=stars</p>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="space-y-3">
          {repos.map((repo) => (
            <div
              key={repo.name}
              className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 hover:border-green-500 transition-colors"
            >
              <div className="flex items-baseline gap-2 flex-wrap">
                <Link
                  href={repo.html_url}
                  target="_blank"
                  className="text-green-700 dark:text-green-400 hover:underline font-bold"
                >
                  {repo.name}
                </Link>
                <span className="text-gray-500 text-sm">
                  ⭐ {repo.stargazers_count}
                  {repo.language && ` • ${repo.language}`}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                {repo.description || "No description"}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-gray-500">
          →{" "}
          <Link
            href="https://github.com/adarshanand67"
            target="_blank"
            className="text-green-700 dark:text-green-400 hover:underline"
          >
            View all repositories
          </Link>
        </p>
      </div>
    </section>
  );
}
