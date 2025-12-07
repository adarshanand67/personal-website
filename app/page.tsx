import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import { getExperiences } from "@/lib/api";
import { linkifyTech } from "@/lib/tech-links";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skeleton";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import TechStack from "@/components/TechStack";

const RecentBlogs = dynamic(() => import("@/components/RecentBlogs"), {
  loading: () => (
    <div className="space-y-4">
      <Skeleton className="h-24 w-full rounded-xl" />
      <Skeleton className="h-24 w-full rounded-xl" />
      <Skeleton className="h-24 w-full rounded-xl" />
    </div>
  ),
});
const RecentPapers = dynamic(() => import("@/components/RecentPapers"), {
  loading: () => (
    <div className="space-y-4">
      <Skeleton className="h-20 w-full rounded-xl" />
      <Skeleton className="h-20 w-full rounded-xl" />
    </div>
  ),
});
const GitHubStats = dynamic(() => import("@/components/GitHubStats"), {
  loading: () => <p>Loading stats...</p>,
});

export default async function Home() {
  const experiences = await getExperiences();

  return (
    <main className="min-h-screen">
      <Hero />

      <div className="section container mx-auto px-4 mb-24">
        {/* Experience Section */}
        <div className="mb-16" id="experience">
          <h2 className="title text-3xl font-bold font-serif mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
            Experience
          </h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="border-l-2 border-gray-300 dark:border-gray-700 pl-4">
                <div className="mb-2">
                  <h3 className="text-xl font-bold">{exp.company}</h3>
                  <p className="text-gray-800 dark:text-white font-medium">{exp.role}</p>
                  <p className="text-gray-500 text-sm font-mono mt-1">
                    {exp.duration} • {exp.location}
                  </p>
                </div>

                {exp.description && (
                  <p
                    className="mb-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: linkifyTech(exp.description) }}
                  />
                )}
                {exp.highlights.length > 0 && (
                  <ul className="list-disc pl-5 space-y-3 text-gray-600 dark:text-gray-400">
                    {exp.highlights.map((highlight: string, idx: number) => (
                      <li key={idx} dangerouslySetInnerHTML={{ __html: linkifyTech(highlight) }} />
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        <TechStack />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <RecentBlogs />

          <RecentPapers />
        </div>
      </div>
      <div className="mb-24">
        <GitHubStats />
      </div>

      <div className="section container mx-auto px-4 mb-24 font-mono">
        <h2 className="text-2xl font-bold mb-2">
          <span className="text-gray-500">##</span> Let&apos;s Talk
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">$ echo $CONTACT_INFO</p>
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
