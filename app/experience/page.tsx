import { getExperiences, getVolunteering } from "@/lib/api";
import { linkifyTech } from "@/lib/tech-links";
import Image from "next/image";

export default async function Experience() {
  const experiences = await getExperiences();
  const volunteerings = await getVolunteering();

  return (
    <div className="section container mx-auto px-4 mt-12 mb-12 font-mono">
      <h1 className="text-3xl font-bold mb-2">
        <span className="text-gray-500">#</span> Experience
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm">$ cat ~/work/history.log</p>

      <div className="space-y-8 mb-16">
        {experiences.map(
          (
            exp: {
              company: string;
              role: string;
              duration: string;
              location: string;
              logo?: string | null;
              description?: string;
              highlights: string[];
            },
            index: number
          ) => (
            <div key={index} className="border-l-2 border-gray-300 dark:border-gray-700 pl-4">
              <div className="flex items-center gap-3 mb-2">
                {exp.logo && (
                  <div className="relative w-8 h-8 bg-white rounded overflow-hidden flex-shrink-0">
                    <Image src={exp.logo} alt={exp.company} fill className="object-contain" />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-lg">{exp.company}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{exp.role}</p>
                </div>
              </div>
              <p className="text-gray-500 text-xs mb-3">
                {exp.duration} • {exp.location}
              </p>

              {exp.description && (
                <p
                  className="text-sm mb-3"
                  dangerouslySetInnerHTML={{ __html: linkifyTech(exp.description) }}
                />
              )}

              {exp.highlights.length > 0 && (
                <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                  {exp.highlights.map((h: string, i: number) => (
                    <li key={i} className="flex">
                      <span className="mr-2 text-gray-500">-</span>
                      <span dangerouslySetInnerHTML={{ __html: linkifyTech(h) }} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        )}
      </div>

      {volunteerings.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-2">
            <span className="text-gray-500">##</span> Volunteering
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
            $ cat ~/community/roles.txt
          </p>

          <div className="space-y-4">
            {volunteerings.map(
              (
                vol: { organization: string; role: string; additionalInfo?: string },
                index: number
              ) => (
                <div key={index} className="border-l-2 border-gray-300 dark:border-gray-700 pl-4">
                  <h3 className="font-bold">{vol.organization}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{vol.role}</p>
                  {vol.additionalInfo && (
                    <p className="text-gray-500 text-xs mt-1">{vol.additionalInfo}</p>
                  )}
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}
