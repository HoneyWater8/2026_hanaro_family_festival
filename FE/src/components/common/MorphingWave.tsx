import { useContext, useEffect, useId, useRef } from 'react';
import { WL } from '../../theme/tokens';
import { ScrollContext } from '../../hooks/useScrollTracker';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type WaveOpts = {
  amp?: number;
  freq?: number;
  phase?: number;
  yBase?: number;
  points?: number;
  width?: number;
  scrollShift?: number;
};

function makeWavePath(time: number, opts: WaveOpts): string {
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

// 정지 상태(시간 0, 스크롤 0)의 초기 path — 모듈 로드 시 1회만 계산.
const INITIAL_BACK  = makeWavePath(0, { amp: 10, freq: 1.1, phase: 0,       yBase: 38 });
const INITIAL_MID   = makeWavePath(0, { amp: 14, freq: 1.4, phase: Math.PI, yBase: 48 });
const INITIAL_FRONT = makeWavePath(0, { amp: 18, freq: 1.6, phase: 1.7,     yBase: 60 });

type MorphingWaveProps = {
  color1?: string;
  color2?: string;
  height?: number;
  flip?: boolean;
};

/**
 * 3겹 사인파 SVG 애니메이션.
 * - rAF 콜백에서 SVG path의 `d`를 직접 setAttribute로 갱신 (React 리렌더 0회).
 * - scrollPx는 prop이 아니라 ScrollContext의 ref로 읽음 → 부모 리렌더에 영향받지 않음.
 */
export function MorphingWave({
  color1 = WL.ocean,
  color2 = WL.aqua,
  height = 80,
  flip = false,
}: MorphingWaveProps) {
  const id = `wl-${useId().replace(/:/g, '')}`;
  const backRef  = useRef<SVGPathElement>(null);
  const midRef   = useRef<SVGPathElement>(null);
  const frontRef = useRef<SVGPathElement>(null);
  const ctx = useContext(ScrollContext);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return; // 모션 감소 모드: 초기 path 유지
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const time = (now - start) / 1000;
      const scrollPhase = (ctx?.scrollPxRef.current ?? 0) / 200;
      const back  = makeWavePath(time * 0.6, { amp: 10, freq: 1.1, phase: 0,       yBase: 38, scrollShift: scrollPhase * 0.5 });
      const mid   = makeWavePath(time * 1.0, { amp: 14, freq: 1.4, phase: Math.PI, yBase: 48, scrollShift: scrollPhase * 1.0 });
      const front = makeWavePath(time * 1.4, { amp: 18, freq: 1.6, phase: 1.7,     yBase: 60, scrollShift: scrollPhase * 1.6 });
      backRef.current?.setAttribute('d', back);
      midRef.current?.setAttribute('d', mid);
      frontRef.current?.setAttribute('d', front);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, ctx]);

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
      <path ref={backRef}  d={INITIAL_BACK}  fill={`url(#${id}-g1)`}/>
      <path ref={midRef}   d={INITIAL_MID}   fill={`url(#${id}-g2)`}/>
      <path ref={frontRef} d={INITIAL_FRONT} fill={`url(#${id}-g3)`}/>
    </svg>
  );
}
