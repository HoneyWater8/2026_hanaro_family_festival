import { memo } from 'react';
import { D } from '../../data/concept-d';
import { WL, FF } from '../../theme/tokens';
import { Reveal } from '../common/Reveal';
import { HanHead } from '../common/HanHead';
import { IssueLabel } from '../common/IssueLabel';
import { MorphingWave } from '../common/MorphingWave';

// 등수별 강조 색 — 1~3등은 메달 톤, 4~6등은 잉크 톤.
const RANK_COLORS = [WL.sun, WL.ocean, WL.dusk, WL.ink, WL.ink, WL.ink];

export const KidsStampRewards = memo(function KidsStampRewards() {
  const K = D.kidsStampRewards;

  return (
    <section data-screen-label="06 Kids Prizes" style={{
      background: WL.paper, padding: '50px 24px 0',
      position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100%'
    }}>
      <Reveal>
        <IssueLabel num={6} label={K.labelEn} accent={WL.ocean} />
      </Reveal>

      <Reveal delay={0.1}>
        <div style={{ marginTop: 22 }}>
          <HanHead size={50} line={0.95}>유·초등부</HanHead>
          <HanHead size={50} line={0.95} color={WL.ocean} style={{ fontStyle: 'italic' }}>스탬프 상품.</HanHead>
        </div>
      </Reveal>

      {/* 대상 / 규칙 / 주의사항 안내 박스 */}
      <Reveal delay={0.18}>
        <div style={{
          marginTop: 22,
          background: WL.paperWarm,
          border: `1px solid ${WL.ink}1a`,
          borderRadius: 8,
          padding: '14px 14px 12px',
        }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 8,
            paddingBottom: 8, borderBottom: `1px solid ${WL.ink}1a`,
          }}>
            <span style={{
              fontFamily: FF.bebas, fontSize: 10, letterSpacing: 2,
              color: WL.ocean,
            }}>TARGET</span>
            <span style={{
              fontFamily: FF.sans, fontSize: 13, fontWeight: 700, color: WL.ink,
            }}>{K.target}</span>
          </div>

          <ul style={{
            margin: 0, padding: '10px 0 0 0', listStyle: 'none',
            display: 'flex', flexDirection: 'column', gap: 6,
          }}>
            {K.rules.map((rule, i) => (
              <li key={i} style={{
                fontFamily: FF.sans, fontSize: 12.5, lineHeight: 1.55,
                color: WL.ink, opacity: 0.85,
                paddingLeft: 14, position: 'relative',
              }}>
                <span style={{
                  position: 'absolute', left: 2, top: 8,
                  width: 4, height: 4, borderRadius: '50%',
                  background: WL.ocean,
                }} />
                {rule}
              </li>
            ))}
          </ul>

          <div style={{
            marginTop: 10, paddingTop: 8, borderTop: `1px dashed ${WL.ink}22`,
            fontFamily: FF.sans, fontSize: 11.5, color: WL.ink,
            opacity: 0.7, fontStyle: 'italic', lineHeight: 1.5,
          }}>{K.caveat}</div>
        </div>
      </Reveal>

      {/* 등수 리스트 헤더 */}
      <Reveal delay={0.26}>
        <div style={{
          marginTop: 28, marginBottom: 12,
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          gap: 10,
        }}>
          <span style={{
            fontFamily: FF.han, fontSize: 18, color: WL.ink, letterSpacing: -0.5,
          }}>등수별 상품</span>
          <span style={{
            fontFamily: FF.bebas, fontSize: 9, letterSpacing: 2, color: WL.ink, opacity: 0.55,
          }}>{K.tiers.length} TIERS · {K.tiers.reduce((s, t) => s + parseInt(t.winnerCount, 10), 0)} WINNERS</span>
        </div>
      </Reveal>

      {/* 6 tier 카드 리스트 */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        {K.tiers.map((tier, i) => {
          const c = RANK_COLORS[i];
          const isMedal = i < 3;
          return (
            <Reveal key={i} delay={0.32 + i * 0.05} y={16}>
              <div style={{
                background: WL.paper,
                border: `1.5px solid ${isMedal ? c : `${WL.ink}22`}`,
                borderRadius: 8,
                padding: 12,
                display: 'flex', gap: 12, alignItems: 'stretch',
                boxShadow: isMedal ? `0 3px 12px ${c}33` : `0 1px 4px ${WL.ink}10`,
              }}>
                {/* 등수 배지 — 왼쪽 */}
                <div style={{
                  flex: '0 0 auto',
                  width: 60,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  background: isMedal ? `${c}22` : `${WL.ink}06`,
                  border: `1px solid ${isMedal ? `${c}55` : `${WL.ink}15`}`,
                  borderRadius: 6,
                  padding: '8px 4px',
                }}>
                  <span style={{
                    fontFamily: FF.han, fontSize: 22, lineHeight: 1,
                    color: isMedal ? c : WL.ink, letterSpacing: -0.5,
                    fontWeight: 800,
                  }}>{tier.rank}</span>
                  <span style={{
                    marginTop: 4,
                    fontFamily: FF.bebas, fontSize: 9, letterSpacing: 1.5,
                    color: WL.ink, opacity: 0.55,
                  }}>{tier.rankEn}</span>
                  <span style={{
                    marginTop: 6, paddingTop: 5,
                    borderTop: `1px solid ${WL.ink}22`,
                    width: '80%', textAlign: 'center',
                    fontFamily: FF.sans, fontSize: 11, fontWeight: 700,
                    color: WL.ink, opacity: 0.75,
                  }}>{tier.winnerCount}</span>
                </div>

                {/* 상품 항목 — 오른쪽 */}
                <div style={{
                  flex: 1, display: 'flex', flexDirection: 'column', gap: 8,
                  justifyContent: 'center',
                }}>
                  {tier.items.map((item, j) => (
                    <div key={j} style={{
                      display: 'flex', gap: 10, alignItems: 'center',
                    }}>
                      <div style={{
                        flex: '0 0 auto',
                        width: 56, height: 56,
                        background: WL.paperWarm,
                        border: `1px solid ${WL.ink}11`,
                        borderRadius: 4,
                        overflow: 'hidden',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {item.image ? (
                          <img src={item.image} alt={item.name} style={{
                            width: '100%', height: '100%', objectFit: 'cover',
                          }} />
                        ) : (
                          <span style={{
                            fontFamily: FF.bebas, fontSize: 8, letterSpacing: 1.5,
                            color: `${WL.ink}66`,
                          }}>N/A</span>
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontFamily: FF.sans, fontSize: 13.5, fontWeight: 700,
                          color: WL.ink, lineHeight: 1.25,
                        }}>{item.name}</div>
                        {item.quantity && (
                          <div style={{
                            marginTop: 3,
                            fontFamily: FF.bebas, fontSize: 11, letterSpacing: 1.2,
                            color: isMedal ? c : WL.ocean,
                            fontWeight: 600,
                          }}>{item.quantity}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div style={{ flex: 1, minHeight: 40 }} />
      <div style={{ margin: '0 -24px', marginTop: 'auto' }}>
        <MorphingWave color1={WL.ocean} color2={WL.aqua} height={90} />
      </div>
    </section>
  );
});
