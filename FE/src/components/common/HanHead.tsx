import type { ReactNode, CSSProperties } from 'react';
import { WL, FF } from '../../theme/tokens';

type HanHeadProps = {
  children: ReactNode;
  color?: string;
  size?: number;
  line?: number;
  style?: CSSProperties;
};

/** Black Han Sans 한글 헤드라인. */
export function HanHead({ children, color = WL.ink, size = 60, line = 1.0, style }: HanHeadProps) {
  return (
    <div style={{
      fontFamily: FF.han,
      fontSize: size,
      lineHeight: line,
      color,
      letterSpacing: -1,
      fontWeight: 400,
      ...style
    }}>{children}</div>
  );
}
