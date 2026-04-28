import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Nav() {
  return (
    <nav
      id="section-nav"
      aria-label="사이트 내비게이션"
      className="sticky top-0 z-50 border-b border-line bg-surface-nav backdrop-blur supports-[backdrop-filter]:bg-surface-nav"
    >
      <div className="mx-auto flex h-14 max-w-content items-center justify-between px-6">
        <Link
          href="/"
          className="font-serif text-base font-semibold tracking-tight"
        >
          Work Timeline
        </Link>
        <div className="flex items-center gap-5 text-sm text-ink-secondary">
          <Link href="/" className="transition-colors hover:text-accent">
            About
          </Link>
          <Link
            href="/rss.xml"
            className="transition-colors hover:text-accent"
            prefetch={false}
          >
            RSS
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
