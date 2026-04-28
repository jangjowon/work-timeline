# Work Timeline

진료, 연구, 일상의 작업을 시간순으로 기록하는 개인 포트폴리오 타임라인. Next.js (App Router) +
MDX 로 만들어진 정적 블로그/포트폴리오로, Vercel에 그대로 배포할 수 있게 구성되어 있다.

---

## Quick start

```bash
npm install
npm run dev
```

기본 주소: <http://localhost:3000>

> `predev`/`prebuild` 훅이 `lib/generated/posts-manifest.json` 을 자동 생성한다. 처음 실행할 때
> 잠깐 추가 시간이 걸리는 건 이 단계 때문이다.

빌드 / 프리뷰:

```bash
npm run build
npm run start
npm run lint
```

---

## 새 포스트 작성하기

### CLI로 (권장)

```bash
# 영어 제목 → 자동으로 kebab-case slug 생성
npm run new-post "Quarterly OKR review"

# 한글 제목 → --slug 로 영문 slug 직접 지정 (필수)
npm run new-post "분기 OKR 리뷰 정리" --slug okr-quarterly-review

# 태그·커버 같이 지정
npm run new-post "분기 OKR 리뷰 정리" --slug okr-review --tag 회고 --tag OKR
```

수행 동작

- `content/{slug}.mdx` 생성 (이미 있으면 에러)
- `date` 는 KST 오늘 날짜로 자동 입력
- frontmatter (`title`, `date`, `tags`, `cover`) 와 빈 H2/문단 자리 표시까지 채움
- VS Code의 `code` 명령이 PATH에 있으면 자동으로 파일을 열어준다 (`--no-open` 으로 끌 수 있음)

옵션은 `npm run new-post -- --help` 로 확인 가능.

### 직접 작성하는 경우

`content/<slug>.mdx` 파일을 만들고 다음 형식을 지킨다.

```mdx
---
title: 글 제목
date: 2026-04-25
tags:
  - 태그1
  - 태그2
cover: ''
---

## 첫 번째 섹션

본문…
```

`title`, `date` 가 없으면 매니페스트에서 누락되어 글이 노출되지 않는다. `date` 는 `YYYY-MM-DD`
형식 (KST 기준).

발행 전에는 [`TEMPLATE.md`](./TEMPLATE.md) 의 체크리스트를 한 번 본다 — 환자 정보 익명화,
NDA, 이미지 라이선스 같은 부분.

---

## 이미지 추가하기

폴더 컨벤션:

| 폴더                    | 용도                                          |
| ----------------------- | --------------------------------------------- |
| `public/images/`        | 사이트 정적 이미지 (프로필, 파비콘, 로고 등) |
| `public/content-images/`| 포스트 본문/커버 이미지                       |

MDX에서의 사용:

```mdx
![분기 OKR 대시보드 스냅샷](/content-images/okr-dashboard.svg)
```

frontmatter `cover` 도 같은 컨벤션:

```yaml
cover: /content-images/okr-dashboard.svg
```

> Next.js의 `public/` 은 사이트 루트(`/`) 로 매핑된다. 따라서 경로는 항상 `/content-images/...`
> 같이 슬래시로 시작.

---

## 디자인 / 콘텐츠 커스터마이즈 포인트

| 바꾸고 싶은 것              | 파일                                  |
| --------------------------- | ------------------------------------- |
| 프로필 이름·소개·약력 타임라인 | `lib/profile.ts`                      |
| 사이트 이름·설명·작성자 정보   | `lib/site.ts`                         |
| 강조색 (accent 토큰)         | `tailwind.config.ts` 의 `accent`, 그리고 CSS 변수 정의 (`app/globals.css`) |
| 폰트                        | `app/layout.tsx`, `tailwind.config.ts` |
| 메인 페이지 레이아웃         | `app/page.tsx`                        |
| 포스트 페이지 레이아웃        | `app/posts/[slug]/page.tsx`           |
| OG 이미지 디자인            | `lib/og.tsx`                          |

프로필 사진은 `public/images/profile.jpg` 를 교체하면 된다 (경로 자체는 `lib/profile.ts` 에 있음).

---

## 배포 (Vercel)

이 프로젝트는 Vercel 기본 설정으로 그대로 배포된다.

1. GitHub 리포지토리에 푸시
2. <https://vercel.com/new> 에서 해당 리포지토리 import
3. 환경 변수 설정 (아래) 후 Deploy

### 환경 변수

| 이름                    | 필수 | 용도                                          |
| ----------------------- | ---- | --------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | 권장 | sitemap, RSS, OG, canonical URL의 base. 예: `https://your-domain.com` |

`SITE_URL` 도 백업으로 인식한다. 두 값 모두 없으면 `http://localhost:3000` 으로 폴백.

`.env.example` 를 복사해 로컬용 `.env.local` 을 만들 수 있다:

```bash
cp .env.example .env.local
```

---

## 디렉터리 구조 (개요)

```
app/                    # Next.js App Router 라우트, 레이아웃, API
components/             # 공용 React 컴포넌트
content/                # MDX 포스트
lib/                    # 사이트 설정, 프로필, 포스트 로더 등
  generated/            # predev/prebuild 가 만든 파생 파일 (gitignored)
public/
  images/               # 정적 이미지
  content-images/       # 포스트 이미지
scripts/
  generate-posts-manifest.mjs
  new-post.mjs
TEMPLATE.md             # 발행 전 체크리스트
```
