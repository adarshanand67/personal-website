import Link from "next/link";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { getProfile } from "@/lib/api";
import Terminal from "@/components/widgets/Terminal";
import { ClientGithub as Github, ClientLinkedin as Linkedin, ClientMail as Mail } from "@/components/common/ClientIcons";
import { GlitchText } from "@/components/ui/GlitchText";

export default async function Hero() {
  const profile = await getProfile();

  return (
    <section className="section max-w-6xl mx-auto px-4 mt-12 mb-12 relative">
      {/* Gradient background effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-lg:items-center max-lg:justify-center">
        {/* Left Column - Description */}
        <div className="flex flex-col gap-6 max-lg:items-center max-lg:text-center">
          {/* Terminal prompt with enhanced styling */}
          <div className="font-mono mb-2 flex items-center gap-2 group">
            <span className="text-green-500 font-bold text-lg group-hover:scale-110 transition-transform">$</span>{" "}
            <span className="text-gray-700 dark:text-gray-300">whoami</span>
            <span className="animate-pulse inline-block w-2 h-4 bg-green-500 align-middle"></span>
          </div>

          {/* Profile Picture and Name with enhanced design */}
          <div className="flex items-center gap-6">
            {profile.avatar && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-green-500 shadow-lg shadow-green-500/50 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            )}
            <h1 className="title text-4xl md:text-5xl font-bold font-serif bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              <GlitchText text={profile.name} className="text-primary" />
            </h1>
          </div>

          {/* Bio with gradient underline */}
          <div className="relative inline-block">
            <h3 className="title text-xl md:text-2xl font-bold text-primary font-serif">
              <GlitchText text={profile.bio.short} className="text-primary" />
            </h3>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </div>

          {/* Content with better typography */}
          <div className="content text-lg leading-relaxed space-y-4">
            {profile.bio.paragraphs.map((paragraph: string, index: number) => (
              <p
                key={index}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    paragraph
                      .replace(
                        "Trellix",
                        `<a href="https://trellix.com" target="_blank" class="text-green-700 dark:text-green-400 hover:underline font-semibold hover:text-green-600 dark:hover:text-green-300 transition-colors">Trellix</a>`
                      )
                      .replace(
                        "Intel Corporation",
                        `<a href="https://intel.com" target="_blank" class="text-green-700 dark:text-green-400 hover:underline font-semibold hover:text-green-600 dark:hover:text-green-300 transition-colors">Intel Corporation</a>`
                      )
                  ),
                }}
                className="text-gray-700 dark:text-gray-300"
              />
            ))}
          </div>

          {/* Enhanced social buttons */}
          <ul className="buttons flex flex-wrap gap-4">
            <Link
              className="button group relative overflow-hidden bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-black border-2 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-green-500 dark:hover:border-green-400 transition-all duration-300 rounded-lg px-6 py-3 flex items-center gap-2 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-0.5"
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title={`Follow ${profile.name} on LinkedIn`}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <span className="icon relative z-10 group-hover:scale-110 transition-transform">
                <Linkedin className="w-5 h-5" />
              </span>
              <span className="relative z-10 font-medium">LinkedIn</span>
            </Link>
            <Link
              className="button group relative overflow-hidden bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-black border-2 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-green-500 dark:hover:border-green-400 transition-all duration-300 rounded-lg px-6 py-3 flex items-center gap-2 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-0.5"
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              title={`Follow ${profile.name} on GitHub`}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <span className="icon relative z-10 group-hover:scale-110 transition-transform">
                <Github className="w-5 h-5" />
              </span>
              <span className="relative z-10 font-medium">GitHub</span>
            </Link>
            {profile.socials.email && (
              <Link
                className="button group relative overflow-hidden bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-black border-2 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-green-500 dark:hover:border-green-400 transition-all duration-300 rounded-lg px-6 py-3 flex items-center gap-2 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-0.5"
                href={`mailto:${profile.socials.email}`}
                target="_blank"
                rel="noopener noreferrer"
                title={`Email ${profile.name}`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                <span className="icon relative z-10 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </span>
                <span className="relative z-10 font-medium">Email</span>
              </Link>
            )}
          </ul>
        </div>

        {/* Right Column - Terminal */}
        <div className="lg:sticky lg:top-20 max-lg:flex max-lg:justify-center">
          <Terminal />
        </div>
      </div>
    </section>
  );
}
