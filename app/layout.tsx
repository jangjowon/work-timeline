import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, Noto_Serif_KR } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/site';
import ThemeScript from '@/components/ThemeScript';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const notoSerifKr = Noto_Serif_KR({
  weight: ['400', '500', '600', '700'],
  preload: false,
  variable: '--font-noto-serif-kr',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [
        { url: '/rss.xml', title: `${siteConfig.name} RSS feed` },
      ],
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF8F4' },
    { media: '(prefers-color-scheme: dark)', color: '#1F1B16' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${notoSerifKr.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="bg-surface font-sans text-ink-primary antialiased">
        {children}
      </body>
    </html>
  );
}
