import { ogContentType, ogSize, renderOgImage } from '@/lib/og';
import { siteConfig } from '@/lib/site';

// Edge runtime works on every host, including Windows; the @vercel/og nodejs
// bundle has a Windows-only file:// URL parsing bug that breaks at module load.
export const runtime = 'edge';
export const alt = `${siteConfig.name} — ${siteConfig.description}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: siteConfig.name,
    subtitle: siteConfig.description,
  });
}
