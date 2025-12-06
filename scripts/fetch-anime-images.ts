
import fs from 'fs';
import path from 'path';
import https from 'https';

const DATA_FILE = path.join(process.cwd(), 'data', 'anime.json');

interface AnimeItem {
    title: string;
    type: string;
    status: string;
    notes?: string;
    image?: string;
    recommended?: boolean;
}

// Simple sleep function to respect rate limits
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch JSON wrapper
const fetchJson = (url: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
};

async function main() {
    console.log('Reading data/anime.json...');
    const rawData = fs.readFileSync(DATA_FILE, 'utf-8');
    const animeList: AnimeItem[] = JSON.parse(rawData);
    let updatedCount = 0;

    console.log(`Found ${animeList.length} items. Starting fetch...`);

    for (let i = 0; i < animeList.length; i++) {
        const item = animeList[i];

        if (item.image) {
            console.log(`[${i + 1}/${animeList.length}] Skipping "${item.title}" (Image already exists)`);
            continue;
        }

        try {
            console.log(`[${i + 1}/${animeList.length}] Fetching "${item.title}"...`);

            // Jikan API search
            const query = encodeURIComponent(item.title);
            const url = `https://api.jikan.moe/v4/anime?q=${query}&limit=1`;

            const response = await fetchJson(url);

            if (response.data && response.data.length > 0) {
                const imageUrl = response.data[0].images.jpg.large_image_url || response.data[0].images.jpg.image_url;
                item.image = imageUrl;
                updatedCount++;
                console.log(`  -> Found: ${imageUrl}`);
            } else {
                console.log(`  -> No results found for "${item.title}"`);
            }

            // Respect rate limit (aim for ~1 request per second or slower)
            await sleep(1000);

        } catch (error) {
            console.error(`  -> Error fetching "${item.title}":`, error);
        }
    }

    if (updatedCount > 0) {
        console.log(`Updating data/anime.json with ${updatedCount} new images...`);
        fs.writeFileSync(DATA_FILE, JSON.stringify(animeList, null, 2));
        console.log('Done!');
    } else {
        console.log('No updates needed.');
    }
}

main().catch(console.error);
