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
        <MorphingWave color1={WL.paperWarm} color2={WL.lime} height={90} />
      </div>
    </section>
  );
});
