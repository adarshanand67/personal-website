
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import Image from "next/image";
import { getProfile } from "@/lib/api";

export default async function Hero() {
  const profile = await getProfile();

  return (
    <div className="section container mx-auto px-4 mt-12 mb-12">
      <div className="columns is-vcentered flex flex-col md:flex-row items-center gap-8">
        <div className="column is-5 is-hidden-tablet md:hidden">
          <div className="image is-256x256 w-64 h-64 relative rounded-full overflow-hidden mx-auto">
            <Image
              src="/assets/dp.jpg"
              alt={profile.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="column is-7 w-full md:w-7/12">
          <section>
            <h1 className="title text-4xl md:text-5xl font-bold font-serif mb-4">
              Hey, I am {profile.name.split(" ")[0]}
            </h1>
            <h3 className="title text-xl md:text-2xl font-bold text-primary font-serif mb-6">
              {profile.bio.short}
            </h3>
            <div className="content text-lg leading-relaxed mb-8">
              {profile.bio.paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: paragraph.replace("Trellix", `<a href="https://trellix.com" target="_blank" class="text-blue-600 hover:underline">Trellix</a>`).replace("Intel Corporation", `<a href="https://intel.com" target="_blank" class="text-blue-600 hover:underline">Intel Corporation</a>`) }} />
              ))}
            </div>
            <ul className="buttons flex flex-wrap gap-4">
              <Link
                className="button bg-white dark:bg-zinc-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-600 hover:text-blue-600 transition-colors rounded-md px-4 py-2 flex items-center gap-2"
                href={profile.socials.linkedin}
                target="_blank"
                title={`Follow ${profile.name} on LinkedIn`}
              >
                <span className="icon">
                  <Linkedin className="w-5 h-5" />
                </span>
                <span>LinkedIn</span>
              </Link>
              <Link
                className="button bg-white dark:bg-zinc-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-600 hover:text-blue-600 transition-colors rounded-md px-4 py-2 flex items-center gap-2"
                href={profile.socials.github}
                target="_blank"
                title={`Follow ${profile.name} on GitHub`}
              >
                <span className="icon">
                  <Github className="w-5 h-5" />
                </span>
                <span>GitHub</span>
              </Link>
            </ul>
          </section>
        </div>
        <div className="column is-1 hidden md:block"></div>
        <div className="column is-4 is-hidden-mobile hidden md:block w-4/12">
          <div className="image section">
            <div className="w-[300px] h-[300px] bg-gray-200 dark:bg-gray-800 rounded-[2em] flex items-center justify-center mx-auto overflow-hidden relative">
              <Image
                src="/assets/dp.jpg"
                alt={profile.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

