const WEEKDAY_KR = ['일', '월', '화', '수', '목', '금', '토'];

function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function formatPostDate(iso: string): string {
  const date = parseLocalDate(iso);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = WEEKDAY_KR[date.getDay()];
  return `${month}월 ${day}일 (${weekday})`;
}

export function formatMonthLabel(iso: string): string {
  const date = parseLocalDate(iso);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
}

export function monthKey(iso: string): string {
  return iso.slice(0, 7);
}
