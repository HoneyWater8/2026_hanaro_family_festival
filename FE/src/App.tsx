/* ─────────────────────────────────────────────────────────
   2026 하나로 가족 한마당 · Wave Layers 초대장
   아멘 17기 · 9 섹션 (한글 헤드라인 + 영문 메타)
   ───────────────────────────────────────────────────────── */

import { useRef } from 'react';
import { WL } from './theme/tokens';
import { ScrollContext, useScrollTracker } from './hooks/useScrollTracker';
import { ResponsiveDevice } from './components/common/ResponsiveDevice';
import { ProgressRail } from './components/common/ProgressRail';
import { TimelineSun } from './components/common/TimelineSun';
import { ShareFAB } from './components/common/ShareFAB';
import { PullToRefresh } from './components/common/PullToRefresh';
import { Hero } from './components/sections/Hero';
import { Invite } from './components/sections/Invite';
import { WhenWhere } from './components/sections/WhenWhere';
import { Timeline } from './components/sections/Timeline';
import { Awards } from './components/sections/Awards';
import { KidsStampRewards } from './components/sections/KidsStampRewards';
import { Program } from './components/sections/Program';
import { Food } from './components/sections/Food';
import { Directions } from './components/sections/Directions';
import { Gallery } from './components/sections/Gallery';
import { RSVP } from './components/sections/RSVP';

export default function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { progress, contextValue } = useScrollTracker(scrollRef);

  return (
    <ScrollContext.Provider value={contextValue}>
      <ResponsiveDevice>
        <div style={{ position: 'relative', height: '100%', width: '100%', background: WL.paper }}>
          <div
            ref={scrollRef}
            data-scroll-root
            className="no-scrollbar"
            style={{
              height: '100%', width: '100%',
              overflowY: 'auto', overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch'
            }}>
            <Hero />
            <Invite />
            <WhenWhere />
            <Timeline />
            <Awards />
            <KidsStampRewards />
            <Program />
            <Food />
            <Gallery />
            <Directions />
            <RSVP />
          </div>
          <TimelineSun />
          <ProgressRail progress={progress} />
          <ShareFAB />
          <PullToRefresh scrollRef={scrollRef} />
        </div>
      </ResponsiveDevice>
    </ScrollContext.Provider>
  );
}
