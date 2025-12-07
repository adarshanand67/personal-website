import { getEntertainment } from "@/lib/api";
import { Star } from "lucide-react";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export default async function AnimeShelf() {
  const items = await getEntertainment();
  const anime = items.filter((item) => item.type === "Anime");
  const movies = items.filter((item) => item.type === "Movie");

  const watchedAnime = anime.filter((item) => item.status === "Completed");
  const plannedAnime = anime.filter((item) => item.status !== "Completed");

  const watchedMovies = movies.filter((item) => item.status === "Completed");
  const plannedMovies = movies.filter((item) => item.status !== "Completed");

  const Card = ({ item, index }: { item: any, index: number }) => (
    <FadeIn delay={index * 0.05} className="h-full">
      <SpotlightCard className="h-full flex flex-col p-0">
        {item.image ? (
          <div className="relative w-full aspect-[2/3]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="w-full aspect-[2/3] bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 className="font-bold text-lg leading-tight flex items-start gap-2">
              <span className="line-clamp-2">{item.title}</span>
              {item.recommended && (
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 shrink-0 mt-1" />
              )}
            </h3>
          </div>

          {item.notes && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-3">
              {item.notes}
            </p>
          )}

          <div className="mt-auto pt-2">
            <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'} inline-block`}>
              {item.status}
            </span>
          </div>
        </div>
      </SpotlightCard>
    </FadeIn>
  );

  return (
    <div className="section container mx-auto px-4 mt-12 mb-12">
      <FadeIn>
        <h1 className="title text-4xl font-bold font-serif mb-8">
          Anime Shelf{" "}
          <span className="text-gray-400 text-2xl">({items.length})</span>
        </h1>
        <p className="text-gray-600 mb-8">
          A collection of anime and movies I&apos;ve watched and enjoyed.
        </p>
      </FadeIn>

      {/* Anime Section */}
      <div className="mb-12">
        <FadeIn>
          <h2 className="text-3xl font-bold font-serif mb-8 border-b border-gray-200 pb-2">
            Anime <span className="text-gray-400 text-xl">({anime.length})</span>
          </h2>
        </FadeIn>

        {/* Watched Anime */}
        <div className="mb-8">
          <FadeIn>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
              Watched
            </h3>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {watchedAnime.map((item, index) => (
              <Card key={index} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Planned Anime */}
        <div>
          <FadeIn>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
              Planning
            </h3>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {plannedAnime.map((item, index) => (
              <Card key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Movies Section */}
      <div className="mb-12">
        <FadeIn>
          <h2 className="text-3xl font-bold font-serif mb-8 border-b border-gray-200 pb-2">
            Movies <span className="text-gray-400 text-xl">({movies.length})</span>
          </h2>
        </FadeIn>

        {/* Watched Movies */}
        <div className="mb-8">
          <FadeIn>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
              Watched
            </h3>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {watchedMovies.map((item, index) => (
              <Card key={index} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Planned Movies */}
        <div>
          <FadeIn>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
              Planning
            </h3>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {plannedMovies.map((item, index) => (
              <Card key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
