import Hero from "@/components/home/Hero";

import { getExperiences } from "@/lib/api";
import TechStack from "@/components/home/TechStack";
import Experience from "@/components/home/Experience";
import GitHubStats from "@/components/widgets/GitHubStats";
import ContactSection from "@/components/home/ContactSection";
import ShelvesSection from "@/components/home/ShelvesSection";
import NewsSection from "@/components/home/NewsSection";

export default async function Home() {
  const experiences = await getExperiences();

  return (
    <main className="min-h-screen">
      <Hero />

      {/* Main content with enhanced spacing */}
      <div className="section max-w-4xl mx-auto px-4 mb-8 space-y-8">
        {/* Experience Section with gradient border */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-800 hover:border-green-500/50 transition-colors duration-300">
            <Experience items={experiences} />
          </div>
        </div>

        {/* Tech Stack with enhanced design */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-800 hover:border-green-500/50 transition-colors duration-300">
            <TechStack />
          </div>
        </div>

        {/* Daily Headlines Section */}
        <NewsSection />
      </div>

      {/* GitHub Stats with enhanced design */}
      <div className="section max-w-4xl mx-auto px-4 mb-8">
        <GitHubStats />
      </div>

      {/* Contact Section */}
      <div className="section max-w-4xl mx-auto px-4 mb-8">
        <ContactSection />
      </div>

      {/* Directory / Shelves Section */}
      <ShelvesSection />
    </main>
  );
}
