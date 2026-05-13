/* ─────────────────────────────────────────────────────────
   Kakao JavaScript SDK 동적 로더 + Share 호출
   - VITE_KAKAO_MAP_KEY (JS키) 재사용. Maps와 동일 키.
   - sendScrap으로 페이지의 OG 태그를 스크랩해 카드 전송.
     (제목/설명/이미지는 index.html의 og:* meta 태그에서 가져옴)
   ───────────────────────────────────────────────────────── */

type KakaoSDK = {
  isInitialized: () => boolean;
  init: (key: string) => void;
  Share?: {
    sendScrap: (params: { requestUrl: string }) => void;
  };
};

declare global {
  interface Window {
    Kakao?: KakaoSDK;
  }
}

const SDK_URL = 'https://t1.kakaocdn.net/kakao_js_sdk/2.8.1/kakao.min.js';
const SDK_INTEGRITY = 'sha384-OL+ylM/iuPLtW5U3XcvLSGhE8JzReKDank5InqlHGWPhb4140/yrBw0bg0y7+C9J';

let sdkPromise: Promise<void> | null = null;

function loadKakaoSdk(): Promise<void> {
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise<void>((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('SSR'));
    if (window.Kakao?.Share) return resolve();
    const script = document.createElement('script');
    script.src = SDK_URL;
    script.integrity = SDK_INTEGRITY;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Kakao SDK'));
    document.head.appendChild(script);
  });
  return sdkPromise;
}

export async function shareToKakao(url: string): Promise<boolean> {
  try {
    await loadKakaoSdk();
    const Kakao = window.Kakao;
    if (!Kakao) return false;
    const key = import.meta.env.VITE_KAKAO_MAP_KEY;
    if (key && !Kakao.isInitialized()) Kakao.init(key);
    if (!Kakao.Share) return false;
    Kakao.Share.sendScrap({ requestUrl: url });
    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('[Kakao Share]', e);
    return false;
  }
}
