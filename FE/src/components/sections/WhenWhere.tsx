import { memo } from 'react';
import { D } from '../../data/concept-d';
import { WL, FF } from '../../theme/tokens';
import { Reveal } from '../common/Reveal';
import { HanHead } from '../common/HanHead';
import { IssueLabel } from '../common/IssueLabel';
import { MorphingWave } from '../common/MorphingWave';
import { MiniCalendar } from '../common/MiniCalendar';
import { CopyButton } from '../common/CopyButton';
import {
  kakaoMapUrl,
  naverMapUrl,
  tmapUrl,
  isWebUrl,
  type LocationInfo,
} from '../../utils/mapLinks';

// "2026.06.03" → [2026, 6, 3]. month는 1-indexed로 들어와서 MiniCalendar에 넘길 땐 -1.
const [SCHEDULE_YEAR, SCHEDULE_MONTH, SCHEDULE_DAY] =
  D.schedule.date.split('.').map(Number);

/**
 * 지도/내비 앱 바로가기 정의.
 * `icon` 필드를 채우면 아이콘 이미지가 placeholder 자리에 자동 표시됨.
 * 1. public/icons/ 폴더에 SVG/PNG 파일 추가
 * 2. 아래 주석을 해제해 경로 지정
 */
const MAP_LINKS: Array<{
  label: string;
  icon?: string;
  getUrl: (loc: LocationInfo) => string;
}> = [
  { label: '카카오맵',   getUrl: kakaoMapUrl, icon: '/icons/kakaomap.svg' },
  { label: '네이버지도', getUrl: naverMapUrl, icon: '/icons/navermap.png' },
  { label: 'T맵',         getUrl: tmapUrl,     icon: '/icons/tmap.svg' },
];

export const WhenWhere = memo(function WhenWhere() {
  return (
    <section data-screen-label="03 When Where" style={{
      background: WL.lime, padding: '50px 24px 0', position: 'relative', minHeight: '100%',
      display: 'flex', flexDirection: 'column'
    }}>
      <Reveal>
        <IssueLabel num={3} label="WHEN · WHERE" accent={WL.ink} />
      </Reveal>

      <Reveal delay={0.1}>
        <div style={{ marginTop: 24 }}>
          <HanHead size={50} line={0.95}>달력에</HanHead>
          <HanHead size={50} line={0.95} color={WL.ocean} style={{ fontStyle: 'italic' }}>표시해주세요</HanHead>
        </div>
      </Reveal>

      <Reveal delay={0.3} y={30}>
        <div style={{
          marginTop: 28, padding: '20px 18px',
          background: WL.paper, border: `1px solid ${WL.ink}33`, position: 'relative'
        }}>
          <div style={{
            position: 'absolute', top: -8, left: 14,
            background: WL.sun, color: WL.ink,
            fontFamily: FF.bebas, fontSize: 10, letterSpacing: 2, padding: '3px 8px'
          }}>DATE</div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: FF.bebas, fontSize: 56, lineHeight: 1, color: WL.ink, letterSpacing: -1 }}>
              {D.schedule.dateDisplay}
            </div>
            <div style={{ fontFamily: FF.bebas, fontSize: 14, color: WL.ocean, letterSpacing: 2 }}>
              {D.schedule.day}
            </div>
          </div>
          <div style={{ marginTop: 8, fontFamily: FF.sans, fontSize: 13, color: WL.ink, fontWeight: 600 }}>
            {D.schedule.timeDisplay} · {D.schedule.dayKo}
          </div>

          {/* 미니 달력 — 행사 날짜 시각화 */}
          <div style={{
            marginTop: 16, paddingTop: 14,
            borderTop: `1px solid ${WL.ink}1a`,
          }}>
            <MiniCalendar
              year={SCHEDULE_YEAR}
              month={SCHEDULE_MONTH - 1}
              highlightDay={SCHEDULE_DAY}
            />
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.45} y={30}>
        <div style={{
          marginTop: 18, padding: '20px 18px',
          background: `${WL.ocean}10`,
          border: `1.5px solid ${WL.ocean}`,
          color: WL.ink, position: 'relative'
        }}>
          <div style={{
            position: 'absolute', top: -8, left: 14,
            background: WL.ocean, color: WL.paper,
            fontFamily: FF.bebas, fontSize: 10, letterSpacing: 2, padding: '3px 8px'
          }}>VENUE</div>
          <div style={{ fontFamily: FF.serif, fontSize: 16, color: WL.ink, marginTop: 4, fontWeight: 700 }}>
            {D.location.name}
          </div>
          <div style={{ marginTop: 10, fontFamily: FF.sans, fontSize: 12, color: WL.ink, opacity: 0.8, lineHeight: 1.6 }}>
            {D.location.address}
            <CopyButton text={D.location.address} />
            <br />
            {D.location.detail}
          </div>
          <div style={{
            marginTop: 12, paddingTop: 10, borderTop: `1px solid ${WL.ink}22`,
            fontFamily: FF.sans, fontSize: 11, color: WL.ink, fontWeight: 700
          }}>
            {D.location.fromChurch} · 셔틀버스 운행 (09시 부터 10분 간격)
          </div>

          {/* 외부 지도/내비 앱 바로가기 */}
          <div style={{
            marginTop: 14, paddingTop: 12,
            borderTop: `1px solid ${WL.ocean}33`,
          }}>
            <div style={{
              fontFamily: FF.bebas, fontSize: 10, letterSpacing: 2.5,
              color: WL.ocean, opacity: 0.9, marginBottom: 8,
            }}>
              NAVIGATION
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
            }}>
              {MAP_LINKS.map((link) => {
                const url = link.getUrl(D.location);
                const web = isWebUrl(url);
                return (
                  <a
                    key={link.label}
                    href={url}
                    target={web ? '_blank' : undefined}
                    rel={web ? 'noopener noreferrer' : undefined}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      padding: '12px 6px',
                      background: WL.paper,
                      border: `1px solid ${WL.ocean}55`,
                      color: WL.ink,
                      textDecoration: 'none',
                      fontFamily: FF.sans,
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: 0.2,
                    }}
                  >
                    {link.icon ? (
                      <img
                        src={link.icon}
                        alt=""
                        style={{
                          width: 28,
                          height: 28,
                          objectFit: 'contain',
                          display: 'block',
                        }}
                      />
                    ) : (
                      <span
                        aria-hidden
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 5,
                          border: `1px dashed ${WL.ocean}66`,
                          background: `${WL.ocean}10`,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: FF.bebas,
                          fontSize: 8,
                          color: `${WL.ocean}99`,
                          letterSpacing: 1,
                        }}
                      >
                        ICN
                      </span>
                    )}
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>

      <div style={{ height: 60 }} />
      <div style={{ margin: '0 -24px', marginTop: 'auto' }}>
        <MorphingWave color1={WL.ocean} color2={WL.aqua} height={90} />
      </div>
    </section>
  );
});
