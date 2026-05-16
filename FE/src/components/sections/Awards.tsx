import { memo } from 'react';
import { D } from '../../data/concept-d';
import { WL, FF } from '../../theme/tokens';
import { Reveal } from '../common/Reveal';
import { HanHead } from '../common/HanHead';
import { IssueLabel } from '../common/IssueLabel';
import { MorphingWave } from '../common/MorphingWave';

/**
 * 축복상 섹션.
 * - 1등 상 (전기 자전거): sun shimmer 보더 — 시상대 받침 그래픽으로 강조
 * - 그 외 4종: 2×2 grid, 동일 weight
 */
export const Awards = memo(function Awards() {
  const G = D.blessingAwards.grandPrize;

  return (
    <section data-screen-label="05 Awards" style={{
      background: WL.paperWarm, padding: '50px 24px 0',
      position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100%'
    }}>
      <Reveal>
        <IssueLabel num={5} label="AWARDS" accent={WL.sun} />
      </Reveal>

      <Reveal delay={0.1}>
        <div style={{ marginTop: 22 }}>
          <HanHead size={50} line={0.95}>행운의</HanHead>
          <HanHead size={50} line={0.95} color={WL.ocean} style={{ fontStyle: 'italic' }}>축복상.</HanHead>
        </div>
      </Reveal>

      <Reveal delay={0.18}>
        <div style={{
          marginTop: 12, fontFamily: FF.sans, fontSize: 12,
          color: WL.ink, opacity: 0.7, fontWeight: 500
        }}>{D.blessingAwards.intro}</div>
      </Reveal>

      {/* 1등 상 hero card — sun shimmer 보더 + 카드 전체 스포트라이트 + 시상대 받침 */}
      <Reveal delay={0.25}>
        <div style={{
          position: 'relative',
          marginTop: 28,
          background: `
            linear-gradient(${WL.sun}33, ${WL.sun}33) padding-box,
            linear-gradient(${WL.paper}, ${WL.paper}) padding-box,
            conic-gradient(from var(--benefit-angle, 0deg), #FFE89A, ${WL.sun}, #F59C2E, ${WL.sun}, #FFE89A) border-box
          `,
          border: '2.5px solid transparent',
          borderRadius: 14,
          padding: '16px 16px 18px',
          boxShadow: `0 6px 18px ${WL.sun}66`,
          overflow: 'hidden',
          animation: 'wl-benefit-shimmer 3.5s linear infinite',
        }}>
          {/* 스테이지 스포트라이트 — 카드 상단 약간 아래에서 시작해 아래로 펼쳐지는 흰 빛 cone.
              좌우/하단도 살짝 inset해서 카드 라운드 코너와 자연스럽게 맞물림 */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 10, left: 8, right: 8, bottom: 6,
              clipPath: 'polygon(40% 0%, 60% 0%, 95% 100%, 5% 100%)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.06) 90%, rgba(255,255,255,0) 100%)',
              animation: 'wl-award-spotlight 3.8s ease-in-out infinite',
              transformOrigin: 'top center',
              pointerEvents: 'none',
              filter: 'blur(3px)',
              zIndex: 0,
            }}
          />
          {/* 헤더 — "1등 상" + "GRAND PRIZE" */}
          <div style={{
            position: 'relative', zIndex: 1,
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
            gap: 10, marginBottom: 14,
          }}>
            <span style={{
              fontFamily: FF.han, fontSize: 22, color: WL.ink, letterSpacing: -0.5,
            }}>✨ {G.label}</span>
            <span style={{
              fontFamily: FF.bebas, fontSize: 10, letterSpacing: 2, color: WL.ink, opacity: 0.55,
            }}>{G.labelEn}</span>
          </div>

          {/* 상품 이미지 — 배경 투명. 카드 전체 스포트라이트 위에 떠 있음 */}
          <div style={{
            position: 'relative', zIndex: 1,
            width: '100%',
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 4,
          }}>
            {G.image ? (
              <img src={G.image} alt={G.name} style={{
                maxWidth: '92%', maxHeight: '100%', objectFit: 'contain',
                display: 'block',
              }} />
            ) : (
              <span style={{
                fontFamily: FF.bebas, fontSize: 9, letterSpacing: 1.5, color: `${WL.ink}66`,
              }}>NO IMAGE</span>
            )}
          </div>

          {/* 상품 정보 — 이미지 아래 스택 */}
          <div style={{
            position: 'relative', zIndex: 1,
            display: 'flex', flexDirection: 'column', gap: 4,
            textAlign: 'center', alignItems: 'center',
          }}>
            <div style={{
              fontFamily: FF.sans, fontSize: 20, fontWeight: 800,
              color: WL.ink, lineHeight: 1.2,
            }}>{G.name}</div>
            <div style={{
              fontFamily: FF.sans, fontSize: 13, color: WL.ocean,
              fontWeight: 700,
            }}>{G.value}</div>
            <div style={{
              fontFamily: FF.bebas, fontSize: 11, letterSpacing: 2,
              color: WL.ink, opacity: 0.7, marginTop: 2,
            }}>{G.quantity}</div>
          </div>
        </div>

        {/* 시상대 받침 — 1등 카드 바로 아래 */}
        <div style={{
          margin: '0 auto',
          width: '60%',
          height: 28,
          background: `linear-gradient(180deg, ${WL.sun}, #F59C2E)`,
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
          boxShadow: `0 6px 14px ${WL.ink}33`,
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: FF.bebas, fontSize: 18, letterSpacing: 2,
            color: WL.ink, fontWeight: 700,
          }}>1</div>
        </div>
      </Reveal>

      {/* 그 외 축복상 디바이더 */}
      <Reveal delay={0.3}>
        <div style={{
          marginTop: 32, marginBottom: 14,
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          gap: 10,
          borderTop: `1px solid ${WL.ink}22`,
          paddingTop: 14,
        }}>
          <span style={{
            fontFamily: FF.han, fontSize: 18, color: WL.ink, letterSpacing: -0.5,
          }}>그 외 축복상</span>
          <span style={{
            fontFamily: FF.bebas, fontSize: 9, letterSpacing: 2, color: WL.ink, opacity: 0.55,
          }}>{D.blessingAwards.items.length} GIFTS</span>
        </div>
      </Reveal>

      {/* 2x2 grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
      }}>
        {D.blessingAwards.items.map((it, i) => (
          <Reveal key={i} delay={0.35 + i * 0.06} y={16}>
            <div style={{
              background: WL.paper,
              border: `1px solid ${WL.ink}22`,
              borderRadius: 8,
              padding: 12,
              display: 'flex', flexDirection: 'column', gap: 8,
              height: '100%',
            }}>
              <div style={{
                width: '100%', aspectRatio: '1 / 1',
                background: WL.paperWarm,
                border: `1px solid ${WL.ink}11`,
                borderRadius: 4,
                overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {it.image ? (
                  <img src={it.image} alt={it.name} style={{
                    width: '100%', height: '100%', objectFit: 'cover'
                  }} />
                ) : (
                  <span style={{ fontFamily: FF.bebas, fontSize: 9, letterSpacing: 1.5, color: `${WL.ink}66` }}>NO IMAGE</span>
                )}
              </div>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 6,
                }}>
                  <div style={{
                    fontFamily: FF.sans, fontSize: 13, fontWeight: 700,
                    color: WL.ink, lineHeight: 1.25,
                  }}>{it.name}</div>
                  {it.note && (
                    <div style={{
                      flexShrink: 0,
                      fontFamily: FF.sans, fontSize: 10, color: WL.ink,
                      opacity: 0.55, fontStyle: 'italic',
                    }}>* {it.note}</div>
                  )}
                </div>
                <div style={{
                  marginTop: 2,
                  fontFamily: FF.sans, fontSize: 11, color: WL.ink,
                  opacity: 0.65, fontWeight: 500, lineHeight: 1.35,
                }}>{it.detail}</div>
              </div>
              <div style={{
                marginTop: 'auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: 8,
              }}>
                {it.price ? (
                  <div style={{
                    fontFamily: FF.bebas, fontSize: 12, letterSpacing: 1, color: WL.ocean,
                  }}>{it.price}</div>
                ) : <span />}
                <div style={{
                  flexShrink: 0,
                  fontFamily: FF.bebas, fontSize: 11, letterSpacing: 1.5,
                  color: WL.ink, opacity: 0.7,
                }}>{it.quantity}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div style={{ flex: 1, minHeight: 40 }} />
      <div style={{ margin: '0 -24px', marginTop: 'auto' }}>
        <MorphingWave color1={WL.sun} color2={WL.ocean} height={90} />
      </div>
    </section>
  );
});
