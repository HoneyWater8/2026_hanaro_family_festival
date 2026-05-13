import { memo, useContext, useEffect, useRef, useState } from 'react';
import { ScrollContext } from '../../hooks/useScrollTracker';

const SUN_SIZE = 60;
const WAVE_HEIGHT = 90;
const PADDING_RIGHT = 12;
// 시작 위치 — 섹션 top edge로부터의 거리. phase 2에서는 viewport top에서 이 거리만큼 떨어진 곳에서 하강 시작
const START_TOP = 96;
// 도착 시 sun 하단이 wave 상단보다 얼마나 아래에 위치할지 (양수 = wave에 잠김)
const LANDING_OVERLAP = 20;

/**
 * Timeline 섹션의 시그니처 햇님.
 * - Phase 1: 섹션이 viewport에 진입하면 섹션 우상단(section.top + START_TOP)에 붙어 함께 스크롤.
 *   섹션이 아래에서 올라오면서 자연스럽게 sun이 뿅 등장.
 * - Phase 2: section.top이 viewport.top에 닿은 순간부터, sun이 viewport 안에서 아래로 내려감.
 *   smoothstep 으로 부드럽게, 섹션 끝에서 wave 위에 도달.
 * - 광선/halo는 phase 2 진행도에 따라 점점 페이드.
 */
export const TimelineSun = memo(function TimelineSun() {
  const ctx = useContext(ScrollContext);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ctx) return;
    let timeline: HTMLElement | null = null;
    let root: HTMLElement | null = null;

    const ensureRefs = () => {
      if (!timeline || !document.body.contains(timeline)) {
        timeline = document.querySelector(
          '[data-screen-label="04 Timeline"]'
        ) as HTMLElement | null;
        root = null;
      }
      if (timeline && (!root || !document.body.contains(root))) {
        root = timeline.closest('[data-scroll-root]') as HTMLElement | null;
      }
    };

    const update = () => {
      ensureRefs();
      const sun = wrapRef.current;
      if (!timeline || !root || !sun) return;

      const sectionTop = timeline.offsetTop;
      const sectionH = timeline.offsetHeight;
      const viewportH = root.clientHeight;
      const scrollTop = root.scrollTop;

      const sectionTopInVp = sectionTop - scrollTop;
      const sectionBottomInVp = sectionTopInVp + sectionH;

      // 가시성: 섹션이 viewport와 겹칠 때
      const shouldShow = sectionBottomInVp > 0 && sectionTopInVp < viewportH;
      setVisible(shouldShow);
      if (!shouldShow) return;

      // 포지션 — phase 1은 섹션과 함께, phase 2는 viewport 내부에서 하강 후 wave에 안착
      const range = sectionH - viewportH;
      let sunTop: number;
      if (sectionTopInVp >= 0) {
        // Phase 1: section.top이 viewport.top 아래. sun이 section.top + PADDING과 함께 이동
        sunTop = sectionTopInVp + START_TOP;
      } else {
        // Phase 2: section.top이 viewport.top 통과. sun이 viewport 내부에서 하강
        const scrolledPast = -sectionTopInVp;
        const t = range > 0 ? Math.min(1, scrolledPast / range) : 0;
        const blend = t * t * (3 - 2 * t); // smoothstep
        const maxY = viewportH - WAVE_HEIGHT - SUN_SIZE + LANDING_OVERLAP;
        const descendingY = START_TOP + blend * (maxY - START_TOP);
        // wave의 실제 위치. 하강하던 sun이 wave에 닿으면 wave에 고정되어 함께 위로 이동
        const waveTargetY = sectionBottomInVp - WAVE_HEIGHT - SUN_SIZE + LANDING_OVERLAP;
        sunTop = Math.min(descendingY, waveTargetY);
      }

      // 광선 투명도: phase 2 진행도에 따라 페이드 (phase 1에서는 항상 풀 밝기)
      const scrolledPast = Math.max(0, -sectionTopInVp);
      const phase2Progress = range > 0 ? Math.min(1, scrolledPast / range) : 0;
      const rayOpacity = 1 - phase2Progress;

      sun.style.setProperty('--sun-top', `${sunTop}px`);
      sun.style.setProperty('--ray-opacity', `${rayOpacity}`);
    };

    update();
    return ctx.subscribe(update);
  }, [ctx]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      style={{
        position: 'absolute',
        top: 'var(--sun-top, 24px)',
        right: PADDING_RIGHT,
        width: SUN_SIZE,
        height: SUN_SIZE,
        pointerEvents: 'none',
        zIndex: 40,
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0)',
        transformOrigin: 'center',
        transition: visible
          ? 'opacity 0.4s ease-out, transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)'
          : 'opacity 0.25s ease-in, transform 0.3s ease-in',
      }}
    >
      <SunSVG />
    </div>
  );
});

function SunSVG() {
  return (
    <svg
      viewBox="-50 -50 100 100"
      style={{
        width: '100%',
        height: '100%',
        overflow: 'visible',
        display: 'block',
      }}
    >
      <defs>
        <radialGradient id="ts-core">
          <stop offset="0%" stopColor="#FFF4C2" />
          <stop offset="55%" stopColor="#FFC93C" />
          <stop offset="100%" stopColor="#F59C2E" />
        </radialGradient>
        <radialGradient id="ts-halo">
          <stop offset="0%" stopColor="#FFC93C" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#FFC93C" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FFC93C" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glow halo (광선과 함께 페이드) */}
      <circle
        r="48"
        fill="url(#ts-halo)"
        style={{ opacity: 'var(--ray-opacity, 1)' }}
      />

      {/* Rays — 12개, 길이 교차 */}
      <g style={{ opacity: 'var(--ray-opacity, 1)' }}>
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * 360;
          const isLong = i % 2 === 0;
          const inner = isLong ? 26 : 28;
          const outer = isLong ? 38 : 33;
          return (
            <line
              key={i}
              x1="0"
              y1={-inner}
              x2="0"
              y2={-outer}
              stroke="#FFC93C"
              strokeWidth={isLong ? 2.5 : 2}
              strokeLinecap="round"
              transform={`rotate(${angle})`}
            />
          );
        })}
      </g>

      {/* Core 베이스 — 항상 보임 (사라지지 않게 하단 레이어) */}
      <circle r="18" fill="#F59C2E" />
      {/* Core 반짝임 — 밝은 그라데이션, 스크롤 진행에 따라 페이드 */}
      <circle
        r="18"
        fill="url(#ts-core)"
        style={{ opacity: 'var(--ray-opacity, 1)' }}
      />
      {/* 광택 하이라이트 — 가장 강한 반짝 포인트, 같이 페이드 */}
      <circle
        r="7"
        cx="-5"
        cy="-5"
        fill="#FFFCE6"
        style={{ opacity: 'calc(0.7 * var(--ray-opacity, 1))' }}
      />
    </svg>
  );
}
