import { memo, useCallback, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';
import { Link } from 'lucide-react';
import { WL, FF } from '../../theme/tokens';
import { shareToKakao } from '../../utils/kakaoShare';

const SHARE_URL = 'https://2026hanarofamilyfestival.vercel.app';

const shareItemStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  width: '100%',
  padding: '14px 12px',
  background: 'transparent',
  border: 'none',
  borderRadius: 10,
  cursor: 'pointer',
  fontFamily: FF.sans,
  fontSize: 14,
  fontWeight: 600,
  color: WL.ink,
  textAlign: 'left',
  outline: 'none',
};

const shareIconStyle: CSSProperties = {
  width: 28,
  height: 28,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 18,
  flexShrink: 0,
};

const SHEET_TRANSITION_MS = 320;
const CLOSE_DRAG_THRESHOLD = 80;

export const ShareFAB = memo(function ShareFAB() {
  // 시트 mount/visible 분리 — mount 후 다음 프레임에 visible=true로 슬라이드업, 닫을 땐 visible=false 후 transition 끝나면 unmount
  const [sheetMounted, setSheetMounted] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStartYRef = useRef<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1800);
  }, []);

  const openSheet = useCallback(() => {
    setDragY(0);
    setSheetMounted(true);
    // 두 번의 rAF — 첫 렌더에 translateY(100%) 적용 후 다음 프레임에 0으로 transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setSheetVisible(true));
    });
  }, []);

  const closeSheet = useCallback(() => {
    setSheetVisible(false);
    window.setTimeout(() => {
      setSheetMounted(false);
      setDragY(0);
    }, SHEET_TRANSITION_MS);
  }, []);

  const onHandlePointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    dragStartYRef.current = e.clientY;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onHandlePointerMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartYRef.current === null) return;
    const dy = Math.max(0, e.clientY - dragStartYRef.current);
    setDragY(dy);
  }, []);

  const onHandlePointerUp = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartYRef.current === null) return;
    const finalDragY = e.clientY - dragStartYRef.current;
    dragStartYRef.current = null;
    setDragging(false);
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
    if (finalDragY > CLOSE_DRAG_THRESHOLD) {
      closeSheet();
    } else {
      setDragY(0);
    }
  }, [closeSheet]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      closeSheet();
      showToast('링크가 복사되었어요');
    } catch {
      showToast('복사에 실패했어요');
    }
  }, [closeSheet, showToast]);

  const handleKakao = useCallback(async () => {
    const ok = await shareToKakao(SHARE_URL);
    if (ok) closeSheet();
    else showToast('카카오톡 공유에 실패했어요');
  }, [closeSheet, showToast]);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={openSheet}
        aria-label="공유하기"
        style={{
          position: 'absolute',
          bottom: 24,
          right: 20,
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: `${WL.paper}80`,
          backdropFilter: 'blur(14px) saturate(160%)',
          WebkitBackdropFilter: 'blur(14px) saturate(160%)',
          border: '1px solid rgba(255,255,255,0.55)',
          color: WL.ink,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: `0 8px 22px ${WL.ink}33, inset 0 1px 1px rgba(255,255,255,0.6)`,
          zIndex: 40,
          padding: 0,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3 L12 16 M6 9 L12 3 L18 9 M5 14 L5 20 L19 20 L19 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Backdrop */}
      {sheetMounted && (
        <div
          onClick={closeSheet}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            zIndex: 50,
            opacity: sheetVisible ? 1 : 0,
            transition: 'opacity 0.28s ease',
          }}
        />
      )}

      {/* Bottom Sheet */}
      {sheetMounted && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            background: WL.paper,
            padding: '14px 20px 28px',
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            zIndex: 51,
            boxShadow: '0 -8px 30px rgba(0,0,0,0.18)',
            transform: sheetVisible
              ? `translateY(${dragY}px)`
              : 'translateY(100%)',
            transition: dragging
              ? 'none'
              : `transform ${SHEET_TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
            willChange: 'transform',
          }}
        >
          {/* 핸들 드래그 영역 — 아래로 드래그하면 시트 닫힘 */}
          <div
            onPointerDown={onHandlePointerDown}
            onPointerMove={onHandlePointerMove}
            onPointerUp={onHandlePointerUp}
            onPointerCancel={onHandlePointerUp}
            style={{
              padding: '4px 0 14px',
              cursor: dragging ? 'grabbing' : 'grab',
              touchAction: 'none',
              userSelect: 'none',
              WebkitUserSelect: 'none',
            }}
          >
            <div
              style={{
                width: 36,
                height: 4,
                background: `${WL.ink}33`,
                borderRadius: 999,
                margin: '0 auto',
              }}
            />
          </div>
          <div
            style={{
              fontFamily: FF.bebas,
              fontSize: 11,
              letterSpacing: 3,
              color: WL.ink,
              opacity: 0.55,
              marginBottom: 6,
              padding: '0 12px',
            }}
          >
            SHARE
          </div>
          <button onClick={handleCopyLink} style={shareItemStyle}>
            <span style={shareIconStyle}>
              <Link size={18} strokeWidth={2} />
            </span>
            <span>링크 복사하기</span>
          </button>
          <button onClick={handleKakao} style={shareItemStyle}>
            <span style={shareIconStyle}>
              <img src="/icons/kakaotalk.png" alt="" width={20} height={20} />
            </span>
            <span>카카오톡으로 공유</span>
          </button>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: 'absolute',
            bottom: 96,
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '11px 20px',
            background: WL.ink,
            color: WL.paper,
            borderRadius: 999,
            fontFamily: FF.sans,
            fontSize: 13,
            fontWeight: 600,
            whiteSpace: 'nowrap',
            zIndex: 60,
            boxShadow: '0 8px 24px rgba(0,0,0,0.28)',
            animation: 'wl-overlay-in 0.25s ease forwards',
            pointerEvents: 'none',
          }}
        >
          {toast}
        </div>
      )}
    </>
  );
});
