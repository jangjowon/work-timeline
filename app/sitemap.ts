import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0]?.date ?? new Date().toISOString().slice(0, 10);

  const home: MetadataRoute.Sitemap[number] = {
    url: `${siteConfig.url}/`,
    lastModified: latest,
    changeFrequency: 'weekly',
    priority: 1,
  };

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/posts/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [home, ...postEntries];
}
