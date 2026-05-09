/* ─────────────────────────────────────────────────────────
   초대장 데이터 타입 정의
   ───────────────────────────────────────────────────────── */

export type TimelineGroup = '오프닝' | '오전' | '오후' | '폐막';

export type TimelineItem = {
  group: TimelineGroup;
  time: string;
  title: string;
  desc: string;
};

export type AccentName = 'Ocean' | 'Sun' | 'Lime' | 'Aqua';

export type ProgramCardData = {
  name: string;
  sub: string;
  time: string;
  desc: string;
  /** 카드 배경 이미지 경로 (예: '/cards/card_bible_quiz.png'). 비워두면 단색 카드. */
  image?: string;
};

export type ProgramRowData = {
  key: string;
  label: string;
  labelEn: string;
  meta?: string;
  accent: AccentName;
  direction: 'left' | 'right';
  duration: number;
  cards: ProgramCardData[];
};

export type FoodItem = { name: string; desc: string };

export type FoodSection = {
  label: string;
  ko: string;
  time: string;
  note: string;
  items: FoodItem[];
};

export type ParkingItem = { label: string; detail: string };

export type GalleryItem = { caption: string; year: string };

export type ConceptD = {
  event: {
    host: string;
    title: string;
    titleEn: string;
    year: string;
    issue: string;
    tagline: string;
    subTagline: string;
  };
  schedule: {
    date: string;
    dateDisplay: string;
    day: string;
    dayKo: string;
    timeStart: string;
    timeEnd: string;
    timeDisplay: string;
  };
  location: {
    name: string;
    address: string;
    detail: string;
    fromChurch: string;
    parking: string;
    coords: string;
  };
  invite: {
    label: string;
    greeting: string;
    body: string[];
    signature: string;
    pullQuote: string;
  };
  timeline: TimelineItem[];
  programRows: ProgramRowData[];
  foodLunch: FoodSection;
  foodSnack: FoodSection;
  shuttle: { label: string; detail: string; sub: string };
  parking: ParkingItem[];
  gallery: GalleryItem[];
  contact: { phone: string; email: string; kakao: string };
};

/** Program 모달이 열려있을 때의 카드 정보 */
export type ProgramOpenState = {
  card: ProgramCardData;
  accent: string;
  rowLabel: string;
  rowLabelEn: string;
  rowKey: string;
};
