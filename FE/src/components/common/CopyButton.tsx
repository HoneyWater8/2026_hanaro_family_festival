import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { WL, FF } from '../../theme/tokens';

type CopyButtonProps = {
  /** 클립보드에 복사할 텍스트 */
  text: string;
  /** 라벨 텍스트 (지정하면 아이콘 + 라벨, 비우면 아이콘 only). 기본 undefined. */
  label?: string;
  /** 복사 직후 라벨. label이 있을 때만 사용. 기본 "복사됨" */
  copiedLabel?: string;
  /** 피드백 유지 시간 ms (기본 1500) */
  duration?: number;
  /** 아이콘 크기 (기본 12) */
  iconSize?: number;
};

/**
 * 모던 브라우저는 navigator.clipboard, 그 외 환경(비-https 등)은
 * document.execCommand fallback. 둘 다 실패하면 false 반환.
 */
async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      /* fall through to legacy */
    }
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/**
 * 인라인 텍스트 옆에 두기 좋은 복사 버튼.
 * 기본은 아이콘 only (Copy → Check 토글). label을 넘기면 아이콘 + 텍스트.
 */
export function CopyButton({
  text,
  label,
  copiedLabel = '복사됨',
  duration = 1500,
  iconSize = 12,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const hasLabel = Boolean(label);

  const handleClick = async () => {
    const ok = await copyToClipboard(text);
    if (!ok) return;
    setCopied(true);
    setTimeout(() => setCopied(false), duration);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`복사: ${text}`}
      title={copied ? '복사됨' : '복사'}
      style={{
        marginLeft: 6,
        appearance: 'none',
        WebkitAppearance: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: hasLabel ? 4 : 0,
        width: hasLabel ? 'auto' : 22,
        height: 22,
        padding: hasLabel ? '0 7px' : 0,
        background: copied ? `${WL.ocean}1a` : 'transparent',
        border: `1px solid ${copied ? WL.ocean : `${WL.ink}33`}`,
        borderRadius: 4,
        cursor: 'pointer',
        fontFamily: FF.bebas,
        fontSize: 9,
        fontWeight: 400,
        letterSpacing: 1.5,
        color: copied ? WL.ocean : `${WL.ink}99`,
        lineHeight: 1,
        verticalAlign: 'middle',
        whiteSpace: 'nowrap',
        transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
      }}
    >
      {copied ? (
        <Check size={iconSize} strokeWidth={2.5} aria-hidden />
      ) : (
        <Copy size={iconSize} strokeWidth={2} aria-hidden />
      )}
      {hasLabel && <span>{copied ? copiedLabel : label}</span>}
    </button>
  );
}
