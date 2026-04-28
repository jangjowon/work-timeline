type Props = {
  label: string;
  first?: boolean;
};

export default function MonthAnchor({ label, first }: Props) {
  return (
    <div
      className={`flex items-center gap-4 text-[13px] font-semibold uppercase tracking-wider text-ink-muted after:h-px after:flex-1 after:bg-line after:content-[''] ${
        first ? 'mt-0 mb-8' : 'mt-12 mb-8'
      }`}
    >
      {label}
    </div>
  );
}
