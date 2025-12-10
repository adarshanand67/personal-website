
import { MetadataRoute } from 'next';
import { siteConfig } from '@/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/blogshelf',
    '/papershelf',
    '/bookshelf',
    '/animeshelf',
    '/HobbyShelf'
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
