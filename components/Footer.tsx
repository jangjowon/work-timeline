export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="section-footer"
      className="border-t border-line bg-surface-footer py-10 text-[13px] text-ink-muted"
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-6">
        <div>© {year} Jowon Jang</div>
        <div>
          <a href="/rss.xml" className="transition-colors hover:text-accent">
            RSS
          </a>
        </div>
      </div>
    </footer>
  );
}
