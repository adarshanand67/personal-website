import { getExperiences, getProfile } from "@/lib/api";
import { TechStack } from "@/components/layout/sections/TechStack";
import { Experience } from "@/components/layout/sections/Experience";
import { ContactSection } from "@/components/layout/sections/Contact";
import { Hero } from "@/components/layout/sections/Hero";
import { ErrorBoundary } from "@/components/features/errorBoundary";
export default async function Home() {
  const experiences = await getExperiences();
  const profile = await getProfile();
  return (
    <main className="min-h-screen">
      <Hero profile={profile} />
      { }
      <div className="section max-w-6xl mx-auto px-6 md:px-12 mb-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Experience Section */}
          <ErrorBoundary>
            <div className="group relative h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative h-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-800 hover:border-green-500/50 transition-colors duration-300">
                <Experience items={experiences} />
              </div>
            </div>
          </ErrorBoundary>

          {/* Tech Stack Section */}
          <ErrorBoundary>
            <div className="group relative h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative h-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-800 hover:border-green-500/50 transition-colors duration-300">
                <TechStack />
              </div>
            </div>
          </ErrorBoundary>
        </div>

        {/* Contact Section */}
        <ErrorBoundary>
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-800 hover:border-green-500/50 transition-colors duration-300">
              <ContactSection />
            </div>
          </div>
        </ErrorBoundary>
      </div>
    </main>
  );
}
