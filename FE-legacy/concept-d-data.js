/* ─────────────────────────────────────────────────────────
   2026 하나로 가족 한마당 · 초대장 데이터
   아멘 17기 · Wave Layers
   ───────────────────────────────────────────────────────── */

window.CONCEPT_D = {
  event: {
    host: "HANARO",
    title: "하나로 가족한마당",
    titleEn: "HANARO FAMILY DAY",
    year: "2026",
    issue: "AMEN 17",
    tagline: "함께 만드는 특별한 하루",
    subTagline: "AMEN 17 · 하나로교회"
  },

  schedule: {
    date: "2026.06.03",
    dateDisplay: "06 · 03",
    day: "WEDNESDAY",
    dayKo: "수요일",
    timeStart: "09:55",
    timeEnd: "15:55",
    timeDisplay: "09:55 — 15:55"
  },

  location: {
    name: "김포골드밸리 중앙체육공원",
    nameEn: "GIMPO GOLD VALLEY",
    address: "경기도 김포시 양촌읍 학운리 4288",
    detail: "축구장 33,785㎡ (약 1,020평)",
    fromChurch: "교회에서 약 10km",
    parking: "운동장 주차 50대 + 주변 갓길 가능",
    coords: ""
  },

  invite: {
    label: "INVITATION",
    greeting: "사랑하는 하나로 가족 여러분께,",
    body: [
      "한 해 동안 함께 동행해주신 하나님과",
      "가족, 그리고 이웃에게 감사하며,",
      "",
      "아멘 17기가 정성으로 준비한",
      "2026 하나로 가족 한마당에",
      "여러분을 따뜻하게 초대합니다.",
      "",
      "하루 동안 함께 웃고, 함께 뛰며",
      "잊지 못할 추억을 만들어요."
    ],
    signature: "아멘 17기 · 하나로 가족한마당 운영위원회",
    pullQuote: "함께 만드는,\n특별한 하루."
  },

  // 04 TIMELINE — 행사 시간표 12개 (그룹 디바이더)
  timeline: [
    { group: "오프닝", time: "~09:55", title: "접수",      desc: "기존가족·새가족 구분 팔찌 배부 (주차 큐알코드 구분)" },
    { group: "오프닝", time: "10:00",  title: "집합",      desc: "운동장 중앙 집합 (사회: 이용규·서유리 집사)" },
    { group: "오프닝", time: "10:10",  title: "선서",      desc: "한마당 참여자 선서 (대표자: 박현수·강효림 집사)" },
    { group: "오프닝", time: "10:15",  title: "개회선언",  desc: "담임목사님 개회 선언 및 기도" },
    { group: "오프닝", time: "10:20",  title: "준비 체조", desc: "벨런스워킹 PT 체조 몸 풀기 (윤다이 청년)" },

    { group: "오전",   time: "10:40",  title: "성경 퀴즈",       desc: "난이도 하" },
    { group: "오전",   time: "11:00",  title: "물컵 들고 달리기", desc: "종이컵 사용 (전교인) · 5세부터 초6 별도 운영(11~15시)" },
    { group: "오전",   time: "11:30",  title: "신발 던지기",     desc: "남자·여자 구별해서 경기" },
    { group: "오전",   time: "12:00",  title: "제기 차기",       desc: "모든 성도" },
    { group: "오전",   time: "12:30",  title: "보물찾기",        desc: "전교인 대상 · 푸짐한 경품" },

    { group: "오후",   time: "13:00",  title: "점심시간",        desc: "초원별 식사" },
    { group: "오후",   time: "14:00",  title: "모셔오기 게임",    desc: "교회학교 학생 (초·중·고등) · 사회: 임현택 집사" },
    { group: "오후",   time: "14:30",  title: "큰 공 굴리기",    desc: "모든 성도 (청 · 백전) · 남·자장년·청년 풋살 5:5" },
    { group: "오후",   time: "15:00",  title: "족구 결승",       desc: "목사님팀 vs 교구팀" },

    { group: "폐막",   time: "15:35",  title: "축복상 추첨",     desc: "기존가족·새가족·교회학교 게임 참여자" },
    { group: "폐막",   time: "15:55",  title: "폐회선언",        desc: "담임목사님 폐막 선언 및 기도" }
  ],

  // 05 PROGRAM — 부스 / 놀이시설 (카테고리별 + 연령별 토글)
  programOps: {
    morning:  "11:00 ~ 13:00 오전 부스 운영",
    lunch:    "13:00 ~ 14:00 점심 휴식",
    afternoon:"14:00 ~ 16:00 오후 부스 운영"
  },
  programCategories: [
    {
      key: "kids",
      label: "유아부 놀이 체험존",
      sub: "유아 ~ 미취학",
      accent: "Lime",
      items: [
        { name: "에어바운스",     desc: "1~5세 전용 · 안전한 점프대" },
        { name: "작은 풀장",      desc: "1~5세 전용 · 여름 물놀이" },
        { name: "페이스 페인팅",  desc: "캐릭터·그림으로 예쁘게 꾸미기" },
        { name: "아트 풍선",     desc: "원하는 모양의 풍선 선물" },
        { name: "레고·블록 조립", desc: "작은 블록으로 나만의 작품" },
        { name: "솜사탕",        desc: "달콤하고 폭신한 간식" },
        { name: "퍼즐 맞추기",    desc: "그림 퍼즐 완성하기" },
        { name: "낚시 게임",      desc: "자석 낚시로 물고기 잡기" },
        { name: "부채 꾸미기",    desc: "여름을 시원하게 보낼 부채" },
        { name: "쿠키 꾸미기",    desc: "쿠키를 자유롭게 장식" }
      ]
    },
    {
      key: "elem",
      label: "초등부 스탬프 미션존",
      sub: "스탬프 5개·10개로 선물 뽑기",
      accent: "Sun",
      items: [
        { name: "접시 넣기",    desc: "표적 안 접시에 골인" },
        { name: "고리 던지기",  desc: "고깔에 정확히 걸기" },
        { name: "공 던지기",    desc: "타겟 명중시키기" },
        { name: "낚시 게임",    desc: "시간 내 대어 도전" },
        { name: "다트 맞추기",  desc: "과녁에 다트 명중" },
        { name: "성경 퀴즈",    desc: "성경 상식 문제" },
        { name: "탁구공 옮기기", desc: "숟가락으로 공 이동" },
        { name: "스피드 컵 쌓기", desc: "제한 시간 내 정해진 모양으로" },
        { name: "병뚜껑 다트",   desc: "표적 안에 멈추기" },
        { name: "뽑기",         desc: "미션 성공 후 뽑기 도전" }
      ]
    },
    {
      key: "rec",
      label: "레크리에이션",
      sub: "6~19세 · 11:00~15:00 별도 운영",
      accent: "Ocean",
      items: [
        { name: "물컵 들고 달리기", desc: "종이컵 사용" },
        { name: "신발 던지기",     desc: "남·여 구분 경기" },
        { name: "보물찾기",        desc: "푸짐한 경품" },
        { name: "모셔오기 게임",   desc: "초·중·고등" },
        { name: "큰 공 굴리기",    desc: "청 vs 백전" },
        { name: "족구 결승",       desc: "목사님팀 vs 교구팀" }
      ]
    },
    {
      key: "all",
      label: "포토 · 캘리그라피",
      sub: "전 연령",
      accent: "Aqua",
      items: [
        { name: "인생네컷",       desc: "현장 즉석 사진" },
        { name: "캘리그라피",     desc: "사전 300장 + 현장 70장" }
      ]
    },
    {
      key: "bazaar",
      label: "사랑의 바자회",
      sub: "수익금 전액 선교헌금",
      accent: "Sun",
      highlight: true,
      items: [
        { name: "교우 기증품 판매", desc: "집에 있는 좋은 물건을 기증해 주세요" }
      ]
    }
  ],

  // 05 PROGRAM — 연령별 캐러셀 (3행: 전연령 / 초등부 / 유아부)
  programRows: [
    {
      key: "all",
      label: "전 연령",
      labelEn: "FOR ALL AGES",
      meta: "시간별 진행",
      accent: "Sun",
      direction: "left",
      duration: 60,
      cards: [
        { name: "인생네컷",   sub: "현장 즉석 사진",         time: "수시 운영",     desc: "가족, 친구와 함께 추억의 한 컷을 남겨보세요. 현장에서 바로 인화해 드립니다." },
        { name: "캘리그라피", sub: "이름·말씀 손글씨",       time: "사전 300 + 현장 70", desc: "정성스러운 손글씨로 이름이나 좋아하는 말씀을 받아가세요. 사전 신청 우선입니다." },
        { name: "바자회",     sub: "수익금 전액 선교헌금",   time: "11:00 ~ 16:00", desc: "교우 여러분이 기증해 주신 좋은 물건을 합리적인 가격에 만나볼 수 있는 자리. 수익금 전액은 선교헌금으로 사용됩니다." },
        { name: "성경 퀴즈",  sub: "난이도 하",              time: "10:40",         desc: "남녀노소 누구나 즐길 수 있는 성경 상식 문제. 정답자에게는 작은 선물이 기다립니다." },
        { name: "보물찾기",   sub: "푸짐한 경품",            time: "12:30",         desc: "운동장 곳곳에 숨겨진 보물쪽지를 찾아보세요. 모든 성도가 함께 즐기는 시간입니다." },
        { name: "축복상 추첨", sub: "참여자 모두 대상",       time: "15:35",         desc: "오늘 하루를 마무리하며 모두가 기대하는 축복상 추첨. 기존가족·새가족·교회학교 게임 참여자를 대상으로 진행됩니다." }
      ]
    },
    {
      key: "elem",
      label: "초등부",
      labelEn: "ELEMENTARY",
      meta: "11:00–16:00 상시",
      accent: "Ocean",
      direction: "right",
      duration: 60,
      cards: [
        { name: "접시 넣기",     sub: "표적 명중",       time: "스탬프 미션",  desc: "표적 안의 접시에 정확히 골인시켜 보세요. 성공하면 스탬프 한 개를 받습니다." },
        { name: "고리 던지기",   sub: "고깔에 걸기",     time: "스탬프 미션",  desc: "고깔에 정확하게 고리를 걸어보세요. 거리감 익히기가 핵심입니다." },
        { name: "공 던지기",     sub: "타겟 명중",       time: "스탬프 미션",  desc: "타겟을 향해 정확히 공을 던져 명중시키는 미션입니다." },
        { name: "낚시 게임",     sub: "시간 내 대어",    time: "스탬프 미션",  desc: "제한된 시간 안에 가장 큰 물고기를 낚아보세요." },
        { name: "다트 맞추기",   sub: "과녁 명중",       time: "스탬프 미션",  desc: "다트를 던져 과녁의 정 가운데를 노려보세요." },
        { name: "성경 퀴즈",     sub: "성경 상식",       time: "스탬프 미션",  desc: "초등부 눈높이에 맞는 성경 문제. 평소 공부한 실력을 발휘해 보세요." },
        { name: "탁구공 옮기기", sub: "숟가락 이동",     time: "스탬프 미션",  desc: "숟가락 위에 탁구공을 올리고 떨어뜨리지 않게 옮겨보세요." },
        { name: "스피드 컵",     sub: "정해진 모양 쌓기", time: "스탬프 미션",  desc: "제한 시간 내에 컵을 정해진 모양으로 쌓는 도전입니다." },
        { name: "병뚜껑 다트",   sub: "표적 안 멈추기",  time: "스탬프 미션",  desc: "병뚜껑을 미끄러뜨려 표적 안에 정확히 멈추도록 해보세요." },
        { name: "선물 뽑기",     sub: "스탬프 5·10개",   time: "최종 보상",    desc: "스탬프 5개로 일반 선물, 10개로 특별 선물 뽑기에 도전할 수 있습니다." }
      ]
    },
    {
      key: "kid",
      label: "유아부",
      labelEn: "KIDS",
      meta: "11:00–16:00 상시",
      accent: "Lime",
      direction: "left",
      duration: 60,
      cards: [
        { name: "에어바운스",     sub: "1~5세 전용",    time: "11:00 ~ 16:00", desc: "안전한 점프대에서 마음껏 뛰어놀 수 있어요. 1~5세 어린이를 위한 전용 시설입니다." },
        { name: "작은 풀장",      sub: "1~5세 전용",    time: "11:00 ~ 16:00", desc: "여름의 시작을 알리는 시원한 물놀이. 1~5세 어린이를 위해 안전하게 준비했습니다." },
        { name: "페이스 페인팅",  sub: "캐릭터·그림",   time: "수시 운영",     desc: "원하는 캐릭터나 그림으로 얼굴을 예쁘게 꾸며보세요." },
        { name: "아트 풍선",     sub: "원하는 모양",    time: "수시 운영",     desc: "강아지, 칼, 꽃 등 원하는 모양의 풍선을 즉석에서 만들어 드립니다." },
        { name: "레고·블록",     sub: "자유 조립",     time: "수시 운영",     desc: "다양한 블록으로 나만의 작품을 만들어 보세요." },
        { name: "솜사탕",        sub: "달콤·폭신",     time: "수시 운영",     desc: "달콤하고 폭신한 솜사탕. 아이들이 가장 좋아하는 간식입니다." },
        { name: "퍼즐 맞추기",   sub: "그림 완성",     time: "수시 운영",     desc: "그림 퍼즐을 완성하며 집중력을 키워보세요." },
        { name: "낚시 게임",     sub: "자석 낚시",     time: "수시 운영",     desc: "자석으로 물고기를 잡는 어린이용 낚시 게임입니다." },
        { name: "부채 꾸미기",   sub: "여름 부채",     time: "수시 운영",     desc: "직접 그림을 그리고 색칠해서 나만의 부채를 만들어 보세요." },
        { name: "쿠키 꾸미기",   sub: "달콤한 장식",   time: "수시 운영",     desc: "쿠키 위에 아이싱과 토핑으로 자유롭게 장식해 보세요." }
      ]
    }
  ],

  // 06 FOOD — 점심 / 간식
  foodLunch: {
    label: "LUNCH",
    ko: "점심",
    time: "13:00",
    note: "초원별 식사",
    items: [
      { name: "도시락",   desc: "정성껏 준비한 한 끼" },
      { name: "밥버거",  desc: "든든한 한 입" }
    ]
  },
  foodSnack: {
    label: "SNACK",
    ko: "간식",
    time: "수시 운영",
    note: "현장에서 조리",
    items: [
      { name: "떡볶이",     desc: "매콤달콤" },
      { name: "순대",       desc: "쫄깃한 한 점" },
      { name: "팝콘",       desc: "고소한 간식" },
      { name: "수박",       desc: "여름 제철 과일" },
      { name: "파인애플",   desc: "상큼한 한 조각" }
    ]
  },

  // 07 DIRECTIONS — 셔틀버스 / 주차
  shuttle: {
    label: "셔틀버스",
    detail: "교회 출발 · 총 3대 운행",
    sub: "09:00부터 10분 간격"
  },
  parking: [
    { label: "운동장 주차장",   detail: "승용 50대 + 공용 화장실 2동" },
    { label: "주변 갓길 주차",  detail: "운동장 반경 500m · 최대 500대 (블록 단위)" },
    { label: "주의사항",        detail: "소화전 5m 이내, 공장 출입구 주변 절대 주차 금지" }
  ],

  // 08 GALLERY — 사진 자리 (2025 하가한 등)
  gallery: [
    { caption: "2025 하가한", year: "2025" },
    { caption: "2025 하가한", year: "2025" },
    { caption: "2024 하가한", year: "2024" },
    { caption: "2024 하가한", year: "2024" },
    { caption: "2023 하가한", year: "2023" },
    { caption: "2023 하가한", year: "2023" }
  ],

  contact: {
    phone: "010-0000-0000",
    email: "hanaro@example.com",
    kakao: "@hanaro_amen17"
  }
};
