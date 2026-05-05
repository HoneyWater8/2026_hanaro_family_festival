// 하나로가족한마당 모바일 초대장
// Warm, family-festival tone — coral/cream palette, placeholder imagery

const BRAND = {
  ink: '#2A1810',
  ink2: '#5B3A28',
  muted: '#8B6F5E',
  cream: '#FFF8EE',
  paper: '#FFFDF8',
  coral: '#E85A3C',
  coralDeep: '#C8432A',
  mustard: '#E8B93C',
  sage: '#6B8F5E',
  line: 'rgba(42,24,16,0.12)',
};

// ── Event data ───────────────────────────────────────────────
const EVENT = {
  title: '하나로 가족한마당',
  subtitle: '2026 봄, 우리가 함께 모이는 하루',
  host: '하나로 임직원 가족 여러분을 초대합니다',
  date: '2026년 5월 17일 토요일',
  dateShort: { y: 2026, m: 5, d: 17, h: 10, min: 0 },
  time: '오전 10:00 — 오후 4:00',
  venue: '하나로 본사 앞마당 & 중앙공원',
  address: '서울특별시 중구 세종대로 110',
  timeline: [
    { time: '10:00', title: '개회식', desc: '환영 인사 · 축하 공연', key: 'open' },
    { time: '10:40', title: '가족 게임', desc: '팀을 이뤄 함께 즐기는 미니올림픽', key: 'game' },
    { time: '12:00', title: '점심 · 푸드트럭', desc: '8종의 트럭과 다과 부스', key: 'lunch' },
    { time: '13:30', title: '체험 부스', desc: '캘리그라피 · 캐리커처 · 플라워', key: 'booth' },
    { time: '14:30', title: '초청 공연', desc: '버스커 밴드 · 마술쇼', key: 'show' },
    { time: '15:30', title: '경품 추첨', desc: '가족이 함께 참여하는 대추첨', key: 'prize' },
    { time: '16:00', title: '폐회', desc: '기념사진 · 답례품 전달', key: 'close' },
  ],
  programs: [
    { t: '가족 미니올림픽', d: '팀별 릴레이, 줄다리기, 박터뜨리기', tag: '전 연령' },
    { t: '푸드트럭 존', d: '8종 트럭 · 디저트 · 음료 무제한', tag: '12:00 ~' },
    { t: '체험 부스 12곳', d: '캘리그라피, 캐리커처, 플라워, 페이스페인팅', tag: '상시' },
    { t: '초청 공연', d: '버스커 밴드, 마술쇼, 키즈 댄스', tag: '14:30' },
    { t: '경품 대추첨', d: '가전, 상품권, 여행 패키지 등 200여 점', tag: '15:30' },
    { t: '포토존 4곳', d: '봄꽃 · 패밀리 · 빈티지 · 네온', tag: '상시' },
  ],
};

// ── Countdown hook ───────────────────────────────────────────
function useCountdown(target) {
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

// ── Intersection reveal ──────────────────────────────────────
function useReveal() {
  const ref = React.useRef(null);
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } },
      { threshold: 0.12, root: el.closest('[data-scroll-root]') }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, on];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, on] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: on ? 1 : 0,
      transform: on ? 'translateY(0)' : 'translateY(18px)',
      transition: `opacity 700ms ${delay}ms cubic-bezier(.2,.7,.2,1), transform 700ms ${delay}ms cubic-bezier(.2,.7,.2,1)`,
      ...style,
    }}>{children}</div>
  );
}

// ── Placeholder illustration (fabric/flower crest) ───────────
function Crest({ size = 120, color = BRAND.coral, accent = BRAND.mustard }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden>
      <defs>
        <radialGradient id="crestG" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
        </radialGradient>
      </defs>
      {/* petals */}
      {[0,1,2,3,4,5].map(i => (
        <ellipse key={i} cx="60" cy="28" rx="11" ry="22"
          fill={color} opacity={0.85}
          transform={`rotate(${i*60} 60 60)`} />
      ))}
      <circle cx="60" cy="60" r="14" fill={accent}/>
      <circle cx="60" cy="60" r="52" fill="url(#crestG)"/>
    </svg>
  );
}

// ── Photo placeholder (textured gradient with caption) ───────
function Photo({ label, h = 160, tone = 'coral', aspect, style = {} }) {
  const tones = {
    coral:   ['#F4B79E', '#E85A3C'],
    mustard: ['#F6D98F', '#D99A1F'],
    sage:    ['#B8CFA8', '#6B8F5E'],
    dusk:    ['#C9A9B8', '#7F5A6E'],
    sky:     ['#A9C6D8', '#4B7A96'],
    paper:   ['#F3E6D0', '#C9A97E'],
  };
  const [a, b] = tones[tone] || tones.coral;
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: aspect ? undefined : h,
      aspectRatio: aspect,
      borderRadius: 18,
      overflow: 'hidden',
      background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)`,
      boxShadow: '0 1px 2px rgba(42,24,16,0.08), inset 0 0 0 1px rgba(255,255,255,0.3)',
      ...style,
    }}>
      {/* grain / pattern */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.35, mixBlendMode: 'soft-light' }}>
        <defs>
          <pattern id={`dots-${tone}`} width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="white"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dots-${tone})`}/>
      </svg>
      {/* corner sheen */}
      <div style={{
        position: 'absolute', top: -30, right: -30, width: 120, height: 120,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.5), transparent 60%)',
      }}/>
      {label && (
        <div style={{
          position: 'absolute', left: 12, bottom: 10, right: 12,
          fontSize: 11, color: 'rgba(255,255,255,0.95)',
          fontFamily: 'var(--ff-body)',
          letterSpacing: '0.02em',
          textShadow: '0 1px 2px rgba(0,0,0,0.25)',
          display: 'flex', justifyContent: 'space-between',
        }}>
          <span>{label}</span>
          <span style={{ opacity: 0.75 }}>사진 예시</span>
        </div>
      )}
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      position: 'relative',
      padding: '40px 24px 56px',
      background: `
        radial-gradient(circle at 20% 10%, ${BRAND.mustard}22, transparent 40%),
        radial-gradient(circle at 100% 30%, ${BRAND.coral}33, transparent 50%),
        linear-gradient(180deg, ${BRAND.cream} 0%, ${BRAND.paper} 100%)
      `,
      overflow: 'hidden',
    }}>
      {/* decorative ribbons */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 400 600" preserveAspectRatio="none">
        <path d="M -20 520 Q 100 480 200 510 T 420 495" stroke={BRAND.coral} strokeWidth="1.5" fill="none" opacity="0.25" strokeDasharray="2 6"/>
        <path d="M -20 545 Q 120 510 200 540 T 420 525" stroke={BRAND.mustard} strokeWidth="1.5" fill="none" opacity="0.3" strokeDasharray="2 6"/>
      </svg>

      <div style={{ position: 'relative', textAlign: 'center' }}>
        <div style={{
          fontFamily: 'var(--ff-body)',
          fontSize: 11,
          letterSpacing: '0.36em',
          color: BRAND.coralDeep,
          fontWeight: 600,
          marginBottom: 14,
        }}>HANARO · FAMILY · FESTIVAL</div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
          <Crest size={96}/>
        </div>

        <h1 style={{
          fontFamily: 'var(--ff-display)',
          fontSize: 44,
          lineHeight: 1.05,
          fontWeight: 800,
          color: BRAND.ink,
          margin: '6px 0 10px',
          letterSpacing: '-0.02em',
        }}>하나로<br/>가족한마당</h1>

        <div style={{
          fontFamily: 'var(--ff-body)',
          fontSize: 14,
          color: BRAND.ink2,
          lineHeight: 1.6,
          maxWidth: 280,
          margin: '0 auto',
        }}>{EVENT.subtitle}</div>

        <div style={{
          marginTop: 28,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          padding: '8px 16px',
          borderRadius: 999,
          background: 'rgba(255,255,255,0.7)',
          border: `1px solid ${BRAND.line}`,
          fontFamily: 'var(--ff-body)',
          fontSize: 12,
          color: BRAND.ink2,
          fontWeight: 500,
          backdropFilter: 'blur(8px)',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: BRAND.coral, boxShadow: `0 0 0 4px ${BRAND.coral}22` }}/>
          2026. 05. 17 SAT · 10AM – 4PM
        </div>
      </div>
    </section>
  );
}

// ── Countdown ────────────────────────────────────────────────
function Countdown() {
  const target = React.useMemo(() => {
    const { y, m, d, h, min } = EVENT.dateShort;
    return new Date(y, m - 1, d, h, min).getTime();
  }, []);
  const { d, h, m, s } = useCountdown(target);
  const Cell = ({ n, label }) => (
    <div style={{
      flex: 1,
      background: BRAND.paper,
      border: `1px solid ${BRAND.line}`,
      borderRadius: 14,
      padding: '12px 0 10px',
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'var(--ff-display)',
        fontSize: 26,
        fontWeight: 700,
        color: BRAND.ink,
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
      }}>{String(n).padStart(2,'0')}</div>
      <div style={{
        fontFamily: 'var(--ff-body)',
        fontSize: 10,
        color: BRAND.muted,
        marginTop: 6,
        letterSpacing: '0.1em',
      }}>{label}</div>
    </div>
  );
  return (
    <Reveal>
      <div style={{ padding: '0 24px' }}>
        <div style={{
          fontFamily: 'var(--ff-body)',
          fontSize: 11,
          color: BRAND.muted,
          letterSpacing: '0.24em',
          textAlign: 'center',
          marginBottom: 10,
        }}>D — COUNTDOWN</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Cell n={d} label="DAYS"/>
          <Cell n={h} label="HOURS"/>
          <Cell n={m} label="MINS"/>
          <Cell n={s} label="SECS"/>
        </div>
      </div>
    </Reveal>
  );
}

// ── Section title ────────────────────────────────────────────
function SectionTitle({ kicker, title, align = 'left' }) {
  return (
    <div style={{ textAlign: align, padding: '0 24px', marginBottom: 18 }}>
      <div style={{
        fontFamily: 'var(--ff-body)',
        fontSize: 11,
        letterSpacing: '0.32em',
        color: BRAND.coralDeep,
        fontWeight: 600,
        marginBottom: 8,
      }}>{kicker}</div>
      <h2 style={{
        fontFamily: 'var(--ff-display)',
        fontSize: 26,
        fontWeight: 700,
        color: BRAND.ink,
        margin: 0,
        letterSpacing: '-0.01em',
      }}>{title}</h2>
    </div>
  );
}

// ── Invitation message ───────────────────────────────────────
function Invitation() {
  return (
    <section style={{ padding: '56px 0 40px' }}>
      <SectionTitle kicker="INVITATION" title="초대의 글" align="center"/>
      <Reveal>
        <div style={{
          margin: '0 24px',
          padding: '28px 24px',
          borderRadius: 24,
          background: BRAND.paper,
          border: `1px solid ${BRAND.line}`,
          position: 'relative',
        }}>
          {/* quote marks */}
          <div style={{
            position: 'absolute', top: -14, left: 24,
            background: BRAND.coral, color: '#fff',
            width: 32, height: 32, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--ff-display)', fontSize: 22, fontWeight: 700,
            lineHeight: 1, paddingBottom: 6,
          }}>&ldquo;</div>

          <p style={{
            fontFamily: 'var(--ff-body)',
            fontSize: 15,
            lineHeight: 1.85,
            color: BRAND.ink2,
            margin: 0,
            textWrap: 'pretty',
          }}>
            봄 햇살이 따뜻한 5월,<br/>
            하나로의 가족 여러분을 모십니다.<br/><br/>
            한 해를 함께 달려온 동료들과<br/>
            소중한 가족이 한자리에 모여,<br/>
            맛있는 음식과 즐거운 놀이 그리고<br/>
            잊지 못할 추억을 나누는 하루.<br/><br/>
            오셔서 자리를 빛내주세요.
          </p>

          <div style={{
            marginTop: 24,
            paddingTop: 18,
            borderTop: `1px dashed ${BRAND.line}`,
            fontFamily: 'var(--ff-display)',
            fontSize: 14,
            color: BRAND.ink,
            fontWeight: 600,
          }}>
            하나로 임직원 일동 올림
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ── Date & Venue ─────────────────────────────────────────────
function DateVenue() {
  return (
    <section style={{ padding: '40px 0' }}>
      <SectionTitle kicker="WHEN & WHERE" title="일시 & 장소"/>

      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Date card */}
        <Reveal>
          <div style={{
            borderRadius: 20,
            background: `linear-gradient(135deg, ${BRAND.coral} 0%, ${BRAND.coralDeep} 100%)`,
            padding: 20,
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* decorative circle */}
            <div style={{
              position: 'absolute', top: -40, right: -40,
              width: 140, height: 140, borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
            }}/>
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                <div style={{
                  fontFamily: 'var(--ff-display)',
                  fontSize: 64,
                  fontWeight: 800,
                  lineHeight: 0.9,
                  letterSpacing: '-0.03em',
                }}>17</div>
                <div>
                  <div style={{
                    fontFamily: 'var(--ff-body)',
                    fontSize: 11,
                    letterSpacing: '0.24em',
                    opacity: 0.85,
                  }}>SAT · MAY 2026</div>
                  <div style={{
                    fontFamily: 'var(--ff-display)',
                    fontSize: 20,
                    fontWeight: 700,
                    marginTop: 4,
                  }}>토요일</div>
                </div>
              </div>
              <div style={{
                marginTop: 16,
                paddingTop: 14,
                borderTop: '1px solid rgba(255,255,255,0.25)',
                fontFamily: 'var(--ff-body)',
                fontSize: 13,
                opacity: 0.95,
              }}>🕙 오전 10:00 — 오후 4:00</div>
            </div>
          </div>
        </Reveal>

        {/* Venue card */}
        <Reveal delay={80}>
          <div style={{
            borderRadius: 20,
            background: BRAND.paper,
            border: `1px solid ${BRAND.line}`,
            overflow: 'hidden',
          }}>
            <Photo label="하나로 본사 앞마당" tone="sage" aspect="16/9" style={{ borderRadius: 0 }}/>
            <div style={{ padding: 18 }}>
              <div style={{
                fontFamily: 'var(--ff-body)',
                fontSize: 11,
                letterSpacing: '0.22em',
                color: BRAND.muted,
                marginBottom: 6,
              }}>VENUE</div>
              <div style={{
                fontFamily: 'var(--ff-display)',
                fontSize: 18,
                fontWeight: 700,
                color: BRAND.ink,
                marginBottom: 4,
              }}>{EVENT.venue}</div>
              <div style={{
                fontFamily: 'var(--ff-body)',
                fontSize: 13,
                color: BRAND.ink2,
              }}>{EVENT.address}</div>

              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                <button style={btnStyle('solid')}>📍 길찾기</button>
                <button style={btnStyle('ghost')}>📋 주소 복사</button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function btnStyle(kind) {
  const base = {
    flex: 1,
    padding: '12px 0',
    borderRadius: 12,
    fontFamily: 'var(--ff-body)',
    fontSize: 13,
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 150ms ease',
  };
  if (kind === 'solid') return {
    ...base,
    background: BRAND.ink,
    color: BRAND.cream,
  };
  return {
    ...base,
    background: 'transparent',
    color: BRAND.ink,
    border: `1px solid ${BRAND.line}`,
  };
}

// ── Timeline ─────────────────────────────────────────────────
function Timeline() {
  const [active, setActive] = React.useState(null);
  return (
    <section style={{ padding: '40px 0', background: `linear-gradient(180deg, transparent, ${BRAND.cream}88 30%, ${BRAND.cream}88 70%, transparent)` }}>
      <SectionTitle kicker="SCHEDULE" title="행사 순서"/>
      <div style={{ padding: '0 24px', position: 'relative' }}>
        {/* vertical line */}
        <div style={{
          position: 'absolute',
          left: 24 + 36,
          top: 10,
          bottom: 10,
          width: 2,
          background: `repeating-linear-gradient(to bottom, ${BRAND.coral}44 0 6px, transparent 6px 12px)`,
        }}/>
        {EVENT.timeline.map((item, i) => {
          const isActive = active === item.key;
          return (
            <Reveal key={item.key} delay={i * 40}>
              <div
                onClick={() => setActive(isActive ? null : item.key)}
                style={{
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                  padding: '10px 0',
                  cursor: 'pointer',
                }}>
                {/* time */}
                <div style={{
                  fontFamily: 'var(--ff-display)',
                  fontSize: 13,
                  fontWeight: 700,
                  color: BRAND.ink,
                  width: 42,
                  paddingTop: 14,
                  fontVariantNumeric: 'tabular-nums',
                }}>{item.time}</div>

                {/* dot */}
                <div style={{ position: 'relative', paddingTop: 14 }}>
                  <div style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: isActive ? BRAND.coral : BRAND.paper,
                    border: `2px solid ${BRAND.coral}`,
                    boxShadow: isActive ? `0 0 0 5px ${BRAND.coral}22` : 'none',
                    transition: 'all 200ms ease',
                  }}/>
                </div>

                {/* content */}
                <div style={{
                  flex: 1,
                  padding: '10px 14px 12px',
                  background: isActive ? BRAND.paper : 'transparent',
                  border: `1px solid ${isActive ? BRAND.line : 'transparent'}`,
                  borderRadius: 14,
                  transition: 'all 200ms ease',
                }}>
                  <div style={{
                    fontFamily: 'var(--ff-display)',
                    fontSize: 16,
                    fontWeight: 700,
                    color: BRAND.ink,
                  }}>{item.title}</div>
                  <div style={{
                    fontFamily: 'var(--ff-body)',
                    fontSize: 13,
                    color: BRAND.muted,
                    marginTop: 2,
                  }}>{item.desc}</div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

// ── Programs ─────────────────────────────────────────────────
function Programs() {
  const tones = ['coral', 'mustard', 'sage', 'dusk', 'sky', 'paper'];
  return (
    <section style={{ padding: '40px 0' }}>
      <SectionTitle kicker="HIGHLIGHTS" title="이벤트 & 프로그램"/>
      <div style={{ padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {EVENT.programs.map((p, i) => (
          <Reveal key={p.t} delay={i * 40}>
            <div style={{
              borderRadius: 18,
              background: BRAND.paper,
              border: `1px solid ${BRAND.line}`,
              overflow: 'hidden',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <Photo tone={tones[i % tones.length]} aspect="4/3" style={{ borderRadius: 0 }}/>
              <div style={{ padding: '12px 12px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  fontFamily: 'var(--ff-body)',
                  fontSize: 10,
                  color: BRAND.coralDeep,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  marginBottom: 4,
                }}>{p.tag}</div>
                <div style={{
                  fontFamily: 'var(--ff-display)',
                  fontSize: 14,
                  fontWeight: 700,
                  color: BRAND.ink,
                  lineHeight: 1.25,
                  marginBottom: 4,
                }}>{p.t}</div>
                <div style={{
                  fontFamily: 'var(--ff-body)',
                  fontSize: 11.5,
                  color: BRAND.muted,
                  lineHeight: 1.5,
                }}>{p.d}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Gallery (horizontal scroll) ──────────────────────────────
function Gallery() {
  const shots = [
    { label: '2025 가족한마당', tone: 'coral' },
    { label: '푸드트럭 존',    tone: 'mustard' },
    { label: '가족 게임',       tone: 'sage' },
    { label: '초청 공연',       tone: 'dusk' },
    { label: '포토존',         tone: 'sky' },
    { label: '경품 추첨',       tone: 'paper' },
  ];
  return (
    <section style={{ padding: '40px 0' }}>
      <SectionTitle kicker="MOMENTS" title="지난 한마당의 순간들"/>
      <div style={{
        display: 'flex',
        gap: 12,
        padding: '0 24px 4px',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
      }}>
        {shots.map((s, i) => (
          <div key={i} style={{
            flex: '0 0 auto',
            width: 200,
            scrollSnapAlign: 'start',
          }}>
            <Photo label={s.label} tone={s.tone} h={260}/>
          </div>
        ))}
        <div style={{ flex: '0 0 12px' }}/>
      </div>
    </section>
  );
}

// ── Map ──────────────────────────────────────────────────────
function MapSection() {
  return (
    <section style={{ padding: '40px 0' }}>
      <SectionTitle kicker="DIRECTIONS" title="오시는 길"/>
      <Reveal>
        <div style={{ margin: '0 24px', borderRadius: 20, overflow: 'hidden', border: `1px solid ${BRAND.line}` }}>
          {/* stylized map */}
          <div style={{
            position: 'relative',
            height: 180,
            background: `
              linear-gradient(180deg, #EBDFC8 0%, #E2D3B4 100%)
            `,
          }}>
            <svg viewBox="0 0 400 180" width="100%" height="100%" style={{ display: 'block' }}>
              {/* roads */}
              <path d="M -20 90 Q 100 60 200 100 T 420 80" stroke="#fff" strokeWidth="18" fill="none" opacity="0.85"/>
              <path d="M 140 -20 Q 160 80 120 200" stroke="#fff" strokeWidth="10" fill="none" opacity="0.7"/>
              <path d="M 280 -20 L 260 200" stroke="#fff" strokeWidth="10" fill="none" opacity="0.7"/>
              {/* blocks */}
              <rect x="30" y="110" width="70" height="50" fill="#D5C39E" opacity="0.8" rx="3"/>
              <rect x="180" y="20" width="60" height="50" fill="#D5C39E" opacity="0.8" rx="3"/>
              <rect x="300" y="120" width="80" height="50" fill="#D5C39E" opacity="0.8" rx="3"/>
              {/* park */}
              <circle cx="200" cy="130" r="30" fill={BRAND.sage} opacity="0.7"/>
              <text x="200" y="133" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="600">중앙공원</text>
            </svg>
            {/* pin */}
            <div style={{
              position: 'absolute', left: '50%', top: 50, transform: 'translate(-50%, -100%)',
            }}>
              <div style={{
                background: BRAND.coral, color: '#fff',
                padding: '6px 12px', borderRadius: 999,
                fontFamily: 'var(--ff-body)', fontSize: 11, fontWeight: 700,
                boxShadow: '0 4px 12px rgba(232,90,60,0.4)',
                whiteSpace: 'nowrap',
              }}>하나로 본사</div>
              <div style={{
                width: 0, height: 0, margin: '0 auto',
                borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
                borderTop: `8px solid ${BRAND.coral}`,
              }}/>
              <div style={{
                width: 14, height: 14, borderRadius: '50%',
                margin: '2px auto 0',
                background: BRAND.coral,
                boxShadow: `0 0 0 6px ${BRAND.coral}33, 0 0 0 14px ${BRAND.coral}1a`,
              }}/>
            </div>
          </div>

          <div style={{ padding: 16, background: BRAND.paper }}>
            {[
              { icon: '🚇', label: '지하철', v: '시청역 3번 출구 · 도보 5분' },
              { icon: '🚌', label: '버스',   v: '간선 402, 701 · 세종대로 정류장' },
              { icon: '🅿️', label: '주차',   v: '본사 지하주차장 무료 (3시간)' },
            ].map((x, i, arr) => (
              <div key={x.label} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 0',
                borderBottom: i < arr.length - 1 ? `1px solid ${BRAND.line}` : 'none',
              }}>
                <div style={{ fontSize: 20 }}>{x.icon}</div>
                <div style={{
                  fontFamily: 'var(--ff-body)',
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  color: BRAND.muted,
                  width: 44,
                }}>{x.label}</div>
                <div style={{
                  fontFamily: 'var(--ff-body)',
                  fontSize: 13,
                  color: BRAND.ink,
                  flex: 1,
                }}>{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ── RSVP ─────────────────────────────────────────────────────
function RSVP() {
  const [state, setState] = React.useState(null); // 'yes' | 'no' | null
  const [count, setCount] = React.useState(2);
  const [sent, setSent] = React.useState(false);

  if (sent) {
    return (
      <section style={{ padding: '40px 0' }}>
        <div style={{
          margin: '0 24px',
          padding: '36px 24px',
          borderRadius: 24,
          background: `linear-gradient(135deg, ${BRAND.sage}, #527A48)`,
          color: '#fff',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🌸</div>
          <div style={{
            fontFamily: 'var(--ff-display)', fontSize: 20, fontWeight: 700, marginBottom: 6,
          }}>참석 회신이 전달되었습니다</div>
          <div style={{
            fontFamily: 'var(--ff-body)', fontSize: 13, opacity: 0.9,
          }}>5월 17일, 가족과 함께 만나요!</div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '40px 0' }}>
      <SectionTitle kicker="R.S.V.P" title="참석 회신"/>
      <Reveal>
        <div style={{
          margin: '0 24px',
          padding: 20,
          borderRadius: 24,
          background: BRAND.paper,
          border: `1px solid ${BRAND.line}`,
        }}>
          <div style={{
            fontFamily: 'var(--ff-body)',
            fontSize: 13,
            color: BRAND.ink2,
            marginBottom: 14,
            lineHeight: 1.6,
          }}>5월 10일까지 참석 여부를 회신해 주시면<br/>준비에 큰 도움이 됩니다.</div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <button
              onClick={() => setState('yes')}
              style={{
                flex: 1, padding: '14px 0', borderRadius: 14,
                border: state === 'yes' ? `2px solid ${BRAND.coral}` : `1px solid ${BRAND.line}`,
                background: state === 'yes' ? `${BRAND.coral}14` : '#fff',
                color: state === 'yes' ? BRAND.coralDeep : BRAND.ink,
                fontFamily: 'var(--ff-display)', fontSize: 14, fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 150ms ease',
              }}>✓ 참석합니다</button>
            <button
              onClick={() => setState('no')}
              style={{
                flex: 1, padding: '14px 0', borderRadius: 14,
                border: state === 'no' ? `2px solid ${BRAND.muted}` : `1px solid ${BRAND.line}`,
                background: state === 'no' ? `${BRAND.muted}14` : '#fff',
                color: state === 'no' ? BRAND.ink : BRAND.muted,
                fontFamily: 'var(--ff-display)', fontSize: 14, fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 150ms ease',
              }}>아쉽지만 불참</button>
          </div>

          {state === 'yes' && (
            <Reveal>
              <div>
                <div style={{
                  fontFamily: 'var(--ff-body)', fontSize: 12, color: BRAND.muted,
                  marginBottom: 8,
                }}>함께 오시는 인원 (본인 포함)</div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 14px', borderRadius: 12,
                  border: `1px solid ${BRAND.line}`,
                  marginBottom: 14,
                }}>
                  <button onClick={() => setCount(Math.max(1, count - 1))}
                    style={circleBtn()}>−</button>
                  <div style={{
                    flex: 1, textAlign: 'center',
                    fontFamily: 'var(--ff-display)', fontSize: 18, fontWeight: 700,
                    color: BRAND.ink,
                    fontVariantNumeric: 'tabular-nums',
                  }}>{count}명</div>
                  <button onClick={() => setCount(Math.min(8, count + 1))}
                    style={circleBtn()}>+</button>
                </div>
                <button
                  onClick={() => setSent(true)}
                  style={{
                    width: '100%', padding: '14px 0', borderRadius: 14,
                    background: BRAND.ink, color: BRAND.cream,
                    border: 'none',
                    fontFamily: 'var(--ff-display)', fontSize: 14, fontWeight: 700,
                    cursor: 'pointer',
                  }}>회신 보내기</button>
              </div>
            </Reveal>
          )}

          {state === 'no' && (
            <button
              onClick={() => setSent(true)}
              style={{
                width: '100%', padding: '14px 0', borderRadius: 14,
                background: BRAND.ink, color: BRAND.cream, border: 'none',
                fontFamily: 'var(--ff-display)', fontSize: 14, fontWeight: 700,
                cursor: 'pointer',
              }}>회신 보내기</button>
          )}
        </div>
      </Reveal>
    </section>
  );
}

function circleBtn() {
  return {
    width: 32, height: 32, borderRadius: '50%',
    border: `1px solid ${BRAND.line}`, background: '#fff',
    color: BRAND.ink, fontSize: 18, lineHeight: 1, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  };
}

// ── Footer / contact ─────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      padding: '36px 24px 40px',
      textAlign: 'center',
      background: `linear-gradient(180deg, transparent, ${BRAND.cream})`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
        <Crest size={48} color={BRAND.coral} accent={BRAND.mustard}/>
      </div>
      <div style={{
        fontFamily: 'var(--ff-display)', fontSize: 14, fontWeight: 700, color: BRAND.ink,
        marginBottom: 6,
      }}>문의처</div>
      <div style={{
        fontFamily: 'var(--ff-body)', fontSize: 12, color: BRAND.ink2, lineHeight: 1.7,
      }}>
        하나로 총무팀 · 02-1234-5678<br/>
        family@hanaro.co.kr
      </div>
      <div style={{
        marginTop: 24,
        fontFamily: 'var(--ff-body)', fontSize: 10, color: BRAND.muted,
        letterSpacing: '0.2em',
      }}>— 함께하는 하루, 오래도록 기억될 마음 —</div>
    </footer>
  );
}

// ── Scrollable content ───────────────────────────────────────
function InvitationContent() {
  return (
    <div data-scroll-root style={{
      width: '100%',
      height: '100%',
      overflowY: 'auto',
      overflowX: 'hidden',
      background: BRAND.paper,
      WebkitOverflowScrolling: 'touch',
    }}>
      <Hero/>
      <div style={{ height: 24 }}/>
      <Countdown/>
      <Invitation/>
      <DateVenue/>
      <Timeline/>
      <Programs/>
      <Gallery/>
      <MapSection/>
      <RSVP/>
      <Footer/>
    </div>
  );
}

Object.assign(window, {
  InvitationContent,
  BRAND,
  EVENT,
});
