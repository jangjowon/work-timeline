export type BioItem = {
  year: string;
  org?: string;
  detail: string;
};

export type Profile = {
  name: string;
  tagline: string;
  avatar: string;
  bio: BioItem[];
};

export const profile: Profile = {
  name: 'Jowon Jang',
  tagline: '매일의 작업을 기록하는 공간입니다.',
  avatar: '/images/profile.jpg',
  bio: [
    {
      year: '2026 — 현재',
      org: '전남 고흥군보건소',
      detail: '공중보건의사',
    },
    {
      year: '2025 — 현재',
      org: '경희대학교 한방응용의학과',
      detail: '석박사통합과정',
    },
    {
      year: '2025 — 2026',
      org: '김한샘봄한의원',
      detail: '진료원장',
    },
    {
      year: '2019 — 2025',
      org: '경희대학교 한의과대학',
      detail: '학사',
    },
    {
      year: '관심 분야',
      detail:
        '근거 기반 진료를 통한 환자 삶의 질 향상, 그리고 한의학이 일상 속에서 자연스럽게 닿는 의학이 되도록 하는 대중화 활동',
    },
  ],
};
