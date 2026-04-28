import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import MdxBody from '@/components/MdxBody';
import { getAdjacentPosts, getAllPosts, getPostBySlug } from '@/lib/posts';
import { formatPostDate } from '@/lib/date';
import { buildExcerpt } from '@/lib/excerpt';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: 'Not Found' };
  }

  const description = buildExcerpt(post.content, 160);
  const url = `/posts/${post.slug}`;

  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      url,
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
    },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { previous, next } = getAdjacentPosts(params.slug);

  return (
    <>
      <Nav />

      <main className="bg-surface-feed pb-[120px] pt-10 sm:pt-14">
        <article>
          <div className="mx-auto max-w-content px-6">
            <Link
              href="/"
              className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-secondary transition-colors hover:text-accent"
            >
              <span
                aria-hidden="true"
                className="transition-transform group-hover:-translate-x-0.5"
              >
                ←
              </span>
              모든 업무 보기
            </Link>

            <header className="mt-10 border-b border-line pb-8">
              <div className="font-serif text-xl italic text-accent sm:text-2xl">
                {formatPostDate(post.date)}
              </div>
              <h1 className="mt-3 font-serif text-[32px] font-bold leading-[1.25] tracking-tight text-ink-primary sm:text-[40px]">
                {post.title}
              </h1>

              {post.tags && post.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-surface-muted px-2.5 py-1 text-[13px] text-ink-muted"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {post.cover && (
              <div className="mt-10 overflow-hidden rounded-lg border border-line bg-surface-muted">
                <Image
                  src={post.cover}
                  alt={post.title}
                  width={1440}
                  height={810}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            )}

            <div className="mt-10">
              <MdxBody source={post.content} />
            </div>

            <nav
              aria-label="다른 포스트"
              className="mt-20 grid grid-cols-1 gap-4 border-t border-line pt-10 sm:grid-cols-2"
            >
              {previous ? (
                <Link
                  href={`/posts/${previous.slug}`}
                  className="group flex flex-col gap-1.5 rounded-lg border border-line bg-surface-card p-5 transition-colors hover:border-accent"
                >
                  <span className="text-[12px] font-semibold uppercase tracking-wider text-ink-muted">
                    ← 이전 포스트
                  </span>
                  <span className="font-serif text-[17px] font-semibold leading-snug text-ink-primary transition-colors group-hover:text-accent">
                    {previous.title}
                  </span>
                  <span className="text-[13px] text-ink-secondary">
                    {formatPostDate(previous.date)}
                  </span>
                </Link>
              ) : (
                <div aria-hidden="true" />
              )}

              {next ? (
                <Link
                  href={`/posts/${next.slug}`}
                  className="group flex flex-col gap-1.5 rounded-lg border border-line bg-surface-card p-5 text-right transition-colors hover:border-accent sm:items-end"
                >
                  <span className="text-[12px] font-semibold uppercase tracking-wider text-ink-muted">
                    다음 포스트 →
                  </span>
                  <span className="font-serif text-[17px] font-semibold leading-snug text-ink-primary transition-colors group-hover:text-accent">
                    {next.title}
                  </span>
                  <span className="text-[13px] text-ink-secondary">
                    {formatPostDate(next.date)}
                  </span>
                </Link>
              ) : (
                <div aria-hidden="true" />
              )}
            </nav>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
