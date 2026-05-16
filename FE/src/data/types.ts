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

export type FoodItem = {
  name: string;
  desc: string;
  /** 음식 사진 경로 (예: '/foods/popcorn.jpg'). 비워두면 placeholder. */
  image?: string;
};

export type FoodSection = {
  label: string;
  ko: string;
  time: string;
  note: string;
  items: FoodItem[];
};

export type ParkingItem = { label: string; detail: string };


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
  /** Timeline 섹션 오프닝 그룹 위에 표시되는 출석 혜택 안내 */
  openingBenefits: {
    label: string;
    labelEn: string;
    items: Array<{ tag: string; detail: string }>;
    /** 두 혜택 모두에 적용되는 공통 안내 (마감 시간, 조기 종료 등) */
    note: string;
  };
  timeline: TimelineItem[];
  /** Awards 섹션 — 1등 상 + 그 외 축복상 4종 */
  blessingAwards: {
    label: string;
    labelEn: string;
    intro: string;
    grandPrize: {
      label: string;        // "1등 상"
      labelEn: string;      // "GRAND PRIZE"
      name: string;
      value: string;        // "170만원 상당"
      quantity: string;     // "1대"
      image?: string;
    };
    items: Array<{
      name: string;
      detail: string;
      price?: string;
      quantity: string;
      note?: string;
      image?: string;
    }>;
  };
  programRows: ProgramRowData[];
  foodLunch: FoodSection;
  foodSnack: FoodSection;
  shuttle: { label: string; detail: string; sub: string };
  parking: ParkingItem[];
  /** Gallery 섹션 이미지 경로 (예: '/gallery/cooking.png'). 6개 슬롯에 랜덤 크로스페이드. */
  gallery: string[];
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
