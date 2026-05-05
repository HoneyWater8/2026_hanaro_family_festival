import type { ReactNode, CSSProperties } from 'react';
import { WL, FF } from '../../theme/tokens';

type ImageProps = {
  /** 실제 이미지 URL. 없으면 placeholder 표시. */
  src?: string;
  alt: string;
  /** Placeholder 라벨 (예: "IMAGE", "PHOTO") */
  label?: string;
  /** Placeholder 라벨 아래 표시할 캡션 */
  caption?: string;
  /** 컨테이너 aspectRatio (예: "4 / 3", "1 / 1.2") */
  aspectRatio?: string;
  /** 외부 컨테이너 추가 스타일 (border, background 등) */
  containerStyle?: CSSProperties;
  /** 컨테이너 div의 추가 props (data-* 등) */
  containerProps?: Record<string, unknown>;
  /** Placeholder 텍스트 색상 */
  placeholderColor?: string;
  /** Placeholder 라벨 추가 스타일 (fontSize 등 override) */
  labelStyle?: CSSProperties;
  /** 이미지 fit 모드 (기본 cover) */
  fit?: 'cover' | 'contain';
  /** 데코레이션 children (예: 코너 마커) */
  children?: ReactNode;
};

/**
 * 이미지 표시 컴포넌트.
 * src가 있으면 <img>, 없으면 라벨 + 캡션 placeholder를 보여줌.
 * 향후 실제 이미지가 들어오면 src만 채워주면 자동 교체됨.
 */
export function Image({
  src,
  alt,
  label = 'IMAGE',
  caption,
  aspectRatio,
  containerStyle,
  containerProps,
  placeholderColor = `${WL.ink}55`,
  labelStyle,
  fit = 'cover',
  children,
}: ImageProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        ...containerStyle,
      }}
      {...containerProps}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: fit,
            display: 'block',
          }}
        />
      ) : (
        <>
          <div style={{
            fontFamily: FF.bebas,
            fontSize: 10,
            letterSpacing: 2,
            color: placeholderColor,
            ...labelStyle,
          }}>
            {label}
          </div>
          {caption && (
            <div style={{
              marginTop: 4,
              fontFamily: FF.sans,
              fontSize: 10,
              color: placeholderColor,
            }}>
              {caption}
            </div>
          )}
        </>
      )}
      {children}
    </div>
  );
}
