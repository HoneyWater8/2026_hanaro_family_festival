import { memo, useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { ArrowDown, RefreshCw } from 'lucide-react';
import { WL } from '../../theme/tokens';

type Props = {
  scrollRef: RefObject<HTMLElement | null>;
};

const PULL_THRESHOLD = 70;   // 이 이상 당겨졌을 때 손 떼면 새로고침
const MAX_PULL = 130;        // 시각적 최대 당김
const RESISTANCE = 2.4;      // 손가락 이동 대비 시각적 이동 비율 (값 클수록 둔감)
const INDICATOR_TOP_OFFSET = 50; // 인디케이터가 pullY=0일 때 viewport 위로 숨는 정도

/**
 * 커스텀 pull-to-refresh.
 * - scrollRef가 가리키는 내부 스크롤 컨테이너의 scrollTop=0인 상태에서 아래로 당기면 활성화.
 * - 손가락 따라 컨테이너가 살짝 내려오고 상단에 화살표 인디케이터 노출.
 * - 임계점(PULL_THRESHOLD) 이상에서 손 떼면 spinner 표시 후 window.location.reload().
 */
export const PullToRefresh = memo(function PullToRefresh({ scrollRef }: Props) {
  const [pullY, setPullY] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const pullYRef = useRef(0);
  const startYRef = useRef<number | null>(null);
  const activeRef = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const setPull = (v: number, withTransition: boolean) => {
      pullYRef.current = v;
      setPullY(v);
      el.style.transition = withTransition ? 'transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)' : 'none';
      el.style.transform = v > 0 ? `translateY(${v}px)` : 'translateY(0)';
    };

    const onTouchStart = (e: TouchEvent) => {
      if (refreshing) return;
      if (el.scrollTop > 0) { activeRef.current = false; return; }
      startYRef.current = e.touches[0].clientY;
      activeRef.current = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!activeRef.current || startYRef.current === null) return;
      if (el.scrollTop > 0) {
        // 사용자가 정상 스크롤로 전환 → pull 취소
        activeRef.current = false;
        startYRef.current = null;
        setPull(0, true);
        return;
      }
      const dy = e.touches[0].clientY - startYRef.current;
      if (dy <= 0) {
        if (pullYRef.current !== 0) setPull(0, false);
        return;
      }
      const visualPull = Math.min(MAX_PULL, dy / RESISTANCE);
      setPull(visualPull, false);
      // 네이티브 바운스/스크롤 방지
      if (e.cancelable) e.preventDefault();
    };

    const onTouchEnd = () => {
      if (!activeRef.current) return;
      activeRef.current = false;
      startYRef.current = null;
      const finalY = pullYRef.current;
      if (finalY >= PULL_THRESHOLD) {
        setRefreshing(true);
        setPull(PULL_THRESHOLD, true);
        window.setTimeout(() => window.location.reload(), 500);
      } else {
        setPull(0, true);
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('touchcancel', onTouchEnd);

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
      // 마운트 해제 시 transform 초기화
      el.style.transform = '';
      el.style.transition = '';
    };
  }, [scrollRef, refreshing]);

  const reached = pullY >= PULL_THRESHOLD;
  const arrowRotation = reached ? 180 : Math.min(180, (pullY / PULL_THRESHOLD) * 180);

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: `translate(-50%, ${pullY - INDICATOR_TOP_OFFSET}px)`,
        transition: pullY === 0 || refreshing ? 'transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
        pointerEvents: 'none',
        zIndex: 100,
        opacity: pullY > 0 || refreshing ? 1 : 0,
      }}
    >
      <div style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: `${WL.paper}cc`,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: `0 4px 14px ${WL.ink}33`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: WL.ink,
      }}>
        {refreshing ? (
          <span style={{
            display: 'inline-flex',
            animation: 'wl-spin 0.9s linear infinite',
          }}>
            <RefreshCw size={18} strokeWidth={2.2} />
          </span>
        ) : (
          <span style={{
            display: 'inline-flex',
            transform: `rotate(${arrowRotation}deg)`,
            transition: 'transform 0.18s cubic-bezier(0.22, 1, 0.36, 1)',
          }}>
            <ArrowDown size={18} strokeWidth={2.2} />
          </span>
        )}
      </div>
    </div>
  );
});
