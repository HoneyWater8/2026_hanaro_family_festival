# FE-legacy · 컨셉 탐색본

> **2026 하나로 가족 한마당** 초대장 본격 개발 전, 디자인 방향을 결정하기 위한 사전 탐색 단계 자료.

이 폴더는 본 프로젝트의 **디자인 방향 결정 단계**를 보존한 아카이브입니다. 처음에 **4가지 컨셉 방향(A·B·C·D)을 디자인 제안서로 제시**한 후, 그중 두 방향(B·D)을 **Babel-standalone 정적 HTML 프로토타입**으로 발전시켜 비교했고, 최종적으로 **컨셉 D — Wave Layers** 방향이 채택되어 `FE/`의 정식 React + Vite 앱으로 발전되었습니다.

```
디자인 제안서 (A·B·C·D 4컨셉)
        │
        ├── 컨셉 B (Solar Pop)  → HTML 프로토타입 (solar-pop.html)
        │                          ↓
        │                       비교 후 탈락
        │
        └── 컨셉 D (Wave Layers) → HTML 프로토타입 (wave-layers.html)
                                    ↓
                                정식 React + Vite 앱 (FE/)
                                    ↓
                                최종 배포 ✓
```

---

## 1. 디자인 제안서

📄 원본 PDF: [`하나로 가족한마당 · 디자인 제안서.pdf`](./하나로%20가족한마당%20·%20디자인%20제안서.pdf) (v1.0 · 2026.04)

행사 운영팀에게 4가지 시각적 방향을 제시하기 위해 만든 13페이지 문서. 각 컨셉마다 컬러 팔레트, 타이포그래피, 와이어프레임 3화면, 인터랙션 톤, BEST FOR 가이드까지 포함.

### 표지 · Project Brief · Moodboard

<table>
<tr>
<td align="center" width="33%"><b>표지</b><br><img src="./concept-screen-shot/proposal/01-cover.png" width="280" alt="표지"></td>
<td align="center" width="33%"><b>01 Project Brief</b><br><img src="./concept-screen-shot/proposal/02-brief.png" width="280" alt="Project Brief"></td>
<td align="center" width="33%"><b>02 Moodboard</b><br><img src="./concept-screen-shot/proposal/03-moodboard.png" width="280" alt="Moodboard"></td>
</tr>
</table>

**프로젝트 개요 (PROJECT BRIEF)**
- **목표**: 행사 정보 전달 · 기대감 조성
- **대상**: 남녀노소 모든 임직원과 가족
- **성공 지표**: "누가 봐도 이쁘고 부드러운 애니메이션, 초대장으로서 필요한 정보를 잘 전달"
- **키워드**: 여름 · 가족 · 운동회 · 젊음 · 활기 · 평화로운 · 강렬한

### 4가지 컨셉 비교

| | A · Pastel Breeze | B · Solar Pop | C · Beach Picnic | **D · Wave Layers** ⭐ |
|---|---|---|---|---|
| **무드** | 조용한 · 정갈한 · 세련된 | 에너제틱 · 대담한 · 젊은 | 친근한 · 유쾌한 · 일러스트 | 에디토리얼 · 모던 · 세련된 |
| **인터랙션** | 부드러운 페이드 + 리프트 | 풀스크린 스냅 슬라이드 | 패럴랙스 + 플로팅 | 스크롤 기반 웨이브 모핑 |
| **레이아웃** | 세로 스크롤 (카드 중심, 여백 많음) | 세로 스냅 페이지 (1섹션 = 1화면) | 세로 스크롤 + 일러스트 배경 레이어 | 지그재그 + 웨이브 구분선 |
| **추천 상황** | 브랜드 톤을 차분하게 유지하고 싶을 때 | 강한 인상을 남기고 SNS 공유 시 임팩트가 필요할 때 | 가족·어린이 참여가 많고 친근감이 핵심일 때 | 세련되고 트렌디한 인상을 주고 싶을 때 |
| **결과** | 캔슬 | HTML 프로토타입 → 탈락 | 캔슬 | **채택 → 정식 개발** |

---

### 컨셉 A · Pastel Breeze

평화롭고 정갈한 여름 바람. 차분한 파스텔과 여백으로 완성되는 조용한 여름.

- **팔레트**: Sky Mist (#B3DEE8) · Peach Veil (#FDE9D0) · Soft Sage (#D4E5D5) · Warm Coral (#F8B9B1) · Deep Sea (#2D8AA9) · Paper (#F8EEE9)
- **디스플레이 타이포**: Gowun Batang (세리프)
- **인터랙션**: 부드러운 페이드 + 리프트
- **태그**: #조용한 #정갈한 #세련된 #여백있는 #편안한

<table>
<tr>
<td align="center" width="50%"><b>컨셉 시안</b><br><img src="./concept-screen-shot/proposal/04-concept-a-pastel-breeze.png" width="380" alt="Pastel Breeze"></td>
<td align="center" width="50%"><b>와이어프레임 (3화면)</b><br><img src="./concept-screen-shot/proposal/05-concept-a-wireframe.png" width="380" alt="Pastel Breeze 와이어프레임"></td>
</tr>
</table>

---

### 컨셉 B · Solar Pop

강렬하고 에너제틱한 여름 태양. 초대형 타이포와 비비드 컬러로 임팩트. 한 섹션이 한 장면처럼 풀스크린으로 전달.

- **팔레트**: Deep Violet (#4D2D8A) · Electric Blue (#3B33EE) · Hot Magenta (#DC2ADE) · Solar Yellow (#E9F0E4) · Pure White · Ink (#0A0A14)
- **디스플레이 타이포**: Archivo Black (영문 헤비)
- **인터랙션**: 풀스크린 스냅 슬라이드 — 1섹션 = 1화면
- **태그**: #에너제틱 #대담한 #젊은 #팝 #컬러풀

<table>
<tr>
<td align="center" width="50%"><b>컨셉 시안</b><br><img src="./concept-screen-shot/proposal/06-concept-b-solar-pop.png" width="380" alt="Solar Pop"></td>
<td align="center" width="50%"><b>와이어프레임 (3화면)</b><br><img src="./concept-screen-shot/proposal/07-concept-b-wireframe.png" width="380" alt="Solar Pop 와이어프레임"></td>
</tr>
</table>

이 컨셉은 HTML 프로토타입까지 발전했습니다 → [§ 2-1 Solar Pop 프로토타입](#2-1-solar-pop-html-프로토타입) 참고

---

### 컨셉 C · Beach Picnic

가족 친화 일러스트 팝. 밝은 프라이머리 컬러와 일러스트로 따뜻하고 유쾌하게. 아이들도 좋아할 친근한 톤.

- **팔레트**: Sunny (#FFD68D) · Grass (#86D877) · Sky (#4DD8FF) · Watermelon (#FF6868) · Cream (#FFF5E4) · Navy Ink (#283A57)
- **디스플레이 타이포**: Gowun Dodum (부드러운 한글)
- **인터랙션**: 패럴랙스 + 플로팅 — 배경 일러스트와 오브젝트가 다른 속도로 이동
- **태그**: #친근한 #유쾌한 #일러스트 #가족적 #따뜻한

<table>
<tr>
<td align="center" width="50%"><b>컨셉 시안</b><br><img src="./concept-screen-shot/proposal/08-concept-c-beach-picnic.png" width="380" alt="Beach Picnic"></td>
<td align="center" width="50%"><b>와이어프레임 (3화면)</b><br><img src="./concept-screen-shot/proposal/09-concept-c-wireframe.png" width="380" alt="Beach Picnic 와이어프레임"></td>
</tr>
</table>

---

### 컨셉 D · Wave Layers ⭐ 채택

모던 에디토리얼 웨이브. SVG 웨이브와 기하 레이어로 매거진 같은 세련된 아트디렉션. 포인트 컬러로 생동감.

- **팔레트**: **Ocean (#439BF5) · Aqua (#ABF7EE) · Lime (#B9E68B) · Sun (#FFC93C) · White · Deep Ink (#0F2A3D)** — 정식 앱 [`FE/src/theme/tokens.ts`](../FE/src/theme/tokens.ts)의 `WL` 토큰과 정확히 일치
- **디스플레이 타이포**: Bebas Neue (영문 캡스) + Gowun Batang (한글 세리프) → 최종 앱에서 Black Han Sans로 진화
- **인터랙션**: 스크롤 기반 웨이브 모핑 — SVG 마스크가 웨이브 모양으로 열리며 다음 섹션 드러남 (`MorphingWave`로 구현)
- **태그**: #에디토리얼 #모던 #세련된 #레이어드 #기하학적

<table>
<tr>
<td align="center" width="50%"><b>컨셉 시안</b><br><img src="./concept-screen-shot/proposal/10-concept-d-wave-layers.png" width="380" alt="Wave Layers"></td>
<td align="center" width="50%"><b>와이어프레임 (3화면)</b><br><img src="./concept-screen-shot/proposal/11-concept-d-wireframe.png" width="380" alt="Wave Layers 와이어프레임"></td>
</tr>
</table>

이 컨셉이 HTML 프로토타입을 거쳐 최종 앱이 되었습니다 → [§ 2-2 Wave Layers 프로토타입](#2-2-wave-layers-html-프로토타입) 참고

---

### 비교 페이지 · 의사결정

<table>
<tr>
<td align="center" width="50%"><b>한 눈에 비교</b><br><img src="./concept-screen-shot/proposal/12-compare.png" width="380" alt="Compare"></td>
<td align="center" width="50%"><b>Next Step — 선택 안내</b><br><img src="./concept-screen-shot/proposal/13-next-step.png" width="380" alt="Next Step"></td>
</tr>
</table>

---

## 2. HTML 프로토타입

제안서에서 마음에 든 두 방향(B · D)을 실제 인터랙션이 동작하는 정적 HTML로 발전시켜 비교했습니다. `Babel-standalone`을 사용하므로 빌드 없이 브라우저에서 바로 실행됩니다.

### 2-1. Solar Pop HTML 프로토타입

원본 파일: [`solar-pop.html`](./solar-pop.html) · [`solar-pop-app.jsx`](./solar-pop-app.jsx) · 데이터: [`concept-b-data.js`](./concept-b-data.js)

짙은 보라 배경 위에 라임옐로, 마젠타, 블루의 기하 도형을 흩뿌린 팝아트 풍. 영문 대문자 헤드라인(`SUMMER FEST 2026`)으로 페스티벌 무드를 강조.

<table>
<tr>
<td align="center" width="50%"><img src="./concept-screen-shot/solar-pop/1.png" width="280" alt="solar-pop 1"></td>
<td align="center" width="50%"><img src="./concept-screen-shot/solar-pop/2.png" width="280" alt="solar-pop 2"></td>
</tr>
<tr>
<td align="center"><img src="./concept-screen-shot/solar-pop/3.png" width="280" alt="solar-pop 3"></td>
<td align="center"><img src="./concept-screen-shot/solar-pop/4.png" width="280" alt="solar-pop 4"></td>
</tr>
<tr>
<td align="center"><img src="./concept-screen-shot/solar-pop/5.png" width="280" alt="solar-pop 5"></td>
<td align="center"><img src="./concept-screen-shot/solar-pop/6.png" width="280" alt="solar-pop 6"></td>
</tr>
<tr>
<td align="center"><img src="./concept-screen-shot/solar-pop/7.png" width="280" alt="solar-pop 7"></td>
<td align="center"><img src="./concept-screen-shot/solar-pop/8.png" width="280" alt="solar-pop 8"></td>
</tr>
</table>

### 2-2. Wave Layers HTML 프로토타입

원본 파일: [`wave-layers.html`](./wave-layers.html) · [`wave-layers-app.jsx`](./wave-layers-app.jsx) · 데이터: [`concept-d-data.js`](./concept-d-data.js)

크림 페이퍼 배경에 짙은 잉크 네이비 한글 헤드라인, 햇님 옐로 도트, 파도 그래픽을 결합. 이 방향이 최종 채택되어 정식 React 앱으로 발전되었습니다.

<table>
<tr>
<td align="center" width="50%"><img src="./concept-screen-shot/wave-layer/1.png" width="280" alt="wave-layer 1"></td>
<td align="center" width="50%"><img src="./concept-screen-shot/wave-layer/2.png" width="280" alt="wave-layer 2"></td>
</tr>
<tr>
<td align="center"><img src="./concept-screen-shot/wave-layer/3.png" width="280" alt="wave-layer 3"></td>
<td align="center"><img src="./concept-screen-shot/wave-layer/5.png" width="280" alt="wave-layer 5"></td>
</tr>
<tr>
<td colspan="2" align="center">
<b>4 — Timeline (스크롤 전·후 상태)</b><br>
<img src="./concept-screen-shot/wave-layer/4-1.png" width="280" alt="wave-layer 4-1">
<img src="./concept-screen-shot/wave-layer/4-2.png" width="280" alt="wave-layer 4-2">
</td>
</tr>
<tr>
<td align="center"><img src="./concept-screen-shot/wave-layer/6.png" width="280" alt="wave-layer 6"></td>
<td align="center"><img src="./concept-screen-shot/wave-layer/7.png" width="280" alt="wave-layer 7"></td>
</tr>
<tr>
<td align="center"><img src="./concept-screen-shot/wave-layer/8.png" width="280" alt="wave-layer 8"></td>
<td align="center"><img src="./concept-screen-shot/wave-layer/9.png" width="280" alt="wave-layer 9"></td>
</tr>
</table>

---

## 폴더 구조

```
FE-legacy/
├── README.md                                  # 이 파일
├── 하나로 가족한마당 · 디자인 제안서.pdf    # 원본 PDF (v1.0, 2026.04)
│
├── index.html                                 # 컨셉 진입 페이지
├── proposal.html                              # 제안서 웹 버전
├── proposal-app.jsx
├── proposal-data.js
├── proposal-print.html
│
├── solar-pop.html                             # 컨셉 B 프로토타입
├── solar-pop-app.jsx
│
├── wave-layers.html                           # 컨셉 D 프로토타입 (채택)
├── wave-layers-app.jsx
│
├── concept-b-data.js                          # 컨셉 B 데이터
├── concept-d-data.js                          # 컨셉 D 데이터 (Wave Layers)
├── concept-card.jsx
│
├── design-canvas.jsx                          # 디자인 캔버스
├── invitation-app.jsx                         # 초대장 컴포넌트
├── ios-frame.jsx                              # iOS 프레임 wrapper
├── tweaks-panel.jsx                           # 실시간 튜닝 패널
├── wireframes.jsx                             # 와이어프레임
│
├── color-system.html                          # 색상 시스템 정리
├── tokens.css                                 # 디자인 토큰 (CSS)
├── tokens.js                                  # 디자인 토큰 (JS)
├── tokens.json                                # 디자인 토큰 (JSON)
│
├── concept-screen-shot/                       # 스크린샷 아카이브
│   ├── proposal/                              # 제안서 PDF 페이지 추출본 (13장)
│   ├── solar-pop/                             # Solar Pop HTML 프로토타입 (8장)
│   └── wave-layer/                            # Wave Layers HTML 프로토타입 (9장)
│
└── uploads/                                   # 원본 이미지/소스 자료
```

---

## 실행 방법

`Babel-standalone`을 사용하므로 별도 빌드 없이 바로 열 수 있습니다.

```sh
# 예: Solar Pop 미리보기
open FE-legacy/solar-pop.html

# 예: Wave Layers 미리보기
open FE-legacy/wave-layers.html

# 예: 제안서 웹 버전 (4컨셉 동시 비교)
open FE-legacy/proposal.html
```

또는 정적 서버:

```sh
cd FE-legacy
python3 -m http.server 8000
# → http://localhost:8000/proposal.html
# → http://localhost:8000/solar-pop.html
# → http://localhost:8000/wave-layers.html
```

---

루트 프로젝트 README는 [`../README.md`](../README.md) 참고. 최종 배포 페이지의 섹션별 스크린샷도 거기에 있습니다.
