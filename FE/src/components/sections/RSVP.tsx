import { memo } from 'react';
import { D } from '../../data/concept-d';
import { WL, FF } from '../../theme/tokens';
import { Reveal } from '../common/Reveal';
import { HanHead } from '../common/HanHead';
import { IssueLabel } from '../common/IssueLabel';
import { CheerBoard } from '../common/CheerBoard';

export const RSVP = memo(function RSVP() {
  return (
    <section data-screen-label="10 RSVP" style={{
      background: WL.sun, color: WL.ink, padding: '50px 24px 40px',
      position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100%'
    }}>
      <Reveal>
        <IssueLabel num={10} label="RSVP" accent={WL.ink} />
      </Reveal>

      <Reveal delay={0.1}>
        <div style={{ marginTop: 22 }}>
          <HanHead size={56} line={0.95}>함께</HanHead>
          <HanHead size={56} line={0.95} color={WL.ocean} style={{ fontStyle: 'italic' }}>응원해요.</HanHead>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div style={{
          marginTop: 14, fontFamily: FF.serif, fontSize: 14,
          color: WL.ink, lineHeight: 1.6, fontWeight: 700
        }}>
          준비하는 분들에게<br />
          따뜻한 마음을 전해주세요.
        </div>
      </Reveal>

      <div style={{ flex: 1, minHeight: 28 }} />

      <Reveal delay={0.3}>
        <CheerBoard />
      </Reveal>

      <div style={{
        marginTop: 28, paddingTop: 14, borderTop: `1px solid ${WL.ink}33`,
        fontFamily: FF.bebas, fontSize: 9, letterSpacing: 3,
        color: WL.ink, opacity: 0.4, textAlign: 'center'
      }}>
        © HANARO FAMILY FESTIVAL · {D.event.year} · AMEN 17
      </div>
      <div style={{
        marginTop: 6,
        fontFamily: FF.bebas, fontSize: 9, letterSpacing: 3,
        color: WL.ink, opacity: 0.4, textAlign: 'center'
      }}>
        DESIGNED &amp; DEVELOPED BY HONEYWATER
      </div>
    </section>
  );
});
