"use client";

import { ShelfType } from "@/types/definitions";
import { ShelfItem, ShelfItemStrategy } from "./shelfStrategies/types";
import { BookListStrategy } from "./shelfStrategies/BookStrategy";
import { PaperListStrategy } from "./shelfStrategies/PaperStrategy";
import { AnimeCardStrategy } from "./shelfStrategies/AnimeStrategy";
import { BlogListStrategy } from "./shelfStrategies/BlogStrategy";
import { ProjectListStrategy } from "./shelfStrategies/ProjectStrategy";
import { HobbyListStrategy } from "./shelfStrategies/HobbyStrategy";
import { ArticleListStrategy } from "./shelfStrategies/ArticleStrategy";

export * from "./shelfStrategies/types";
export * from "./shelfStrategies/BookStrategy";
export * from "./shelfStrategies/PaperStrategy";
export * from "./shelfStrategies/AnimeStrategy";
export * from "./shelfStrategies/BlogStrategy";
export * from "./shelfStrategies/ProjectStrategy";
export * from "./shelfStrategies/HobbyStrategy";
export * from "./shelfStrategies/ArticleStrategy";

export class ShelfStrategyFactory {
    static getStrategy(type: ShelfType): ShelfItemStrategy<ShelfItem> {
        switch (type) {
            case ShelfType.Book:
                return new BookListStrategy();
            case ShelfType.Paper:
                return new PaperListStrategy();
            case ShelfType.Anime:
                return new AnimeCardStrategy();
            case ShelfType.Blog:
                return new BlogListStrategy();
            case ShelfType.Project:
                return new ProjectListStrategy();
            case ShelfType.Hobby:
                return new HobbyListStrategy();
            case ShelfType.Article:
                return new ArticleListStrategy();
            default:
                throw new Error(`Unknown shelf type: ${type}`);
        }
    }
}
