import { memo } from 'react';
import { D } from '../../data/concept-d';
import { WL, FF } from '../../theme/tokens';
import { Reveal } from '../common/Reveal';
import { HanHead } from '../common/HanHead';
import { IssueLabel } from '../common/IssueLabel';
import { CheerBoard } from '../common/CheerBoard';

export const RSVP = memo(function RSVP() {
  return (
    <section data-screen-label="09 RSVP" style={{
      background: WL.sun, color: WL.ink, padding: '50px 24px 60px',
      position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100%'
    }}>
      <Reveal>
        <IssueLabel num={9} label="RSVP" accent={WL.ink} />
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
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
        fontFamily: FF.mono, fontSize: 10, color: WL.ink, opacity: 0.65
      }}>
        <div>TEL · {D.contact.phone}</div>
        <div style={{ textAlign: 'right' }}>KAKAO · {D.contact.kakao}</div>
      </div>

      <div style={{
        marginTop: 14, fontFamily: FF.bebas, fontSize: 9, letterSpacing: 3,
        color: WL.ink, opacity: 0.4, textAlign: 'center'
      }}>
        © HANARO FAMILY DAY · {D.event.year} · AMEN 17
      </div>
    </section>
  );
});
