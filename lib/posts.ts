import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type Post = {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
  cover?: string;
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), 'content');

function readPostFile(filename: string): Post {
  const slug = filename.replace(/\.mdx?$/, '');
  const fullPath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);

  if (!data.title || !data.date) {
    throw new Error(`Post "${filename}" is missing required frontmatter (title, date).`);
  }

  const date =
    data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : String(data.date);

  return {
    slug,
    title: data.title,
    date,
    tags: data.tags,
    cover: data.cover,
    content,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const entries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && /\.mdx?$/.test(entry.name))
    .map((entry) => entry.name);

  return files
    .map(readPostFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  for (const ext of ['mdx', 'md']) {
    const candidate = path.join(CONTENT_DIR, `${slug}.${ext}`);
    if (fs.existsSync(candidate)) {
      return readPostFile(`${slug}.${ext}`);
    }
  }
  return null;
}

export type AdjacentPosts = {
  previous: Post | null;
  next: Post | null;
};

export function getAdjacentPosts(slug: string): AdjacentPosts {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null,
  };
}
