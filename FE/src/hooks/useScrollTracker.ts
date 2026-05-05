import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { RefObject } from 'react';

type Subscriber = () => void;

type ScrollContextValue = {
  /** 현재 컨테이너 scrollTop. ref라서 값 변경이 React 리렌더를 유발하지 않음. */
  scrollPxRef: RefObject<number>;
  /** 매 프레임(rAF) 한 번씩 호출될 콜백 등록. unsubscribe 함수 반환. */
  subscribe: (cb: Subscriber) => () => void;
};

export const ScrollContext = createContext<ScrollContextValue | null>(null);

/**
 * 스크롤 컨테이너를 추적.
 * - scrollPx는 ref로만 노출 (wave 같은 imperative 사용처 → React 리렌더 회피).
 * - progress는 state로 관리 (ProgressRail UI용).
 * - 스크롤 이벤트는 rAF로 throttle (한 프레임 1회).
 * - subscribe로 추가 구독 가능 (Timeline의 dayProg 등).
 */
export function useScrollTracker(containerRef: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  const scrollPxRef = useRef(0);
  const subscribersRef = useRef<Set<Subscriber>>(new Set());

  const subscribe = useCallback((cb: Subscriber) => {
    subscribersRef.current.add(cb);
    return () => { subscribersRef.current.delete(cb); };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let raf: number | null = null;
    const update = () => {
      raf = null;
      const max = el.scrollHeight - el.clientHeight;
      scrollPxRef.current = el.scrollTop;
      setProgress(max > 0 ? el.scrollTop / max : 0);
      subscribersRef.current.forEach(cb => cb());
    };
    const onScroll = () => {
      // 이미 다음 프레임에 처리 예약되어 있으면 무시 (rAF throttle).
      if (raf === null) raf = requestAnimationFrame(update);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      el.removeEventListener('scroll', onScroll);
    };
  }, []);

  // 메모이즈해 consumer가 매 progress 갱신마다 리렌더하지 않도록 함.
  const contextValue = useMemo(
    () => ({ scrollPxRef, subscribe }),
    [subscribe]
  );

  return { progress, contextValue };
}
