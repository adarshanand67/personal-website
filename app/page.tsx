import { getExperiences, getProfile } from "@/lib/api";
import {
  Hero,
  ExperienceSection,
  TechStackSection,
} from "@/components/sections";
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
          {/* Experience Section */}
          <ExperienceSection items={experiences} />

          {/* Tech Stack Section */}
          {/* Tech Stack Section */}
          <TechStackSection />
        </div>
      </div>
    </main>
  );
}
