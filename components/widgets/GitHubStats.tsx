import { getGithubRepos } from "@/lib/github";
import Link from "next/link";

export default async function GitHubStats() {
  const repos = await getGithubRepos();

  if (repos.length === 0) return null;

  return (
    <section className="section max-w-4xl mx-auto px-4 mb-16 font-mono">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl"></div>
        <div className="relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-2">
            <span className="text-primary">##</span> <span className="text-green-700 dark:text-green-400">Open Source</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">$ ls ~/repos --sort=stars</p>

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
      </div>
    </section>
  );
}
