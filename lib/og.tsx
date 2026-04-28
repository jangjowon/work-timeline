import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

type RenderOptions = {
  title: string;
  subtitle?: string;
};

const COLOR_BG = '#FAF8F4';
const COLOR_BG_BAND = '#F1EDE5';
const COLOR_INK = '#2B2A27';
const COLOR_MUTED = '#6B6862';
const COLOR_ACCENT = '#3F7D5C';

export function renderOgImage({ title, subtitle }: RenderOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          background: COLOR_BG,
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: 18,
            height: '100%',
            background: COLOR_ACCENT,
            display: 'flex',
          }}
        />

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '88px 96px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              color: COLOR_ACCENT,
              fontStyle: 'italic',
              letterSpacing: '0.01em',
            }}
          >
            {subtitle ?? ''}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              maxWidth: 980,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: title.length > 60 ? 64 : 80,
                fontWeight: 700,
                color: COLOR_INK,
                lineHeight: 1.15,
                letterSpacing: '-0.015em',
              }}
            >
              {title}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 24,
              color: COLOR_MUTED,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontWeight: 600,
                color: COLOR_INK,
                letterSpacing: '-0.01em',
              }}
            >
              {siteConfig.name}
            </div>
            <div
              style={{
                display: 'flex',
                height: 14,
                width: 14,
                borderRadius: 999,
                background: COLOR_ACCENT,
              }}
            />
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: COLOR_BG_BAND,
            display: 'flex',
          }}
        />
      </div>
    ),
    ogSize,
  );
}
