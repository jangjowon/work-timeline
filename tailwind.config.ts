import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: 'var(--color-surface)',
          nav: 'var(--color-surface-nav)',
          profile: 'var(--color-surface-profile)',
          feed: 'var(--color-surface-feed)',
          card: 'var(--color-surface-card)',
          footer: 'var(--color-surface-footer)',
          muted: 'var(--color-surface-muted)',
        },
        ink: {
          primary: 'var(--color-ink-primary)',
          secondary: 'var(--color-ink-secondary)',
          muted: 'var(--color-ink-muted)',
        },
        line: {
          DEFAULT: 'var(--color-line)',
          strong: 'var(--color-line-strong)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          soft: 'var(--color-accent-soft)',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'var(--font-noto-serif-kr)',
          'system-ui',
          'sans-serif',
        ],
        serif: [
          'var(--font-playfair)',
          'var(--font-noto-serif-kr)',
          'Georgia',
          'serif',
        ],
        korean: ['var(--font-noto-serif-kr)', 'serif'],
      },
      maxWidth: {
        content: '720px',
      },
      spacing: {
        'card-gap': '56px',
        'card-gap-sm': '44px',
      },
      typography: () => ({
        timeline: {
          css: {
            '--tw-prose-body': 'var(--color-ink-primary)',
            '--tw-prose-headings': 'var(--color-ink-primary)',
            '--tw-prose-lead': 'var(--color-ink-secondary)',
            '--tw-prose-links': 'var(--color-accent)',
            '--tw-prose-bold': 'var(--color-ink-primary)',
            '--tw-prose-counters': 'var(--color-ink-muted)',
            '--tw-prose-bullets': 'var(--color-line-strong)',
            '--tw-prose-hr': 'var(--color-line)',
            '--tw-prose-quotes': 'var(--color-ink-primary)',
            '--tw-prose-quote-borders': 'var(--color-accent)',
            '--tw-prose-captions': 'var(--color-ink-muted)',
            '--tw-prose-code': 'var(--color-ink-primary)',
            '--tw-prose-pre-code': 'var(--color-ink-primary)',
            '--tw-prose-pre-bg': 'var(--color-surface-muted)',
            '--tw-prose-th-borders': 'var(--color-line-strong)',
            '--tw-prose-td-borders': 'var(--color-line)',
            fontSize: '17px',
            lineHeight: '1.75',
            p: {
              marginTop: '1.1em',
              marginBottom: '1.1em',
            },
            h2: {
              fontFamily:
                'var(--font-playfair), var(--font-noto-serif-kr), Georgia, serif',
              fontWeight: '700',
              fontSize: '1.6em',
              lineHeight: '1.3',
              letterSpacing: '-0.015em',
              marginTop: '2.4em',
              marginBottom: '0.8em',
            },
            h3: {
              fontFamily:
                'var(--font-playfair), var(--font-noto-serif-kr), Georgia, serif',
              fontWeight: '600',
              fontSize: '1.25em',
              lineHeight: '1.4',
              letterSpacing: '-0.01em',
              marginTop: '2em',
              marginBottom: '0.6em',
            },
            'h2 + *, h3 + *': {
              marginTop: '0',
            },
            a: {
              fontWeight: '500',
              textDecoration: 'none',
              borderBottom: '1px solid transparent',
              transition: 'border-color 0.2s ease, color 0.2s ease',
              '&:hover': {
                color: 'var(--color-accent-hover)',
                borderBottomColor: 'var(--color-accent-hover)',
              },
            },
            blockquote: {
              fontStyle: 'italic',
              fontWeight: '400',
              color: 'var(--color-ink-secondary)',
              borderLeftWidth: '3px',
              borderLeftColor: 'var(--color-accent)',
              paddingLeft: '1.1em',
              marginTop: '1.6em',
              marginBottom: '1.6em',
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
            code: {
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              fontSize: '0.9em',
              fontWeight: '500',
              backgroundColor: 'var(--color-surface-muted)',
              padding: '0.15em 0.4em',
              borderRadius: '4px',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: {
              borderRadius: '8px',
              border: '1px solid var(--color-line)',
              padding: '1.1em 1.2em',
              overflowX: 'auto',
              fontSize: '0.88em',
              lineHeight: '1.6',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              fontWeight: '400',
              fontSize: '1em',
            },
            img: {
              borderRadius: '8px',
              width: '100%',
              marginTop: '1.8em',
              marginBottom: '1.8em',
              cursor: 'zoom-in',
            },
            'ul, ol': {
              paddingLeft: '1.4em',
              marginTop: '1em',
              marginBottom: '1em',
            },
            li: {
              marginTop: '0.4em',
              marginBottom: '0.4em',
            },
            hr: {
              marginTop: '2.4em',
              marginBottom: '2.4em',
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
