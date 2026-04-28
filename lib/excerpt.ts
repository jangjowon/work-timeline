/**
 * Build a plain-text excerpt from MDX source. Strips frontmatter-free MDX:
 * skips headings/code-fences/images/HTML/JSX blocks, takes the first prose
 * paragraph, removes inline markdown markers, and clips to maxLen graphemes.
 */
export function buildExcerpt(content: string, maxLen = 200): string {
  const blocks = content.trim().split(/\n\s*\n/);

  const proseBlock = blocks.find((block) => {
    const trimmed = block.trim();
    if (!trimmed) return false;
    if (trimmed.startsWith('#')) return false;
    if (trimmed.startsWith('```')) return false;
    if (trimmed.startsWith('!')) return false;
    if (trimmed.startsWith('<')) return false;
    return true;
  });

  if (!proseBlock) return '';

  const plain = proseBlock
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`>~]/g, '')
    .replace(/^#+\s*/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (plain.length <= maxLen) return plain;
  return `${plain.slice(0, maxLen - 1).trimEnd()}…`;
}
