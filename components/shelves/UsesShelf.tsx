"use client";
import { ShelfHeader } from "@/components/shelves/ShelfHeader";
import { useStore } from "@/lib/store/useStore";

interface UsesItem {
    name: string;
    description: string;
}
interface UsesData {
    hardware: UsesItem[];
    software: UsesItem[];
}
interface UsesShelfProps {
    initialUses: UsesData;
}
export default function UsesShelf({ initialUses }: UsesShelfProps) {
    const { searchQuery, setSearchQuery } = useStore();

    const filterItems = (items: UsesItem[]) => {
        if (!searchQuery) return items;
        return items.filter(
            (item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };
    const filteredHardware = filterItems(initialUses.hardware);
    const filteredSoftware = filterItems(initialUses.software);
    const totalCount = filteredHardware.length + filteredSoftware.length;
    return (
        <div className="section max-w-4xl mx-auto px-4 mt-12 mb-12 font-mono">
            <ShelfHeader
                title="Uses"
                description="The hardware, software, and gear I use daily."
                count={totalCount}
                command="cat ~/setup.json"
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                searchPlaceholder="Search setup..."
            />
            <div className="space-y-12">
                {filteredHardware.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="text-gray-500">##</span> Hardware
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredHardware.map((item, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-green-500 transition-colors"
                                >
                                    <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                {filteredSoftware.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="text-gray-500">##</span> Software
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredSoftware.map((item, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-green-500 transition-colors"
                                >
                                    <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                {totalCount === 0 && (
                    <p className="text-gray-500 text-center py-8">
                        No items found matching &quot;{searchQuery}&quot;
                    </p>
                )}
            </div>
        </div>
    );
}
