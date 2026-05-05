/* ─────────────────────────────────────────────────────────
   2026 하나로 가족 한마당 · Wave Layers 초대장
   아멘 17기 · 9 섹션 (한글 헤드라인 + 영문 메타)
   ───────────────────────────────────────────────────────── */

import { useState, useEffect, useRef } from 'react';
import { CONCEPT_D } from './data/concept-d';

const D = CONCEPT_D;

const WL = {
  ocean:    '#439BF5',
  aqua:     '#ABF7EE',
  lime:     '#B9E68B',
  sun:      '#FFC93C',
  white:    '#FFFFFF',
  ink:      '#0F2A3D',
  paper:    '#F8F6F1',
  paperWarm:'#F1ECE3',
  line:     '#D5CDBE'
};

const ACCENT_MAP: Record<string, string> = { Ocean: WL.ocean, Sun: WL.sun, Lime: WL.lime, Aqua: WL.aqua };

const FF = {
  bebas: '"Bebas Neue", sans-serif',
  han: '"Black Han Sans", "Pretendard", sans-serif',
  serif: '"Gowun Batang", serif',
  sans: '"Pretendard", -apple-system, sans-serif',
  mono: 'ui-monospace, monospace'
};

// ─── 스크롤 진행 훅 ───
function useScrollProgress(containerRef: any) {
  const [state, setState] = useState({ progress: 0, scrollPx: 0 });
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      setState({
        progress: max > 0 ? el.scrollTop / max : 0,
        scrollPx: el.scrollTop,
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, []);
  return state;
}

// ─── 진입 reveal 훅 ───
function useReveal(ref: any) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current || shown) return;
    const root = ref.current.closest('[data-scroll-root]');
    const rect = ref.current.getBoundingClientRect();
    const rootRect = root ? root.getBoundingClientRect() : { top: 0, bottom: window.innerHeight };
    if (rect.top < rootRect.bottom && rect.bottom > rootRect.top) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setShown(true); },
      { threshold: 0.15, root, rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [shown]);
  return shown;
}

function Reveal({ children, delay = 0, y = 24, x = 0 }: any) {
  const ref = useRef<any>(null);
  const shown = useReveal(ref);
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? 'translate(0,0)' : `translate(${x}px, ${y}px)`,
      transition: `opacity 0.7s ease ${delay}s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`
    }}>
      {children}
    </div>
  );
}

// ─── 글로벌 시간 ───
function useTime() {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return t;
}

function makeWavePath(time: number, opts: any) {
  const { amp = 12, freq = 1.3, phase = 0, yBase = 45, points = 32, width = 400, scrollShift = 0 } = opts;
  const step = width / (points - 1);
  const pts: number[][] = [];
  for (let i = 0; i < points; i++) {
    const x = i * step;
    const y = yBase
      + Math.sin((x / width) * Math.PI * 2 * freq + time + phase + scrollShift) * amp
      + Math.sin((x / width) * Math.PI * 2 * freq * 2.3 + time * 0.7 + phase) * (amp * 0.35);
    pts.push([x, y]);
  }
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const cx = (x1 + x2) / 2;
    d += ` Q ${cx} ${y1}, ${cx} ${(y1 + y2) / 2}`;
  }
  d += ` L ${width} 100 L 0 100 Z`;
  return d;
}

function MorphingWave({ scrollPx = 0, color1 = WL.ocean, color2 = WL.aqua, height = 80, flip = false }: any) {
  const time = useTime();
  const scrollPhase = scrollPx / 200;
  const backPath  = makeWavePath(time * 0.6, { amp: 10, freq: 1.1, phase: 0,        yBase: 38, scrollShift: scrollPhase * 0.5 });
  const midPath   = makeWavePath(time * 1.0, { amp: 14, freq: 1.4, phase: Math.PI,  yBase: 48, scrollShift: scrollPhase * 1.0 });
  const frontPath = makeWavePath(time * 1.4, { amp: 18, freq: 1.6, phase: 1.7,      yBase: 60, scrollShift: scrollPhase * 1.6 });
  const id = `wl-${color1.slice(1)}-${color2.slice(1)}`;
  return (
    <svg viewBox="0 0 400 100" preserveAspectRatio="none"
      style={{ width: '100%', height, display: 'block', transform: flip ? 'scaleY(-1)' : 'none' }}>
      <defs>
        <linearGradient id={`${id}-g1`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color1} stopOpacity="0.35"/>
          <stop offset="100%" stopColor={color2} stopOpacity="0.35"/>
        </linearGradient>
        <linearGradient id={`${id}-g2`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color1} stopOpacity="0.65"/>
          <stop offset="100%" stopColor={color2} stopOpacity="0.65"/>
        </linearGradient>
        <linearGradient id={`${id}-g3`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color1}/>
          <stop offset="100%" stopColor={color2}/>
        </linearGradient>
      </defs>
      <path d={backPath}  fill={`url(#${id}-g1)`}/>
      <path d={midPath}   fill={`url(#${id}-g2)`}/>
      <path d={frontPath} fill={`url(#${id}-g3)`}/>
    </svg>
  );
}

function IssueLabel({ num, label, accent = WL.ink }: any) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      fontFamily: FF.bebas, fontSize: 12, letterSpacing: 3, color: accent
    }}>
      <span>§ {String(num).padStart(2, '0')}</span>
      <span style={{ flex: 1, height: 1, background: accent, opacity: 0.3 }} />
      <span>{label}</span>
    </div>
  );
}

function HanHead({ children, color = WL.ink, size = 60, line = 1.0, style = {} }: any) {
  return (
    <div style={{
      fontFamily: FF.han,
      fontSize: size,
      lineHeight: line,
      color,
      letterSpacing: -1,
      fontWeight: 400,
      ...style
    }}>{children}</div>
  );
}

// ═════════════════════════════════════════════════════════
// 01 · HERO
// ═════════════════════════════════════════════════════════
function Hero({ scrollPx }: any) {
  return (
    <section data-screen-label="01 Hero" style={{
      background: WL.paper, position: 'relative', minHeight: '100%',
      padding: '60px 24px 0', display: 'flex', flexDirection: 'column'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontFamily: FF.bebas, fontSize: 14, letterSpacing: 4, color: WL.ink }}>HANARO</div>
        <div style={{ fontFamily: FF.bebas, fontSize: 11, letterSpacing: 2, color: WL.ink, opacity: 0.7 }}>{D.event.issue} · {D.event.year}</div>
      </div>
      <div style={{ height: 1, background: WL.ink, opacity: 0.15, marginTop: 8 }} />

      <div style={{ marginTop: 36 }}>
        <Reveal delay={0.05}>
          <div style={{
            fontFamily: FF.bebas, fontSize: 13, letterSpacing: 3, color: WL.ocean
          }}>2026 · AMEN 17</div>
        </Reveal>
        <Reveal delay={0.15}>
          <HanHead size={68} line={0.95}>하나로</HanHead>
        </Reveal>
        <Reveal delay={0.25}>
          <HanHead size={68} line={0.95} color={WL.ocean} style={{ fontStyle: 'italic' }}>가족</HanHead>
        </Reveal>
        <Reveal delay={0.35}>
          <HanHead size={68} line={0.95}>한마당<span style={{ color: WL.sun }}>.</span></HanHead>
        </Reveal>
      </div>

      <Reveal delay={0.5}>
        <div style={{
          marginTop: 22, fontFamily: FF.serif,
          fontSize: 16, color: WL.ink, fontWeight: 700, lineHeight: 1.5
        }}>
          {D.event.tagline}<br />
          <span style={{ color: WL.ocean, fontStyle: 'italic', fontSize: 14 }}>{D.event.subTagline}</span>
        </div>
      </Reveal>

      <div style={{ flex: 1 }} />

      <Reveal delay={0.7}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0,
          marginBottom: 12, borderTop: `1px solid ${WL.ink}33`, paddingTop: 14
        }}>
          {[
            { k: 'DATE',  v: D.schedule.dateDisplay },
            { k: 'TIME',  v: D.schedule.timeDisplay },
            { k: 'VENUE', v: '김포골드밸리' }
          ].map((m, i) => (
            <div key={i} style={{
              borderLeft: i > 0 ? `1px solid ${WL.ink}22` : 'none',
              paddingLeft: i > 0 ? 10 : 0
            }}>
              <div style={{ fontFamily: FF.bebas, fontSize: 9, letterSpacing: 2, color: WL.ink, opacity: 0.6 }}>{m.k}</div>
              <div style={{
                fontFamily: i === 2 ? FF.sans : FF.bebas,
                fontWeight: i === 2 ? 700 : 400,
                fontSize: i === 2 ? 12 : 14,
                letterSpacing: i === 2 ? 0 : 1,
                color: WL.ink, marginTop: 4
              }}>{m.v}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div style={{ margin: '0 -24px', marginTop: 'auto' }}>
        <MorphingWave scrollPx={scrollPx} color1={WL.ocean} color2={WL.aqua} height={100} />
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════
// 02 · INVITE
// ═════════════════════════════════════════════════════════
function Invite({ scrollPx }: any) {
  return (
    <section data-screen-label="02 Invite" style={{
      background: WL.aqua, padding: '50px 24px 0', position: 'relative', minHeight: '100%',
      display: 'flex', flexDirection: 'column'
    }}>
      <Reveal>
        <IssueLabel num={2} label="INVITATION" accent={WL.ink} />
      </Reveal>

      <Reveal delay={0.15}>
        <div style={{ marginTop: 28, position: 'relative' }}>
          <div style={{
            position: 'absolute', top: -20, left: -8,
            fontFamily: FF.bebas, fontSize: 80, color: WL.ocean, lineHeight: 1, opacity: 0.4
          }}>"</div>
          <HanHead size={36} line={1.15} style={{ paddingLeft: 22, whiteSpace: 'pre-line' }}>
            {D.invite.pullQuote}
          </HanHead>
        </div>
      </Reveal>

      <Reveal delay={0.3} y={20}>
        <div style={{
          marginTop: 36, maxWidth: 320,
          borderLeft: `2px solid ${WL.ink}`, paddingLeft: 16
        }}>
          <div style={{ fontFamily: FF.bebas, fontSize: 11, letterSpacing: 2, color: WL.ink, opacity: 0.6, marginBottom: 10 }}>
            {D.invite.greeting}
          </div>
          <div style={{ fontFamily: FF.sans, fontSize: 13.5, color: WL.ink, lineHeight: 1.75, fontWeight: 500 }}>
            {D.invite.body.map((line, i) => (
              <div key={i} style={{ minHeight: line === '' ? 10 : 'auto' }}>{line}</div>
            ))}
          </div>
          <div style={{ marginTop: 18, fontFamily: FF.bebas, fontSize: 10, letterSpacing: 2, color: WL.ocean }}>
            — {D.invite.signature}
          </div>
        </div>
      </Reveal>

      <div style={{ height: 60 }} />
      <div style={{ margin: '0 -24px', marginTop: 'auto' }}>
        <MorphingWave scrollPx={scrollPx} color1={WL.lime} color2={WL.sun} height={90} />
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════
// 03 · WHEN & WHERE
// ═════════════════════════════════════════════════════════
function WhenWhere({ scrollPx }: any) {
  return (
    <section data-screen-label="03 When Where" style={{
      background: WL.lime, padding: '50px 24px 0', position: 'relative', minHeight: '100%',
      display: 'flex', flexDirection: 'column'
    }}>
      <Reveal>
        <IssueLabel num={3} label="WHEN · WHERE" accent={WL.ink} />
      </Reveal>

      <Reveal delay={0.1}>
        <div style={{ marginTop: 24 }}>
          <HanHead size={50} line={0.95}>달력에</HanHead>
          <HanHead size={50} line={0.95} color={WL.ocean} style={{ fontStyle: 'italic' }}>표시해주세요</HanHead>
        </div>
      </Reveal>

      <Reveal delay={0.3} y={30}>
        <div style={{
          marginTop: 28, padding: '20px 18px',
          background: WL.paper, border: `1px solid ${WL.ink}33`, position: 'relative'
        }}>
          <div style={{
            position: 'absolute', top: -8, left: 14,
            background: WL.sun, color: WL.ink,
            fontFamily: FF.bebas, fontSize: 10, letterSpacing: 2, padding: '3px 8px'
          }}>DATE</div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: FF.bebas, fontSize: 56, lineHeight: 1, color: WL.ink, letterSpacing: -1 }}>
              {D.schedule.dateDisplay}
            </div>
            <div style={{ fontFamily: FF.bebas, fontSize: 14, color: WL.ocean, letterSpacing: 2 }}>
              {D.schedule.day}
            </div>
          </div>
          <div style={{ marginTop: 8, fontFamily: FF.sans, fontSize: 13, color: WL.ink, fontWeight: 600 }}>
            {D.schedule.timeDisplay} · {D.schedule.dayKo}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.45} y={30}>
        <div style={{
          marginTop: 18, padding: '20px 18px',
          background: `${WL.ocean}10`,
          border: `1.5px solid ${WL.ocean}`,
          color: WL.ink, position: 'relative'
        }}>
          <div style={{
            position: 'absolute', top: -8, left: 14,
            background: WL.ocean, color: WL.paper,
            fontFamily: FF.bebas, fontSize: 10, letterSpacing: 2, padding: '3px 8px'
          }}>VENUE</div>
          <div style={{ fontFamily: FF.bebas, fontSize: 22, color: WL.ink, letterSpacing: 1 }}>
            {D.location.nameEn}
          </div>
          <div style={{ fontFamily: FF.serif, fontSize: 16, color: WL.ink, marginTop: 4, fontWeight: 700 }}>
            {D.location.name}
          </div>
          <div style={{ marginTop: 10, fontFamily: FF.sans, fontSize: 12, color: WL.ink, opacity: 0.8, lineHeight: 1.6 }}>
            {D.location.address}<br />
            {D.location.detail}
          </div>
          <div style={{
            marginTop: 12, paddingTop: 10, borderTop: `1px solid ${WL.ink}22`,
            fontFamily: FF.sans, fontSize: 11, color: WL.ink, fontWeight: 700
          }}>
            {D.location.fromChurch} · 셔틀버스 운행
          </div>
        </div>
      </Reveal>

      <div style={{ height: 60 }} />
      <div style={{ margin: '0 -24px', marginTop: 'auto' }}>
        <MorphingWave scrollPx={scrollPx} color1={WL.ocean} color2={WL.aqua} height={90} />
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════
// 04 · TIMELINE
// ═════════════════════════════════════════════════════════
const TIMELINE_GROUP_TONE: Record<string, { bg: string; accent: string; label: string }> = {
  '오프닝': { bg: `${WL.aqua}28`,    accent: WL.ocean, label: 'OPENING' },
  '오전':   { bg: `${WL.ocean}18`,   accent: WL.ocean, label: 'MORNING' },
  '오후':   { bg: `${WL.sun}22`,     accent: WL.sun,   label: 'AFTERNOON' },
  '폐막':   { bg: `${WL.lime}30`,    accent: WL.ocean, label: 'CLOSING' }
};

function Timeline({ scrollPx }: any) {
  const groups: { group: string; items: any[] }[] = [];
  D.timeline.forEach(t => {
    const last = groups[groups.length - 1];
    if (last && last.group === t.group) last.items.push(t);
    else groups.push({ group: t.group, items: [t] });
  });

  const sectionRef = useRef<any>(null);
  const [dayProg, setDayProg] = useState(0);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const root = el.closest('[data-scroll-root]');
    if (!root) return;
    const update = () => {
      const elTop = el.offsetTop;
      const elH = el.offsetHeight;
      const viewH = root.clientHeight;
      const range = elH - viewH;
      if (range <= 0) { setDayProg(0); return; }
      const p = (root.scrollTop - elTop) / range;
      setDayProg(Math.max(0, Math.min(1, p)));
    };
    update();
    root.addEventListener('scroll', update, { passive: true });
    return () => root.removeEventListener('scroll', update);
  }, [scrollPx]);

  const t = dayProg;
  const bg = `color-mix(in oklab, ${WL.paper} ${(1 - t) * 100}%, ${WL.ink})`;
  const fg = `color-mix(in oklab, ${WL.ink} ${(1 - t) * 100}%, ${WL.paper})`;

  return (
    <section ref={sectionRef} data-screen-label="04 Timeline" style={{
      background: bg, color: fg, padding: '50px 24px 0',
      position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100%',
      transition: 'background 0.15s linear, color 0.15s linear'
    }}>
      <Reveal>
        <IssueLabel num={4} label="TIMELINE" accent={fg} />
      </Reveal>

      <Reveal delay={0.1}>
        <div style={{ marginTop: 24 }}>
          <HanHead size={56} line={0.95} color={fg}>하루 종일,</HanHead>
          <HanHead size={56} line={0.95} color={WL.ocean} style={{ fontStyle: 'italic' }}>함께해요.</HanHead>
        </div>
      </Reveal>

      <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {groups.map((g, gi) => {
          const tone = TIMELINE_GROUP_TONE[g.group] || { bg: 'transparent', accent: WL.aqua, label: '' };
          return (
            <div key={gi} style={{
              background: tone.bg,
              padding: '14px 14px 14px 12px',
              borderLeft: `3px solid ${tone.accent}`
            }}>
              <Reveal delay={gi * 0.05}>
                <div style={{
                  display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12
                }}>
                  <span style={{
                    fontFamily: FF.han, fontSize: 22, color: fg, letterSpacing: -0.5
                  }}>{g.group}</span>
                  <span style={{
                    fontFamily: FF.bebas, fontSize: 11, letterSpacing: 2, color: tone.accent, opacity: 0.85
                  }}>{tone.label}</span>
                </div>
              </Reveal>

              {g.items.map((tt: any, i: number) => (
                <Reveal key={i} delay={gi * 0.05 + i * 0.03} x={6}>
                  <div style={{
                    display: 'flex', gap: 14, padding: '8px 0',
                    borderTop: i > 0 ? `1px solid ${fg}26` : 'none'
                  }}>
                    <div style={{
                      fontFamily: FF.bebas, fontSize: 13,
                      color: tone.accent, minWidth: 56, letterSpacing: 1
                    }}>{tt.time}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: FF.sans, fontSize: 13.5, fontWeight: 700, color: fg
                      }}>{tt.title}</div>
                      <div style={{
                        fontFamily: FF.sans, fontSize: 10.5, color: fg, opacity: 0.7,
                        marginTop: 2, lineHeight: 1.5
                      }}>{tt.desc}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          );
        })}
      </div>

      <div style={{ height: 50 }} />
      <div style={{ margin: '0 -24px', marginTop: 'auto' }}>
        <MorphingWave scrollPx={scrollPx} color1={WL.paperWarm} color2={WL.lime} height={90} />
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════
// 05 · PROGRAM
// ═════════════════════════════════════════════════════════
function ProgramCard({ card, accent, onClick, dimmed }: any) {
  return (
    <div
      onClick={onClick}
      style={{
        flex: '0 0 auto',
        width: 132,
        height: 132,
        background: WL.paper,
        color: WL.ink,
        border: `1.5px solid ${accent}`,
        borderRadius: 4,
        padding: '12px 14px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: `0 2px 8px ${WL.ink}15`,
        opacity: dimmed ? 0.45 : 1,
        transition: 'opacity 0.3s ease',
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }}
    >
      <div style={{
        position: 'absolute', top: 10, right: 10,
        width: 8, height: 8, borderRadius: '50%', background: accent
      }} />
      <div style={{
        fontFamily: FF.han, fontSize: 17, lineHeight: 1.1,
        color: WL.ink, letterSpacing: -0.5, paddingRight: 16,
        pointerEvents: 'none'
      }}>{card.name}</div>
      <div style={{
        marginTop: 4, fontFamily: FF.sans, fontSize: 10,
        color: WL.ink, opacity: 0.65, fontWeight: 600,
        pointerEvents: 'none'
      }}>{card.sub}</div>
      <div style={{ flex: 1 }} />
      <div style={{
        fontFamily: FF.bebas, fontSize: 10, letterSpacing: 1.5,
        color: accent, borderTop: `1px solid ${WL.ink}1a`,
        paddingTop: 6, pointerEvents: 'none'
      }}>{card.time}</div>
    </div>
  );
}

function ProgramRow({ row, onCardClick, paused }: any) {
  const accent = ACCENT_MAP[row.accent] || WL.ocean;
  const trackRef = useRef<any>(null);
  const offsetRef = useRef(0);
  const lastTimeRef = useRef(0);
  const halfWidthRef = useRef(0);
  const [dragging, setDragging] = useState(false);
  const draggingRef = useRef(false);
  const dragStateRef = useRef<any>({ startX: 0, startOffset: 0, lastX: 0, lastT: 0, vel: 0, moved: 0, pointerDown: false });
  const inertiaRef = useRef(0);
  const DRAG_THRESHOLD = 6;

  const wrap = (x: number) => {
    const hw = halfWidthRef.current;
    if (hw <= 0) return x;
    return (((x % hw) + hw) % hw) - hw;
  };

  const direction = row.direction === 'right' ? 1 : -1;
  const baseSpeedPxPerMs = () => (halfWidthRef.current / (row.duration * 1000)) * direction;

  useEffect(() => {
    if (!trackRef.current) return;
    const measure = () => {
      const w = trackRef.current.scrollWidth;
      halfWidthRef.current = w / 2;
      offsetRef.current = wrap(offsetRef.current);
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let rafId: number;
    const tick = (t: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = t;
      const dt = t - lastTimeRef.current;
      lastTimeRef.current = t;

      if (!paused && !draggingRef.current && halfWidthRef.current > 0) {
        const inertiaFade = Math.exp(-dt / 250);
        inertiaRef.current *= inertiaFade;
        const speed = baseSpeedPxPerMs() + inertiaRef.current;
        offsetRef.current = wrap(offsetRef.current + speed * dt);

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [paused]);

  const onPointerDown = (e: any) => {
    if (e.button !== undefined && e.button !== 0) return;
    dragStateRef.current = {
      startX: e.clientX,
      startOffset: offsetRef.current,
      lastX: e.clientX,
      lastT: performance.now(),
      vel: 0,
      moved: 0,
      pointerDown: true,
      pointerId: e.pointerId
    };
  };
  const onPointerMove = (e: any) => {
    const st = dragStateRef.current;
    if (!st.pointerDown) return;
    const dx = e.clientX - st.startX;
    st.moved = Math.max(st.moved, Math.abs(dx));

    if (!draggingRef.current) {
      if (st.moved < DRAG_THRESHOLD) return;
      draggingRef.current = true;
      setDragging(true);
      inertiaRef.current = 0;
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* noop */ }
    }

    const now = performance.now();
    const dt = Math.max(1, now - st.lastT);
    st.vel = (e.clientX - st.lastX) / dt;
    st.lastX = e.clientX;
    st.lastT = now;

    const next = wrap(st.startOffset + dx);
    offsetRef.current = next;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${next}px, 0, 0)`;
    }
  };
  const onPointerUp = (e: any) => {
    const st = dragStateRef.current;
    if (!st.pointerDown) return;
    st.pointerDown = false;
    if (draggingRef.current) {
      draggingRef.current = false;
      setDragging(false);
      inertiaRef.current = st.vel;
      try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* noop */ }
    }
  };

  const handleCardClick = (cardId: string) => {
    if (dragStateRef.current.moved > DRAG_THRESHOLD) return;
    onCardClick(cardId);
  };

  const doubled = [...row.cards, ...row.cards];

  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 8,
        padding: '0 24px', marginBottom: 8
      }}>
        <span style={{
          fontFamily: FF.han, fontSize: 17, color: WL.ink, letterSpacing: -0.5
        }}>{row.label}</span>
        <span style={{
          fontFamily: FF.bebas, fontSize: 10, letterSpacing: 2, color: accent
        }}>{row.labelEn}</span>
        <span style={{ flex: 1, height: 1, background: `${WL.ink}22` }} />
        {row.meta && (
          <span style={{
            fontFamily: FF.sans, fontSize: 10, fontWeight: 600,
            color: WL.ink, opacity: 0.55
          }}>{row.meta}</span>
        )}
      </div>

      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          touchAction: 'pan-y',
          cursor: dragging ? 'grabbing' : 'grab'
        }}
      >
        <div ref={trackRef} style={{
          display: 'flex', gap: 10,
          width: 'max-content',
          padding: '6px 24px',
          willChange: 'transform'
        }}>
          {doubled.map((card: any, i: number) => {
            const cardId = `${row.key}-${i % row.cards.length}`;
            return (
              <ProgramCard
                key={`${row.key}-${i}`}
                card={card}
                accent={accent}
                onClick={() => handleCardClick(cardId)}
                dimmed={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProgramModal({ data, onClose }: any) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!data) return null;
  const { card, accent, rowLabel, rowLabelEn } = data;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'absolute', inset: 0, zIndex: 100,
        background: `${WL.ink}cc`,
        backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
        animation: 'wl-overlay-in 0.25s ease-out',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'calc(100% - 32px)', maxWidth: 320,
          background: WL.paper,
          border: `2px solid ${accent}`,
          borderRadius: 6,
          padding: '24px 22px 22px',
          animation: 'wl-modal-in 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
          boxShadow: `0 24px 60px ${WL.ink}55`,
          maxHeight: 'calc(100% - 32px)',
          display: 'flex', flexDirection: 'column'
        }}
      >
        <button
          onClick={onClose}
          aria-label="close"
          style={{
            position: 'absolute', top: 10, right: 10,
            width: 32, height: 32, border: 'none',
            background: 'transparent', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: WL.ink, opacity: 0.7
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M3 3 L13 13 M13 3 L3 13" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: accent }} />
          <span style={{
            fontFamily: FF.bebas, fontSize: 11, letterSpacing: 2.5, color: accent
          }}>{rowLabelEn}</span>
          <span style={{ width: 1, height: 12, background: `${WL.ink}33` }} />
          <span style={{
            fontFamily: FF.sans, fontSize: 11, fontWeight: 700, color: WL.ink, opacity: 0.7
          }}>{rowLabel}</span>
        </div>

        <div style={{
          fontFamily: FF.han, fontSize: 32, lineHeight: 1.1,
          color: WL.ink, letterSpacing: -1, marginBottom: 4
        }}>{card.name}</div>
        <div style={{
          fontFamily: FF.sans, fontSize: 13, fontWeight: 600,
          color: WL.ink, opacity: 0.65
        }}>{card.sub}</div>

        <div style={{
          marginTop: 18, padding: '10px 12px',
          background: `${accent}22`, border: `1px solid ${accent}55`,
          borderRadius: 3,
          display: 'flex', alignItems: 'center', gap: 10
        }}>
          <span style={{
            fontFamily: FF.bebas, fontSize: 10, letterSpacing: 2, color: WL.ink, opacity: 0.55
          }}>WHEN</span>
          <span style={{ flex: 1, fontFamily: FF.sans, fontSize: 13, fontWeight: 700, color: WL.ink }}>
            {card.time}
          </span>
        </div>

        <div style={{
          marginTop: 16, fontFamily: FF.sans, fontSize: 13,
          color: WL.ink, lineHeight: 1.65, opacity: 0.85
        }}>{card.desc}</div>

        <div style={{
          marginTop: 22, paddingTop: 14, borderTop: `1px solid ${WL.ink}1a`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontFamily: FF.bebas, fontSize: 10, letterSpacing: 2,
          color: WL.ink, opacity: 0.5
        }}>
          <span>HANARO 2026</span>
          <span>TAP OUTSIDE TO CLOSE</span>
        </div>
      </div>
    </div>
  );
}

function Program({ scrollPx }: any) {
  const [openCard, setOpenCard] = useState<any>(null);

  const handleCardClick = (rowKey: string, cardId: string) => {
    const row = D.programRows.find(r => r.key === rowKey);
    if (!row) return;
    const idx = parseInt(cardId.split('-').pop() || '0', 10);
    const card = row.cards[idx];
    if (!card) return;
    const accent = ACCENT_MAP[row.accent] || WL.ocean;
    setOpenCard({ card, accent, rowLabel: row.label, rowLabelEn: row.labelEn, rowKey });
  };

  return (
    <section data-screen-label="05 Program" style={{
      background: WL.paper, padding: '50px 0 0',
      position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100%'
    }}>
      <div style={{ padding: '0 24px' }}>
        <Reveal>
          <IssueLabel num={5} label="PROGRAM" accent={WL.ink} />
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ marginTop: 22 }}>
            <HanHead size={50} line={0.95}>함께</HanHead>
            <HanHead size={50} line={0.95} color={WL.ocean} style={{ fontStyle: 'italic' }}>즐겨요.</HanHead>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div style={{
            marginTop: 14, fontFamily: FF.sans, fontSize: 11,
            color: WL.ink, opacity: 0.6, fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 6
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: `${WL.ink}55` }} />
            카드를 누르면 자세히 볼 수 있어요. 좌우로 드래그할 수 있어요.
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.32}>
        <div style={{
          marginTop: 22, display: 'flex', flexDirection: 'column', gap: 18
        }}>
          {D.programRows.map((row) => (
            <ProgramRow
              key={row.key}
              row={row}
              paused={openCard?.rowKey === row.key}
              onCardClick={(cardId: string) => handleCardClick(row.key, cardId)}
            />
          ))}
        </div>
      </Reveal>

      <div style={{ height: 50 }} />
      <div style={{ marginTop: 'auto' }}>
        <MorphingWave scrollPx={scrollPx} color1={WL.ocean} color2={WL.aqua} height={90} />
      </div>

      {openCard && (
        <ProgramModal data={openCard} onClose={() => setOpenCard(null)} />
      )}
    </section>
  );
}

// ═════════════════════════════════════════════════════════
// 06 · FOOD
// ═════════════════════════════════════════════════════════
function FoodBlock({ d, accent, blue = false }: any) {
  return (
    <div style={{
      background: blue ? WL.ocean : WL.paper,
      color: blue ? WL.paper : WL.ink,
      border: blue ? 'none' : `1px solid ${WL.ink}33`,
      padding: '20px 18px', position: 'relative'
    }}>
      <div style={{
        position: 'absolute', top: -8, left: 14,
        background: accent, color: WL.ink,
        fontFamily: FF.bebas, fontSize: 10, letterSpacing: 2, padding: '3px 8px'
      }}>{d.label}</div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: FF.han, fontSize: 28, color: blue ? WL.paper : WL.ink, letterSpacing: -0.5 }}>
          {d.ko}
        </div>
        <div style={{ fontFamily: FF.bebas, fontSize: 14, color: blue ? WL.aqua : accent, letterSpacing: 2 }}>
          {d.time}
        </div>
      </div>
      <div style={{
        marginTop: 4, fontFamily: FF.sans, fontSize: 11,
        color: blue ? WL.paper : WL.ink, opacity: 0.75
      }}>{d.note}</div>

      <div style={{
        marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px'
      }}>
        {d.items.map((it: any, j: number) => (
          <div key={j} style={{
            display: 'flex', flexDirection: 'column', gap: 2,
            padding: '8px 10px',
            background: blue ? `${WL.paper}14` : `${accent}24`,
            border: `1px dashed ${blue ? `${WL.paper}40` : `${accent}88`}`
          }}>
            <div style={{
              aspectRatio: '4 / 3', width: '100%',
              background: blue ? `${WL.paper}10` : `${WL.paper}66`,
              border: `1px dashed ${blue ? `${WL.paper}30` : WL.ink + '22'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FF.bebas, fontSize: 9,
              color: blue ? `${WL.paper}90` : `${WL.ink}55`,
              letterSpacing: 2
            }}>IMAGE</div>
            <div style={{
              fontFamily: FF.sans, fontSize: 12, fontWeight: 700,
              color: blue ? WL.paper : WL.ink, marginTop: 4
            }}>{it.name}</div>
            <div style={{
              fontFamily: FF.sans, fontSize: 10,
              color: blue ? WL.paper : WL.ink, opacity: 0.75
            }}>{it.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Food({ scrollPx }: any) {
  return (
    <section data-screen-label="06 Food" style={{
      background: WL.aqua, padding: '50px 24px 0',
      position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100%'
    }}>
      <Reveal>
        <IssueLabel num={6} label="FOOD" accent={WL.ink} />
      </Reveal>

      <Reveal delay={0.1}>
        <div style={{ marginTop: 22 }}>
          <HanHead size={50} line={0.95}>든든하게</HanHead>
          <HanHead size={50} line={0.95} color={WL.ocean} style={{ fontStyle: 'italic' }}>먹어요.</HanHead>
        </div>
      </Reveal>

      <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Reveal delay={0.2} y={20}>
          <FoodBlock d={D.foodLunch} accent={WL.sun} />
        </Reveal>
        <Reveal delay={0.32} y={20}>
          <FoodBlock d={D.foodSnack} accent={WL.lime} blue />
        </Reveal>
      </div>

      <div style={{ height: 50 }} />
      <div style={{ margin: '0 -24px', marginTop: 'auto' }}>
        <MorphingWave scrollPx={scrollPx} color1={WL.ocean} color2={WL.sun} height={90} />
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════
// 07 · DIRECTIONS
// ═════════════════════════════════════════════════════════
function Directions({ scrollPx }: any) {
  return (
    <section data-screen-label="07 Directions" style={{
      background: WL.ocean, color: WL.paper, padding: '50px 24px 0',
      position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100%'
    }}>
      <Reveal>
        <IssueLabel num={7} label="DIRECTIONS" accent={WL.aqua} />
      </Reveal>

      <Reveal delay={0.1}>
        <div style={{ marginTop: 22 }}>
          <HanHead size={50} line={0.95} color={WL.paper}>오시는</HanHead>
          <HanHead size={50} line={0.95} color={WL.sun} style={{ fontStyle: 'italic' }}>길.</HanHead>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div
          id="map-placeholder"
          data-role="map-mount"
          style={{
            marginTop: 22, position: 'relative',
            width: '100%', aspectRatio: '16 / 10',
            background: WL.paper,
            border: `1.5px dashed ${WL.aqua}`,
            overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
          <svg viewBox="0 0 300 188" preserveAspectRatio="none" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%'
          }}>
            <defs>
              <pattern id="wl-mapgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke={WL.ink} strokeWidth="0.5" strokeOpacity="0.12"/>
              </pattern>
            </defs>
            <rect width="300" height="188" fill="url(#wl-mapgrid)"/>
          </svg>
          <div style={{
            position: 'relative', textAlign: 'center', padding: '0 16px'
          }}>
            <div style={{
              fontFamily: FF.bebas, fontSize: 11, letterSpacing: 3,
              color: WL.ocean, marginBottom: 6
            }}>MAP AREA</div>
            <div style={{ fontFamily: FF.han, fontSize: 18, color: WL.ink, letterSpacing: -0.5 }}>
              지도 영역
            </div>
            <div style={{
              marginTop: 4, fontFamily: FF.sans, fontSize: 11,
              color: WL.ink, opacity: 0.55
            }}>{D.location.name}</div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.32}>
        <div style={{
          marginTop: 18, padding: '14px 16px',
          background: `${WL.sun}18`,
          border: `1.5px solid ${WL.sun}`,
          color: WL.ink, position: 'relative'
        }}>
          <div style={{
            position: 'absolute', top: -8, left: 14,
            background: WL.sun, color: WL.ink,
            fontFamily: FF.bebas, fontSize: 10, letterSpacing: 2, padding: '3px 8px'
          }}>SHUTTLE</div>
          <div style={{ fontFamily: FF.han, fontSize: 22, color: WL.ink, letterSpacing: -0.5 }}>
            {D.shuttle.label}
          </div>
          <div style={{
            marginTop: 6, fontFamily: FF.sans, fontSize: 12.5,
            color: WL.ink, fontWeight: 600
          }}>{D.shuttle.detail}</div>
          <div style={{
            marginTop: 2, fontFamily: FF.sans, fontSize: 11,
            color: WL.ink, opacity: 0.7
          }}>{D.shuttle.sub}</div>
        </div>
      </Reveal>

      <Reveal delay={0.4}>
        <div style={{
          marginTop: 14,
          padding: '14px 16px',
          background: `${WL.paper}12`,
          border: `1px solid ${WL.paper}33`
        }}>
          <div style={{
            fontFamily: FF.bebas, fontSize: 11, letterSpacing: 2,
            color: WL.aqua, marginBottom: 8
          }}>PARKING</div>
          {D.parking.map((p, i) => (
            <div key={i} style={{
              display: 'flex', gap: 10, padding: '8px 0',
              borderTop: i > 0 ? `1px solid ${WL.paper}22` : 'none'
            }}>
              <div style={{
                fontFamily: FF.sans, fontSize: 12, fontWeight: 700,
                color: WL.paper, minWidth: 92
              }}>{p.label}</div>
              <div style={{
                flex: 1, fontFamily: FF.sans, fontSize: 11,
                color: WL.paper, opacity: 0.8, lineHeight: 1.5
              }}>{p.detail}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div style={{ height: 50 }} />
      <div style={{ margin: '0 -24px', marginTop: 'auto' }}>
        <MorphingWave scrollPx={scrollPx} color1={WL.sun} color2={WL.lime} height={90} />
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════
// 08 · GALLERY
// ═════════════════════════════════════════════════════════
function Gallery({ scrollPx }: any) {
  return (
    <section data-screen-label="08 Gallery" style={{
      background: WL.paperWarm, padding: '50px 24px 0',
      position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100%'
    }}>
      <Reveal>
        <IssueLabel num={8} label="ARCHIVE" accent={WL.ink} />
      </Reveal>

      <Reveal delay={0.1}>
        <div style={{ marginTop: 22 }}>
          <HanHead size={50} line={0.95}>지난</HanHead>
          <HanHead size={50} line={0.95} color={WL.ocean} style={{ fontStyle: 'italic' }}>추억.</HanHead>
        </div>
      </Reveal>

      <Reveal delay={0.18}>
        <div style={{
          marginTop: 12, fontFamily: FF.sans, fontSize: 12,
          color: WL.ink, opacity: 0.7, fontWeight: 500
        }}>하나로 가족이 함께 만들어 온 시간들.</div>
      </Reveal>

      <div style={{
        marginTop: 22, display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gridTemplateRows: 'auto auto auto',
        gap: 10
      }}>
        {D.gallery.map((g, i) => {
          const isLarge = i === 0 || i === 3;
          return (
            <Reveal key={i} delay={0.22 + i * 0.05} y={20}>
              <div
                data-role="gallery-photo"
                data-gallery-index={i}
                style={{
                  position: 'relative', overflow: 'hidden',
                  aspectRatio: isLarge ? '1 / 1.2' : '1 / 1',
                  background: WL.paper,
                  border: `1px dashed ${WL.ink}55`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                <div style={{ textAlign: 'center', padding: 8 }}>
                  <div style={{
                    fontFamily: FF.bebas, fontSize: 10, letterSpacing: 2,
                    color: WL.ink, opacity: 0.55
                  }}>PHOTO</div>
                  <div style={{
                    marginTop: 4, fontFamily: FF.sans, fontSize: 10,
                    color: WL.ink, opacity: 0.55
                  }}>{g.caption}</div>
                </div>
                <div style={{
                  position: 'absolute', top: 6, left: 6, width: 8, height: 8,
                  borderTop: `1.5px solid ${WL.ink}66`, borderLeft: `1.5px solid ${WL.ink}66`
                }} />
                <div style={{
                  position: 'absolute', bottom: 6, right: 6, width: 8, height: 8,
                  borderBottom: `1.5px solid ${WL.ink}66`, borderRight: `1.5px solid ${WL.ink}66`
                }} />
              </div>
            </Reveal>
          );
        })}
      </div>

      <div style={{ height: 50 }} />
      <div style={{ margin: '0 -24px', marginTop: 'auto' }}>
        <MorphingWave scrollPx={scrollPx} color1={WL.ocean} color2={WL.sun} height={90} />
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════
// 09 · RSVP
// ═════════════════════════════════════════════════════════
function RSVP() {
  const [status, setStatus] = useState<any>(null);
  const [people, setPeople] = useState(2);
  const [name, setName] = useState('');
  const [noBlink, setNoBlink] = useState(false);

  return (
    <section data-screen-label="09 RSVP" style={{
      background: WL.sun, color: WL.ink, padding: '50px 24px 60px',
      position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100%'
    }}>
      <Reveal>
        <IssueLabel num={9} label="RSVP" accent={WL.ink} />
      </Reveal>

      <Reveal delay={0.1}>
        <div style={{ marginTop: 22 }}>
          <HanHead size={56} line={0.95}>함께</HanHead>
          <HanHead size={56} line={0.95} color={WL.ocean} style={{ fontStyle: 'italic' }}>해요.</HanHead>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div style={{
          marginTop: 14, fontFamily: FF.serif, fontSize: 14,
          color: WL.ink, lineHeight: 1.6, fontWeight: 700
        }}>
          준비에 도움이 되도록<br />
          참석 여부를 알려주세요.
        </div>
      </Reveal>

      <div style={{ flex: 1, minHeight: 16 }} />

      {status === 'done' ? (
        <Reveal>
          <div style={{
            background: `${WL.aqua}30`,
            border: `2px solid ${WL.ocean}`,
            color: WL.ink, padding: '28px 22px', position: 'relative'
          }}>
            <div style={{
              position: 'absolute', top: -8, left: 18,
              background: WL.ocean, color: WL.paper,
              fontFamily: FF.bebas, fontSize: 10, padding: '3px 8px', letterSpacing: 2
            }}>CONFIRMED</div>
            <div style={{ fontFamily: FF.han, fontSize: 32, color: WL.ocean, letterSpacing: -0.5 }}>
              감사합니다.
            </div>
            <div style={{
              marginTop: 10, fontFamily: FF.sans, fontSize: 13,
              color: WL.ink, lineHeight: 1.6
            }}>
              <strong>{name}</strong>님 외 {people - 1}명 — 참석 확정.<br />
              {D.schedule.date} 김포골드밸리에서 만나요.
            </div>
          </div>
        </Reveal>
      ) : status === 'yes' ? (
        <div>
          <Reveal>
            <div style={{
              fontFamily: FF.bebas, fontSize: 11, letterSpacing: 2,
              color: WL.ink, marginBottom: 6
            }}>① NAME · 성함</div>
            <input value={name} onChange={e => setName(e.target.value)}
              placeholder="홍길동"
              style={{
                width: '100%', background: 'transparent', border: 'none',
                borderBottom: `2px solid ${WL.ink}`, padding: '10px 0',
                fontSize: 18, color: WL.ink, fontFamily: FF.sans, fontWeight: 700, outline: 'none'
              }}/>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{
              marginTop: 20, fontFamily: FF.bebas, fontSize: 11, letterSpacing: 2,
              color: WL.ink, marginBottom: 6
            }}>② PEOPLE · 인원</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <button onClick={() => setPeople(Math.max(1, people - 1))} style={{
                width: 44, height: 44, background: 'transparent',
                border: `2px solid ${WL.ink}`, color: WL.ink,
                fontSize: 20, fontFamily: FF.bebas, cursor: 'pointer'
              }}>−</button>
              <div style={{
                flex: 1, textAlign: 'center', fontFamily: FF.bebas,
                fontSize: 40, color: WL.ink, letterSpacing: -1
              }}>{people}</div>
              <button onClick={() => setPeople(people + 1)} style={{
                width: 44, height: 44, background: WL.ocean,
                border: `2px solid ${WL.ocean}`, color: WL.paper,
                fontSize: 20, fontFamily: FF.bebas, cursor: 'pointer'
              }}>+</button>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <button onClick={() => setStatus('done')} disabled={!name}
              style={{
                marginTop: 24, width: '100%', padding: '18px',
                background: WL.ocean, color: WL.paper, border: 'none',
                cursor: name ? 'pointer' : 'not-allowed',
                fontFamily: FF.bebas, fontSize: 18, letterSpacing: 3,
                opacity: name ? 1 : 0.5,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
              <span>SUBMIT · 제출</span><span>→</span>
            </button>
          </Reveal>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={() => setStatus('yes')} style={{
            background: WL.ink, color: WL.sun, border: 'none', padding: '20px',
            cursor: 'pointer', fontFamily: FF.bebas, fontSize: 18, letterSpacing: 3,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <span>YES · 참석합니다</span><span>→</span>
          </button>
          <button
            onClick={() => {
              if (noBlink) return;
              setNoBlink(true);
              setTimeout(() => setNoBlink(false), 2000);
            }}
            style={{
              background: noBlink ? WL.ink : 'transparent',
              color: noBlink ? WL.sun : WL.ink,
              border: `2px solid ${WL.ink}`, padding: '16px', cursor: 'pointer',
              fontFamily: FF.bebas, fontSize: 14, letterSpacing: 2,
              transition: 'all 0.25s ease'
            }}>
            <span key={noBlink ? 'no' : 'def'} style={{
              display: 'inline-block', animation: 'wl-flip 0.35s ease-out'
            }}>
              {noBlink ? "꼭 와주세요!" : "NO · 어렵습니다"}
            </span>
          </button>
        </div>
      )}

      <div style={{
        marginTop: 28, paddingTop: 14, borderTop: `1px solid ${WL.ink}33`,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
        fontFamily: FF.mono, fontSize: 10, color: WL.ink, opacity: 0.65
      }}>
        <div>TEL · {D.contact.phone}</div>
        <div style={{ textAlign: 'right' }}>KAKAO · {D.contact.kakao}</div>
      </div>

      <div style={{
        marginTop: 14, fontFamily: FF.bebas, fontSize: 9, letterSpacing: 3,
        color: WL.ink, opacity: 0.4, textAlign: 'center'
      }}>
        © HANARO FAMILY DAY · {D.event.year} · AMEN 17
      </div>
    </section>
  );
}

function ProgressRail({ progress }: any) {
  return (
    <div style={{
      position: 'absolute', left: 8, top: 100, bottom: 100,
      width: 2, background: `${WL.ink}22`, zIndex: 30, pointerEvents: 'none'
    }}>
      <div style={{
        position: 'absolute', left: 0, top: 0, width: 2,
        height: `${progress * 100}%`, background: WL.ink,
        transition: 'height 0.1s linear'
      }} />
      <div style={{
        position: 'absolute', left: -3, top: `${progress * 100}%`,
        width: 8, height: 8, background: WL.sun, borderRadius: '50%',
        boxShadow: `0 0 0 2px ${WL.paper}`,
        transition: 'top 0.1s linear'
      }} />
    </div>
  );
}

function ResponsiveDevice({ children, dark = false }: any) {
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

  const baseW = 390, baseH = 844;
  let outerStyle: any;

  if (frame) {
    const padding = 32;
    const scale = Math.min(
      (size.w - padding) / baseW,
      (size.h - padding) / baseH,
      1
    );
    outerStyle = {
      width: baseW, height: baseH, borderRadius: 48,
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
      borderRadius: 0, background: WL.paper,
      boxShadow: maxW < size.w ? '0 0 60px rgba(0,0,0,0.2)' : 'none',
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
export default function WaveLayersApp() {
  const scrollRef = useRef<any>(null);
  const { progress, scrollPx } = useScrollProgress(scrollRef);

  return (
    <ResponsiveDevice>
      <div style={{ position: 'relative', height: '100%', width: '100%', background: WL.paper }}>
        <div
          ref={scrollRef}
          data-scroll-root
          className="no-scrollbar"
          style={{
            height: '100%', width: '100%',
            overflowY: 'auto', overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch'
          }}>
          <Hero scrollPx={scrollPx} />
          <Invite scrollPx={scrollPx} />
          <WhenWhere scrollPx={scrollPx} />
          <Timeline scrollPx={scrollPx} />
          <Program scrollPx={scrollPx} />
          <Food scrollPx={scrollPx} />
          <Directions scrollPx={scrollPx} />
          <Gallery scrollPx={scrollPx} />
          <RSVP />
        </div>
        <ProgressRail progress={progress} />
      </div>
    </ResponsiveDevice>
  );
}
