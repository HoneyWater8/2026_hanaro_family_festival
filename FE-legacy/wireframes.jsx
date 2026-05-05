/* ─────────────────────────────────────────────────────────
   와이어프레임 컴포넌트 (4개 시안 × 3개 화면 각자)
   중간충실도: 실제 팔레트 + 실제 폰트 + 플레이스홀더 콘텐츠
   각 시안의 특징적인 레이아웃을 보여줌
   ───────────────────────────────────────────────────────── */

const PHONE_W = 240;
const PHONE_H = 480;

// ─── 공통: 폰 프레임 ───
function PhoneFrame({ bg, children, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: PHONE_W, height: PHONE_H,
        background: bg, borderRadius: 28,
        boxShadow: '0 20px 50px -15px rgba(0,0,0,0.25), 0 0 0 8px #1a1a1a',
        overflow: 'hidden', position: 'relative',
        fontFamily: 'Pretendard, sans-serif'
      }}>
        {/* 노치 */}
        <div style={{
          position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
          width: 90, height: 18, background: '#1a1a1a', borderRadius: 12, zIndex: 100
        }} />
        {children}
      </div>
      {label && (
        <div style={{ fontSize: 11, color: '#6B7280', letterSpacing: 0.5, fontWeight: 500 }}>{label}</div>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════
// 시안 A: Pastel Breeze — 여백·카드·부드러운 페이드
// ═════════════════════════════════════════════════════════
function WireA1() {
  return (
    <PhoneFrame bg="#F3EEE9" label="01 히어로">
      <div style={{ padding: '40px 22px 0', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 9, color: '#2D8AA9', letterSpacing: 3, marginTop: 16 }}>2026 SUMMER</div>
        <div style={{ fontFamily: 'Gowun Batang, serif', fontSize: 32, color: '#2A1810', lineHeight: 1.15, marginTop: 16, fontWeight: 700 }}>
          하나로<br/>가족한마당
        </div>
        <div style={{ width: 32, height: 2, background: '#FBB9B1', marginTop: 20 }} />
        <div style={{ fontSize: 11, color: '#5B3A28', marginTop: 14, lineHeight: 1.6 }}>
          올 여름, 가족과 함께<br/>만드는 잊지 못할 하루
        </div>
        {/* 일러스트 플레이스홀더 - 파스텔 원 */}
        <div style={{ position: 'relative', flex: 1, marginTop: 20 }}>
          <div style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: '#B8DEE8', left: -10, top: 10, opacity: 0.8 }} />
          <div style={{ position: 'absolute', width: 80, height: 80, borderRadius: '50%', background: '#FDE3DC', left: 90, top: 60 }} />
          <div style={{ position: 'absolute', width: 60, height: 60, borderRadius: '50%', background: '#D4E5C5', left: 140, top: 0 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#8B6F5E', padding: '14px 0 20px', borderTop: '1px solid rgba(42,24,16,0.08)' }}>
          <span>2026.07.15</span><span>D-81</span>
        </div>
      </div>
    </PhoneFrame>
  );
}

function WireA2() {
  return (
    <PhoneFrame bg="#F3EEE9" label="02 일시 · 타임라인">
      <div style={{ padding: '50px 18px 0' }}>
        <div style={{ fontSize: 9, color: '#2D8AA9', letterSpacing: 2 }}>DATE & TIME</div>
        <div style={{ background: '#FFFDF8', borderRadius: 16, padding: '18px 16px', marginTop: 10, border: '1px solid rgba(42,24,16,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <div style={{ fontFamily: 'Gowun Batang, serif', fontSize: 34, color: '#2A1810', fontWeight: 700 }}>07.15</div>
            <div style={{ fontSize: 10, color: '#8B6F5E' }}>WED</div>
          </div>
          <div style={{ fontSize: 11, color: '#5B3A28', marginTop: 4 }}>10:00 — 18:00</div>
        </div>
        <div style={{ fontSize: 9, color: '#2D8AA9', letterSpacing: 2, marginTop: 22 }}>TIMELINE</div>
        {[
          ['10:00', '개회식'],
          ['11:00', '가족 운동회'],
          ['12:30', '점심 · 푸드트럭'],
          ['14:00', '프로그램 체험'],
          ['16:30', '경품 추첨 · 폐회']
        ].map(([t, n], i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(42,24,16,0.06)' }}>
            <div style={{ fontSize: 11, color: '#2D8AA9', fontVariantNumeric: 'tabular-nums', width: 36, fontWeight: 600 }}>{t}</div>
            <div style={{ fontSize: 11, color: '#2A1810' }}>{n}</div>
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}

function WireA3() {
  return (
    <PhoneFrame bg="#F3EEE9" label="03 RSVP">
      <div style={{ padding: '50px 22px 0' }}>
        <div style={{ fontFamily: 'Gowun Batang, serif', fontSize: 22, color: '#2A1810', fontWeight: 700 }}>참석 확인</div>
        <div style={{ fontSize: 11, color: '#8B6F5E', marginTop: 6, lineHeight: 1.6 }}>
          준비에 도움이 되도록<br/>참석 여부를 알려주세요.
        </div>
        <div style={{ marginTop: 20 }}>
          <div style={{ background: '#2D8AA9', color: '#fff', padding: '14px 16px', borderRadius: 14, fontSize: 12, textAlign: 'center', fontWeight: 600 }}>
            네, 참석할게요 🌿
          </div>
          <div style={{ background: '#FFFDF8', color: '#8B6F5E', padding: '14px 16px', borderRadius: 14, fontSize: 12, textAlign: 'center', marginTop: 8, border: '1px solid rgba(42,24,16,0.1)' }}>
            아쉽지만 불참
          </div>
        </div>
        <div style={{ fontSize: 10, color: '#8B6F5E', marginTop: 18, marginBottom: 6 }}>함께 오는 가족</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFDF8', padding: '10px 16px', borderRadius: 12, border: '1px solid rgba(42,24,16,0.06)' }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#FDE3DC', color: '#2A1810', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>−</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#2A1810' }}>2</div>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#B8DEE8', color: '#2A1810', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>+</div>
        </div>
        <div style={{ fontSize: 9, color: '#8B6F5E', textAlign: 'center', marginTop: 30, fontStyle: 'italic' }}>
          ── 여유로운 페이드 애니메이션 ──
        </div>
      </div>
    </PhoneFrame>
  );
}

// ═════════════════════════════════════════════════════════
// 시안 B: Solar Pop — 풀스크린 스냅, 초대형 타이포
// ═════════════════════════════════════════════════════════
function WireB1() {
  return (
    <PhoneFrame bg="#4D089A" label="01 히어로">
      <div style={{ padding: '40px 18px 0', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ fontSize: 10, color: '#E3F044', letterSpacing: 3, marginTop: 16, fontWeight: 700 }}>HANARO ∙ 2026</div>
        <div style={{ fontFamily: 'Archivo Black, sans-serif', fontSize: 48, color: '#E3F044', lineHeight: 0.9, marginTop: 14, letterSpacing: -1 }}>
          SUMMER<br/>FEST
        </div>
        <div style={{ fontFamily: 'Archivo Black, sans-serif', fontSize: 48, color: '#FFFFFF', lineHeight: 0.9, marginTop: 2, letterSpacing: -1 }}>
          2026
        </div>
        {/* 태양 도형 */}
        <div style={{ position: 'absolute', right: -20, top: 180, width: 100, height: 100, borderRadius: '50%', background: '#DC2ADE', boxShadow: '0 0 40px rgba(220,42,222,0.5)' }} />
        <div style={{ position: 'absolute', left: -10, bottom: 120, width: 60, height: 60, background: '#323EDD', transform: 'rotate(25deg)' }} />
        <div style={{ marginTop: 'auto', paddingBottom: 22 }}>
          <div style={{ fontSize: 10, color: '#fff', fontWeight: 600 }}>07.15 WED · 10AM — 6PM</div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>하나로센터 앞마당</div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function WireB2() {
  return (
    <PhoneFrame bg="#E3F044" label="02 프로그램 (스냅)">
      <div style={{ padding: '40px 18px 0', height: '100%', position: 'relative' }}>
        <div style={{ fontSize: 10, color: '#4D089A', letterSpacing: 3, marginTop: 16, fontWeight: 700 }}>02 / 07</div>
        <div style={{ fontFamily: 'Archivo Black, sans-serif', fontSize: 60, color: '#4D089A', lineHeight: 0.85, marginTop: 12, letterSpacing: -2 }}>
          PRO<br/>GRAM
        </div>
        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['가족 운동회', '푸드트럭 10팀', '체험 부스 20개', '경품 추첨'].map((t, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 14px', background: '#fff', color: '#4D089A',
              borderRadius: 0, border: '2px solid #4D089A',
              fontSize: 12, fontWeight: 700
            }}>
              <span>{t}</span>
              <span style={{ fontSize: 14 }}>→</span>
            </div>
          ))}
        </div>
        {/* 스크롤 인디케이터 */}
        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', fontSize: 9, color: '#4D089A', fontWeight: 700 }}>
          ↓ SNAP SCROLL
        </div>
      </div>
    </PhoneFrame>
  );
}

function WireB3() {
  return (
    <PhoneFrame bg="#DC2ADE" label="03 RSVP">
      <div style={{ padding: '40px 18px 0', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 10, color: '#E3F044', letterSpacing: 3, marginTop: 16, fontWeight: 700 }}>07 / 07</div>
        <div style={{ fontFamily: 'Archivo Black, sans-serif', fontSize: 62, color: '#fff', lineHeight: 0.85, marginTop: 12, letterSpacing: -2 }}>
          JOIN<br/>US
        </div>
        <div style={{ fontSize: 12, color: '#E3F044', marginTop: 16, fontWeight: 600 }}>
          이 여름, 가장 뜨거운 하루
        </div>
        <div style={{ marginTop: 'auto', paddingBottom: 22 }}>
          <div style={{ background: '#E3F044', color: '#4D089A', padding: '16px', textAlign: 'center', fontFamily: 'Archivo Black, sans-serif', fontSize: 18, letterSpacing: 1 }}>
            YES, I'M IN →
          </div>
          <div style={{ background: 'transparent', color: '#fff', padding: '12px', textAlign: 'center', fontSize: 11, marginTop: 6, border: '2px solid rgba(255,255,255,0.5)', fontWeight: 600 }}>
            CAN'T MAKE IT
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ═════════════════════════════════════════════════════════
// 시안 C: Beach Picnic — 일러스트 패럴랙스, 가족 친화
// ═════════════════════════════════════════════════════════
function WireC1() {
  return (
    <PhoneFrame bg="#FFF5E4" label="01 히어로">
      <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
        {/* 하늘 */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '55%', background: 'linear-gradient(#4D96FF 0%, #B3D9FF 100%)' }} />
        {/* 태양 */}
        <div style={{ position: 'absolute', top: 50, right: 30, width: 50, height: 50, borderRadius: '50%', background: '#FFD93D', boxShadow: '0 0 30px rgba(255,217,61,0.6)' }} />
        {/* 구름 */}
        <div style={{ position: 'absolute', top: 80, left: 20, width: 40, height: 14, borderRadius: 20, background: '#fff', opacity: 0.9 }} />
        <div style={{ position: 'absolute', top: 110, left: 140, width: 50, height: 16, borderRadius: 20, background: '#fff', opacity: 0.8 }} />
        {/* 바다 */}
        <div style={{ position: 'absolute', top: '55%', left: 0, right: 0, height: '15%', background: 'linear-gradient(#6BCB77 0%, #8DE8A0 100%)' }} />
        {/* 모래 */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: '#FFF5E4' }} />
        {/* 튜브 */}
        <div style={{ position: 'absolute', top: 190, left: 40, width: 36, height: 36, borderRadius: '50%', background: '#FF6B6B', border: '7px solid #FFF5E4', boxSizing: 'border-box' }} />
        {/* 공 */}
        <div style={{ position: 'absolute', top: 220, right: 50, width: 28, height: 28, borderRadius: '50%', background: '#fff', border: '3px solid #2B3A67' }} />
        {/* 텍스트 */}
        <div style={{ position: 'absolute', bottom: 50, left: 0, right: 0, textAlign: 'center', padding: '0 16px' }}>
          <div style={{ fontSize: 10, color: '#2B3A67', letterSpacing: 2, marginBottom: 4, fontWeight: 700 }}>COME & JOIN</div>
          <div style={{ fontFamily: 'Gowun Dodum, sans-serif', fontSize: 28, color: '#2B3A67', fontWeight: 700, lineHeight: 1.15 }}>
            하나로<br/>가족한마당
          </div>
          <div style={{ display: 'inline-block', background: '#FF6B6B', color: '#fff', padding: '4px 12px', borderRadius: 20, fontSize: 10, fontWeight: 700, marginTop: 10 }}>
            07.15 WED · 10AM
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function WireC2() {
  return (
    <PhoneFrame bg="#FFF5E4" label="02 프로그램">
      <div style={{ padding: '40px 18px 0', height: '100%' }}>
        <div style={{ fontSize: 10, color: '#FF6B6B', letterSpacing: 2, marginTop: 16, fontWeight: 700 }}>★ PROGRAM ★</div>
        <div style={{ fontFamily: 'Gowun Dodum, sans-serif', fontSize: 22, color: '#2B3A67', fontWeight: 700, marginTop: 6 }}>
          즐거운 프로그램
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
          {[
            { c: '#FFD93D', l: '운동회' },
            { c: '#6BCB77', l: '푸드트럭' },
            { c: '#4D96FF', l: '체험부스' },
            { c: '#FF6B6B', l: '공연' }
          ].map((x, i) => (
            <div key={i} style={{ aspectRatio: '1', background: x.c, borderRadius: 16, padding: 10, position: 'relative', border: '2px solid #2B3A67' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#fff', opacity: 0.4 }} />
              <div style={{ position: 'absolute', bottom: 10, left: 10, color: '#2B3A67', fontSize: 13, fontWeight: 700 }}>{x.l}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, padding: 12, background: '#fff', borderRadius: 14, border: '2px dashed #FF6B6B', textAlign: 'center', fontSize: 10, color: '#2B3A67', fontWeight: 600 }}>
          🎁 선착순 경품 이벤트
        </div>
      </div>
    </PhoneFrame>
  );
}

function WireC3() {
  return (
    <PhoneFrame bg="#FFF5E4" label="03 지도 · RSVP">
      <div style={{ padding: '40px 18px 0', height: '100%' }}>
        <div style={{ fontSize: 10, color: '#FF6B6B', letterSpacing: 2, marginTop: 16, fontWeight: 700 }}>♡ JOIN US</div>
        <div style={{ fontFamily: 'Gowun Dodum, sans-serif', fontSize: 22, color: '#2B3A67', fontWeight: 700, marginTop: 6 }}>
          함께 해요!
        </div>
        {/* 지도 */}
        <div style={{ height: 110, background: '#6BCB77', borderRadius: 16, marginTop: 12, position: 'relative', border: '2px solid #2B3A67', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 20, top: 20, width: 40, height: 18, background: '#FFF5E4', borderRadius: 4 }} />
          <div style={{ position: 'absolute', left: 80, top: 50, width: 60, height: 18, background: '#FFF5E4', borderRadius: 4 }} />
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-100%)', fontSize: 20 }}>📍</div>
        </div>
        <div style={{ marginTop: 14 }}>
          <div style={{ background: '#FF6B6B', color: '#fff', padding: '14px', borderRadius: 14, fontSize: 13, fontWeight: 700, textAlign: 'center', border: '2px solid #2B3A67', boxShadow: '4px 4px 0 #2B3A67' }}>
            참석할게요! 🎉
          </div>
          <div style={{ color: '#2B3A67', padding: '10px', fontSize: 11, textAlign: 'center', marginTop: 8, opacity: 0.7, fontWeight: 600 }}>
            불참 알림
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ═════════════════════════════════════════════════════════
// 시안 D: Wave Layers — 웨이브 모핑 + 에디토리얼
// ═════════════════════════════════════════════════════════
function WireD1() {
  return (
    <PhoneFrame bg="#FFFFFF" label="01 히어로">
      <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
        {/* 웨이브 레이어 */}
        <svg viewBox="0 0 240 480" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <path d="M 0,120 Q 60,80 120,120 T 240,120 L 240,0 L 0,0 Z" fill="#439BF5" />
          <path d="M 0,180 Q 80,140 160,180 T 240,200 L 240,60 Q 160,100 80,60 T 0,80 Z" fill="#ABF7EE" opacity="0.8" />
          <path d="M 0,480 L 240,480 L 240,340 Q 180,380 120,340 T 0,360 Z" fill="#B9E68B" />
        </svg>
        <div style={{ position: 'relative', padding: '40px 20px 0', zIndex: 2 }}>
          <div style={{ fontSize: 9, color: '#0F2A3D', letterSpacing: 3, marginTop: 20, fontWeight: 700 }}>VOL.01 · SUMMER</div>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 42, color: '#fff', lineHeight: 0.9, marginTop: 16, letterSpacing: 1 }}>
            HANARO<br/>FAMILY<br/>DAY
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 30, left: 20, right: 20, zIndex: 2 }}>
          <div style={{ fontFamily: 'Gowun Batang, serif', fontSize: 14, color: '#0F2A3D', lineHeight: 1.5, fontWeight: 600 }}>
            2026년 7월 15일<br/>하나로센터 앞마당
          </div>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FFC93C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, marginTop: 10, fontWeight: 700, color: '#0F2A3D' }}>↓</div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function WireD2() {
  return (
    <PhoneFrame bg="#FFFFFF" label="02 타임라인">
      <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
        <svg viewBox="0 0 240 100" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 100 }}>
          <path d="M 0,60 Q 60,20 120,60 T 240,60 L 240,0 L 0,0 Z" fill="#439BF5" />
        </svg>
        <div style={{ position: 'relative', padding: '40px 20px 0', zIndex: 2 }}>
          <div style={{ fontSize: 9, color: '#fff', letterSpacing: 3, marginTop: 16, fontWeight: 700 }}>SCHEDULE</div>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, color: '#fff', lineHeight: 0.9, marginTop: 10, letterSpacing: 1 }}>
            TIMELINE
          </div>
        </div>
        <div style={{ padding: '40px 20px 0' }}>
          {[
            ['10', 'AM', '개회식', '#439BF5'],
            ['11', 'AM', '가족 운동회', '#ABF7EE'],
            ['12', 'PM', '점심 · 푸드', '#B9E68B'],
            ['14', 'PM', '체험 부스', '#FFC93C'],
            ['16', 'PM', '경품 · 폐회', '#439BF5']
          ].map(([h, p, n, c], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '9px 0', borderBottom: i < 4 ? '1px solid rgba(15,42,61,0.08)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, minWidth: 46 }}>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color: '#0F2A3D', lineHeight: 1 }}>{h}</div>
                <div style={{ fontSize: 9, color: '#0F2A3D', fontWeight: 700 }}>{p}</div>
              </div>
              <div style={{ flex: 1, fontFamily: 'Gowun Batang, serif', fontSize: 12, color: '#0F2A3D', fontWeight: 600 }}>{n}</div>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

function WireD3() {
  return (
    <PhoneFrame bg="#FFFFFF" label="03 RSVP">
      <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
        <svg viewBox="0 0 240 480" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <path d="M 0,480 L 240,480 L 240,200 Q 180,240 120,200 T 0,220 Z" fill="#B9E68B" />
          <path d="M 0,480 L 240,480 L 240,300 Q 180,340 120,300 T 0,320 Z" fill="#ABF7EE" opacity="0.8" />
        </svg>
        <div style={{ position: 'relative', padding: '40px 20px 0', zIndex: 2 }}>
          <div style={{ fontSize: 9, color: '#0F2A3D', letterSpacing: 3, marginTop: 16, fontWeight: 700 }}>07 RSVP</div>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 42, color: '#0F2A3D', lineHeight: 0.9, marginTop: 10, letterSpacing: 1 }}>
            SAVE<br/>YOUR<br/>SEAT
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 24, left: 20, right: 20, zIndex: 2 }}>
          <div style={{ background: '#0F2A3D', color: '#fff', padding: '15px', borderRadius: 0, textAlign: 'center', fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, letterSpacing: 2 }}>
            ATTEND →
          </div>
          <div style={{ color: '#0F2A3D', padding: '10px', fontSize: 10, textAlign: 'center', marginTop: 6, fontWeight: 600, letterSpacing: 1 }}>
            CANNOT ATTEND
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─── 시안별 3화면 묶음 ───
function WireSet({ concept }) {
  const sets = {
    A: [<WireA1 key="1" />, <WireA2 key="2" />, <WireA3 key="3" />],
    B: [<WireB1 key="1" />, <WireB2 key="2" />, <WireB3 key="3" />],
    C: [<WireC1 key="1" />, <WireC2 key="2" />, <WireC3 key="3" />],
    D: [<WireD1 key="1" />, <WireD2 key="2" />, <WireD3 key="3" />]
  };
  return (
    <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'center' }}>
      {sets[concept]}
    </div>
  );
}

Object.assign(window, {
  PhoneFrame, WireSet,
  WireA1, WireA2, WireA3,
  WireB1, WireB2, WireB3,
  WireC1, WireC2, WireC3,
  WireD1, WireD2, WireD3
});
