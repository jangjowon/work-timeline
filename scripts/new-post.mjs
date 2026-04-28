// Scaffolds a new MDX post under content/ with KST-stamped frontmatter.
//
// Usage:
//   npm run new-post "Post title"
//   npm run new-post "한글 제목" --slug okr-review
//   npm run new-post "Post title" --slug custom-slug --tag 회고 --tag OKR

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import { spawn } from 'node:child_process';

const root = path.resolve(url.fileURLToPath(import.meta.url), '../..');
const contentDir = path.join(root, 'content');

function parseArgs(argv) {
  const positional = [];
  const tags = [];
  let slug = null;
  let cover = '';
  let open = true;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--slug') {
      slug = argv[++i];
    } else if (arg.startsWith('--slug=')) {
      slug = arg.slice('--slug='.length);
    } else if (arg === '--tag') {
      tags.push(argv[++i]);
    } else if (arg.startsWith('--tag=')) {
      tags.push(arg.slice('--tag='.length));
    } else if (arg === '--cover') {
      cover = argv[++i];
    } else if (arg.startsWith('--cover=')) {
      cover = arg.slice('--cover='.length);
    } else if (arg === '--no-open') {
      open = false;
    } else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    } else {
      positional.push(arg);
    }
  }
  return { title: positional.join(' ').trim(), slug, tags, cover, open };
}

function printHelp() {
  console.log(`
Usage:
  npm run new-post "Post title"
  npm run new-post "한글 제목" --slug okr-review
  npm run new-post "Title" --slug my-slug --tag 회고 --tag OKR --cover /content-images/foo.jpg

Options:
  --slug <slug>    URL slug (required if title contains non-ASCII characters)
  --tag <name>     Add a tag (repeatable)
  --cover <path>   Cover image path (e.g. /content-images/foo.jpg)
  --no-open        Don't open the file in VS Code after creating it
  -h, --help       Show this help
`);
}

function todayInKST() {
  // KST = UTC+9. Format YYYY-MM-DD in Asia/Seoul regardless of host TZ.
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

function slugifyAscii(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isAsciiPrintable(s) {
  return /^[\x20-\x7e]+$/.test(s);
}

function deriveSlug(title, explicit) {
  if (explicit) {
    const cleaned = explicit.toLowerCase().trim();
    if (!/^[a-z0-9][a-z0-9-]*$/.test(cleaned)) {
      throw new Error(
        `Invalid --slug "${explicit}". Use lowercase letters, digits, and hyphens (e.g. okr-review).`
      );
    }
    return cleaned;
  }
  if (!isAsciiPrintable(title)) {
    throw new Error(
      `Title contains non-ASCII characters. Provide --slug, e.g.\n` +
      `  npm run new-post "${title}" --slug your-english-slug`
    );
  }
  const auto = slugifyAscii(title);
  if (!auto) {
    throw new Error('Could not derive a slug from the title. Pass --slug explicitly.');
  }
  return auto;
}

function buildFrontmatter({ title, date, tags, cover }) {
  const tagBlock = tags.length
    ? `tags:\n${tags.map((t) => `  - ${t}`).join('\n')}\n`
    : `tags: []\n`;
  const coverLine = cover ? `cover: ${cover}\n` : `cover: ''\n`;
  return `---\ntitle: ${title}\ndate: ${date}\n${tagBlock}${coverLine}---\n`;
}

function buildBody() {
  return `\n## 첫 번째 섹션\n\n여기에 본문을 작성합니다.\n`;
}

function tryOpenInVSCode(filePath) {
  // Best-effort: launch `code` if available. Don't fail the script if not.
  const isWin = process.platform === 'win32';
  const cmd = isWin ? 'code.cmd' : 'code';
  const child = spawn(cmd, [filePath], { stdio: 'ignore', detached: true, shell: isWin });
  child.on('error', () => {
    // `code` not in PATH — silently skip.
  });
  child.unref();
}

function main() {
  const { title, slug: rawSlug, tags, cover, open } = parseArgs(process.argv.slice(2));
  if (!title) {
    printHelp();
    process.exit(1);
  }

  const slug = deriveSlug(title, rawSlug);
  const date = todayInKST();
  const filePath = path.join(contentDir, `${slug}.mdx`);

  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }
  if (fs.existsSync(filePath)) {
    console.error(`✗ File already exists: ${path.relative(root, filePath)}`);
    console.error(`  Pick a different --slug or remove the existing file first.`);
    process.exit(1);
  }

  const contents = buildFrontmatter({ title, date, tags, cover }) + buildBody();
  fs.writeFileSync(filePath, contents, 'utf8');

  const rel = path.relative(root, filePath).replace(/\\/g, '/');
  console.log(`✓ Created ${rel}`);
  console.log(`  title: ${title}`);
  console.log(`  date:  ${date} (KST)`);
  console.log(`  slug:  ${slug}`);
  if (open) tryOpenInVSCode(filePath);
}

try {
  main();
} catch (err) {
  console.error(`✗ ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
}
