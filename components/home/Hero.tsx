import Link from "next/link";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { getProfile } from "@/lib/api";
import { BASE_PATH } from "@/lib/constants";
import Terminal from "@/components/widgets/Terminal";
import { ClientGithub as Github, ClientLinkedin as Linkedin, ClientMail as Mail } from "@/components/common/ClientIcons";
import { GlitchText } from "@/components/ui/GlitchText";

export default async function Hero() {
  const profile = await getProfile();

  return (
    <section className="section max-w-6xl mx-auto px-4 mt-12 mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Column - Description */}
        <div className="flex flex-col gap-6">
          <div className="font-mono mb-2 flex items-center gap-2">
            <span className="text-green-500 font-bold">$</span>{" "}
            <span className="text-gray-700 dark:text-gray-300">whoami</span>
            <span className="animate-pulse inline-block w-2 h-4 bg-green-500 align-middle"></span>
          </div>

          {/* Profile Picture and Name on Same Line */}
          <div className="flex items-center gap-6">
            {profile.avatar && (
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-green-500 shadow-lg shadow-green-500/50 flex-shrink-0">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <h1 className="title text-4xl md:text-5xl font-bold font-serif">
              <GlitchText text={profile.name} className="text-primary" />
            </h1>
          </div>

          <h3 className="title text-xl md:text-2xl font-bold text-primary font-serif">
            <GlitchText text={profile.bio.short} className="text-primary" />
          </h3>

          <div className="content text-lg leading-relaxed">
            {profile.bio.paragraphs.map((paragraph: string, index: number) => (
              <p
                key={index}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    paragraph
                      .replace(
                        "Trellix",
                        `<a href="https://trellix.com" target="_blank" class="text-green-700 dark:text-green-400 hover:underline">Trellix</a>`
                      )
                      .replace(
                        "Intel Corporation",
                        `<a href="https://intel.com" target="_blank" class="text-green-700 dark:text-green-400 hover:underline">Intel Corporation</a>`
                      )
                  ),
                }}
                className="mb-4"
              />
            ))}
          </div>

          <ul className="buttons flex flex-wrap gap-4">
            <Link
              className="button bg-white dark:bg-black border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-green-500 hover:text-green-700 dark:hover:text-green-400 transition-colors rounded-md px-4 py-2 flex items-center gap-2"
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title={`Follow ${profile.name} on LinkedIn`}
            >
              <span className="icon">
                <Linkedin className="w-5 h-5" />
              </span>
              <span>LinkedIn</span>
            </Link>
            <Link
              className="button bg-white dark:bg-black border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-green-500 hover:text-green-700 dark:hover:text-green-400 transition-colors rounded-md px-4 py-2 flex items-center gap-2"
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              title={`Follow ${profile.name} on GitHub`}
            >
              <span className="icon">
                <Github className="w-5 h-5" />
              </span>
              <span>GitHub</span>
            </Link>
            {profile.socials.email && (
              <Link
                className="button bg-white dark:bg-black border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-green-500 hover:text-green-700 dark:hover:text-green-400 transition-colors rounded-md px-4 py-2 flex items-center gap-2"
                href={`mailto:${profile.socials.email}`}
                target="_blank"
                rel="noopener noreferrer"
                title={`Email ${profile.name}`}
              >
                <span className="icon">
                  <Mail className="w-5 h-5" />
                </span>
                <span>Email</span>
              </Link>
            )}
          </ul>
        </div>

        {/* Right Column - Terminal */}
        <div className="lg:sticky lg:top-20">
          <Terminal />
        </div>
      </div>
    </section>
  );
}
