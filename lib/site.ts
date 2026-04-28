/**
 * Site-wide constants used by metadata, OG images, sitemap, and RSS.
 * SITE_URL env overrides for deploys; defaults to localhost for dev.
 */
const rawUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? 'http://localhost:3000';

export const siteConfig = {
  name: 'Work Timeline',
  description:
    '진료, 연구, 일상의 작업을 시간순으로 기록하는 개인 포트폴리오 타임라인.',
  author: 'Jowon Jang',
  locale: 'ko_KR',
  url: rawUrl.replace(/\/$/, ''),
};

export type SiteConfig = typeof siteConfig;
