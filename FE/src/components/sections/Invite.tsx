import { memo } from 'react';
import { D } from '../../data/concept-d';
import { WL, FF } from '../../theme/tokens';
import { Reveal } from '../common/Reveal';
import { HanHead } from '../common/HanHead';
import { IssueLabel } from '../common/IssueLabel';
import { MorphingWave } from '../common/MorphingWave';

export const Invite = memo(function Invite() {
  return (
    <section data-screen-label="02 Invite" style={{
      background: WL.aqua, padding: '50px 24px 0', position: 'relative', minHeight: '100%',
      display: 'flex', flexDirection: 'column'
    }}>
      <Reveal>
        <IssueLabel num={2} label="INVITATION" accent={WL.ink} />
      </Reveal>

      <Reveal delay={0.15}>
        <div style={{ marginTop: 28, position: 'relative' }}>
          <div style={{
            position: 'absolute', top: -20, left: -8,
            fontFamily: FF.bebas, fontSize: 80, color: WL.ocean, lineHeight: 1, opacity: 0.4
          }}>"</div>
          <HanHead size={36} line={1.15} style={{ paddingLeft: 22, whiteSpace: 'pre-line' }}>
            {D.invite.pullQuote}
          </HanHead>
        </div>
      </Reveal>

      <Reveal delay={0.3} y={20}>
        <div style={{
          marginTop: 36, maxWidth: 320,
          borderLeft: `2px solid ${WL.ink}`, paddingLeft: 16
        }}>
          <div style={{ fontFamily: FF.bebas, fontSize: 11, letterSpacing: 2, color: WL.ink, opacity: 0.6, marginBottom: 10 }}>
            {D.invite.greeting}
          </div>
          <div style={{ fontFamily: FF.sans, fontSize: 13.5, color: WL.ink, lineHeight: 1.75, fontWeight: 500 }}>
            {D.invite.body.map((line, i) => (
              <div key={i} style={{ minHeight: line === '' ? 10 : 'auto' }}>{line}</div>
            ))}
          </div>
          <div style={{ marginTop: 18, fontFamily: FF.bebas, fontSize: 10, letterSpacing: 2, color: WL.ocean }}>
            — {D.invite.signature}
          </div>
        </div>
      </Reveal>

      <div style={{ height: 60 }} />
      <div style={{ margin: '0 -24px', marginTop: 'auto' }}>
        <MorphingWave color1={WL.lime} color2={WL.sun} height={90} />
      </div>
    </section>
  );
});
