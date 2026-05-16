import { memo, useState, useEffect, useRef, useContext } from 'react';
import { D } from '../../data/concept-d';
import type { TimelineGroup, TimelineItem } from '../../data/types';
import { WL, FF } from '../../theme/tokens';
import { ScrollContext } from '../../hooks/useScrollTracker';
import { Reveal } from '../common/Reveal';
import { HanHead } from '../common/HanHead';
import { IssueLabel } from '../common/IssueLabel';
import { MorphingWave } from '../common/MorphingWave';

const TIMELINE_GROUP_TONE: Record<TimelineGroup, { bg: string; accent: string; label: string }> = {
  '오프닝': { bg: `${WL.aqua}28`,  accent: WL.ocean, label: 'OPENING' },
  '오전':   { bg: `${WL.ocean}18`, accent: WL.ocean, label: 'MORNING' },
  '오후':   { bg: `${WL.sun}22`,   accent: WL.sun,   label: 'AFTERNOON' },
  '폐막':   { bg: `${WL.lime}30`,  accent: WL.ocean, label: 'CLOSING' }
};

export const Timeline = memo(function Timeline() {
  const groups: { group: TimelineGroup; items: TimelineItem[] }[] = [];
  D.timeline.forEach(t => {
    const last = groups[groups.length - 1];
    if (last && last.group === t.group) last.items.push(t);
    else groups.push({ group: t.group, items: [t] });
  });

  const sectionRef = useRef<HTMLElement>(null);
  const [dayProg, setDayProg] = useState(0);
  const ctx = useContext(ScrollContext);
  // 출석 이벤트 박스 진입 감지 — pop 등장 애니메이션 트리거.
  // useReveal보다 더 깊은 threshold/rootMargin으로 viewport에 충분히 들어왔을 때만 발사.
  const benefitRef = useRef<HTMLDivElement>(null);
  const [benefitShown, setBenefitShown] = useState(false);
  useEffect(() => {
    const el = benefitRef.current;
    if (!el) return;
    const root = el.closest('[data-scroll-root]') as HTMLElement | null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBenefitShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.5, root, rootMargin: '0px 0px -15% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 자체 스크롤 리스너 대신 ScrollContext의 subscribe 사용 (전체 1개 리스너로 통합).
  useEffect(() => {
    if (!ctx) return;
    const el = sectionRef.current;
    if (!el) return;
    const root = el.closest('[data-scroll-root]') as HTMLElement | null;
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
    return ctx.subscribe(update);
  }, [ctx]);

  // 0~0.4 구간: paper 유지 / 0.4~0.6: 급격히 전환 / 0.6~1: dusk 유지.
  // smoothstep으로 boundary를 부드럽게 처리.
  const k = Math.max(0, Math.min(1, (dayProg - 0.4) / 0.2));
  const eased = k * k * (3 - 2 * k);
  const bg = `color-mix(in oklab, ${WL.paper} ${(1 - eased) * 100}%, ${WL.dusk})`;
  const fg = WL.ink;

  return (
    <section ref={sectionRef} data-screen-label="04 Timeline" style={{
      background: bg, color: fg, padding: '50px 24px 0',
      position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100%',
      transition: 'background 0.15s linear'
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
        {/* 출석 이벤트 — 라운드 박스 + 보더 셔머 + pop 등장 애니메이션 */}
        <div
          ref={benefitRef}
          style={{
            background: `
              linear-gradient(${WL.sun}33, ${WL.sun}33) padding-box,
              linear-gradient(${WL.paper}, ${WL.paper}) padding-box,
              conic-gradient(from var(--benefit-angle, 0deg), #FFE89A, ${WL.sun}, #F59C2E, ${WL.sun}, #FFE89A) border-box
            `,
            border: '2px solid transparent',
            borderRadius: 14,
            padding: '14px 14px',
            boxShadow: `0 4px 14px ${WL.sun}55`,
            transformOrigin: 'center',
            opacity: benefitShown ? undefined : 0,
            transform: benefitShown ? undefined : 'scale(0.7) rotate(-3deg)',
            animation: benefitShown
              ? 'wl-benefit-pop 0.95s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both, wl-benefit-shimmer 3.5s linear infinite'
              : 'none',
          }}>
            <div style={{
              display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
              gap: 10, marginBottom: 12,
            }}>
              <span style={{
                fontFamily: FF.han, fontSize: 22, color: fg, letterSpacing: -0.5,
              }}>🎁 {D.openingBenefits.label}</span>
              <span style={{
                fontFamily: FF.bebas, fontSize: 10, letterSpacing: 2, color: fg, opacity: 0.55,
              }}>{D.openingBenefits.labelEn}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {D.openingBenefits.items.map((item, ii) => (
                <div key={ii} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{
                    flexShrink: 0,
                    fontFamily: FF.sans, fontSize: 11, fontWeight: 700,
                    color: WL.ink, background: WL.paper,
                    border: `1px solid ${WL.ink}22`,
                    padding: '3px 8px', borderRadius: 4,
                    letterSpacing: -0.2,
                    minWidth: 52,
                    textAlign: 'center',
                  }}>{item.tag}</span>
                  <span style={{
                    fontFamily: FF.sans, fontSize: 12, color: fg,
                    lineHeight: 1.5, paddingTop: 2,
                  }}>{item.detail}</span>
                </div>
              ))}
            </div>
            {/* 공통 안내 — 마감 시간 / 조기 종료 가능 */}
            <div style={{
              marginTop: 12, paddingTop: 10, borderTop: `1px dashed ${WL.ink}33`,
              fontFamily: FF.sans, fontSize: 11, color: fg, opacity: 0.75,
              lineHeight: 1.45,
            }}>
              ⏰ {D.openingBenefits.note}
            </div>
          </div>

        {groups.map((g, gi) => {
          const tone = TIMELINE_GROUP_TONE[g.group];
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

              {g.items.map((tt, i) => (
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
                        marginTop: 2, lineHeight: 1.5, whiteSpace: 'pre-line'
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
        <MorphingWave color1={WL.ocean} color2={WL.sun} height={90} />
      </div>
    </section>
  );
});
