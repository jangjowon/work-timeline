import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/posts';
import { formatPostDate } from '@/lib/date';

type Props = {
  post: Post;
};

function getExcerpt(content: string): string {
  const trimmed = content.trim();
  const firstParagraph = trimmed.split(/\n\s*\n/)[0] ?? trimmed;
  return firstParagraph.replace(/\s+/g, ' ').trim();
}

export default function PostCard({ post }: Props) {
  const excerpt = getExcerpt(post.content);

  return (
    <article className="mb-11 sm:mb-14">
      <div className="mb-2.5 text-[13px] font-semibold tracking-wide text-accent">
        {formatPostDate(post.date)}
      </div>

      <h2 className="mb-4 font-serif text-[21px] font-bold leading-[1.35] tracking-tight sm:text-2xl">
        <Link
          href={`/posts/${post.slug}`}
          className="link-underline"
        >
          {post.title}
        </Link>
      </h2>

      {post.cover && (
        <div className="mb-4 aspect-[16/9] overflow-hidden rounded-lg border border-line bg-surface-muted">
          <Image
            src={post.cover}
            alt={post.title}
            width={720}
            height={405}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {excerpt && (
        <p className="mb-4 text-base leading-relaxed text-ink-secondary">
          {excerpt}
        </p>
      )}

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
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
    </article>
  );
}
