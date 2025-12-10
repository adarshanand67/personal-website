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

  const recentPapers = papers.slice(0, 4).map((paper: { title: string; url: string }) => ({
    title: paper.title,
    url: paper.url,
    isExternal: true,
  }));

  return (
    <main className="min-h-screen">
      <Hero />

      {/* Main content with enhanced spacing */}
      <div className="section max-w-4xl mx-auto px-4 mb-16 space-y-8">
        {/* Experience Section with gradient border */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-green-500/50 transition-colors duration-300">
            <Experience items={experiences} />
          </div>
        </div>

        {/* Tech Stack with enhanced design */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-green-500/50 transition-colors duration-300">
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
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-base max-w-2xl leading-relaxed">
                I&apos;m always open to discussing new opportunities, interesting projects, collaborations,
                or just chatting about tech, security, and system programming. Feel free to reach out!
              </p>

              {/* Contact Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* LinkedIn Card */}
                <a
                  href="https://linkedin.com/in/adarshanand67"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-0.5">LinkedIn</div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 font-medium truncate">adarshanand67</div>
                    </div>
                    <svg className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>

                {/* Email Card */}
                <a
                  href="mailto:adarshan20302@gmail.com"
                  className="group relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20 rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-red-600 dark:text-red-400 font-semibold mb-0.5">Email</div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 font-medium truncate">adarshan20302@gmail.com</div>
                    </div>
                    <svg className="w-5 h-5 text-red-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>

                {/* GitHub Card */}
                <a
                  href="https://github.com/adarshanand67"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-800/30 dark:to-gray-900/20 rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/20 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-800 dark:bg-gray-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-600 dark:text-gray-400 font-semibold mb-0.5">GitHub</div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 font-medium truncate">adarshanand67</div>
                    </div>
                    <svg className="w-5 h-5 text-gray-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
