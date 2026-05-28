import { memo, useState, useEffect, useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { D } from '../../data/concept-d';
import type { ProgramRowData, ProgramCardData, ProgramOpenState } from '../../data/types';
import { WL, FF, ACCENT_MAP } from '../../theme/tokens';
import { Reveal } from '../common/Reveal';
import { HanHead } from '../common/HanHead';
import { IssueLabel } from '../common/IssueLabel';
import { MorphingWave } from '../common/MorphingWave';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// 캐러셀 카드 사이즈 — 무한 루프 wrap 거리 계산에 사용되므로 inline 스타일과 일치해야 함.
const CARD_WIDTH = 132;
const CARD_HEIGHT = 132;
const CARD_GAP = 10;
const CARD_STRIDE = CARD_WIDTH + CARD_GAP; // 142

type ProgramCardProps = {
  card: ProgramCardData;
  accent: string;
  onClick: () => void;
  dimmed?: boolean;
};

function ProgramCard({ card, accent, onClick, dimmed }: ProgramCardProps) {
  const hasImage = Boolean(card.image);
  return (
    <div
      onClick={onClick}
      style={{
        flex: '0 0 auto',
        width: CARD_WIDTH, height: CARD_HEIGHT,
        background: WL.paper, color: WL.ink,
        border: `1.5px solid ${accent}`, borderRadius: 4,
        cursor: 'pointer', position: 'relative', overflow: 'hidden',
        boxShadow: `0 2px 8px ${WL.ink}15`,
        opacity: dimmed ? 0.45 : 1,
        transition: 'opacity 0.3s ease',
        userSelect: 'none', WebkitUserSelect: 'none'
      }}
    >
      {/* 배경 이미지 (있을 때만) */}
      {hasImage && (
        <img
          src={card.image}
          alt=""
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            display: 'block',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* 텍스트 가독성 위한 scrim — 이미지 위에만 깔림 */}
      {hasImage && (
        <div style={{
          position: 'absolute', inset: 0,
          background:
            `linear-gradient(to bottom, ${WL.ink}00 35%, ${WL.ink}aa 100%)`,
          pointerEvents: 'none',
        }} />
      )}

      {/* 우상단 액센트 닷 (이미지 위에선 흰 ring으로 또렷하게) */}
      <div style={{
        position: 'absolute', top: 10, right: 10,
        width: 8, height: 8, borderRadius: '50%', background: accent,
        boxShadow: hasImage ? `0 0 0 2px ${WL.paper}99` : 'none',
        pointerEvents: 'none',
      }} />

      {/* 컨텐츠 — 이미지 있으면 하단으로 모이고, 없으면 기존 상단/하단 분할 유지 */}
      {hasImage ? (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          padding: '12px 14px',
          color: WL.paper,
          pointerEvents: 'none',
        }}>
          <div style={{
            fontFamily: FF.han, fontSize: 17, lineHeight: 1.1,
            letterSpacing: -0.5,
            textShadow: `0 1px 4px ${WL.ink}aa`,
          }}>{card.name}</div>
          <div style={{
            marginTop: 3, fontFamily: FF.sans, fontSize: 10,
            opacity: 0.92, fontWeight: 600,
            textShadow: `0 1px 3px ${WL.ink}aa`,
          }}>{card.sub}</div>
          <div style={{
            marginTop: 6,
            fontFamily: FF.bebas, fontSize: 10, letterSpacing: 1.5,
            color: WL.paper,
            borderTop: `1px solid ${WL.paper}55`,
            paddingTop: 5,
            textShadow: `0 1px 3px ${WL.ink}99`,
          }}>{card.time}</div>
        </div>
      ) : (
        <div style={{
          position: 'absolute', inset: 0,
          padding: '12px 14px',
          display: 'flex', flexDirection: 'column',
          pointerEvents: 'none',
        }}>
          <div style={{
            fontFamily: FF.han, fontSize: 17, lineHeight: 1.1,
            color: WL.ink, letterSpacing: -0.5, paddingRight: 16,
          }}>{card.name}</div>
          <div style={{
            marginTop: 4, fontFamily: FF.sans, fontSize: 10,
            color: WL.ink, opacity: 0.65, fontWeight: 600,
          }}>{card.sub}</div>
          <div style={{ flex: 1 }} />
          <div style={{
            fontFamily: FF.bebas, fontSize: 10, letterSpacing: 1.5,
            color: accent, borderTop: `1px solid ${WL.ink}1a`,
            paddingTop: 6,
          }}>{card.time}</div>
        </div>
      )}
    </div>
  );
}

type DragState = {
  startX: number;
  startOffset: number;
  lastX: number;
  lastT: number;
  vel: number;
  moved: number;
  pointerDown: boolean;
  pointerId?: number;
};

type ProgramRowProps = {
  row: ProgramRowData;
  onCardClick: (cardId: string) => void;
  paused: boolean;
};

function ProgramRow({ row, onCardClick, paused }: ProgramRowProps) {
  const accent = ACCENT_MAP[row.accent];
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const lastTimeRef = useRef(0);
  const halfWidthRef = useRef(0);
  const [dragging, setDragging] = useState(false);
  const draggingRef = useRef(false);
  const dragStateRef = useRef<DragState>({ startX: 0, startOffset: 0, lastX: 0, lastT: 0, vel: 0, moved: 0, pointerDown: false });
  const inertiaRef = useRef(0);
  const reduced = usePrefersReducedMotion();
  const effectivelyPaused = paused || reduced;
  const DRAG_THRESHOLD = 6;

  const wrap = (x: number) => {
    const hw = halfWidthRef.current;
    if (hw <= 0) return x;
    return (((x % hw) + hw) % hw) - hw;
  };

  const direction = row.direction === 'right' ? 1 : -1;
  const baseSpeedPxPerMs = () => (halfWidthRef.current / (row.duration * 1000)) * direction;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // 한 사이클 너비 = N × 카드 stride. scrollWidth/2를 쓰면 좌우 padding이
    // 끼어들어 매 사이클마다 (padding - gap/2) px씩 어긋남 → 끊김 발생.
    halfWidthRef.current = row.cards.length * CARD_STRIDE;
    offsetRef.current = wrap(offsetRef.current);
    track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
  }, [row.cards.length]);

  useEffect(() => {
    let rafId: number;
    const tick = (t: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = t;
      const dt = t - lastTimeRef.current;
      lastTimeRef.current = t;

      if (!effectivelyPaused && !draggingRef.current && halfWidthRef.current > 0) {
        const inertiaFade = Math.exp(-dt / 250);
        inertiaRef.current *= inertiaFade;
        const speed = baseSpeedPxPerMs() + inertiaRef.current;
        offsetRef.current = wrap(offsetRef.current + speed * dt);
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [effectivelyPaused]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    dragStateRef.current = {
      startX: e.clientX,
      startOffset: offsetRef.current,
      lastX: e.clientX,
      lastT: performance.now(),
      vel: 0,
      moved: 0,
      pointerDown: true,
      pointerId: e.pointerId
    };
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const st = dragStateRef.current;
    if (!st.pointerDown) return;
    const dx = e.clientX - st.startX;
    st.moved = Math.max(st.moved, Math.abs(dx));

    if (!draggingRef.current) {
      if (st.moved < DRAG_THRESHOLD) return;
      draggingRef.current = true;
      setDragging(true);
      inertiaRef.current = 0;
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* noop */ }
    }

    const now = performance.now();
    const dt = Math.max(1, now - st.lastT);
    st.vel = (e.clientX - st.lastX) / dt;
    st.lastX = e.clientX;
    st.lastT = now;

    const next = wrap(st.startOffset + dx);
    offsetRef.current = next;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${next}px, 0, 0)`;
    }
  };
  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const st = dragStateRef.current;
    if (!st.pointerDown) return;
    st.pointerDown = false;
    if (draggingRef.current) {
      draggingRef.current = false;
      setDragging(false);
      inertiaRef.current = st.vel;
      try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* noop */ }
    }
  };

  const handleCardClick = (cardId: string) => {
    if (dragStateRef.current.moved > DRAG_THRESHOLD) return;
    onCardClick(cardId);
  };

  const doubled = [...row.cards, ...row.cards];

  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 8,
        padding: '0 24px', marginBottom: 8
      }}>
        <span style={{
          fontFamily: FF.han, fontSize: 17, color: WL.ink, letterSpacing: -0.5
        }}>{row.label}</span>
        <span style={{
          fontFamily: FF.bebas, fontSize: 10, letterSpacing: 2, color: accent
        }}>{row.labelEn}</span>
        <span style={{ flex: 1, height: 1, background: `${WL.ink}22` }} />
        {row.meta && (
          <span style={{
            fontFamily: FF.sans, fontSize: 10, fontWeight: 600,
            color: WL.ink, opacity: 0.55
          }}>{row.meta}</span>
        )}
      </div>

      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          touchAction: 'pan-y',
          cursor: dragging ? 'grabbing' : 'grab'
        }}
      >
        <div ref={trackRef} style={{
          display: 'flex', gap: CARD_GAP,
          width: 'max-content',
          padding: '6px 24px',
          willChange: 'transform'
        }}>
          {doubled.map((card, i) => {
            const cardId = `${row.key}-${i % row.cards.length}`;
            return (
              <ProgramCard
                key={`${row.key}-${i}`}
                card={card}
                accent={accent}
                onClick={() => handleCardClick(cardId)}
                dimmed={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

type ProgramModalProps = {
  data: ProgramOpenState | null;
  onClose: () => void;
};

function ProgramModal({ data, onClose }: ProgramModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!data) return null;
  const { card, accent, rowLabel, rowLabelEn } = data;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'absolute', inset: 0, zIndex: 100,
        background: `${WL.ink}cc`,
        backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
        animation: 'wl-overlay-in 0.25s ease-out',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'calc(100% - 32px)', maxWidth: 320,
          background: WL.paper,
          border: `2px solid ${accent}`, borderRadius: 6,
          padding: '24px 22px 22px',
          animation: 'wl-modal-in 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
          boxShadow: `0 24px 60px ${WL.ink}55`,
          maxHeight: 'calc(100% - 32px)',
          display: 'flex', flexDirection: 'column'
        }}
      >
        <button
          onClick={onClose}
          aria-label="close"
          style={{
            position: 'absolute', top: 10, right: 10,
            width: 32, height: 32, border: 'none',
            background: 'transparent', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: WL.ink, opacity: 0.7
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M3 3 L13 13 M13 3 L3 13" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: accent }} />
          <span style={{
            fontFamily: FF.bebas, fontSize: 11, letterSpacing: 2.5, color: accent
          }}>{rowLabelEn}</span>
          <span style={{ width: 1, height: 12, background: `${WL.ink}33` }} />
          <span style={{
            fontFamily: FF.sans, fontSize: 11, fontWeight: 700, color: WL.ink, opacity: 0.7
          }}>{rowLabel}</span>
        </div>

        <div style={{
          fontFamily: FF.han, fontSize: 32, lineHeight: 1.1,
          color: WL.ink, letterSpacing: -1, marginBottom: 4
        }}>{card.name}</div>
        <div style={{
          fontFamily: FF.sans, fontSize: 13, fontWeight: 600,
          color: WL.ink, opacity: 0.65
        }}>{card.sub}</div>

        <div style={{
          marginTop: 18, padding: '10px 12px',
          background: `${accent}22`, border: `1px solid ${accent}55`,
          borderRadius: 3,
          display: 'flex', alignItems: 'center', gap: 10
        }}>
          <span style={{
            fontFamily: FF.bebas, fontSize: 10, letterSpacing: 2, color: WL.ink, opacity: 0.55
          }}>일정</span>
          <span style={{ flex: 1, fontFamily: FF.sans, fontSize: 13, fontWeight: 700, color: WL.ink }}>
            {card.time}
          </span>
        </div>

        <div style={{
          marginTop: 16, fontFamily: FF.sans, fontSize: 13,
          color: WL.ink, lineHeight: 1.65, opacity: 0.85
        }}>{card.desc}</div>

        <div style={{
          marginTop: 22, paddingTop: 14, borderTop: `1px solid ${WL.ink}1a`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontFamily: FF.bebas, fontSize: 10, letterSpacing: 2,
          color: WL.ink, opacity: 0.5
        }}>
          <span>HANARO 2026</span>
        </div>
      </div>
    </div>
  );
}

export const Program = memo(function Program() {
  const [openCard, setOpenCard] = useState<ProgramOpenState | null>(null);

  const handleCardClick = (rowKey: string, cardId: string) => {
    const row = D.programRows.find(r => r.key === rowKey);
    if (!row) return;
    const idx = parseInt(cardId.split('-').pop() || '0', 10);
    const card = row.cards[idx];
    if (!card) return;
    const accent = ACCENT_MAP[row.accent];
    setOpenCard({ card, accent, rowLabel: row.label, rowLabelEn: row.labelEn, rowKey });
  };

  return (
    <section data-screen-label="07 Program" style={{
      background: WL.paper, padding: '50px 0 0',
      position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100%'
    }}>
      <div style={{ padding: '0 24px' }}>
        <Reveal>
          <IssueLabel num={7} label="PROGRAM" accent={WL.ink} />
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ marginTop: 22 }}>
            <HanHead size={50} line={0.95}>함께</HanHead>
            <HanHead size={50} line={0.95} color={WL.ocean} style={{ fontStyle: 'italic' }}>즐겨요.</HanHead>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div style={{
            marginTop: 14, fontFamily: FF.sans, fontSize: 11,
            color: WL.ink, opacity: 0.6, fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 6
          }}>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.32}>
        <div style={{
          marginTop: 22, display: 'flex', flexDirection: 'column', gap: 18
        }}>
          {D.programRows.map((row) => (
            <ProgramRow
              key={row.key}
              row={row}
              paused={openCard?.rowKey === row.key}
              onCardClick={(cardId: string) => handleCardClick(row.key, cardId)}
            />
          ))}
        </div>
      </Reveal>

      <div style={{ height: 50 }} />
      <div style={{ marginTop: 'auto' }}>
        <MorphingWave color1={WL.ocean} color2={WL.aqua} height={90} />
      </div>

      {openCard && (
        <ProgramModal data={openCard} onClose={() => setOpenCard(null)} />
      )}
    </section>
  );
});
