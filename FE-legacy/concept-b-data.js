/* ─────────────────────────────────────────────────────────
   Concept B — Solar Pop 데이터 블록
   실제 정보로 교체할 때 여기만 수정하면 됩니다.
   ───────────────────────────────────────────────────────── */

window.CONCEPT_B = {
  event: {
    host: "HANARO",
    title: "하나로 가족한마당",
    titleEn: "SUMMER FEST",
    year: "2026",
    edition: "VOL.07",
    tagline: "이 여름, 가장 뜨거운 하루"
  },

  schedule: {
    date: "2026.07.15",
    dateDisplay: "07.15",
    day: "WED",
    dayKo: "수요일",
    timeStart: "10:00",
    timeEnd: "18:00",
    timeDisplay: "10AM — 6PM"
  },

  location: {
    name: "하나로센터 앞마당",
    address: "서울특별시 강남구 테헤란로 427",
    detail: "하나로빌딩 1층 야외 광장",
    station: "선릉역 3번 출구 도보 5분",
    parking: "지하 2-4층 · 500대 수용"
  },

  invite: {
    greeting: "소중한 가족 여러분께",
    message: [
      "바쁜 일상 속에서도",
      "가족과 함께 쉬어가는 하루,",
      "하나로가 마련했습니다.",
      "",
      "운동회·체험부스·푸드트럭까지",
      "모두 모여 즐기는 여름 축제에",
      "여러분을 초대합니다."
    ],
    signature: "— 하나로 가족한마당 운영위"
  },

  timeline: [
    { time: "10:00", title: "개회식", desc: "환영사 · 기념 촬영" },
    { time: "10:30", title: "준비 체조", desc: "다함께 몸풀기" },
    { time: "11:00", title: "가족 운동회", desc: "5개 종목 · 팀 대항" },
    { time: "12:30", title: "점심 · 푸드트럭", desc: "10개 팀 오픈" },
    { time: "14:00", title: "체험 부스", desc: "공예 · 페이스페인팅 · 사진관" },
    { time: "15:30", title: "가족 공연", desc: "밴드 · 마술 · 버블쇼" },
    { time: "16:30", title: "경품 추첨", desc: "1등 가족여행권" },
    { time: "17:30", title: "폐회식", desc: "기념품 증정 · 마무리" }
  ],

  programs: [
    { num: "01", title: "가족 운동회", desc: "달리기 · 줄다리기 · 이어달리기 · 림보 · 과자따먹기" },
    { num: "02", title: "푸드트럭 10팀", desc: "타코 · 피자 · 빙수 · 치킨 · 음료 등 무료 제공" },
    { num: "03", title: "체험 부스 20개", desc: "공예 · 페이스페인팅 · 캐리커처 · 사진관 · VR 체험" },
    { num: "04", title: "가족 공연", desc: "사내 밴드 · 마술쇼 · 버블쇼 · 버스킹" },
    { num: "05", title: "경품 이벤트", desc: "선착순·추첨·포토스팟 미션 · 총 상품가 2천만원" }
  ],

  transport: [
    { icon: "M", label: "지하철", detail: "2호선 선릉역 3번 출구 · 도보 5분" },
    { icon: "B", label: "버스", detail: "간선 146·341·360 · 지선 3414·4422" },
    { icon: "P", label: "주차", detail: "지하 2-4층 · 500대 수용 · 사전등록 권장" },
    { icon: "S", label: "셔틀", detail: "강남역·사당역 출발 · 30분 간격 운행" }
  ],

  contact: {
    phone: "02-0000-0000",
    email: "event@hanaro.com",
    kakao: "@hanaro_family"
  },

  gallery: [
    { year: "2025", tag: "VOL.06", caption: "가족 이어달리기 · 결승선", bg: "#DC2ADE", fg: "#E3F044", shape: "circles" },
    { year: "2024", tag: "VOL.05", caption: "푸드트럭 앞 긴 줄", bg: "#4D089A", fg: "#E3F044", shape: "stripes" },
    { year: "2024", tag: "VOL.05", caption: "페이스페인팅 부스", bg: "#E3F044", fg: "#4D089A", shape: "dots" },
    { year: "2023", tag: "VOL.04", caption: "가족 밴드 공연", bg: "#323EDD", fg: "#E3F044", shape: "waves" },
    { year: "2023", tag: "VOL.04", caption: "경품 추첨 순간", bg: "#DC2ADE", fg: "#FFFFFF", shape: "burst" },
    { year: "2022", tag: "VOL.03", caption: "단체 기념 촬영", bg: "#0A0A14", fg: "#E3F044", shape: "grid" }
  ]
};
