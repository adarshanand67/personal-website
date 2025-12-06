import { getEntertainment } from "@/lib/api";

export default async function AnimeShelf() {
  const items = await getEntertainment();
  const anime = items.filter((item) => item.type === "Anime");
  const movies = items.filter((item) => item.type === "Movie");

  const watchedAnime = anime.filter((item) => item.status === "Completed");
  const plannedAnime = anime.filter((item) => item.status !== "Completed");

  const watchedMovies = movies.filter((item) => item.status === "Completed");
  const plannedMovies = movies.filter((item) => item.status !== "Completed");

  return (
    <div className="section container mx-auto px-4 mt-12 mb-12">
      <h1 className="title text-4xl font-bold font-serif mb-8">Anime Shelf</h1>
      <p className="text-gray-600 mb-8">
        A collection of anime and movies I've watched and enjoyed.
      </p>

      {/* Anime Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold font-serif mb-8 border-b border-gray-200 pb-2">
          Anime
        </h2>

        {/* Watched Anime */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
            Watched
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchedAnime.map((item, index) => (
              <div
                key={index}
                className="box p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl">{item.title}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    {item.status}
                  </span>
                </div>
                {item.notes && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Planned Anime */}
        <div>
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
            Plan to Watch
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plannedAnime.map((item, index) => (
              <div
                key={index}
                className="box p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl">{item.title}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                    {item.status}
                  </span>
                </div>
                {item.notes && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Movies Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold font-serif mb-8 border-b border-gray-200 pb-2">
          Movies
        </h2>

        {/* Watched Movies */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
            Watched
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchedMovies.map((item, index) => (
              <div
                key={index}
                className="box p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl">{item.title}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    {item.status}
                  </span>
                </div>
                {item.notes && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Planned Movies */}
        <div>
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
            Plan to Watch
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plannedMovies.map((item, index) => (
              <div
                key={index}
                className="box p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl">{item.title}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                    {item.status}
                  </span>
                </div>
                {item.notes && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
