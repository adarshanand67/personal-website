import { getExperiences, getProfile } from "@/lib/api";
import dynamic from "next/dynamic";
import { Hero } from "@/components/layout";

const Experience = dynamic(
  () => import("@/components/layout").then((mod) => mod.Experience),
  {
    loading: () => (
      <div className="w-full h-[600px] bg-gray-100 dark:bg-gray-800/50 rounded-xl animate-pulse flex items-center justify-center">
        <span className="text-gray-400 font-mono text-sm">
          Loading Experience...
        </span>
      </div>
    ),
    ssr: true,
  },
);

const TechStack = dynamic(
  () => import("@/components/layout").then((mod) => mod.TechStack),
  {
    loading: () => (
      <div className="w-full h-[400px] bg-gray-100 dark:bg-gray-800/50 rounded-xl animate-pulse flex items-center justify-center">
        <span className="text-gray-400 font-mono text-sm">
          Loading Tech Stack...
        </span>
      </div>
    ),
  },
);
export default async function Home() {
  const experiences = await getExperiences();
  const profile = await getProfile();
  return (
    <main className="min-h-screen">
      <Hero profile={profile} />
      {}
      <div className="section max-w-6xl mx-auto px-6 md:px-12 mb-8 space-y-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Experience Section */}
          <div className="group relative h-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-foreground/5 to-foreground/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative h-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-800 hover:border-foreground/20 transition-colors duration-300">
              <Experience items={experiences} />
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="group relative h-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-foreground/5 to-foreground/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative h-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-800 hover:border-foreground/20 transition-colors duration-300">
              <TechStack />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
