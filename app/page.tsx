import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import { getExperiences } from "@/lib/api";
import { linkifyTech } from "@/lib/tech-links";
import dynamic from "next/dynamic";
import FadeIn from "@/components/FadeIn";
import Image from "next/image";
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
      <FadeIn>
        <Hero />
      </FadeIn>

      <div className="section container mx-auto px-4 mb-24">
        {/* Experience Section */}
        <div className="mb-16" id="experience">
          <FadeIn>
            <h2 className="title text-3xl font-bold font-serif mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
              Experience
            </h2>
          </FadeIn>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="relative flex gap-6">
                    {/* Timeline dot */}
                    <div className="relative z-10 flex-shrink-0">
                      {exp.logo ? (
                        <div className="relative w-12 h-12 md:w-16 md:h-16 bg-white dark:bg-zinc-900 rounded-full border-2 border-green-500 overflow-hidden">
                          <Image
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{exp.company[0]}</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-grow pb-8">
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
                            <li
                              key={idx}
                              dangerouslySetInnerHTML={{ __html: linkifyTech(highlight) }}
                            />
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        <TechStack />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <FadeIn delay={0.2}>
            <RecentBlogs />
          </FadeIn>
          <FadeIn delay={0.3}>
            <RecentPapers />
          </FadeIn>
        </div>
      </div>
      <div className="mb-24">
        <FadeIn delay={0.4}>
          <GitHubStats />
        </FadeIn>
      </div>

      <div className="section container mx-auto px-4 mb-24 font-mono">
        <FadeIn delay={0.5}>
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
        </FadeIn>
      </div>
    </main>
  );
}
