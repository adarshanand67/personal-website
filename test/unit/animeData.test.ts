import { describe, it, expect } from 'vitest';
import { animeData } from '@/data/anime';
import { WatchStatus, AnimeType } from '@/types/definitions';

describe('Anime Data Layer', () => {
    it('should have a non-empty anime collection', () => {
        expect(animeData.length).toBeGreaterThan(0);
    });

    it('should contain the specific recommended anime "Dr. Stone"', () => {
        const drStone = animeData.find(a => a.title === 'Dr. Stone');
        expect(drStone).toBeDefined();
        expect(drStone?.recommended).toBe(true);
    });

    it('should have consistent data structures', () => {
        animeData.forEach(item => {
            expect(item.title).toBeDefined();
            expect(Object.values(AnimeType)).toContain(item.type);
            expect(Object.values(WatchStatus)).toContain(item.status);
        });
    });

    it('should properly categorize movies', () => {
        const movies = animeData.filter(item => item.type === AnimeType.Movie);
        expect(movies.length).toBeGreaterThan(0);
        movies.forEach(movie => {
            expect(movie.type).toBe(AnimeType.Movie);
        });
    });
});
