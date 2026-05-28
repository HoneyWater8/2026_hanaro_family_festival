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
    /** 두 혜택 모두에 적용되는 공통 안내. deadline+highlight는 강조 표시, caveat는 보조 설명 */
    note: {
      deadline: string;   // 예: "~ 09:30"  (badge)
      highlight: string;  // 예: "선착순 마감" (bold)
      caveat: string;     // 예: "일찍 오신 순서대로, 조기 종료될 수 있어요"
    };
  };
  timeline: TimelineItem[];
  /** Kids Stamp Rewards 섹션 — 유초등부 부스 스탬프 완성 보상 (1~6등) */
  kidsStampRewards: {
    label: string;
    labelEn: string;
    target: string;       // "유년부 · 초등부 (1–6학년)"
    rules: string[];      // 진행 방식 설명
    caveat: string;       // "※ 먼저 도착한 어린이부터 ..."
    tiers: Array<{
      rank: string;        // "1등"
      rankEn: string;      // "1ST"
      winnerCount: string; // "1명"
      items: Array<{
        name: string;
        quantity?: string; // "15개" 같이 항목 내부 수량 (6등의 분할 항목용)
        image?: string;
      }>;
    }>;
  };
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
