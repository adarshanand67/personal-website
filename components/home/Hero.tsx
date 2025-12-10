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
    <section className="section max-w-6xl mx-auto px-4 mt-8 mb-8 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start max-lg:items-center max-lg:justify-center">
        <div className="flex flex-col gap-4 max-lg:items-center max-lg:text-center glass p-8 rounded-2xl">
          <div className="font-mono mb-1 flex items-center gap-2 group">
            <span className="text-green-500 font-bold text-lg group-hover:scale-110 transition-transform">$</span>{" "}
            <span className="text-gray-700 dark:text-gray-300">whoami</span>
            <span className="animate-pulse inline-block w-2 h-4 bg-green-500 align-middle"></span>
          </div>
          <div className="flex items-center gap-5">
            {profile.avatar && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-green-500 shadow-lg shadow-green-500/50 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
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
            <h1 className="title text-3xl md:text-5xl font-bold font-serif bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              <GlitchText text={profile.name} className="text-primary" />
            </h1>
          </div>
          <div className="relative inline-block">
            <h3 className="title text-lg md:text-2xl font-bold text-primary font-serif">
              <GlitchText text={profile.bio.short} className="text-primary" />
            </h3>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </div>
          <div className="content text-lg leading-relaxed space-y-3">
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
        </div>
        <div className="lg:sticky lg:top-20 max-lg:flex max-lg:flex-col max-lg:justify-center w-full">
          <div className="flex justify-center lg:justify-end mb-4 pr-4">
            <div className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass hover:scale-105 transition-all duration-300 cursor-help">
              <span className="text-xs text-green-700 dark:text-green-400">🔐</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                Psst... hidden CTF challenge
              </span>
            </div>
          </div>
          <Terminal />
        </div>
      </div>
    </section>
  );
}
