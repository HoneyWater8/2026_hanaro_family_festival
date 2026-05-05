import { WL, FF } from '../../theme/tokens';

type IssueLabelProps = {
  num: number;
  label: string;
  accent?: string;
};

export function IssueLabel({ num, label, accent = WL.ink }: IssueLabelProps) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      fontFamily: FF.bebas, fontSize: 12, letterSpacing: 3, color: accent
    }}>
      <span>§ {String(num).padStart(2, '0')}</span>
      <span style={{ flex: 1, height: 1, background: accent, opacity: 0.3 }} />
      <span>{label}</span>
    </div>
  );
}
