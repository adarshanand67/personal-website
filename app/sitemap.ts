import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site.config';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/blogshelf',
    '/papershelf',
    '/bookshelf',
    '/animeshelf',
    '/hobbyshelf'
  ];
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
