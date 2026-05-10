import { memo, useEffect, useState } from 'react';
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
  aspectRatio: string;
  /** 첫 회전 시작 전 지연 (ms) — 슬롯 간 stagger 용 */
  delay: number;
  /** 회전 간격 (ms) */
  intervalMs?: number;
  /** 슬롯 인덱스 (data 속성용) */
  index: number;
};

/** 한 슬롯 — 21개 이미지 풀에서 랜덤으로 크로스페이드 회전. */
function GalleryPhoto({ images, aspectRatio, delay, intervalMs = 5500, index }: GalleryPhotoProps) {
  const [state, setState] = useState<SlotState>(() => {
    const start = images.length > 0 ? Math.floor(Math.random() * images.length) : 0;
    const src = images[start] ?? '';
    return { layers: [src, src], active: 0 };
  });

  useEffect(() => {
    if (images.length < 2) return;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const startTimer = setTimeout(() => {
      intervalId = setInterval(() => {
        setState((prev) => {
          const inactiveIdx: 0 | 1 = prev.active === 0 ? 1 : 0;
          const currentSrc = prev.layers[prev.active];
          const currentImgIdx = images.indexOf(currentSrc);
          // 현재 이미지와 다른 랜덤 인덱스 선택
          let nextImgIdx = Math.floor(Math.random() * images.length);
          while (nextImgIdx === currentImgIdx) {
            nextImgIdx = Math.floor(Math.random() * images.length);
          }
          const newLayers: [string, string] = [prev.layers[0], prev.layers[1]];
          newLayers[inactiveIdx] = images[nextImgIdx];
          return { layers: newLayers, active: inactiveIdx };
        });
      }, intervalMs);
    }, delay);
    return () => {
      clearTimeout(startTimer);
      if (intervalId !== undefined) clearInterval(intervalId);
    };
  }, [delay, intervalMs, images]);

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
      data-gallery-index={index}
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
  { isLarge: true,  delay: 200 },
  { isLarge: false, delay: 1100 },
  { isLarge: false, delay: 2000 },
  { isLarge: true,  delay: 2900 },
  { isLarge: false, delay: 3800 },
  { isLarge: false, delay: 4700 },
];

// 지난 가족 한마당 영상 (YouTube)
const YOUTUBE_URL = 'https://www.youtube.com/watch?v=TlFNdCd3uCY';
const YOUTUBE_LABEL = '지난 하나로 가족 한마당 현장 스케치 보러가기';
// public/icons/ 에 파일 추가 후 경로 입력 (예: '/icons/youtube.svg'). 비워두면 placeholder.
const YOUTUBE_ICON = '/icons/youtube.svg';

export const Gallery = memo(function Gallery() {
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
              index={i}
              aspectRatio={cfg.isLarge ? '1 / 1.2' : '1 / 1'}
              delay={cfg.delay}
              intervalMs={5500}
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
