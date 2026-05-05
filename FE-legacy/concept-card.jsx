/* ─────────────────────────────────────────────────────────
   시안 카드 공유 컴포넌트
   - PaletteStrip: 컬러 팔레트 스와치
   - TypeSpecimen: 타이포 샘플
   - InteractionCard: 인터랙션 설명
   - MoodTags: 무드 키워드
   - ConceptCard: 위 요소를 합친 큰 카드 (제안서·덱 공통)
   ───────────────────────────────────────────────────────── */

function PaletteStrip({ palette, showHex = true, height = 56, hexSize = 10 }) {
  return (
    <div>
      <div style={{ display: 'flex', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)' }}>
        {palette.map((c, i) => (
          <div key={i} style={{ flex: 1, height, background: c.hex }} />
        ))}
      </div>
      {showHex && (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${palette.length}, 1fr)`, gap: 2, marginTop: 8 }}>
          {palette.map((c, i) => (
            <div key={i} style={{ fontSize: hexSize, color: '#6B7280', textAlign: 'center', fontFamily: 'ui-monospace, monospace', letterSpacing: -0.3 }}>
              {c.hex}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TypeSpecimen({ typography, scale = 1 }) {
  const labelSize = 10 * scale;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 * scale }}>
      <div>
        <div style={{ fontSize: labelSize, color: '#9CA3AF', letterSpacing: 1, marginBottom: 4 * scale, fontWeight: 600 }}>DISPLAY · {typography.display.family.split(',')[0]}</div>
        <div style={{ fontFamily: typography.display.family, fontSize: typography.display.size * scale, color: '#111827', lineHeight: 1, fontWeight: 700 }}>
          {typography.display.sample}
        </div>
      </div>
      <div>
        <div style={{ fontSize: labelSize, color: '#9CA3AF', letterSpacing: 1, marginBottom: 4 * scale, fontWeight: 600 }}>HEADING · {typography.heading.family.split(',')[0]}</div>
        <div style={{ fontFamily: typography.heading.family, fontSize: typography.heading.size * scale, color: '#1F2937', lineHeight: 1.2, fontWeight: 600 }}>
          {typography.heading.sample}
        </div>
      </div>
      <div>
        <div style={{ fontSize: labelSize, color: '#9CA3AF', letterSpacing: 1, marginBottom: 4 * scale, fontWeight: 600 }}>BODY · {typography.body.family.split(',')[0]}</div>
        <div style={{ fontFamily: typography.body.family, fontSize: typography.body.size * scale, color: '#374151', lineHeight: 1.5 }}>
          {typography.body.sample}
        </div>
      </div>
    </div>
  );
}

function InteractionCard({ interaction, scale = 1 }) {
  return (
    <div style={{ padding: 18 * scale, background: '#F9FAFB', borderRadius: 12, border: '1px solid #E5E7EB' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 * scale, marginBottom: 10 * scale }}>
        <div style={{ width: 24 * scale, height: 24 * scale, borderRadius: '50%', background: '#111827', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 * scale }}>↯</div>
        <div style={{ fontSize: 15 * scale, fontWeight: 700, color: '#111827' }}>{interaction.title}</div>
      </div>
      <div style={{ fontSize: 14 * scale, color: '#4B5563', lineHeight: 1.6 }}>{interaction.detail}</div>
    </div>
  );
}

function MoodTags({ mood, scale = 1 }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 * scale }}>
      {mood.map((m, i) => (
        <span key={i} style={{
          fontSize: 13 * scale, color: '#374151',
          padding: `${6 * scale}px ${14 * scale}px`, borderRadius: 20,
          background: '#fff', border: '1px solid #E5E7EB'
        }}>#{m}</span>
      ))}
    </div>
  );
}

// 레이블 배지
function Badge({ children, color = '#111827', bg = '#F3F4F6' }) {
  return (
    <span style={{
      display: 'inline-block', fontSize: 10, letterSpacing: 1, fontWeight: 700,
      padding: '4px 10px', borderRadius: 20,
      color, background: bg
    }}>{children}</span>
  );
}

function SectionLabel({ num, title, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 13, color: '#9CA3AF', fontWeight: 600 }}>
        {String(num).padStart(2, '0')}
      </div>
      <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
      <div style={{ fontSize: 13, color: '#111827', fontWeight: 700, letterSpacing: 1 }}>{title}</div>
      {right && <div style={{ fontSize: 11, color: '#6B7280' }}>{right}</div>}
    </div>
  );
}

Object.assign(window, {
  PaletteStrip, TypeSpecimen, InteractionCard, MoodTags, Badge, SectionLabel
});
