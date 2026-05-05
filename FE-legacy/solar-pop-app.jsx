/* ─────────────────────────────────────────────────────────
   Concept B · Solar Pop — 초대장 앱
   7섹션 · 스냅 스크롤 · 섹션별 배경 전환 · 타이포 스윕
   ───────────────────────────────────────────────────────── */

const { useState, useEffect, useRef } = React;
const D = window.CONCEPT_B;

// 섹션별 팔레트 · 각 섹션은 풀스크린 컬러
const SECTIONS = [
  { id: 'hero',     bg: '#4D089A', fg: '#E3F044', accent: '#DC2ADE' },
  { id: 'invite',   bg: '#E3F044', fg: '#4D089A', accent: '#DC2ADE' },
  { id: 'when',     bg: '#DC2ADE', fg: '#E3F044', accent: '#323EDD' },
  { id: 'timeline', bg: '#323EDD', fg: '#E3F044', accent: '#DC2ADE' },
  { id: 'gallery',  bg: '#0A0A14', fg: '#E3F044', accent: '#DC2ADE' },
  { id: 'program',  bg: '#E3F044', fg: '#4D089A', accent: '#323EDD' },
  { id: 'direct',   bg: '#4D089A', fg: '#E3F044', accent: '#DC2ADE' },
  { id: 'rsvp',     bg: '#DC2ADE', fg: '#FFFFFF', accent: '#E3F044' },
];

// ─── 활성 섹션 감지 훅 (스크롤 컨테이너 기준) ───
//   첫 렌더 시 active=-1 → 마운트 후 0으로 변경 → 첫 섹션 진입 애니메이션 트리거
function useActiveSection(scrollRef, count) {
  const [active, setActive] = useState(-1);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollTop / el.clientHeight);
      setActive(Math.max(0, Math.min(count - 1, idx)));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    // 첫 마운트 직후 한 프레임 뒤 active=0으로 → 진입 transition 실행
    requestAnimationFrame(() => {
      requestAnimationFrame(onScroll);
    });
    return () => el.removeEventListener('scroll', onScroll);
  }, [count]);
  return active;
}

// ─── 섹션 래퍼 ───
function Section({ children, palette, index, active }) {
  const isActive = index === active;
  return (
    <section
      data-section-index={index}
      style={{
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        width: '100%',
        minHeight: '100%',
        height: '100%',
        flex: '0 0 100%',
        background: palette.bg,
        color: palette.fg,
        position: 'relative',
        overflow: 'hidden',
        padding: '60px 22px 40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
      }}>
      <div
        data-enter={isActive ? 'in' : 'out'}
        style={{
          display: 'flex', flexDirection: 'column', height: '100%',
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.6s ease-out, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          transitionDelay: isActive ? '0.1s' : '0s'
        }}>
        {children}
      </div>
    </section>
  );
}

// ─── 공통: 섹션 헤더 (번호 + 라벨) ───
function SectionTag({ num, label, palette }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      fontFamily: '"Archivo Black", sans-serif',
      fontSize: 11, letterSpacing: 2, color: palette.fg
    }}>
      <span>{String(num).padStart(2, '0')}</span>
      <span style={{ flex: 1, height: 1, background: palette.fg, opacity: 0.4 }} />
      <span>{label}</span>
    </div>
  );
}

// ═════════════════════════════════════════════════════════
// 01 HERO
// ═════════════════════════════════════════════════════════
function Hero({ palette, active }) {
  return (
    <>
      {/* 장식 도형 */}
      <div style={{
        position: 'absolute', right: -40, top: 140,
        width: 180, height: 180, borderRadius: '50%',
        background: palette.accent,
        boxShadow: `0 0 80px ${palette.accent}88`,
        transform: active ? 'scale(1) rotate(0deg)' : 'scale(0.4) rotate(-45deg)',
        transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute', left: -30, bottom: 180,
        width: 100, height: 100, background: '#323EDD',
        transform: active ? 'rotate(22deg)' : 'rotate(-30deg) scale(0.5)',
        transition: 'transform 1s cubic-bezier(0.22, 1, 0.36, 1) 0.4s',
        zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <SectionTag num={1} label={`${D.event.host} · ${D.event.year}`} palette={palette} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, marginTop: 24 }}>
        <div style={{
          fontFamily: '"Archivo Black", sans-serif',
          fontSize: 68, lineHeight: 0.85, color: palette.fg,
          letterSpacing: -1.5
        }}>
          <SweepText text="SUMMER" active={active} delay={0.2} />
          <SweepText text="FEST" active={active} delay={0.35} />
          <div style={{ color: '#fff' }}><SweepText text="2026" active={active} delay={0.5} /></div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, marginTop: 18 }}>
        <div style={{
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 15, color: '#fff', fontWeight: 600,
          opacity: active ? 1 : 0,
          transform: active ? 'translateY(0)' : 'translateY(12px)',
          transition: 'all 0.6s ease 0.8s'
        }}>
          {D.event.title}
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{
        position: 'relative', zIndex: 1,
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 0.6s ease 1s'
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'baseline', gap: 10,
          padding: '10px 16px', background: palette.fg, color: palette.bg,
          fontFamily: '"Archivo Black", sans-serif', fontSize: 13, letterSpacing: 1
        }}>
          {D.schedule.dateDisplay} {D.schedule.day} · {D.schedule.timeDisplay}
        </div>
        <div style={{ fontSize: 12, color: '#fff', marginTop: 10, opacity: 0.7 }}>
          {D.location.name}
        </div>
      </div>

      {/* 스크롤 인디케이터 · 손가락 스와이프 업 */}
      <div style={{
        position: 'absolute', bottom: 18, right: 20,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        fontSize: 9, color: palette.fg, letterSpacing: 2, fontWeight: 700,
        fontFamily: '"Archivo Black", sans-serif',
        opacity: active ? 0.9 : 0, transition: 'opacity 0.5s ease 1.2s',
        zIndex: 2,
        pointerEvents: 'none'
      }}>
        <span>SWIPE UP</span>
        {/* 손가락 터치 + 위로 이동하는 궤적 */}
        <div style={{
          position: 'relative', width: 36, height: 44
        }}>
          {/* 궤적 선 */}
          <div style={{
            position: 'absolute', left: '50%', top: 2,
            width: 2, height: 20, background: `linear-gradient(to bottom, transparent, ${palette.fg})`,
            transform: 'translateX(-50%)', opacity: 0.35
          }} />
          {/* 터치 원 · 아래에서 위로 */}
          <div style={{
            position: 'absolute', left: '50%', bottom: 0,
            width: 16, height: 16, borderRadius: '50%',
            border: `1.5px solid ${palette.fg}`,
            transform: 'translateX(-50%)',
            animation: 'solarpop-swipe-up 1.6s ease-in-out infinite'
          }}>
            <div style={{
              position: 'absolute', inset: 3, borderRadius: '50%',
              background: palette.fg, opacity: 0.6
            }} />
          </div>
        </div>
      </div>
    </>
  );
}

// 좌→우 스윕 텍스트
function SweepText({ text, active, delay = 0 }) {
  return (
    <div style={{ overflow: 'hidden', paddingBottom: 4 }}>
      <div style={{
        display: 'inline-block',
        transform: active ? 'translateX(0)' : 'translateX(-110%)',
        transition: `transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`
      }}>
        {text}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════
// 02 INVITE
// ═════════════════════════════════════════════════════════
function Invite({ palette, active }) {
  return (
    <>
      <SectionTag num={2} label="INVITATION" palette={palette} />

      <div style={{ marginTop: 28 }}>
        <div style={{
          fontFamily: '"Archivo Black", sans-serif', fontSize: 56,
          lineHeight: 0.85, color: palette.fg, letterSpacing: -1.5
        }}>
          <SweepText text="YOU" active={active} delay={0.2} />
          <SweepText text="ARE" active={active} delay={0.35} />
          <SweepText text="INVITED." active={active} delay={0.5} />
        </div>
      </div>

      <div style={{
        marginTop: 32, fontFamily: 'Pretendard, sans-serif',
        fontSize: 14, lineHeight: 1.8, color: palette.fg, fontWeight: 600,
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s ease 0.8s'
      }}>
        <div style={{ fontWeight: 700, marginBottom: 10 }}>{D.invite.greeting}</div>
        {D.invite.message.map((line, i) => (
          <div key={i} style={{ minHeight: line === '' ? 10 : 'auto' }}>{line}</div>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      <div style={{
        fontSize: 11, color: palette.fg, opacity: 0.7, fontWeight: 600,
        transform: active ? 'translateY(0)' : 'translateY(12px)',
        transition: 'all 0.8s ease 1.2s'
      }}>
        {D.invite.signature}
      </div>
    </>
  );
}

// ═════════════════════════════════════════════════════════
// 03 WHEN & WHERE
// ═════════════════════════════════════════════════════════
function WhenWhere({ palette, active }) {
  return (
    <>
      <SectionTag num={3} label="WHEN · WHERE" palette={palette} />

      <div style={{ marginTop: 24 }}>
        <div style={{
          fontFamily: '"Archivo Black", sans-serif', fontSize: 60,
          lineHeight: 0.9, color: palette.fg, letterSpacing: -1.5
        }}>
          <SweepText text="SAVE" active={active} delay={0.2} />
          <SweepText text="THE" active={active} delay={0.32} />
          <SweepText text="DATE" active={active} delay={0.44} />
        </div>
      </div>

      <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* 날짜 카드 */}
        <div style={{
          background: palette.fg, color: palette.bg, padding: '22px 20px',
          opacity: active ? 1 : 0,
          transform: active ? 'translateX(0)' : 'translateX(-30px)',
          transition: 'all 0.7s ease 0.7s'
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, opacity: 0.7 }}>DATE</div>
          <div style={{
            fontFamily: '"Archivo Black", sans-serif', fontSize: 54, lineHeight: 1,
            marginTop: 6, letterSpacing: -2, display: 'flex', alignItems: 'baseline', gap: 10
          }}>
            {D.schedule.dateDisplay}
            <span style={{ fontSize: 16, fontWeight: 700 }}>{D.schedule.day}</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, marginTop: 8 }}>
            {D.schedule.timeDisplay}
          </div>
        </div>

        {/* 장소 카드 */}
        <div style={{
          background: palette.accent, color: palette.fg, padding: '22px 20px',
          opacity: active ? 1 : 0,
          transform: active ? 'translateX(0)' : 'translateX(30px)',
          transition: 'all 0.7s ease 0.85s'
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, opacity: 0.7 }}>PLACE</div>
          <div style={{
            fontFamily: '"Archivo Black", sans-serif', fontSize: 26, lineHeight: 1.1,
            marginTop: 6, letterSpacing: -0.5
          }}>
            {D.location.name}
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, marginTop: 8, opacity: 0.85 }}>
            {D.location.address}<br />
            {D.location.detail}
          </div>
        </div>
      </div>
    </>
  );
}

// ═════════════════════════════════════════════════════════
// 04 TIMELINE
// ═════════════════════════════════════════════════════════
function Timeline({ palette, active }) {
  return (
    <>
      <SectionTag num={4} label="TIMELINE" palette={palette} />

      <div style={{ marginTop: 24 }}>
        <div style={{
          fontFamily: '"Archivo Black", sans-serif', fontSize: 60,
          lineHeight: 0.9, color: palette.fg, letterSpacing: -1.5
        }}>
          <SweepText text="ALL" active={active} delay={0.2} />
          <SweepText text="DAY" active={active} delay={0.32} />
          <SweepText text="LONG" active={active} delay={0.44} />
        </div>
      </div>

      <div className="no-scrollbar" style={{ marginTop: 20, flex: 1, overflowY: 'auto', paddingRight: 4 }}>
        {D.timeline.map((t, i) => (
          <div key={i} style={{
            display: 'flex', gap: 14, padding: '10px 0',
            borderBottom: `1px solid ${palette.fg}33`,
            opacity: active ? 1 : 0,
            transform: active ? 'translateY(0)' : 'translateY(20px)',
            transition: `all 0.5s ease ${0.7 + i * 0.06}s`
          }}>
            <div style={{
              fontFamily: '"Archivo Black", sans-serif', fontSize: 14,
              color: palette.fg, minWidth: 50, fontVariantNumeric: 'tabular-nums'
            }}>{t.time}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: palette.fg }}>{t.title}</div>
              <div style={{ fontSize: 11, color: palette.fg, opacity: 0.7, marginTop: 2 }}>{t.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ═════════════════════════════════════════════════════════
// 05 GALLERY (가로 캐러셀)
// ═════════════════════════════════════════════════════════
function GalleryShape({ shape, palette, w = 280, h = 280 }) {
  // 실제 사진 대신 브랜드 컬러 기반 일러스트 플레이스홀더
  const common = { width: w, height: h, display: 'block' };
  if (shape === 'circles') {
    return (
      <svg viewBox="0 0 280 280" style={common}>
        <circle cx="90" cy="150" r="75" fill={palette.fg} opacity="0.9"/>
        <circle cx="180" cy="110" r="55" fill={palette.accent}/>
        <circle cx="200" cy="200" r="40" fill={palette.fg} opacity="0.4"/>
      </svg>
    );
  }
  if (shape === 'stripes') {
    return (
      <svg viewBox="0 0 280 280" style={common}>
        {[0,1,2,3,4,5].map(i => (
          <rect key={i} x={-20 + i*55} y="0" width="32" height="280"
            fill={i % 2 ? palette.fg : palette.accent}
            transform={`rotate(12 ${-20 + i*55 + 16} 140)`}/>
        ))}
      </svg>
    );
  }
  if (shape === 'dots') {
    return (
      <svg viewBox="0 0 280 280" style={common}>
        {Array.from({length: 36}).map((_, i) => {
          const r = 3 + (i * 37) % 10;
          return <circle key={i} cx={(i%6)*48+24} cy={Math.floor(i/6)*48+24} r={r}
            fill={i%3===0 ? palette.accent : palette.bg} opacity={0.85}/>;
        })}
      </svg>
    );
  }
  if (shape === 'waves') {
    return (
      <svg viewBox="0 0 280 280" style={common}>
        {[40,90,140,190,240].map((y, i) => (
          <path key={i}
            d={`M 0 ${y} Q 70 ${y-30} 140 ${y} T 280 ${y}`}
            stroke={i%2 ? palette.fg : palette.accent}
            strokeWidth="6" fill="none" opacity={0.85}/>
        ))}
      </svg>
    );
  }
  if (shape === 'burst') {
    return (
      <svg viewBox="0 0 280 280" style={common}>
        <g transform="translate(140 140)">
          {Array.from({length: 16}).map((_, i) => (
            <rect key={i} x="-4" y="-120" width="8" height="120"
              fill={i%2 ? palette.fg : palette.accent}
              transform={`rotate(${i*22.5})`}/>
          ))}
          <circle r="36" fill={palette.fg}/>
        </g>
      </svg>
    );
  }
  // grid (default)
  return (
    <svg viewBox="0 0 280 280" style={common}>
      {Array.from({length: 16}).map((_, i) => (
        <rect key={i} x={(i%4)*70+4} y={Math.floor(i/4)*70+4}
          width="62" height="62"
          fill={i%5===0 ? palette.accent : palette.fg}
          opacity={0.3 + ((i*13)%7)/10}/>
      ))}
    </svg>
  );
}

function Gallery({ palette, active }) {
  const items = D.gallery;
  // 3열 각각 다른 순서로 섞어서 무한 루프 효과
  const row1 = [...items, ...items.slice(0, 2)];
  const row2 = [...items.slice(3), ...items.slice(0, 3), ...items.slice(0, 2)];
  const row3 = [...items.slice(1), ...items.slice(0, 1), ...items.slice(0, 2)];

  return (
    <>
      <SectionTag num={5} label="GALLERY" palette={palette} />

      <div style={{ marginTop: 24 }}>
        <div style={{
          fontFamily: '"Archivo Black", sans-serif', fontSize: 56,
          lineHeight: 0.9, color: palette.fg, letterSpacing: -1.5
        }}>
          <SweepText text="PAST" active={active} delay={0.2} />
          <SweepText text="YEARS" active={active} delay={0.34} />
        </div>
      </div>

      <div style={{
        marginTop: 10, fontSize: 12, color: palette.fg, fontWeight: 600,
        opacity: active ? 0.7 : 0, transition: 'opacity 0.6s ease 0.6s'
      }}>
        지난 6년의 하이라이트
      </div>

      <div style={{ flex: 1, minHeight: 20 }} />

      {/* 3열 마퀴 캐러셀 */}
      <div style={{
        margin: '0 -22px',
        display: 'flex', flexDirection: 'column', gap: 10,
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.7s ease 0.7s'
      }}>
        <MarqueeRow items={row1} direction="left"  duration={55} palette={palette} />
        <MarqueeRow items={row2} direction="right" duration={65} palette={palette} />
        <MarqueeRow items={row3} direction="left"  duration={48} palette={palette} />
      </div>

      <div style={{
        marginTop: 14, fontSize: 10, color: palette.fg, opacity: 0.5,
        letterSpacing: 2, fontWeight: 700, fontFamily: '"Archivo Black", sans-serif',
        textAlign: 'center',
        opacity: active ? 0.5 : 0, transition: 'opacity 0.6s ease 1.2s'
      }}>
        2020 — 2025 · HANARO ARCHIVE
      </div>
    </>
  );
}

// 한 줄 마퀴: 카드가 끝없이 한 방향으로 흐름
function MarqueeRow({ items, direction, duration, palette }) {
  // 끊김 없이 무한 루프를 위해 2배로 복제
  const doubled = [...items, ...items];
  return (
    <div style={{
      overflow: 'hidden',
      maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'
    }}>
      <div style={{
        display: 'flex', gap: 8,
        width: 'max-content',
        animation: `solarpop-marquee-${direction} ${duration}s linear infinite`
      }}>
        {doubled.map((it, i) => (
          <div key={i} style={{
            flex: '0 0 auto',
            width: 130, height: 130,
            background: it.bg,
            position: 'relative', overflow: 'hidden',
            boxShadow: `0 4px 12px rgba(0,0,0,0.35)`
          }}>
            <GalleryShape
              shape={it.shape}
              palette={{ bg: it.bg, fg: it.fg, accent: items[(i+1) % items.length].bg }}
            />
            <div style={{
              position: 'absolute', top: 6, left: 6,
              background: it.fg, color: it.bg,
              padding: '2px 6px',
              fontFamily: '"Archivo Black", sans-serif', fontSize: 8, letterSpacing: 1
            }}>{it.year}</div>
            <div style={{
              position: 'absolute', bottom: 6, left: 6, right: 6,
              color: it.fg, fontSize: 9, fontWeight: 700,
              textShadow: `0 1px 4px ${it.bg}`,
              lineHeight: 1.2
            }}>{it.caption}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════
// 06 PROGRAM
// ═════════════════════════════════════════════════════════
function Program({ palette, active }) {
  return (
    <>
      <SectionTag num={6} label="PROGRAM" palette={palette} />

      <div style={{ marginTop: 24 }}>
        <div style={{
          fontFamily: '"Archivo Black", sans-serif', fontSize: 56,
          lineHeight: 0.9, color: palette.fg, letterSpacing: -1.5
        }}>
          <SweepText text="PLAY" active={active} delay={0.2} />
          <SweepText text="&" active={active} delay={0.32} />
          <SweepText text="ENJOY" active={active} delay={0.44} />
        </div>
      </div>

      <div style={{ marginTop: 20, flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {D.programs.map((p, i) => (
          <div key={i} style={{
            background: palette.bg, color: palette.fg, padding: '14px 16px',
            border: `2px solid ${palette.fg}`,
            opacity: active ? 1 : 0,
            transform: active ? 'translateX(0)' : `translateX(${i % 2 === 0 ? -20 : 20}px)`,
            transition: `all 0.6s ease ${0.7 + i * 0.08}s`
          }}>
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4
            }}>
              <span style={{
                fontFamily: '"Archivo Black", sans-serif', fontSize: 14,
                color: palette.accent
              }}>{p.num}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: palette.fg }}>{p.title}</span>
            </div>
            <div style={{ fontSize: 10.5, color: palette.fg, opacity: 0.8, lineHeight: 1.5 }}>
              {p.desc}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ═════════════════════════════════════════════════════════
// 06 DIRECTIONS
// ═════════════════════════════════════════════════════════
function Directions({ palette, active }) {
  return (
    <>
      <SectionTag num={7} label="DIRECTIONS" palette={palette} />

      <div style={{ marginTop: 24 }}>
        <div style={{
          fontFamily: '"Archivo Black", sans-serif', fontSize: 60,
          lineHeight: 0.9, color: palette.fg, letterSpacing: -1.5
        }}>
          <SweepText text="FIND" active={active} delay={0.2} />
          <SweepText text="US" active={active} delay={0.32} />
          <SweepText text="HERE." active={active} delay={0.44} />
        </div>
      </div>

      {/* 스타일 지도 */}
      <div style={{
        marginTop: 24, height: 140, position: 'relative',
        background: `linear-gradient(135deg, ${palette.fg}22 0%, ${palette.accent}44 100%)`,
        border: `1px solid ${palette.fg}44`,
        overflow: 'hidden',
        opacity: active ? 1 : 0,
        transition: 'opacity 0.8s ease 0.7s'
      }}>
        {/* 격자 */}
        <svg viewBox="0 0 280 140" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <defs>
            <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke={palette.fg} strokeWidth="0.5" strokeOpacity="0.2"/>
            </pattern>
          </defs>
          <rect width="280" height="140" fill="url(#grid)" />
          <path d="M 0 70 Q 80 40 140 70 T 280 70" stroke={palette.fg} strokeWidth="2" fill="none" strokeOpacity="0.6" />
          <path d="M 140 0 L 140 140" stroke={palette.fg} strokeWidth="1.5" strokeOpacity="0.3" />
        </svg>
        {/* 위치 핀 */}
        <div style={{
          position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4
        }}>
          <div style={{
            width: 40, height: 40, background: palette.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: '"Archivo Black", sans-serif', fontSize: 14, color: palette.fg,
            boxShadow: `0 0 24px ${palette.accent}`
          }}>✕</div>
          <div style={{
            fontSize: 9, letterSpacing: 2, fontWeight: 700, color: palette.fg,
            fontFamily: '"Archivo Black", sans-serif'
          }}>HANARO</div>
        </div>
      </div>

      {/* 교통편 */}
      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {D.transport.map((t, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 12px',
            border: `1px solid ${palette.fg}44`,
            opacity: active ? 1 : 0,
            transform: active ? 'translateX(0)' : 'translateX(-16px)',
            transition: `all 0.5s ease ${0.9 + i * 0.08}s`
          }}>
            <div style={{
              width: 30, height: 30, background: palette.fg, color: palette.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Archivo Black", sans-serif', fontSize: 14
            }}>{t.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: palette.fg, letterSpacing: 1 }}>{t.label}</div>
              <div style={{ fontSize: 10, color: palette.fg, opacity: 0.7, marginTop: 1 }}>{t.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ═════════════════════════════════════════════════════════
// 07 RSVP
// ═════════════════════════════════════════════════════════
function RSVP({ palette, active }) {
  const [status, setStatus] = useState(null); // null | 'yes' | 'no' | 'done'
  const [people, setPeople] = useState(2);
  const [name, setName] = useState('');

  return (
    <>
      <SectionTag num={8} label="RSVP" palette={palette} />

      <div style={{ marginTop: 24 }}>
        <div style={{
          fontFamily: '"Archivo Black", sans-serif', fontSize: 64,
          lineHeight: 0.85, color: palette.fg, letterSpacing: -1.8
        }}>
          <SweepText text="JOIN" active={active} delay={0.2} />
          <SweepText text="US." active={active} delay={0.34} />
        </div>
      </div>

      <div style={{
        marginTop: 14, fontSize: 13, color: palette.fg, opacity: 0.9, lineHeight: 1.6,
        fontWeight: 600,
        opacity: active ? 0.9 : 0,
        transition: 'opacity 0.6s ease 0.7s'
      }}>
        {D.event.tagline}<br />
        준비에 도움이 되도록 참석 여부를 알려주세요.
      </div>

      <div style={{ flex: 1 }} />

      {status === 'done' ? (
        <div style={{
          background: palette.accent, color: palette.fg, padding: '32px 24px',
          textAlign: 'center'
        }}>
          <div style={{
            fontFamily: '"Archivo Black", sans-serif', fontSize: 32,
            letterSpacing: -0.5
          }}>THANK YOU!</div>
          <div style={{ fontSize: 13, marginTop: 10, fontWeight: 600 }}>
            참석이 확정되었습니다 ·<br />
            당일 만나 뵙겠습니다 🎉
          </div>
        </div>
      ) : status === 'yes' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 11, color: palette.fg, letterSpacing: 1, fontWeight: 700 }}>NAME</div>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="홍길동"
            style={{
              background: 'transparent', border: 'none',
              borderBottom: `2px solid ${palette.fg}`,
              padding: '10px 0', fontSize: 16, color: palette.fg,
              fontFamily: 'Pretendard, sans-serif', fontWeight: 600, outline: 'none'
            }}
          />
          <div style={{ fontSize: 11, color: palette.fg, letterSpacing: 1, fontWeight: 700, marginTop: 12 }}>PEOPLE</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button onClick={() => setPeople(Math.max(1, people - 1))} style={{
              width: 44, height: 44, background: 'transparent', border: `2px solid ${palette.fg}`,
              color: palette.fg, fontSize: 20, fontFamily: '"Archivo Black", sans-serif',
              cursor: 'pointer'
            }}>−</button>
            <div style={{
              flex: 1, textAlign: 'center',
              fontFamily: '"Archivo Black", sans-serif', fontSize: 36, color: palette.fg
            }}>{people}</div>
            <button onClick={() => setPeople(people + 1)} style={{
              width: 44, height: 44, background: palette.fg, border: `2px solid ${palette.fg}`,
              color: palette.bg, fontSize: 20, fontFamily: '"Archivo Black", sans-serif',
              cursor: 'pointer'
            }}>+</button>
          </div>
          <button
            onClick={() => setStatus('done')}
            disabled={!name}
            style={{
              marginTop: 20, background: palette.accent, color: palette.fg,
              padding: '18px', border: 'none', cursor: name ? 'pointer' : 'not-allowed',
              fontFamily: '"Archivo Black", sans-serif', fontSize: 16, letterSpacing: 2,
              opacity: name ? 1 : 0.5, width: '100%'
            }}>
            CONFIRM →
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={() => setStatus('yes')} style={{
            background: palette.accent, color: '#4D089A', border: 'none',
            padding: '18px', cursor: 'pointer',
            fontFamily: '"Archivo Black", sans-serif', fontSize: 16, letterSpacing: 1,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <span>YES, I'M IN</span><span>→</span>
          </button>
          <button
            onClick={() => {
              if (status === 'no') return;
              setStatus('no');
              setTimeout(() => setStatus(prev => prev === 'no' ? null : prev), 2000);
            }}
            style={{
              background: status === 'no' ? palette.fg : 'transparent',
              color: status === 'no' ? palette.bg : palette.fg,
              border: `2px solid ${palette.fg}`, padding: '16px', cursor: 'pointer',
              fontFamily: '"Archivo Black", sans-serif', fontSize: 13, letterSpacing: 1,
              transition: 'all 0.25s ease',
              position: 'relative', overflow: 'hidden'
            }}>
            <span
              key={status === 'no' ? 'no' : 'default'}
              style={{
                display: 'inline-block',
                animation: 'solarpop-rsvp-flip 0.35s ease-out'
              }}>
              {status === 'no' ? "NO! YOU CAN!" : "NO, I'M OUT..."}
            </span>
          </button>
        </div>
      )}

      <div style={{
        marginTop: 16, fontSize: 10, color: palette.fg, opacity: 0.7, textAlign: 'center',
        fontFamily: 'ui-monospace, monospace'
      }}>
        {D.contact.phone} · {D.contact.kakao}
      </div>
    </>
  );
}

// ═════════════════════════════════════════════════════════
// 섹션 네비 도트 (우측 고정)
// ═════════════════════════════════════════════════════════
function NavDots({ active, total, palette, onJump }) {
  return (
    <div style={{
      position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
      zIndex: 50, display: 'flex', flexDirection: 'column', gap: 8,
      pointerEvents: 'auto'
    }}>
      {Array.from({ length: total }).map((_, i) => (
        <button key={i} onClick={() => onJump(i)} style={{
          width: i === active ? 18 : 6, height: 6, border: 'none',
          background: palette.fg, opacity: i === active ? 1 : 0.4,
          cursor: 'pointer', padding: 0,
          transition: 'all 0.3s ease'
        }} />
      ))}
    </div>
  );
}

// ═════════════════════════════════════════════════════════
// 반응형 디바이스 래퍼 — 프레임 토글 + 뷰포트 fit
//   children DOM은 frame 토글 시에도 unmount되지 않음
//   → 스크롤 위치 / IntersectionObserver / state 모두 보존
// ═════════════════════════════════════════════════════════
function ResponsiveDevice({ children, dark }) {
  const [frame, setFrame] = useState(() => document.body.classList.contains('frame-on'));
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    const onToggle = () => setFrame(document.body.classList.contains('frame-on'));
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('frame-toggle', onToggle);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('frame-toggle', onToggle);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const baseW = 390;
  const baseH = 844;

  let outerStyle;
  if (frame) {
    const padding = 32;
    const scale = Math.min(
      (size.w - padding) / baseW,
      (size.h - padding) / baseH,
      1
    );
    outerStyle = {
      width: baseW, height: baseH,
      borderRadius: 48,
      background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      position: 'relative', overflow: 'hidden',
      transform: `scale(${scale})`, transformOrigin: 'center center',
    };
  } else {
    const maxW = Math.min(size.w, 460);
    outerStyle = {
      width: maxW, height: '100dvh',
      position: 'relative', overflow: 'hidden',
      borderRadius: 0,
      boxShadow: maxW < size.w ? '0 0 60px rgba(0,0,0,0.4)' : 'none',
    };
  }

  return (
    <div style={outerStyle}>
      {frame && (
        <>
          <div style={{
            position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
            width: 126, height: 37, borderRadius: 24, background: '#000', zIndex: 50,
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 60,
            height: 34, display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
            paddingBottom: 8, pointerEvents: 'none',
          }}>
            <div style={{
              width: 139, height: 5, borderRadius: 100,
              background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)',
            }} />
          </div>
        </>
      )}
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        {children}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════
// 메인 앱
// ═════════════════════════════════════════════════════════
function SolarPopApp() {
  const scrollRef = useRef(null);
  const active = useActiveSection(scrollRef, SECTIONS.length);
  const currentPalette = SECTIONS[Math.max(0, active)];

  const jumpTo = (i) => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: i * el.clientHeight, behavior: 'smooth' });
  };

  const sections = [
    <Hero key="h" palette={SECTIONS[0]} active={active === 0} />,
    <Invite key="i" palette={SECTIONS[1]} active={active === 1} />,
    <WhenWhere key="w" palette={SECTIONS[2]} active={active === 2} />,
    <Timeline key="t" palette={SECTIONS[3]} active={active === 3} />,
    <Gallery key="g" palette={SECTIONS[4]} active={active === 4} />,
    <Program key="p" palette={SECTIONS[5]} active={active === 5} />,
    <Directions key="d" palette={SECTIONS[6]} active={active === 6} />,
    <RSVP key="r" palette={SECTIONS[7]} active={active === 7} />
  ];

  return (
    <ResponsiveDevice dark={currentPalette.bg !== '#E3F044'}>
      <div style={{ position: 'relative', height: '100%', width: '100%' }}>
        <div
          ref={scrollRef}
          className="no-scrollbar"
          style={{
            height: '100%', width: '100%',
            overflowY: 'auto', overflowX: 'hidden',
            scrollSnapType: 'y mandatory',
            scrollBehavior: 'smooth',
            display: 'flex', flexDirection: 'column',
            WebkitOverflowScrolling: 'touch'
          }}>
          {sections.map((s, i) => (
            <Section key={SECTIONS[i].id} palette={SECTIONS[i]} index={i} active={active}>
              {s}
            </Section>
          ))}
        </div>
        <NavDots active={active} total={SECTIONS.length} palette={currentPalette} onJump={jumpTo} />
      </div>
    </ResponsiveDevice>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SolarPopApp />);
