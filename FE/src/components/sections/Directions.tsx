import { memo } from 'react';
import { D } from '../../data/concept-d';
import { WL, FF } from '../../theme/tokens';
import { Reveal } from '../common/Reveal';
import { HanHead } from '../common/HanHead';
import { IssueLabel } from '../common/IssueLabel';
import { MorphingWave } from '../common/MorphingWave';
import { KakaoMap } from '../common/KakaoMap';

// Kakao SDK 로드 전 / 키 미설정 상태에서 보여줄 placeholder.
function MapPlaceholder({ name }: { name: string }) {
  return (
    <>
      <svg viewBox="0 0 300 188" preserveAspectRatio="none" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%'
      }}>
        <defs>
          <pattern id="wl-mapgrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={WL.ink} strokeWidth="0.5" strokeOpacity="0.12"/>
          </pattern>
        </defs>
        <rect width="300" height="188" fill="url(#wl-mapgrid)"/>
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 16px',
      }}>
        <div>
          <div style={{
            fontFamily: FF.bebas, fontSize: 11, letterSpacing: 3,
            color: WL.ocean, marginBottom: 6
          }}>MAP AREA</div>
          <div style={{ fontFamily: FF.han, fontSize: 18, color: WL.ink, letterSpacing: -0.5 }}>
            지도 영역
          </div>
          <div style={{
            marginTop: 4, fontFamily: FF.sans, fontSize: 11,
            color: WL.ink, opacity: 0.55
          }}>{name}</div>
        </div>
      </div>
    </>
  );
}

export const Directions = memo(function Directions() {
  return (
    <section data-screen-label="07 Directions" style={{
      background: WL.ocean, color: WL.paper, padding: '50px 24px 0',
      position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100%'
    }}>
      <Reveal>
        <IssueLabel num={7} label="DIRECTIONS" accent={WL.aqua} />
      </Reveal>

      <Reveal delay={0.1}>
        <div style={{ marginTop: 22 }}>
          <HanHead size={50} line={0.95} color={WL.paper}>오시는</HanHead>
          <HanHead size={50} line={0.95} color={WL.sun} style={{ fontStyle: 'italic' }}>길.</HanHead>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <KakaoMap
          address={D.location.address}
          name={D.location.name}
          coords={D.location.coords}
          level={3}
          fallback={<MapPlaceholder name={D.location.name} />}
          style={{
            marginTop: 22,
            width: '100%', aspectRatio: '16 / 10',
            background: WL.paper,
            border: `1.5px dashed ${WL.aqua}`,
            overflow: 'hidden',
          }}
        />
      </Reveal>

      <Reveal delay={0.32}>
        <div style={{
          marginTop: 18, padding: '14px 16px',
          background: `${WL.sun}18`,
          border: `1.5px solid ${WL.sun}`,
          color: WL.ink, position: 'relative'
        }}>
          <div style={{
            position: 'absolute', top: -8, left: 14,
            background: WL.sun, color: WL.ink,
            fontFamily: FF.bebas, fontSize: 10, letterSpacing: 2, padding: '3px 8px'
          }}>SHUTTLE</div>
          <div style={{ fontFamily: FF.han, fontSize: 22, color: WL.ink, letterSpacing: -0.5 }}>
            {D.shuttle.label}
          </div>
          <div style={{
            marginTop: 6, fontFamily: FF.sans, fontSize: 12.5,
            color: WL.ink, fontWeight: 600
          }}>{D.shuttle.detail}</div>
          <div style={{
            marginTop: 2, fontFamily: FF.sans, fontSize: 11,
            color: WL.ink, opacity: 0.7
          }}>{D.shuttle.sub}</div>
        </div>
      </Reveal>

      <Reveal delay={0.4}>
        <div style={{
          marginTop: 14,
          padding: '14px 16px',
          background: `${WL.paper}12`,
          border: `1px solid ${WL.paper}33`
        }}>
          <div style={{
            fontFamily: FF.bebas, fontSize: 11, letterSpacing: 2,
            color: WL.aqua, marginBottom: 8
          }}>PARKING</div>
          {D.parking.map((p, i) => (
            <div key={i} style={{
              display: 'flex', gap: 10, padding: '8px 0',
              borderTop: i > 0 ? `1px solid ${WL.paper}22` : 'none'
            }}>
              <div style={{
                fontFamily: FF.sans, fontSize: 12, fontWeight: 700,
                color: WL.paper, minWidth: 92
              }}>{p.label}</div>
              <div style={{
                flex: 1, fontFamily: FF.sans, fontSize: 11,
                color: WL.paper, opacity: 0.8, lineHeight: 1.5
              }}>{p.detail}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div style={{ height: 50 }} />
      <div style={{ margin: '0 -24px', marginTop: 'auto' }}>
        <MorphingWave color1={WL.sun} color2={WL.lime} height={90} />
      </div>
    </section>
  );
});
