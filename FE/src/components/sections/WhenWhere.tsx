import { memo } from 'react';
import { D } from '../../data/concept-d';
import { WL, FF } from '../../theme/tokens';
import { Reveal } from '../common/Reveal';
import { HanHead } from '../common/HanHead';
import { IssueLabel } from '../common/IssueLabel';
import { MorphingWave } from '../common/MorphingWave';

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
          <div style={{ fontFamily: FF.bebas, fontSize: 22, color: WL.ink, letterSpacing: 1 }}>
            {D.location.nameEn}
          </div>
          <div style={{ fontFamily: FF.serif, fontSize: 16, color: WL.ink, marginTop: 4, fontWeight: 700 }}>
            {D.location.name}
          </div>
          <div style={{ marginTop: 10, fontFamily: FF.sans, fontSize: 12, color: WL.ink, opacity: 0.8, lineHeight: 1.6 }}>
            {D.location.address}<br />
            {D.location.detail}
          </div>
          <div style={{
            marginTop: 12, paddingTop: 10, borderTop: `1px solid ${WL.ink}22`,
            fontFamily: FF.sans, fontSize: 11, color: WL.ink, fontWeight: 700
          }}>
            {D.location.fromChurch} · 셔틀버스 운행
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
