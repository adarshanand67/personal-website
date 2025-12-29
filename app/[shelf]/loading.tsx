import { Skeleton } from "@/components/ui";

export default function ShelfLoading() {
  return (
    <div className="section max-w-7xl mx-auto px-4 mt-12 mb-12 font-mono">
      {/* Header Skeleton */}
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-2 w-full">
          <Skeleton variant="text" width="40%" height={40} />
          <Skeleton variant="text" width="60%" />
        </div>
      </div>

      {/* Search Bar Skeleton */}
      <Skeleton variant="rect" height={40} className="mb-8" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="glass p-4 rounded-xl space-y-4">
            <Skeleton variant="rect" height={200} />
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="40%" />
            <div className="flex gap-2">
              <Skeleton
                variant="rect"
                width={60}
                height={20}
                className="rounded-full"
              />
              <Skeleton
                variant="rect"
                width={60}
                height={20}
                className="rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
