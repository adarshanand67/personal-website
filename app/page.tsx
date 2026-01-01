import { getExperiences, getProfile } from "@/lib/api";
import { Hero, ExperienceSection, TechStackSection } from "@/components/sections";
import dynamic from "next/dynamic";

export default async function Home() {
  const experiences = await getExperiences();
  const profile = await getProfile();
  return (
    <main className="min-h-screen">
      <Hero profile={profile} />

      <div className="section max-w-6xl mx-auto px-6 md:px-12 mb-8 space-y-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Experience Section */}
          <div className="group relative h-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-foreground/5 to-foreground/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative h-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-800 hover:border-foreground/20 transition-colors duration-300">
              <ExperienceSection items={experiences} />
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="group relative h-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-foreground/5 to-foreground/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative h-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-800 hover:border-foreground/20 transition-colors duration-300">
              <TechStackSection />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
