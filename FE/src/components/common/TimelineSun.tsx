import { memo, useContext, useEffect, useRef, useState } from 'react';
import { ScrollContext } from '../../hooks/useScrollTracker';

const SUN_SIZE = 60;
const WAVE_HEIGHT = 90;
const PADDING_TOP = 24;
const PADDING_RIGHT = 12;
const TRANSITION_START = 0; // 마지막 20% 구간에서 A→B 슬라이드

/**
 * Timeline 섹션의 시그니처 햇님.
 * - 섹션 진입 시 우상단 바깥에서 뿅 등장 (scale + translate transition).
 * - 스크롤 진행에 따라 광선/halo가 점점 약해짐. 본체는 항상 동일 밝기.
 * - 마지막 20% 구간(progress 0.8~1.0)에서 우상단 → wave 위로 부드럽게 슬라이드.
 * - 섹션이 화면을 벗어나면 자연스럽게 함께 스크롤되어 사라짐.
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

      const range = sectionH - viewportH;
      const scrolledIn = scrollTop - sectionTop;
      const progress = range > 0 ? scrolledIn / range : 0;

      // 가시성: section.top이 viewport.top에 닿거나 그 이상 스크롤 (progress >= 0).
      const shouldShow = progress >= 0;
      setVisible(shouldShow);

      if (!shouldShow) {
        // 다음 등장 시 깨끗한 초기 상태로 시작하도록 변수 리셋.
        sun.style.setProperty('--sun-top', `${PADDING_TOP}px`);
        sun.style.setProperty('--ray-opacity', '1');
        return;
      }

      // 섹션 bottom의 viewport y 좌표 (스크롤 중 변함).
      const secBotInVp = sectionTop + sectionH - scrollTop;
      // Anchor B: wave SVG 바로 위 (sun 하단 = wave 상단).
      const posBTop = secBotInVp - WAVE_HEIGHT - SUN_SIZE;

      // progress 0.8~1.0 구간에서 A(우상단) → B(wave 위) 부드럽게 보간.
      const k = Math.max(
        0,
        Math.min(1, (progress - TRANSITION_START) / (1 - TRANSITION_START))
      );
      const blend = k * k * (3 - 2 * k); // smoothstep
      const sunTop = PADDING_TOP * (1 - blend) + posBTop * blend;

      // 광선/halo 투명도: progress 0 → 1 동안 1 → 0.
      const clamped = Math.max(0, Math.min(1, progress));
      const rayOpacity = 1 - clamped;

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
        transform: visible
          ? 'translate(0, 0) scale(1)'
          : 'translate(60px, -60px) scale(0)',
        // 등장: 살짝 오버슈트 bounce / 퇴장: 빠르게 사라짐.
        transition: visible
          ? 'opacity 0.45s ease-out, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
          : 'opacity 0.3s ease-in, transform 0.35s ease-in',
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
