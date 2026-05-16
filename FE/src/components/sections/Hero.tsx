import { memo, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { D } from '../../data/concept-d';
import { WL, FF } from '../../theme/tokens';
import { Reveal } from '../common/Reveal';
import { HanHead } from '../common/HanHead';
import { MorphingWave } from '../common/MorphingWave';
import { ScrollContext } from '../../hooks/useScrollTracker';

export const Hero = memo(function Hero() {
  // 스크롤 힌트 — Hero의 마지막 Reveal 애니메이션(delay 0.7 + transform 0.9) 종료 후 등장.
  // 사용자가 한 번이라도 살짝 스크롤하면 페이드아웃 (이후 다시 보이지 않음).
  const scrollCtx = useContext(ScrollContext);
  const [hintVisible, setHintVisible] = useState(false);
  const hintHiddenRef = useRef(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      if (!hintHiddenRef.current) setHintVisible(true);
    }, 1700);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!scrollCtx) return;
    return scrollCtx.subscribe(() => {
      if (!hintHiddenRef.current && scrollCtx.scrollPxRef.current > 60) {
        hintHiddenRef.current = true;
        setHintVisible(false);
      }
    });
  }, [scrollCtx]);

  // VENUE 클릭 시 클립보드 복사 + 1.5s 색 변화 피드백
  const [venueCopied, setVenueCopied] = useState(false);
  const venueCopyTimerRef = useRef<number | null>(null);
  const VENUE_COPY_TEXT = '김포골드밸리 중앙체육공원 (학운리 4288)';
  const handleVenueCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(VENUE_COPY_TEXT);
      setVenueCopied(true);
      if (venueCopyTimerRef.current) window.clearTimeout(venueCopyTimerRef.current);
      venueCopyTimerRef.current = window.setTimeout(() => setVenueCopied(false), 1500);
    } catch { /* ignore */ }
  }, []);

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
            fontFamily: FF.bebas, fontSize: 13, letterSpacing: 3, color: WL.ocean,
            marginBottom: 14,
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
            { k: 'VENUE', v: '김포골드밸리 중앙체육공원\n(학운리 4288)' }
          ].map((m, i) => {
            const isVenue = i === 2;
            return (
              <div
                key={i}
                onClick={isVenue ? handleVenueCopy : undefined}
                title={isVenue ? '클릭하면 주소가 복사돼요' : undefined}
                style={{
                  position: 'relative',
                  borderLeft: i > 0 ? `1px solid ${WL.ink}22` : 'none',
                  paddingLeft: i > 0 ? 10 : 0,
                  cursor: isVenue ? 'pointer' : 'default',
                  userSelect: isVenue ? 'none' : 'auto',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                <div style={{ fontFamily: FF.bebas, fontSize: 9, letterSpacing: 2, color: WL.ink, opacity: 0.6 }}>{m.k}</div>
                <div style={{
                  fontFamily: isVenue ? FF.sans : FF.bebas,
                  fontWeight: isVenue ? 700 : 400,
                  fontSize: isVenue ? 11 : 14,
                  letterSpacing: isVenue ? 0 : 1,
                  lineHeight: isVenue ? 1.35 : 1.2,
                  whiteSpace: isVenue ? 'pre-line' : 'normal',
                  color: isVenue && venueCopied ? WL.ocean : WL.ink,
                  marginTop: 4,
                  transition: 'color 0.25s ease',
                }}>{m.v}</div>
                {/* COPIED 배지 — venue 텍스트 위에 떠올랐다 사라짐 (레이아웃 안 흔듦) */}
                {isVenue && (
                  <div style={{
                    position: 'absolute',
                    top: -6,
                    left: i > 0 ? 10 : 0,
                    fontFamily: FF.bebas,
                    fontSize: 9,
                    letterSpacing: 2,
                    color: WL.ocean,
                    background: WL.paper,
                    padding: '2px 6px',
                    border: `1px solid ${WL.ocean}66`,
                    borderRadius: 3,
                    opacity: venueCopied ? 1 : 0,
                    transform: venueCopied ? 'translateY(0)' : 'translateY(4px)',
                    transition: 'opacity 0.25s ease, transform 0.25s ease',
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                  }}>
                    ✓ COPIED
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Reveal>

      <div style={{ margin: '0 -24px', marginTop: 'auto' }}>
        <MorphingWave color1={WL.ocean} color2={WL.aqua} height={100} />
      </div>

      {/* 스크롤 힌트 — "SWIPE UP" + 손가락 터치 원이 궤적을 따라 위로 이동.
          가로 9:1 위치 + 세로 중앙. Hero의 ink 색상 사용. 스크롤 시작하면 페이드아웃 */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '90%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        color: WL.ink,
        fontFamily: FF.sans,
        fontSize: 11,
        letterSpacing: 0.5,
        fontWeight: 700,
        opacity: hintVisible ? 0.9 : 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none',
        zIndex: 3,
        whiteSpace: 'nowrap',
      }}>
        <span>아래로 드래그</span>
        <div style={{ position: 'relative', width: 36, height: 44 }}>
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 2,
            width: 2,
            height: 30,
            background: `linear-gradient(to bottom, transparent, ${WL.ink})`,
            transform: 'translateX(-50%)',
            opacity: 0.35,
          }} />
          <div style={{
            position: 'absolute',
            left: '50%',
            bottom: 0,
            width: 16,
            height: 16,
            borderRadius: '50%',
            border: `1.5px solid ${WL.ink}`,
            transform: 'translateX(-50%)',
            animation: 'wl-hero-swipe-up 1.6s ease-in-out infinite',
          }}>
            <div style={{
              position: 'absolute',
              inset: 3,
              borderRadius: '50%',
              background: WL.ink,
              opacity: 0.6,
            }} />
          </div>
        </div>
      </div>
    </section>
  );
});
