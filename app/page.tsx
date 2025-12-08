import Hero from "@/components/home/Hero";

import { getExperiences, getBlogs, getPapers } from "@/lib/api";
import { linkifyTech } from "@/lib/tech-links";
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

      <div className="section max-w-4xl mx-auto px-4 mb-24">
        {/* Experience Section */}
        <Experience items={experiences} />

        <TechStack />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <RecentSection
            title="Recent Blog Posts"
            command="cat ~/blog/recent.md"
            items={recentPosts}
            linkText="Full archive"
            linkUrl="/blogshelf"
          />

          <RecentSection
            title="Recent Papers"
            command="ls ~/papers --recent"
            items={recentPapers}
            linkText="Papershelf"
            linkUrl="/papershelf"
          />
        </div>
      </div>
      <div className="mb-24">
        <GitHubStats />
      </div>

      <div className="section max-w-4xl mx-auto px-4 mb-24 font-mono">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <span className="text-primary">##</span> Let&apos;s Talk
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
        <div className="text-sm">
          <span className="text-gray-500">→</span>{" "}
          <a
            href="https://linkedin.com/in/adarshanand67"
            target="_blank"
            className="text-green-700 dark:text-green-400 hover:underline"
          >
            linkedin.com/in/adarshanand67
          </a>
          <span className="text-gray-500 mx-2">•</span>
          <a
            href="mailto:adarshan20302@gmail.com"
            className="text-green-700 dark:text-green-400 hover:underline"
          >
            adarshan20302@gmail.com
          </a>
        </div>
      </div>
    </main>
  );
}
