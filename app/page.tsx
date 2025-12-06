import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import { getExperiences } from "@/lib/api";
import dynamic from "next/dynamic";

const RecentBlogs = dynamic(() => import("@/components/RecentBlogs"), {
  loading: () => <p className="text-gray-500">Loading writings...</p>,
});
const RecentPapers = dynamic(() => import("@/components/RecentPapers"), {
  loading: () => <p className="text-gray-500">Loading papers...</p>,
});

export default async function Home() {
  const experiences = await getExperiences();


  return (
    <main className="min-h-screen">
      <Hero />
      <div className="section container mx-auto px-4 mb-12">
        {/* Experience Section */}
        <div className="mb-16" id="experience">
          <h2 className="title text-3xl font-bold font-serif mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
            Experience
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="card border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all bg-white dark:bg-zinc-900"
              >
                <SectionHeader title={exp.company} subtitle={exp.role} />
                <p className="text-gray-500 mb-4 text-sm font-mono">
                  {exp.duration} • {exp.location}
                </p>
                {exp.description && (
                  <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    {exp.description}
                  </p>
                )}
                {exp.highlights.length > 0 && (
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>



        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <RecentBlogs />
          <RecentPapers />
        </div>
      </div>
    </main>
  );
}
