/* ─────────────────────────────────────────────────────────
   하나로 가족한마당 — 디자인 제안 데이터
   proposal.html + proposal-deck.html 이 공유합니다.
   ───────────────────────────────────────────────────────── */

window.PROPOSAL = {
  project: {
    name: "하나로 가족한마당",
    subtitle: "모바일 초대장 · 디자인 방향 제안",
    client: "사내 행사 운영팀",
    date: "2026.04",
    version: "v1.0"
  },

  brief: {
    goal: ["행사 정보 전달", "기대감 조성"],
    audience: "남녀노소 모든 임직원과 가족",
    success: "누가 봐도 이쁘고 부드러운 애니메이션, 초대장으로서 필요한 정보를 잘 전달"
  },

  keywords: ["여름", "가족", "운동회", "젊음", "활기", "평화로운", "강렬한"],

  sections: [
    "히어로 (타이틀·날짜·비주얼)",
    "초대의 말",
    "일시 & 장소",
    "행사 순서 (타임라인)",
    "프로그램 하이라이트",
    "오시는 길",
    "RSVP 신청"
  ],

  concepts: [
    {
      id: "A",
      code: "A",
      name: "Pastel Breeze",
      ko: "파스텔 브리즈",
      tagline: "평화롭고 정갈한 여름 바람",
      description: "차분한 파스텔과 여백으로 완성되는 조용한 여름. 가족 모두가 편안하게 느끼는 톤.",
      mood: ["조용한", "정갈한", "세련된", "여백 있는", "편안한"],
      palette: [
        { hex: "#B8DEE8", name: "Sky Mist" },
        { hex: "#FDE3DC", name: "Peach Veil" },
        { hex: "#D4E5C5", name: "Soft Sage" },
        { hex: "#FBB9B1", name: "Warm Coral" },
        { hex: "#2D8AA9", name: "Deep Sea" },
        { hex: "#F3EEE9", name: "Paper" }
      ],
      typography: {
        display: { family: "Gowun Batang, serif", sample: "하나로 가족한마당", size: 40 },
        heading: { family: "Pretendard, sans-serif", sample: "2026 여름, 함께하는 하루", size: 22 },
        body:    { family: "Pretendard, sans-serif", sample: "올 여름, 가족과 함께 만드는 잊지 못할 추억을 초대합니다.", size: 14 }
      },
      interaction: {
        title: "부드러운 페이드 + 리프트",
        detail: "스크롤하면 카드가 아래에서 위로 살며시 올라오며 페이드인. 섹션 간 전환은 크로스페이드. 전체적으로 차분하고 느린 템포."
      },
      layout: "세로 스크롤 (카드 중심, 여백 많음)",
      bestFor: "브랜드 톤을 차분하게 유지하고 싶을 때"
    },
    {
      id: "B",
      code: "B",
      name: "Solar Pop",
      ko: "솔라 팝",
      tagline: "강렬하고 에너제틱한 여름 태양",
      description: "초대형 타이포와 비비드 컬러로 임팩트 있게. 한 섹션이 한 장면처럼 풀스크린으로 전달.",
      mood: ["에너제틱", "대담한", "젊은", "팝", "컬러풀"],
      palette: [
        { hex: "#4D089A", name: "Deep Violet" },
        { hex: "#323EDD", name: "Electric Blue" },
        { hex: "#DC2ADE", name: "Hot Magenta" },
        { hex: "#E3F044", name: "Solar Yellow" },
        { hex: "#FFFFFF", name: "Pure White" },
        { hex: "#0A0A14", name: "Ink" }
      ],
      typography: {
        display: { family: "Archivo Black, sans-serif", sample: "하나로 가족한마당", size: 52 },
        heading: { family: "Pretendard, sans-serif", sample: "SUMMER FESTIVAL 2026", size: 20 },
        body:    { family: "Pretendard, sans-serif", sample: "이 여름, 가장 뜨거운 하루를 같이 보냅시다.", size: 14 }
      },
      interaction: {
        title: "풀스크린 스냅 슬라이드",
        detail: "스크롤하면 섹션이 한 장씩 딱 딱 스냅으로 넘어감. 각 장면마다 대형 타이포가 좌→우로 스윕되며 진입. 포스터 한 장씩 넘기는 느낌."
      },
      layout: "세로 스냅 페이지 (1섹션 = 1화면)",
      bestFor: "강한 인상을 남기고 SNS 공유 시 임팩트가 필요할 때"
    },
    {
      id: "C",
      code: "C",
      name: "Beach Picnic",
      ko: "비치 피크닉",
      tagline: "가족 친화 일러스트 팝",
      description: "밝은 프라이머리 컬러와 일러스트로 따뜻하고 유쾌하게. 아이들도 좋아할 친근한 톤.",
      mood: ["친근한", "유쾌한", "일러스트", "가족적", "따뜻한"],
      palette: [
        { hex: "#FFD93D", name: "Sunny" },
        { hex: "#6BCB77", name: "Grass" },
        { hex: "#4D96FF", name: "Sky" },
        { hex: "#FF6B6B", name: "Watermelon" },
        { hex: "#FFF5E4", name: "Cream" },
        { hex: "#2B3A67", name: "Navy Ink" }
      ],
      typography: {
        display: { family: "Gowun Dodum, sans-serif", sample: "하나로 가족한마당", size: 38 },
        heading: { family: "Gowun Dodum, sans-serif", sample: "모두 모여 함께하는 여름 운동회", size: 20 },
        body:    { family: "Pretendard, sans-serif", sample: "가족과 함께 즐기는 부스·체험·푸드트럭까지!", size: 14 }
      },
      interaction: {
        title: "패럴랙스 + 플로팅",
        detail: "배경 일러스트(구름·파도·나무)는 느리게, 전경 오브젝트(튜브·공·깃발)는 빠르게 움직이며 패럴랙스. 스크롤 중에도 요소들이 살짝 둥둥 떠있는 애니메이션."
      },
      layout: "세로 스크롤 + 일러스트 배경 레이어",
      bestFor: "가족·어린이 참여가 많고 친근감이 핵심일 때"
    },
    {
      id: "D",
      code: "D",
      name: "Wave Layers",
      ko: "웨이브 레이어",
      tagline: "모던 에디토리얼 웨이브",
      description: "SVG 웨이브와 기하 레이어로 매거진 같은 세련된 아트디렉션. 포인트 컬러로 생동감.",
      mood: ["에디토리얼", "모던", "세련된", "레이어드", "기하학적"],
      palette: [
        { hex: "#439BF5", name: "Ocean" },
        { hex: "#ABF7EE", name: "Aqua" },
        { hex: "#B9E68B", name: "Lime" },
        { hex: "#FFC93C", name: "Sun" },
        { hex: "#FFFFFF", name: "White" },
        { hex: "#0F2A3D", name: "Deep Ink" }
      ],
      typography: {
        display: { family: "Bebas Neue, sans-serif", sample: "HANARO FAMILY DAY", size: 48 },
        heading: { family: "Gowun Batang, serif", sample: "2026 여름, 하나로 가족한마당", size: 22 },
        body:    { family: "Pretendard, sans-serif", sample: "함께 만드는 특별한 하루. 모두 모여 즐겨요.", size: 14 }
      },
      interaction: {
        title: "스크롤 기반 웨이브 모핑",
        detail: "스크롤 위치에 따라 상단의 SVG 웨이브가 모양을 바꿈. 섹션 등장 시 마스크가 웨이브 모양으로 열리며 드러남. 컨텐츠는 좌우 지그재그 레이아웃."
      },
      layout: "지그재그 + 웨이브 구분선",
      bestFor: "세련되고 트렌디한 인상을 주고 싶을 때"
    }
  ]
};
