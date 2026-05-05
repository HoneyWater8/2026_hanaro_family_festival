import { memo } from 'react';
import { D } from '../../data/concept-d';
import { WL, FF } from '../../theme/tokens';
import { Reveal } from '../common/Reveal';
import { HanHead } from '../common/HanHead';
import { IssueLabel } from '../common/IssueLabel';
import { MorphingWave } from '../common/MorphingWave';
import { Image } from '../common/Image';

export const Gallery = memo(function Gallery() {
  return (
    <section data-screen-label="08 Gallery" style={{
      background: WL.paperWarm, padding: '50px 24px 0',
      position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100%'
    }}>
      <Reveal>
        <IssueLabel num={8} label="ARCHIVE" accent={WL.ink} />
      </Reveal>

      <Reveal delay={0.1}>
        <div style={{ marginTop: 22 }}>
          <HanHead size={50} line={0.95}>지난</HanHead>
          <HanHead size={50} line={0.95} color={WL.ocean} style={{ fontStyle: 'italic' }}>추억.</HanHead>
        </div>
      </Reveal>

      <Reveal delay={0.18}>
        <div style={{
          marginTop: 12, fontFamily: FF.sans, fontSize: 12,
          color: WL.ink, opacity: 0.7, fontWeight: 500
        }}>하나로 가족이 함께 만들어 온 시간들.</div>
      </Reveal>

      <div style={{
        marginTop: 22, display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gridTemplateRows: 'auto auto auto',
        gap: 10
      }}>
        {D.gallery.map((g, i) => {
          const isLarge = i === 0 || i === 3;
          return (
            <Reveal key={i} delay={0.22 + i * 0.05} y={20}>
              <Image
                alt={g.caption}
                label="PHOTO"
                caption={g.caption}
                aspectRatio={isLarge ? '1 / 1.2' : '1 / 1'}
                placeholderColor={`${WL.ink}55`}
                containerStyle={{
                  background: WL.paper,
                  border: `1px dashed ${WL.ink}55`,
                }}
                containerProps={{
                  'data-role': 'gallery-photo',
                  'data-gallery-index': i,
                }}
              >
                {/* 코너 마커 */}
                <div style={{
                  position: 'absolute', top: 6, left: 6, width: 8, height: 8,
                  borderTop: `1.5px solid ${WL.ink}66`, borderLeft: `1.5px solid ${WL.ink}66`
                }} />
                <div style={{
                  position: 'absolute', bottom: 6, right: 6, width: 8, height: 8,
                  borderBottom: `1.5px solid ${WL.ink}66`, borderRight: `1.5px solid ${WL.ink}66`
                }} />
              </Image>
            </Reveal>
          );
        })}
      </div>

      <div style={{ height: 50 }} />
      <div style={{ margin: '0 -24px', marginTop: 'auto' }}>
        <MorphingWave color1={WL.ocean} color2={WL.sun} height={90} />
      </div>
    </section>
  );
});
