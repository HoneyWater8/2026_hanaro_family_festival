import { useState, useEffect } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import { WL } from '../../theme/tokens';

type ResponsiveDeviceProps = {
  children: ReactNode;
  dark?: boolean;
};

/**
 * 외부 body.frame-on 클래스에 따라 iOS 디바이스 프레임을 토글하는 래퍼.
 * frame-toggle 커스텀 이벤트와 resize 이벤트를 구독.
 */
export function ResponsiveDevice({ children, dark = false }: ResponsiveDeviceProps) {
  const [frame, setFrame] = useState(() => document.body.classList.contains('frame-on'));
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    const onToggle = () => setFrame(document.body.classList.contains('frame-on'));
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('frame-toggle', onToggle);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('frame-toggle', onToggle);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const baseW = 390, baseH = 844;
  let outerStyle: CSSProperties;

  if (frame) {
    const padding = 32;
    const scale = Math.min(
      (size.w - padding) / baseW,
      (size.h - padding) / baseH,
      1
    );
    outerStyle = {
      width: baseW, height: baseH, borderRadius: 48,
      background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      position: 'relative', overflow: 'hidden',
      transform: `scale(${scale})`, transformOrigin: 'center center',
    };
  } else {
    const maxW = Math.min(size.w, 460);
    outerStyle = {
      width: maxW, height: '100dvh',
      position: 'relative', overflow: 'hidden',
      borderRadius: 0, background: WL.paper,
      boxShadow: maxW < size.w ? '0 0 60px rgba(0,0,0,0.2)' : 'none',
    };
  }

  return (
    <div style={outerStyle}>
      {frame && (
        <>
          <div style={{
            position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
            width: 126, height: 37, borderRadius: 24, background: '#000', zIndex: 50,
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 60,
            height: 34, display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
            paddingBottom: 8, pointerEvents: 'none',
          }}>
            <div style={{
              width: 139, height: 5, borderRadius: 100,
              background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)',
            }} />
          </div>
        </>
      )}
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        {children}
      </div>
    </div>
  );
}
