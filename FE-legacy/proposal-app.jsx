/* ─────────────────────────────────────────────────────────
   proposal-app.jsx — 세로 스크롤 제안서
   ───────────────────────────────────────────────────────── */

const { useState, useEffect, useRef } = React;

function Cover() {
  const { project } = window.PROPOSAL;
  return (
    <section style={{
      minHeight: '100vh', padding: '80px 48px 60px', display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between', background: '#FAFAF7', position: 'relative', overflow: 'hidden'
    }}>
      {/* 배경 장식 */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, #FDE3DC 0%, transparent 70%)', opacity: 0.8 }} />
      <div style={{ position: 'absolute', bottom: -150, left: -150, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, #B8DEE8 0%, transparent 70%)', opacity: 0.5 }} />

      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Badge>DESIGN PROPOSAL</Badge>
        <div style={{ fontSize: 11, color: '#6B7280', fontFamily: 'ui-monospace, monospace' }}>{project.version} · {project.date}</div>
      </div>

      <div style={{ position: 'relative' }}>
        <div style={{ fontSize: 11, color: '#6B7280', letterSpacing: 2, marginBottom: 16, fontWeight: 600 }}>FOR · {project.client}</div>
        <h1 style={{ fontFamily: 'Gowun Batang, serif', fontSize: 96, color: '#111827', lineHeight: 0.95, margin: 0, fontWeight: 700, letterSpacing: -2 }}>
          {project.name}
        </h1>
        <div style={{ fontSize: 20, color: '#4B5563', marginTop: 20, fontWeight: 500 }}>
          {project.subtitle}
        </div>
        <div style={{ fontSize: 14, color: '#6B7280', marginTop: 40, maxWidth: 520, lineHeight: 1.7 }}>
          모바일 초대장 디자인의 네 가지 방향을 제안합니다. 컬러 팔레트·타이포·와이어프레임·인터랙션을 비교하고,
          가장 마음에 드는 방향을 선택해 주세요. 선택된 방향으로 고충실도 시안을 이어서 제작합니다.
        </div>
      </div>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: '#6B7280' }}>
        <div style={{ width: 40, height: 1, background: '#9CA3AF' }} />
        스크롤하여 읽어보세요
        <span style={{ fontSize: 14 }}>↓</span>
      </div>
    </section>
  );
}

function BriefSection() {
  const { brief, keywords, sections } = window.PROPOSAL;
  return (
    <section style={{ padding: '96px 48px', background: '#fff' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <SectionLabel num={1} title="PROJECT BRIEF" right="프로젝트 개요" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginTop: 8 }}>
          <div>
            <div style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 8, fontWeight: 600 }}>목표</div>
            <div style={{ fontFamily: 'Gowun Batang, serif', fontSize: 26, color: '#111827', lineHeight: 1.3, fontWeight: 700 }}>
              {brief.goal.join(' · ')}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 8, fontWeight: 600 }}>대상</div>
            <div style={{ fontFamily: 'Gowun Batang, serif', fontSize: 26, color: '#111827', lineHeight: 1.3, fontWeight: 700 }}>
              {brief.audience}
            </div>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <div style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 8, fontWeight: 600 }}>성공 지표</div>
            <div style={{ fontFamily: 'Gowun Batang, serif', fontSize: 22, color: '#111827', lineHeight: 1.5, fontWeight: 600, maxWidth: 800 }}>
              "{brief.success}"
            </div>
          </div>
        </div>

        <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <div>
            <div style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 16, fontWeight: 600 }}>KEYWORDS</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {keywords.map((k, i) => (
                <span key={i} style={{
                  fontSize: 13, color: '#111827', fontWeight: 600,
                  padding: '8px 14px', background: '#F3F4F6', borderRadius: 999
                }}>{k}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 16, fontWeight: 600 }}>SECTIONS (공통 정보 구조)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {sections.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'ui-monospace, monospace', minWidth: 20 }}>{String(i+1).padStart(2, '0')}</span>
                  <span style={{ fontSize: 13, color: '#374151' }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MoodboardSection() {
  const images = [
    'uploads/pasted-1777043359483-0.png',
    'uploads/pasted-1777043503650-0.png',
    'uploads/pasted-1777043534914-0.png'
  ];
  return (
    <section style={{ padding: '96px 48px', background: '#FAFAF7' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <SectionLabel num={2} title="MOODBOARD" right="분위기와 레퍼런스" />
        <div style={{ fontSize: 15, color: '#4B5563', marginBottom: 32, maxWidth: 600, lineHeight: 1.7 }}>
          클라이언트가 공유한 레퍼런스를 모았습니다. 여름·가족·운동회·젊음·활기의
          키워드가 공통적으로 드러나며, <b>평화로운 파스텔</b>과 <b>강렬한 타이포</b>의
          양극단이 모두 매력적으로 느껴졌습니다.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {images.map((src, i) => (
            <div key={i} style={{ aspectRatio: '3/4', borderRadius: 12, overflow: 'hidden', background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConceptSection({ concept, index }) {
  return (
    <section style={{
      padding: '96px 48px',
      background: index % 2 === 0 ? '#fff' : '#FAFAF7',
      borderTop: '1px solid #F3F4F6'
    }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <SectionLabel num={3 + index} title={`CONCEPT ${concept.code}`} right={concept.name} />

        {/* 헤더 */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
            <h2 style={{ fontFamily: 'Gowun Batang, serif', fontSize: 56, color: '#111827', margin: 0, fontWeight: 700, letterSpacing: -1 }}>
              {concept.name}
            </h2>
            <div style={{ fontSize: 18, color: '#6B7280' }}>— {concept.ko}</div>
          </div>
          <div style={{ fontSize: 20, color: '#374151', marginBottom: 8, fontWeight: 500 }}>{concept.tagline}</div>
          <div style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.7, maxWidth: 700 }}>{concept.description}</div>
          <div style={{ marginTop: 20 }}>
            <MoodTags mood={concept.mood} />
          </div>
        </div>

        {/* 팔레트 + 타이포 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 56 }}>
          <div>
            <div style={{ fontSize: 11, color: '#9CA3AF', letterSpacing: 2, marginBottom: 14, fontWeight: 700 }}>COLOR PALETTE</div>
            <PaletteStrip palette={concept.palette} height={64} />
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${concept.palette.length}, 1fr)`, gap: 2, marginTop: 6 }}>
              {concept.palette.map((c, i) => (
                <div key={i} style={{ fontSize: 9, color: '#6B7280', textAlign: 'center', lineHeight: 1.3 }}>
                  {c.name}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#9CA3AF', letterSpacing: 2, marginBottom: 14, fontWeight: 700 }}>TYPOGRAPHY</div>
            <TypeSpecimen typography={concept.typography} />
          </div>
        </div>

        {/* 와이어프레임 */}
        <div className="wireframe-block" style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, color: '#9CA3AF', letterSpacing: 2, marginBottom: 20, fontWeight: 700 }}>
            WIREFRAME · 중간충실도 · 3 화면
          </div>
          <div style={{ padding: '40px 24px', background: '#F9FAFB', borderRadius: 16, border: '1px solid #E5E7EB' }}>
            <WireSet concept={concept.code} />
          </div>
        </div>

        {/* 인터랙션 + 레이아웃 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20 }}>
          <InteractionCard interaction={concept.interaction} />
          <div style={{ padding: 16, background: '#F9FAFB', borderRadius: 12, border: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: 11, color: '#9CA3AF', letterSpacing: 1, marginBottom: 8, fontWeight: 700 }}>BEST FOR</div>
            <div style={{ fontSize: 13, color: '#111827', fontWeight: 600, lineHeight: 1.5 }}>{concept.bestFor}</div>
            <div style={{ fontSize: 11, color: '#9CA3AF', letterSpacing: 1, marginTop: 16, marginBottom: 6, fontWeight: 700 }}>LAYOUT</div>
            <div style={{ fontSize: 12, color: '#4B5563' }}>{concept.layout}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const { concepts } = window.PROPOSAL;
  const rows = [
    { label: '무드', get: c => c.mood.slice(0, 3).join(' · ') },
    { label: '인터랙션', get: c => c.interaction.title },
    { label: '레이아웃', get: c => c.layout },
    { label: '추천 상황', get: c => c.bestFor }
  ];
  return (
    <section style={{ padding: '96px 48px', background: '#111827', color: '#fff' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 13, color: '#6B7280', fontWeight: 600 }}>07</div>
          <div style={{ flex: 1, height: 1, background: '#374151' }} />
          <div style={{ fontSize: 13, color: '#fff', fontWeight: 700, letterSpacing: 1 }}>COMPARE</div>
          <div style={{ fontSize: 11, color: '#9CA3AF' }}>한 눈에 비교</div>
        </div>
        <h2 style={{ fontFamily: 'Gowun Batang, serif', fontSize: 48, margin: '0 0 40px', fontWeight: 700, letterSpacing: -1 }}>
          네 개의 방향,<br />어느 쪽에 마음이 가나요?
        </h2>

        {/* 팔레트 미리보기 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          {concepts.map(c => (
            <div key={c.id} style={{ padding: 20, background: '#1F2937', borderRadius: 12 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 10 }}>
                <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: '#9CA3AF' }}>{c.code}</div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{c.name}</div>
              </div>
              <PaletteStrip palette={c.palette} showHex={false} height={28} />
              <div style={{ fontSize: 11, color: '#D1D5DB', marginTop: 10, lineHeight: 1.5 }}>{c.tagline}</div>
            </div>
          ))}
        </div>

        {/* 비교 표 */}
        <div style={{ border: '1px solid #374151', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '140px repeat(4, 1fr)', background: '#1F2937', padding: '14px 20px', fontSize: 11, color: '#9CA3AF', letterSpacing: 1, fontWeight: 700 }}>
            <div></div>
            {concepts.map(c => <div key={c.id}>{c.code} · {c.name}</div>)}
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '140px repeat(4, 1fr)',
              padding: '18px 20px', borderTop: '1px solid #374151',
              fontSize: 12, gap: 12
            }}>
              <div style={{ color: '#9CA3AF', fontWeight: 600 }}>{r.label}</div>
              {concepts.map(c => <div key={c.id} style={{ color: '#E5E7EB', lineHeight: 1.5 }}>{r.get(c)}</div>)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NextStep() {
  return (
    <section style={{ padding: '96px 48px 140px', background: '#FAFAF7' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <Badge>NEXT STEP</Badge>
        <h2 style={{ fontFamily: 'Gowun Batang, serif', fontSize: 56, color: '#111827', margin: '20px 0', fontWeight: 700, letterSpacing: -1, lineHeight: 1.1 }}>
          마음에 드는 방향을<br />선택해 주세요
        </h2>
        <div style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.8, maxWidth: 540, margin: '0 auto 40px' }}>
          선택된 방향으로 <b>고충실도 시안</b>을 이어서 제작합니다.
          필요하다면 두 방향을 혼합하거나, 특정 컬러·인터랙션만 가져와
          새로운 시안으로 발전시킬 수도 있습니다.
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {window.PROPOSAL.concepts.map(c => (
            <div key={c.id} style={{
              padding: '14px 24px', border: '1.5px solid #111827', borderRadius: 999,
              fontSize: 13, fontWeight: 700, color: '#111827', background: '#fff'
            }}>
              {c.code} · {c.name}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 56, fontSize: 12, color: '#9CA3AF' }}>
          — 하나로 가족한마당 · 2026 ·  —
        </div>
      </div>
    </section>
  );
}

function ProposalApp() {
  const { concepts } = window.PROPOSAL;
  return (
    <>
      <Cover />
      <BriefSection />
      <MoodboardSection />
      {concepts.map((c, i) => <ConceptSection key={c.id} concept={c} index={i} />)}
      <ComparisonSection />
      <NextStep />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ProposalApp />);
