import { WL } from '../../theme/tokens';

type ProgressRailProps = { progress: number };

export function ProgressRail({ progress }: ProgressRailProps) {
  return (
    <div style={{
      position: 'absolute', left: 8, top: 100, bottom: 100,
      width: 2, background: `${WL.ink}22`, zIndex: 30, pointerEvents: 'none'
    }}>
      <div style={{
        position: 'absolute', left: 0, top: 0, width: 2,
        height: `${progress * 100}%`, background: WL.ink,
        transition: 'height 0.1s linear'
      }} />
      <div style={{
        position: 'absolute', left: -3, top: `${progress * 100}%`,
        width: 8, height: 8, background: WL.sun, borderRadius: '50%',
        boxShadow: `0 0 0 2px ${WL.paper}`,
        transition: 'top 0.1s linear'
      }} />
    </div>
  );
}
