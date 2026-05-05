import { useRef } from 'react';
import type { ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
};

export function Reveal({ children, delay = 0, y = 24, x = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useReveal(ref);
  const reduced = usePrefersReducedMotion();
  // 모션 감소 모드에선 트랜지션 없이 즉시 visible.
  const visible = reduced || shown;
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translate(0,0)' : `translate(${x}px, ${y}px)`,
      transition: reduced
        ? 'none'
        : `opacity 0.7s ease ${delay}s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`
    }}>
      {children}
    </div>
  );
}
