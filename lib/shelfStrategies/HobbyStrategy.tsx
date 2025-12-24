"use client";

import { ReactNode } from "react";
import { Dumbbell, Tv, Trophy, Bike, Mountain, Dices, Plane, Coffee, Users, Mic } from "lucide-react";
import { useStore } from "@/lib/store/useStore";
import { Hobby } from "@/types/definitions";
import { ShelfItemStrategy } from "./types";

const iconMap: Record<string, React.ElementType> = {
    Dumbbell, Tv, Book: Tv, Trophy, Bike, Mountain, Dices, Plane, Coffee, Users, Mic
};

export class HobbyListStrategy implements ShelfItemStrategy<Hobby> {
    private getIcon(iconName: string): ReactNode {
        const IconComponent = iconMap[iconName] as any;
        if (IconComponent) {
            return <IconComponent className="w-8 h-8 text-green-500" />;
        }
        return <span className="text-3xl">🎮</span>;
    }
    renderItem(hobby: Hobby, index: number): ReactNode {
        return (
            <div
                id={`shelf-item-${hobby.name}`}
                key={index}
                onClick={() => useStore.getState().setHobbySelectedItem(hobby)}
                className="group p-5 glass rounded-2xl border border-gray-100 dark:border-white/5 hover:border-green-500/30 transition-all duration-500 cursor-pointer overflow-hidden relative"
            >
                <div className="relative z-10">
                    <div className="mb-3 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 w-fit">
                        {this.getIcon(hobby.icon)}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{hobby.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                        {hobby.description}
                    </p>
                </div>
            </div>
        );
    }
    renderList(items: Hobby[]): ReactNode {
        if (items.length === 0) return null;
        return (
            <div className="grid grid-cols-2 gap-4 py-4">
                {items.map((hobby, index) => this.renderItem(hobby, index))}
            </div>
        );
    }
    filter(items: Hobby[], query: string): Hobby[] {
        if (!query) return items;
        const lowerQuery = query.toLowerCase();
        return items.filter(
            (hobby) =>
                hobby.name.toLowerCase().includes(lowerQuery) ||
                hobby.description.toLowerCase().includes(lowerQuery)
        );
    }
}
