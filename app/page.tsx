import Hero from "@/components/home/Hero";

import { getExperiences, getBlogs, getPapers } from "@/lib/api";
import TechStack from "@/components/home/TechStack";
import Experience from "@/components/home/Experience";
import RecentSection from "@/components/home/RecentSection";
import GitHubStats from "@/components/widgets/GitHubStats";

export default async function Home() {
  const experiences = await getExperiences();
  const blogs = await getBlogs();
  const papers = await getPapers();

  const recentPosts = blogs.slice(0, 4).map((post) => ({
    title: post.title,
    url: `/blogshelf/${post.slug}`,
    date: post.date,
    isExternal: false,
  }));

  const recentPapers = papers.slice(0, 5).map((paper: { title: string; url: string }) => ({
    title: paper.title,
    url: paper.url,
    isExternal: true,
  }));

  return (
    <main className="min-h-screen">
      <Hero />

      {/* Main content with enhanced spacing */}
      <div className="section max-w-4xl mx-auto px-4 mb-24 space-y-12">
        {/* Experience Section with gradient border */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-200 dark:border-gray-800 hover:border-green-500/50 transition-colors duration-300">
            <Experience items={experiences} />
          </div>
        </div>

        {/* Tech Stack with enhanced design */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-200 dark:border-gray-800 hover:border-green-500/50 transition-colors duration-300">
            <TechStack />
          </div>
        </div>

        {/* Recent Posts Grid with enhanced cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-green-500/50 transition-colors duration-300">
              <RecentSection
                title="Recent Blog Posts"
                command="cat ~/blog/recent.md"
                items={recentPosts}
                linkText="Full archive"
                linkUrl="/blogshelf"
              />
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-green-500/50 transition-colors duration-300">
              <RecentSection
                title="Recent Papers"
                command="ls ~/papers --recent"
                items={recentPapers}
                linkText="Papershelf"
                linkUrl="/papershelf"
              />
            </div>
          </div>
        </div>
      </div>

      {/* GitHub Stats with enhanced design */}
      <div className="mb-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent"></div>
        <div className="relative">
          <GitHubStats />
        </div>
      </div>

      {/* Contact Section with modern card design */}
      <div className="section max-w-4xl mx-auto px-4 mb-24">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition duration-500"></div>
          <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black backdrop-blur-sm rounded-xl p-8 border-2 border-gray-200 dark:border-gray-800 hover:border-green-500/50 transition-all duration-300">
            <div className="font-mono">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <span className="text-green-500">##</span> Let&apos;s Talk
              </h2>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4 text-sm">
                <span className="text-green-500 font-bold">$</span>
                <span>echo $CONTACT_INFO</span>
                <span className="animate-pulse inline-block w-2 h-4 bg-green-500 align-middle"></span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm max-w-2xl">
                I&apos;m always open to discussing new opportunities, interesting projects, or just
                chatting about tech.
              </p>
              <div className="text-sm flex flex-wrap gap-4">
                <a
                  href="https://linkedin.com/in/adarshanand67"
                  target="_blank"
                  className="group inline-flex items-center gap-2 text-green-700 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors"
                >
                  <span className="text-gray-500 group-hover:text-green-500 transition-colors">→</span>
                  <span className="hover:underline font-medium">linkedin.com/in/adarshanand67</span>
                </a>
                <span className="text-gray-500">•</span>
                <a
                  href="mailto:adarshan20302@gmail.com"
                  className="group inline-flex items-center gap-2 text-green-700 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors"
                >
                  <span className="text-gray-500 group-hover:text-green-500 transition-colors">→</span>
                  <span className="hover:underline font-medium">adarshan20302@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
