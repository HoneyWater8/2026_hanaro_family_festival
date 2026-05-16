import { memo, useCallback, useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { D } from '../../data/concept-d';
import { WL, FF } from '../../theme/tokens';
import { Reveal } from '../common/Reveal';
import { HanHead } from '../common/HanHead';
import { IssueLabel } from '../common/IssueLabel';
import { MorphingWave } from '../common/MorphingWave';

type SlotState = { layers: [string, string]; active: 0 | 1 };

type GalleryPhotoProps = {
  images: string[];
  /** 부모가 컨트롤하는 현재 이미지 인덱스 — 변경 시 크로스페이드 트리거. */
  imageIndex: number;
  /** 슬롯 인덱스 — requestNext 호출 시 어느 슬롯인지 전달용. */
  slotIndex: number;
  /** 다음 이미지 요청 (부모가 다른 슬롯 상태 보고 고름). */
  requestNext: (slotIdx: number) => void;
  aspectRatio: string;
};

// 각 슬롯이 독립적으로 랜덤 시점에 cycling — 시각적으로 wave 패턴 안 보이도록
const SLOT_INITIAL_MAX_DELAY_MS = 4500;
const SLOT_INTERVAL_MIN_MS = 4000;
const SLOT_INTERVAL_MAX_MS = 7500;

/** 한 슬롯 — 부모 controlled imageIndex를 받아 크로스페이드. */
function GalleryPhoto({
  images,
  imageIndex,
  slotIndex,
  requestNext,
  aspectRatio,
}: GalleryPhotoProps) {
  const [state, setState] = useState<SlotState>(() => {
    const src = images[imageIndex] ?? '';
    return { layers: [src, src], active: 0 };
  });

  // imageIndex가 바뀔 때 크로스페이드 트리거 (비활성 layer에 새 이미지 넣고 active 플립).
  // 새 이미지를 먼저 디코드해서 layer src 교체 시 직전 src의 잔상이 보이지 않도록 함
  // (decode 안 하면 inactive layer가 이전에 가졌던 이미지를 잠깐 보여주면서 두 번 바뀌는 듯한 깜빡임 발생).
  useEffect(() => {
    const newSrc = images[imageIndex];
    if (!newSrc) return;

    let cancelled = false;
    const apply = () => {
      if (cancelled) return;
      setState((prev) => {
        if (newSrc === prev.layers[prev.active]) return prev;
        const inactiveIdx: 0 | 1 = prev.active === 0 ? 1 : 0;
        const newLayers: [string, string] = [prev.layers[0], prev.layers[1]];
        newLayers[inactiveIdx] = newSrc;
        return { layers: newLayers, active: inactiveIdx };
      });
    };

    const preload = new Image();
    preload.src = newSrc;
    // decode()는 Promise — 에러나도 그냥 적용 (alt 처리)
    preload.decode().then(apply, apply);

    return () => { cancelled = true; };
  }, [imageIndex, images]);

  // 타이머: 슬롯마다 독립 랜덤 스케줄. 초기 발사 시점과 매 사이클 간격 모두 랜덤 →
  // 슬롯들이 위→아래 순서로 줄지어 바뀌는 wave 패턴이 사라짐.
  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const scheduleNext = (wait: number) => {
      timerId = setTimeout(() => {
        if (cancelled) return;
        requestNext(slotIndex);
        const nextWait =
          SLOT_INTERVAL_MIN_MS +
          Math.random() * (SLOT_INTERVAL_MAX_MS - SLOT_INTERVAL_MIN_MS);
        scheduleNext(nextWait);
      }, wait);
    };

    // 첫 발사: 0 ~ SLOT_INITIAL_MAX_DELAY_MS 사이 랜덤
    scheduleNext(Math.random() * SLOT_INITIAL_MAX_DELAY_MS);

    return () => {
      cancelled = true;
      if (timerId !== undefined) clearTimeout(timerId);
    };
  }, [slotIndex, requestNext]);

  const cornerColor = `${WL.ink}66`;
  const layerStyle: CSSProperties = {
    position: 'absolute', inset: 0,
    width: '100%', height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'opacity 1.2s ease',
    pointerEvents: 'none',
  };

  return (
    <div
      data-role="gallery-photo"
      data-gallery-index={slotIndex}
      style={{
        position: 'relative', overflow: 'hidden',
        aspectRatio,
        background: WL.paper,
        border: `1px solid ${WL.ink}22`,
      }}
    >
      <img alt="" src={state.layers[0]} style={{ ...layerStyle, opacity: state.active === 0 ? 1 : 0 }} />
      <img alt="" src={state.layers[1]} style={{ ...layerStyle, opacity: state.active === 1 ? 1 : 0 }} />
      {/* 코너 마커 */}
      <div style={{
        position: 'absolute', top: 6, left: 6, width: 8, height: 8,
        borderTop: `1.5px solid ${cornerColor}`, borderLeft: `1.5px solid ${cornerColor}`,
      }} />
      <div style={{
        position: 'absolute', bottom: 6, right: 6, width: 8, height: 8,
        borderBottom: `1.5px solid ${cornerColor}`, borderRight: `1.5px solid ${cornerColor}`,
      }} />
    </div>
  );
}

// 6개 슬롯 — isLarge는 기존 레이아웃 유지(슬롯 0, 3은 1:1.2 비율)
const SLOT_CONFIGS = [
  { isLarge: true  },
  { isLarge: false },
  { isLarge: false },
  { isLarge: true  },
  { isLarge: false },
  { isLarge: false },
];

// 지난 가족 한마당 영상 (YouTube)
const YOUTUBE_URL = 'https://www.youtube.com/watch?v=TlFNdCd3uCY';
const YOUTUBE_LABEL = '지난 하나로 가족 한마당 현장 스케치 보러가기';
// public/icons/ 에 파일 추가 후 경로 입력 (예: '/icons/youtube.svg'). 비워두면 placeholder.
const YOUTUBE_ICON = '/icons/youtube.svg';

/** total 중 count개를 중복 없이 랜덤 뽑기. count > total이면 나머지는 중복 허용. */
function pickUniqueRandom(total: number, count: number): number[] {
  const result: number[] = [];
  const picked = new Set<number>();
  const target = Math.min(count, total);
  while (result.length < target) {
    const i = Math.floor(Math.random() * total);
    if (!picked.has(i)) {
      picked.add(i);
      result.push(i);
    }
  }
  while (result.length < count) {
    result.push(Math.floor(Math.random() * total));
  }
  return result;
}

export const Gallery = memo(function Gallery() {
  // 모든 슬롯이 현재 보여주는 이미지 인덱스. 초기값은 6개 모두 다른 랜덤.
  const [slotImages, setSlotImages] = useState<number[]>(() =>
    pickUniqueRandom(D.gallery.length, SLOT_CONFIGS.length)
  );

  /**
   * 슬롯이 다음 이미지를 요청.
   * 현재 6개 슬롯에서 사용 중이 아닌 인덱스만 후보로 → 동시 중복 표시 방지.
   * (자기 자신의 현재 이미지도 후보에서 제외돼서 직전과 같은 이미지가 다시 뽑히지 않음.)
   */
  const requestNext = useCallback((slotIdx: number) => {
    setSlotImages((prev) => {
      const taken = new Set(prev);
      const available: number[] = [];
      for (let i = 0; i < D.gallery.length; i++) {
        if (!taken.has(i)) available.push(i);
      }
      let next: number;
      if (available.length > 0) {
        next = available[Math.floor(Math.random() * available.length)];
      } else {
        // 폴백: 풀 크기 ≤ 슬롯 수인 경우. 자기 자신만 제외하고 아무거나.
        const others: number[] = [];
        for (let i = 0; i < D.gallery.length; i++) {
          if (i !== prev[slotIdx]) others.push(i);
        }
        if (others.length === 0) return prev;
        next = others[Math.floor(Math.random() * others.length)];
      }
      const newSlots = [...prev];
      newSlots[slotIdx] = next;
      return newSlots;
    });
  }, []);

  return (
    <section data-screen-label="08 Gallery" style={{
      background: WL.paperWarm, padding: '50px 24px 0',
      position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100%'
    }}>
      <Reveal>
        <IssueLabel num={8} label="GALLERY" accent={WL.ink} />
      </Reveal>

      <Reveal delay={0.1}>
        <div style={{ marginTop: 22 }}>
          <HanHead size={50} line={0.95}>하나로</HanHead>
          <HanHead size={50} line={0.95} color={WL.ocean} style={{ fontStyle: 'italic' }}>갤러리.</HanHead>
        </div>
      </Reveal>

      <Reveal delay={0.18}>
        <div style={{
          marginTop: 12, fontFamily: FF.sans, fontSize: 12,
          color: WL.ink, opacity: 0.7, fontWeight: 500
        }}>하나로 가족이 함께 만들어 온 시간들.</div>
      </Reveal>

      <div style={{
        marginTop: 22, display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gridTemplateRows: 'auto auto auto',
        gap: 10
      }}>
        {SLOT_CONFIGS.map((cfg, i) => (
          <Reveal key={i} delay={0.22 + i * 0.05} y={20}>
            <GalleryPhoto
              images={D.gallery}
              imageIndex={slotImages[i]}
              slotIndex={i}
              requestNext={requestNext}
              aspectRatio={cfg.isLarge ? '1 / 1.2' : '1 / 1'}
            />
          </Reveal>
        ))}
      </div>

      {/* 지난 행사 YouTube 영상 CTA */}
      <Reveal delay={0.55} y={16}>
        <a
          href={YOUTUBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginTop: 18,
            padding: '14px 16px',
            background: WL.paper,
            border: `1px solid ${WL.ink}28`,
            color: WL.ink,
            textDecoration: 'none',
            fontFamily: FF.sans,
            fontSize: 13,
            fontWeight: 600,
            transition: 'background 0.2s ease, border-color 0.2s ease',
          }}
        >
          {YOUTUBE_ICON ? (
            <img
              src={YOUTUBE_ICON}
              alt=""
              style={{
                width: 26, height: 26,
                objectFit: 'contain',
                display: 'block',
                flexShrink: 0,
              }}
            />
          ) : (
            <span
              aria-hidden
              style={{
                width: 26, height: 26,
                borderRadius: 4,
                flexShrink: 0,
                border: `1px dashed ${WL.ink}44`,
                background: `${WL.ink}08`,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: FF.bebas,
                fontSize: 8,
                color: `${WL.ink}99`,
                letterSpacing: 1,
              }}
            >
              YT
            </span>
          )}
          <span style={{ flex: 1, lineHeight: 1.35 }}>{YOUTUBE_LABEL}</span>
          <span aria-hidden style={{
            fontSize: 16, opacity: 0.45, flexShrink: 0,
          }}>→</span>
        </a>
      </Reveal>

      <div style={{ height: 50 }} />
      <div style={{ margin: '0 -24px', marginTop: 'auto' }}>
        <MorphingWave color1={WL.ocean} color2={WL.sun} height={90} />
      </div>
    </section>
  );
});
