import { ROUTES } from '@/lib/constants';
import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site.config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    ROUTES.BLOG_SHELF,
    ROUTES.PAPER_SHELF,
    ROUTES.BOOK_SHELF,
    ROUTES.ANIME_SHELF,
    ROUTES.HOBBY_SHELF
  ];
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
