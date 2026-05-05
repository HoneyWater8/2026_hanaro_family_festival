import { memo } from 'react';
import { D } from '../../data/concept-d';
import type { FoodSection } from '../../data/types';
import { WL, FF } from '../../theme/tokens';
import { Reveal } from '../common/Reveal';
import { HanHead } from '../common/HanHead';
import { IssueLabel } from '../common/IssueLabel';
import { MorphingWave } from '../common/MorphingWave';
import { Image } from '../common/Image';

type FoodBlockProps = {
  d: FoodSection;
  accent: string;
  blue?: boolean;
};

function FoodBlock({ d, accent, blue = false }: FoodBlockProps) {
  return (
    <div style={{
      background: blue ? WL.ocean : WL.paper,
      color: blue ? WL.paper : WL.ink,
      border: blue ? 'none' : `1px solid ${WL.ink}33`,
      padding: '20px 18px', position: 'relative'
    }}>
      <div style={{
        position: 'absolute', top: -8, left: 14,
        background: accent, color: WL.ink,
        fontFamily: FF.bebas, fontSize: 10, letterSpacing: 2, padding: '3px 8px'
      }}>{d.label}</div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: FF.han, fontSize: 28, color: blue ? WL.paper : WL.ink, letterSpacing: -0.5 }}>
          {d.ko}
        </div>
        <div style={{ fontFamily: FF.bebas, fontSize: 14, color: blue ? WL.aqua : accent, letterSpacing: 2 }}>
          {d.time}
        </div>
      </div>
      <div style={{
        marginTop: 4, fontFamily: FF.sans, fontSize: 11,
        color: blue ? WL.paper : WL.ink, opacity: 0.75
      }}>{d.note}</div>

      <div style={{
        marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px'
      }}>
        {d.items.map((it, j) => (
          <div key={j} style={{
            display: 'flex', flexDirection: 'column', gap: 2,
            padding: '8px 10px',
            background: blue ? `${WL.paper}14` : `${accent}24`,
            border: `1px dashed ${blue ? `${WL.paper}40` : `${accent}88`}`
          }}>
            <Image
              alt={it.name}
              label="IMAGE"
              aspectRatio="4 / 3"
              placeholderColor={blue ? `${WL.paper}90` : `${WL.ink}55`}
              labelStyle={{ fontSize: 9 }}
              containerStyle={{
                background: blue ? `${WL.paper}10` : `${WL.paper}66`,
                border: `1px dashed ${blue ? `${WL.paper}30` : `${WL.ink}22`}`,
              }}
            />
            <div style={{
              fontFamily: FF.sans, fontSize: 12, fontWeight: 700,
              color: blue ? WL.paper : WL.ink, marginTop: 4
            }}>{it.name}</div>
            <div style={{
              fontFamily: FF.sans, fontSize: 10,
              color: blue ? WL.paper : WL.ink, opacity: 0.75
            }}>{it.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const Food = memo(function Food() {
  return (
    <section data-screen-label="06 Food" style={{
      background: WL.aqua, padding: '50px 24px 0',
      position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100%'
    }}>
      <Reveal>
        <IssueLabel num={6} label="FOOD" accent={WL.ink} />
      </Reveal>

      <Reveal delay={0.1}>
        <div style={{ marginTop: 22 }}>
          <HanHead size={50} line={0.95}>든든하게</HanHead>
          <HanHead size={50} line={0.95} color={WL.ocean} style={{ fontStyle: 'italic' }}>먹어요.</HanHead>
        </div>
      </Reveal>

      <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Reveal delay={0.2} y={20}>
          <FoodBlock d={D.foodLunch} accent={WL.sun} />
        </Reveal>
        <Reveal delay={0.32} y={20}>
          <FoodBlock d={D.foodSnack} accent={WL.lime} blue />
        </Reveal>
      </div>

      <div style={{ height: 50 }} />
      <div style={{ margin: '0 -24px', marginTop: 'auto' }}>
        <MorphingWave color1={WL.ocean} color2={WL.sun} height={90} />
      </div>
    </section>
  );
});
