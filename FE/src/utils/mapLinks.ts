/* ─────────────────────────────────────────────────────────
   외부 지도/내비 앱 딥링크 URL 빌더
   - coords 있으면 정확한 핀/경로
   - coords 없으면 이름 기반 검색 URL로 폴백
   ───────────────────────────────────────────────────────── */

export type LocationInfo = {
  name: string;
  address: string;
  /** "lat,lng" 형식 (예: "37.6173,126.6358"). 비워두면 검색 기반 URL 사용. */
  coords?: string;
};

function parseCoords(coords?: string): { lat: number; lng: number } | null {
  if (!coords) return null;
  const parts = coords.split(',').map((s) => Number(s.trim()));
  if (parts.length !== 2) return null;
  const [lat, lng] = parts;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat, lng };
}

/**
 * 카카오맵 — 길찾기 모드로 진입.
 * universal 웹 URL: 모바일에선 카카오맵 앱이 자동으로 길찾기 모드로 열림.
 */
export function kakaoMapUrl(loc: LocationInfo): string {
  const c = parseCoords(loc.coords);
  if (c) {
    return `https://map.kakao.com/link/to/${encodeURIComponent(loc.name)},${c.lat},${c.lng}`;
  }
  return `https://map.kakao.com/link/search/${encodeURIComponent(loc.name)}`;
}

/**
 * 네이버지도 — 위치 보기.
 * universal 웹 URL. 모바일에서 앱 설치돼 있으면 앱이 자동으로 받음.
 */
export function naverMapUrl(loc: LocationInfo): string {
  const c = parseCoords(loc.coords);
  if (c) {
    return `https://map.naver.com/v5/?c=${c.lng},${c.lat},15,0,0,0,dh`;
  }
  return `https://map.naver.com/v5/search/${encodeURIComponent(loc.name)}`;
}

/**
 * T맵 — 길찾기.
 * 모바일 앱 deep link. 데스크톱·미설치 환경에선 동작 안 함 (T맵은 모바일 전용).
 */
export function tmapUrl(loc: LocationInfo): string {
  const c = parseCoords(loc.coords);
  if (c) {
    return `tmap://route?goalname=${encodeURIComponent(loc.name)}&goalx=${c.lng}&goaly=${c.lat}`;
  }
  return `tmap://`;
}

/** http/https로 시작하는 일반 웹 URL인지. target/rel 속성 결정용. */
export function isWebUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}
