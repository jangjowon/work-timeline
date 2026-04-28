// Generates lib/generated/posts-manifest.json from content/*.mdx so that
// edge-runtime modules (e.g. opengraph-image) can read post metadata
// without importing the fs-based lib/posts loader.

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import matter from 'gray-matter';

const root = path.resolve(url.fileURLToPath(import.meta.url), '../..');
const contentDir = path.join(root, 'content');
const outDir = path.join(root, 'lib', 'generated');
const outFile = path.join(outDir, 'posts-manifest.json');

function readPosts() {
  if (!fs.existsSync(contentDir)) return [];
  const entries = fs.readdirSync(contentDir, { withFileTypes: true });
  const posts = [];
  for (const entry of entries) {
    if (!entry.isFile() || !/\.mdx?$/.test(entry.name)) continue;
    const slug = entry.name.replace(/\.mdx?$/, '');
    const raw = fs.readFileSync(path.join(contentDir, entry.name), 'utf8');
    const { data } = matter(raw);
    if (!data.title || !data.date) continue;
    const date =
      data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : String(data.date).slice(0, 10);
    posts.push({
      slug,
      title: data.title,
      date,
      tags: data.tags ?? [],
    });
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

const posts = readPosts();
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify({ posts }, null, 2) + '\n', 'utf8');
console.log(`[posts-manifest] wrote ${posts.length} posts → ${path.relative(root, outFile)}`);
