import { memo, useState } from 'react';
import { D } from '../../data/concept-d';
import { WL, FF } from '../../theme/tokens';
import { Reveal } from '../common/Reveal';
import { HanHead } from '../common/HanHead';
import { IssueLabel } from '../common/IssueLabel';

type RsvpStatus = 'yes' | 'done' | null;

export const RSVP = memo(function RSVP() {
  const [status, setStatus] = useState<RsvpStatus>(null);
  const [people, setPeople] = useState(2);
  const [name, setName] = useState('');
  const [noBlink, setNoBlink] = useState(false);

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
          <HanHead size={56} line={0.95} color={WL.ocean} style={{ fontStyle: 'italic' }}>해요.</HanHead>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div style={{
          marginTop: 14, fontFamily: FF.serif, fontSize: 14,
          color: WL.ink, lineHeight: 1.6, fontWeight: 700
        }}>
          준비에 도움이 되도록<br />
          참석 여부를 알려주세요.
        </div>
      </Reveal>

      <div style={{ flex: 1, minHeight: 16 }} />

      {status === 'done' ? (
        <Reveal>
          <div style={{
            background: `${WL.aqua}30`,
            border: `2px solid ${WL.ocean}`,
            color: WL.ink, padding: '28px 22px', position: 'relative'
          }}>
            <div style={{
              position: 'absolute', top: -8, left: 18,
              background: WL.ocean, color: WL.paper,
              fontFamily: FF.bebas, fontSize: 10, padding: '3px 8px', letterSpacing: 2
            }}>CONFIRMED</div>
            <div style={{ fontFamily: FF.han, fontSize: 32, color: WL.ocean, letterSpacing: -0.5 }}>
              감사합니다.
            </div>
            <div style={{
              marginTop: 10, fontFamily: FF.sans, fontSize: 13,
              color: WL.ink, lineHeight: 1.6
            }}>
              <strong>{name}</strong>님 외 {people - 1}명 — 참석 확정.<br />
              {D.schedule.date} 김포골드밸리에서 만나요.
            </div>
          </div>
        </Reveal>
      ) : status === 'yes' ? (
        <div>
          <Reveal>
            <div style={{
              fontFamily: FF.bebas, fontSize: 11, letterSpacing: 2,
              color: WL.ink, marginBottom: 6
            }}>① NAME · 성함</div>
            <input value={name} onChange={e => setName(e.target.value)}
              placeholder="홍길동"
              style={{
                width: '100%', background: 'transparent', border: 'none',
                borderBottom: `2px solid ${WL.ink}`, padding: '10px 0',
                fontSize: 18, color: WL.ink, fontFamily: FF.sans, fontWeight: 700, outline: 'none'
              }}/>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{
              marginTop: 20, fontFamily: FF.bebas, fontSize: 11, letterSpacing: 2,
              color: WL.ink, marginBottom: 6
            }}>② PEOPLE · 인원</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <button onClick={() => setPeople(Math.max(1, people - 1))} style={{
                width: 44, height: 44, background: 'transparent',
                border: `2px solid ${WL.ink}`, color: WL.ink,
                fontSize: 20, fontFamily: FF.bebas, cursor: 'pointer'
              }}>−</button>
              <div style={{
                flex: 1, textAlign: 'center', fontFamily: FF.bebas,
                fontSize: 40, color: WL.ink, letterSpacing: -1
              }}>{people}</div>
              <button onClick={() => setPeople(people + 1)} style={{
                width: 44, height: 44, background: WL.ocean,
                border: `2px solid ${WL.ocean}`, color: WL.paper,
                fontSize: 20, fontFamily: FF.bebas, cursor: 'pointer'
              }}>+</button>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <button onClick={() => setStatus('done')} disabled={!name}
              style={{
                marginTop: 24, width: '100%', padding: '18px',
                background: WL.ocean, color: WL.paper, border: 'none',
                cursor: name ? 'pointer' : 'not-allowed',
                fontFamily: FF.bebas, fontSize: 18, letterSpacing: 3,
                opacity: name ? 1 : 0.5,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
              <span>SUBMIT · 제출</span><span>→</span>
            </button>
          </Reveal>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={() => setStatus('yes')} style={{
            background: WL.ink, color: WL.sun, border: 'none', padding: '20px',
            cursor: 'pointer', fontFamily: FF.bebas, fontSize: 18, letterSpacing: 3,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <span>YES · 참석합니다</span><span>→</span>
          </button>
          <button
            onClick={() => {
              if (noBlink) return;
              setNoBlink(true);
              setTimeout(() => setNoBlink(false), 2000);
            }}
            style={{
              background: noBlink ? WL.ink : 'transparent',
              color: noBlink ? WL.sun : WL.ink,
              border: `2px solid ${WL.ink}`, padding: '16px', cursor: 'pointer',
              fontFamily: FF.bebas, fontSize: 14, letterSpacing: 2,
              transition: 'all 0.25s ease'
            }}>
            <span key={noBlink ? 'no' : 'def'} style={{
              display: 'inline-block', animation: 'wl-flip 0.35s ease-out'
            }}>
              {noBlink ? "꼭 와주세요!" : "NO · 어렵습니다"}
            </span>
          </button>
        </div>
      )}

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
