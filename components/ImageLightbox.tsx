'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  src: string;
  alt?: string;
};

const DEFAULT_W = 1600;
const DEFAULT_H = 900;

function isSvg(src: string): boolean {
  return /\.svg(?:[?#]|$)/i.test(src);
}

function isRemote(src: string): boolean {
  return /^https?:\/\//i.test(src);
}

export default function ImageLightbox({ src, alt = '' }: Props) {
  const [open, setOpen] = useState(false);
  // Empty alt strings mark decorative images; otherwise it's content.
  const isDecorative = alt.trim() === '';
  const unoptimized = isSvg(src) || isRemote(src);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={isDecorative ? '이미지 확대' : `${alt} (확대 보기)`}
        className="block w-full cursor-zoom-in border-0 bg-transparent p-0"
      >
        <Image
          src={src}
          alt={alt}
          width={DEFAULT_W}
          height={DEFAULT_H}
          sizes="(min-width: 720px) 720px, 100vw"
          unoptimized={unoptimized}
          className="h-auto w-full rounded-lg"
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt || '이미지 미리보기'}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="닫기"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <span aria-hidden="true" className="text-2xl leading-none">
              ×
            </span>
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-full max-w-full"
          >
            <Image
              src={src}
              alt={alt}
              width={DEFAULT_W}
              height={DEFAULT_H}
              sizes="100vw"
              unoptimized={unoptimized}
              className="max-h-[90vh] w-auto cursor-default rounded-md object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
