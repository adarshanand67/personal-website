import { Skeleton } from "@/components/ui";

export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto px-4 mt-24 space-y-12">
            {/* Hero Skeleton */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <Skeleton variant="circle" width={160} height={160} className="shrink-0" />
                <div className="flex-1 space-y-4">
                    <Skeleton variant="text" width="40%" height={40} />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="30%" />
                </div>
            </div>

            {/* Content Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <Skeleton variant="text" width="30%" height={32} />
                    <div className="glass p-6 rounded-xl space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex gap-4">
                                <Skeleton variant="rect" width={48} height={48} />
                                <div className="flex-1 space-y-2">
                                    <Skeleton variant="text" width="70%" />
                                    <Skeleton variant="text" width="40%" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="space-y-4">
                    <Skeleton variant="text" width="30%" height={32} />
                    <div className="glass p-6 rounded-xl grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <Skeleton key={i} variant="rect" height={40} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
