import { useState, useEffect } from 'react';
import type { RefObject } from 'react';

/** 요소가 뷰포트에 들어왔는지 1회 판정. data-scroll-root 컨테이너 기준. */
export function useReveal(ref: RefObject<HTMLElement | null>) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const root = el.closest('[data-scroll-root]');
    const rect = el.getBoundingClientRect();
    const rootRect = root
      ? (root as HTMLElement).getBoundingClientRect()
      : { top: 0, bottom: window.innerHeight };
    if (rect.top < rootRect.bottom && rect.bottom > rootRect.top) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setShown(true); },
      { threshold: 0.15, root: root as Element | null, rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);
  return shown;
}
