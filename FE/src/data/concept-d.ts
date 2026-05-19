/* ─────────────────────────────────────────────────────────
   2026 하나로 가족 한마당 · 초대장 데이터
   아멘 17기 · Wave Layers
   ───────────────────────────────────────────────────────── */

import type { ConceptD } from './types';

export const D: ConceptD = {
  event: {
    host: "HANARO",
    title: "하나로 가족한마당",
    titleEn: "HANARO FAMILY FESTIVAL",
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
    timeStart: "09:00",
    timeEnd: "16:00",
    timeDisplay: "09:00 — 16:00"
  },

  location: {
    name: "김포골드밸리 중앙체육공원",
    address: "경기도 김포시 양촌읍 학운리 4288",
    detail: "축구장 33,785㎡ (약 1,020평)",
    fromChurch: "교회에서 약 10km",
    parking: "운동장 주차 50대 + 주변 갓길 가능",
    // Kakao Places 검색으로 확인한 "김포골드밸리 중앙체육공원" 정확 좌표.
    // (변경하려면 dev 콘솔의 [KakaoMap] 로그에서 새 좌표 복사)
    coords: "37.6057462830306,126.602483679804"
  },

  invite: {
    label: "INVITATION",
    greeting: "사랑하는 하나로 가족 여러분,",
    body: [
      "아멘 17기가",
      "하나님의 은혜와 더드림의 도움으로",
      "준비하고 진행하는",
      "2026 하나로 가족 한마당에",
      "여러분을 따뜻하게 초대합니다.",
      "",
      "하루 동안 함께 웃고, 함께 뛰며",
      "천국 맛보기의 행복을 누리길 원합니다."
    ],
    signature: "아멘 17기 · 더드림 · 하나로 가족한마당 운영위원회",
    pullQuote: "함께 만드는,\n특별한 하루."
  },

  // 04 TIMELINE 오프닝 위에 표시되는 출석 혜택 안내
  openingBenefits: {
    label: "출석 이벤트",
    labelEn: "EVENT",
    items: [
      { tag: "치킨",   detail: "초원식구 전원 출석한 초원, 1마리 (선착순 100초원)" },
      { tag: "추첨권", detail: "출석 인별 추가 1장 (선착순 100명)" }
    ],
    note: {
      deadline: "~ 09:30",
      highlight: "선착순 마감",
      caveat: "※ 일찍 오신 순서대로, 조기 종료될 수 있어요"
    }
  },

  // 04 TIMELINE — 행사 시간표 16개 (그룹 디바이더)
  timeline: [
    { group: "오프닝", time: "09:00", title: "접수",      desc: "기존가족·새가족 구분 팔찌 배부, 각각의 추첨함에 추첨권 취합" },
    { group: "오프닝", time: "10:00",  title: "집합",      desc: "운동장 중앙 집합 (사회: 이용규·서유리 집사)" },
    { group: "오프닝", time: "10:10",  title: "선서",      desc: "한마당 참여자 선서 (대표자: 박현수·강효림 집사)" },
    { group: "오프닝", time: "10:15",  title: "개회선언",  desc: "담임목사님 개회 선언 및 기도" },
    { group: "오프닝", time: "10:20",  title: "준비 체조", desc: "벨런스워킹 PT 체조 몸 풀기 (윤다이 청년)" },

    { group: "오전",   time: "10:40",  title: "전교인 O/X 퀴즈",        desc: "전 교인 대상 · 성경, 일상 문제" },
    { group: "오전",   time: "11:00",  title: "물컵 들고 달리기",       desc: "전 교인 대상 · \n※유아/초등 레크리에이션 부스 별도 운영 (11~15시)" },
    { group: "오전",   time: "11:30",  title: "신발 던지기",            desc: "전 교인 대상 · 남자·여자 구별하여 경기 (청/백전)" },
    { group: "오전",   time: "12:00",  title: "제기 차기/계주 달리기",   desc: "전 교인 대상 · (청/백전)" },
    { group: "오전",   time: "12:30",  title: "보물찾기",               desc: "전 교인 대상 · 곳곳에 숨겨진 보물 찾기" },

    { group: "오후",   time: "13:00",  title: "점심시간",        desc: "초원별 식사" },
    { group: "오후",   time: "14:00",  title: "모셔오기 게임",    desc: "교회학교 학생 대상 (초·중·고등) · 사회: 임현택 집사" },
    { group: "오후",   time: "14:30",  title: "큰 공 굴리기",    desc: "전 교인 대상 (청/백전) · 남자장년·청년 풋살 5:5" },
    { group: "오후",   time: "15:00",  title: "족구 결승",       desc: "목사님팀 vs 교구팀" },

    { group: "폐막",   time: "15:35",  title: "축복상 추첨",     desc: "기존가족·새가족 축복상 추첨" },
    { group: "폐막",   time: "15:55",  title: "폐회 선언",       desc: "담임목사님 폐막 선언 및 기도" }
  ],

  // 05 AWARDS — 축복상 (1등 상 + 그 외 4종)
  blessingAwards: {
    label: "축복상",
    labelEn: "AWARDS",
    intro: "참여자 모두를 위한 푸짐한 상품 · 15:35 추첨",
    grandPrize: {
      label: "1등 상",
      labelEn: "GRAND PRIZE",
      name: "전기 자전거",
      value: "170만원 상당",
      quantity: "1대",
      image: '/awards/electric_bicycle.png'
    },
    items: [
      { name: "달소미",       detail: "수제과자 교환 상품권", price: "22,000원 상당", quantity: "30개", image: '/awards/dalsomi.png' },
      { name: "스테인드 생츄어리 커피", detail: "상품권",              price: "10,000원권", quantity: "20개", image: '/awards/stained_sanctuary_cafe.png' },
      { name: "캘리그라피",   detail: "성경말씀 액자",                          quantity: "20개", image: '/awards/calligraphy_frame.png' },
      { name: "Q사랑 염색 전문점",        detail: "염색권",              price: "30,000원권", quantity: "10개", note: "장기점", image: '/awards/q_love_dyeing.png' }
    ]
  },

  // 06 PROGRAM — 연령별 캐러셀 (3행: 전연령 / 초등부 / 유아부)
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
        { name: "인생네컷",   sub: "현장 즉석 사진",         time: "수시 운영",     desc: "가족, 친구와 함께 추억의 한 컷을 남겨보세요. 현장에서 바로 인화해 드립니다.", image: '/cards/card_four_picture.jpg' },
        { name: "캘리그라피", sub: "이름·말씀 손글씨",       time: "수시 운영", desc: "정성스러운 손글씨로 이름이나 좋아하는 말씀을 받아가세요. 사전 신청 우선입니다.", image: '/cards/card_calligraphy.png' },
        { name: "바자회",     sub: "수익금 전액 선교헌금",   time: "11:00 ~ 16:00", desc: "교우 여러분이 기증해 주신 좋은 물건을 합리적인 가격에 만나볼 수 있는 자리. 수익금 전액은 선교헌금으로 사용됩니다.", image: '/cards/card_bazaar.jpg'},
        { name: "성경 퀴즈",  sub: "전 교인 대상",              time: "10:40",         desc: "남녀노소 누구나 즐길 수 있는 성경 상식 문제. 정답자에게는 작은 선물이 기다립니다.", image: '/cards/card_bible_quiz.png' },
        { name: "보물찾기",   sub: "푸짐한 경품",            time: "12:30",         desc: "운동장 곳곳에 숨겨진 보물쪽지를 찾아보세요. 모든 성도가 함께 즐기는 시간입니다.", image: '/cards/card_treasure_hunt.avif'},
        { name: "축복상 추첨", sub: "참여자 모두 대상",       time: "15:35",         desc: "오늘 하루를 마무리하며 모두가 기대하는 축복상 추첨. 기존가족·새가족·교회학교 게임 참여자를 대상으로 진행됩니다.", image: 'cards/card_blessing_award.png' }
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
        { name: "접시 넣기",     sub: "표적 명중",       time: "스탬프 미션",  desc: "표적 안의 접시에 정확히 골인시켜 보세요. 성공하면 스탬프 한 개를 받습니다.", image: '/cards/card_throwing_plates.jpg' },
        { name: "고리 던지기",   sub: "고깔에 걸기",     time: "스탬프 미션",  desc: "고깔에 정확하게 고리를 걸어보세요. 거리감 익히기가 핵심입니다.", image: '/cards/card_throwing_rings.jpg' },
        { name: "공 던지기",     sub: "타겟 명중",       time: "스탬프 미션",  desc: "타겟을 향해 정확히 공을 던져 명중시키는 미션입니다.", image: '/cards/card_throwing_balls.jpg' },
        { name: "낚시 게임",     sub: "시간 내 대어",    time: "스탬프 미션",  desc: "제한된 시간 안에 가장 큰 물고기를 낚아보세요.", image: '/cards/card_fishing_game.jpg' },
        { name: "다트 맞추기",   sub: "과녁 명중",       time: "스탬프 미션",  desc: "다트를 던져 과녁의 정 가운데를 노려보세요.", image: '/cards/card_throwing_darts.jpg' },
        { name: "성경 퀴즈",     sub: "성경 상식",       time: "스탬프 미션",  desc: "초등부 눈높이에 맞는 성경 문제. 평소 공부한 실력을 발휘해 보세요.", image: '/cards/card_bible_quiz.png' },
        { name: "탁구공 옮기기", sub: "숟가락 이동",     time: "스탬프 미션",  desc: "숟가락 위에 탁구공을 올리고 떨어뜨리지 않게 옮겨보세요.", image: '/cards/card_moving_pingpong.jpg' },
        { name: "스피드 컵",     sub: "정해진 모양 쌓기", time: "스탬프 미션",  desc: "제한 시간 내에 컵을 정해진 모양으로 쌓는 도전입니다.", image: '/cards/card_cup_stacking.jpg' },
        { name: "병뚜껑 다트",   sub: "표적 안 멈추기",  time: "스탬프 미션",  desc: "병뚜껑을 미끄러뜨려 표적 안에 정확히 멈추도록 해보세요.", image: '/cards/card_cap_curling.jpg' },
        { name: "선물 뽑기",     sub: "스탬프 5·10개",   time: "최종 보상",    desc: "스탬프 5개로 일반 선물, 10개로 특별 선물 뽑기에 도전할 수 있습니다.", image: '/cards/card_lucky_drawing.jpg' }
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
        { name: "에어바운스",     sub: "1~5세 전용",    time: "11:00 ~ 16:00", desc: "안전한 점프대에서 마음껏 뛰어놀 수 있어요. 1~5세 어린이를 위한 전용 시설입니다.", image: '/cards/card_air_bounce.png' },
        { name: "페이스 페인팅",  sub: "캐릭터·그림",   time: "수시 운영",     desc: "원하는 캐릭터나 그림으로 얼굴을 예쁘게 꾸며보세요.", image: '/cards/card_facepainting.jpg' },
        { name: "아트 풍선",     sub: "원하는 모양",    time: "수시 운영",     desc: "강아지, 칼, 꽃 등 원하는 모양의 풍선을 즉석에서 만들어 드립니다.", image: '/cards/card_art_bloon.jpg' },
        { name: "레고·블록",     sub: "자유 조립",     time: "수시 운영",     desc: "다양한 블록으로 나만의 작품을 만들어 보세요.", image: '/cards/card_lego_block.jpg' },
        { name: "퍼즐 맞추기",   sub: "그림 완성",     time: "수시 운영",     desc: "그림 퍼즐을 완성하며 집중력을 키워보세요.", image: '/cards/card_puzzle.jpg' },
        { name: "낚시 게임",     sub: "자석 낚시",     time: "수시 운영",     desc: "자석으로 물고기를 잡는 어린이용 낚시 게임입니다.", image: '/cards/card_fishing_game.jpg' },
        { name: "부채 꾸미기",   sub: "여름 부채",     time: "수시 운영",     desc: "직접 그림을 그리고 색칠해서 나만의 부채를 만들어 보세요.", image: '/cards/card_diy_fan.jpg' },
        { name: "쿠키 꾸미기",   sub: "달콤한 장식",   time: "수시 운영",     desc: "쿠키 위에 아이싱과 토핑으로 자유롭게 장식해 보세요.", image: '/cards/card_cookie_decorating.jpg' }
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
      { name: "도시락",  desc: "정성껏 준비한 한 끼", image: '/foods/lunch.png' },
      { name: "밥버거",  desc: "든든한 한 입",         image: '/foods/rice_burger.png' }
    ]
  },
  foodSnack: {
    label: "SNACK",
    ko: "간식",
    time: "수시 운영",
    note: "현장에서 조리",
    items: [
      { name: "떡볶이",     desc: "매콤달콤",         image: '/foods/tteokbokki.png' },
      { name: "순대",       desc: "쫄깃한 한 점",     image: '/foods/sundae.png' },
      { name: "팝콘",       desc: "고소한 간식",      image: '/foods/popcorn.jpg' },
      { name: "수박", desc: "시원한 여름 과일", image: '/foods/watermelon.png' }
    ]
  },

  // 07 DIRECTIONS — 셔틀버스 / 주차
  shuttle: {
    label: "셔틀버스",
    detail: "교회 출발/복귀 · 총 3대 운행",
    sub: "09:00 (25인승) · 09:10 (28인승) · 09:20 (11인승)\n폐막 후 교회 복귀 셔틀 운영"
  },
  parking: [
    { label: "운동장 주차장",   detail: "승용 50대 + 공용 화장실 2동" },
    { label: "주변 갓길 주차",  detail: "운동장 반경 500m · 최대 500대 (블록 단위)" },
    { label: "주의사항",        detail: "소화전 5m 이내, 공장 출입구 주변 절대 주차 금지" }
  ],

  // 08 GALLERY — 6개 슬롯이 21개 이미지 풀에서 랜덤 크로스페이드.
  gallery: [
    '/gallery/cooking.png',
    '/gallery/dynamic.png',
    '/gallery/foot_volleyball_1.jpg',
    '/gallery/foot_volleyball_2.jpg',
    '/gallery/foot_volleyball_3.png',
    '/gallery/futsal_1.jpg',
    '/gallery/futsal_2.jpg',
    '/gallery/kids.png',
    '/gallery/lovely_kids.png',
    '/gallery/luckey_award.png',
    '/gallery/many_people.png',
    '/gallery/many_people_2.png',
    '/gallery/running_adult.png',
    '/gallery/running_kids.png',
    '/gallery/shooting_ball.png',
    '/gallery/shooting_water_gun.png',
    '/gallery/soccer.png',
    '/gallery/throwing_ball.png',
    '/gallery/water_gun_kids.png',
    '/gallery/water_party_people.png',
    '/gallery/water_party_people_2.png',
  ],

  contact: {
    phone: "010-0000-0000",
    email: "hanaro@example.com",
    kakao: "@hanaro_amen17"
  }
};
