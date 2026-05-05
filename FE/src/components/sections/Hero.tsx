import { memo } from 'react';
import { D } from '../../data/concept-d';
import { WL, FF } from '../../theme/tokens';
import { Reveal } from '../common/Reveal';
import { HanHead } from '../common/HanHead';
import { MorphingWave } from '../common/MorphingWave';

export const Hero = memo(function Hero() {
  return (
    <section data-screen-label="01 Hero" style={{
      background: WL.paper, position: 'relative', minHeight: '100%',
      padding: '60px 24px 0', display: 'flex', flexDirection: 'column'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontFamily: FF.bebas, fontSize: 14, letterSpacing: 4, color: WL.ink }}>HANARO</div>
        <div style={{ fontFamily: FF.bebas, fontSize: 11, letterSpacing: 2, color: WL.ink, opacity: 0.7 }}>{D.event.issue} · {D.event.year}</div>
      </div>
      <div style={{ height: 1, background: WL.ink, opacity: 0.15, marginTop: 8 }} />

      <div style={{ marginTop: 36 }}>
        <Reveal delay={0.05}>
          <div style={{
            fontFamily: FF.bebas, fontSize: 13, letterSpacing: 3, color: WL.ocean
          }}>2026 · AMEN 17</div>
        </Reveal>
        <Reveal delay={0.15}>
          <HanHead size={68} line={0.95}>하나로</HanHead>
        </Reveal>
        <Reveal delay={0.25}>
          <HanHead size={68} line={0.95} color={WL.ocean} style={{ fontStyle: 'italic' }}>가족</HanHead>
        </Reveal>
        <Reveal delay={0.35}>
          <HanHead size={68} line={0.95}>한마당<span style={{ color: WL.sun }}>.</span></HanHead>
        </Reveal>
      </div>

      <Reveal delay={0.5}>
        <div style={{
          marginTop: 22, fontFamily: FF.serif,
          fontSize: 16, color: WL.ink, fontWeight: 700, lineHeight: 1.5
        }}>
          {D.event.tagline}<br />
          <span style={{ color: WL.ocean, fontStyle: 'italic', fontSize: 14 }}>{D.event.subTagline}</span>
        </div>
      </Reveal>

      <div style={{ flex: 1 }} />

      <Reveal delay={0.7}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0,
          marginBottom: 12, borderTop: `1px solid ${WL.ink}33`, paddingTop: 14
        }}>
          {[
            { k: 'DATE',  v: D.schedule.dateDisplay },
            { k: 'TIME',  v: D.schedule.timeDisplay },
            { k: 'VENUE', v: '김포골드밸리' }
          ].map((m, i) => (
            <div key={i} style={{
              borderLeft: i > 0 ? `1px solid ${WL.ink}22` : 'none',
              paddingLeft: i > 0 ? 10 : 0
            }}>
              <div style={{ fontFamily: FF.bebas, fontSize: 9, letterSpacing: 2, color: WL.ink, opacity: 0.6 }}>{m.k}</div>
              <div style={{
                fontFamily: i === 2 ? FF.sans : FF.bebas,
                fontWeight: i === 2 ? 700 : 400,
                fontSize: i === 2 ? 12 : 14,
                letterSpacing: i === 2 ? 0 : 1,
                color: WL.ink, marginTop: 4
              }}>{m.v}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div style={{ margin: '0 -24px', marginTop: 'auto' }}>
        <MorphingWave color1={WL.ocean} color2={WL.aqua} height={100} />
      </div>
    </section>
  );
});
