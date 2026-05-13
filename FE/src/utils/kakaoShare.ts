/* ─────────────────────────────────────────────────────────
   Kakao JavaScript SDK 동적 로더 + Share 호출
   - VITE_KAKAO_MAP_KEY (JS키) 재사용. Maps와 동일 키.
   - sendDefault로 카카오톡에 feed 카드 전송.
   ───────────────────────────────────────────────────────── */

type KakaoShareOpts = {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
};

type KakaoSDK = {
  isInitialized: () => boolean;
  init: (key: string) => void;
  Share?: {
    sendDefault: (params: unknown) => void;
  };
};

declare global {
  interface Window {
    Kakao?: KakaoSDK;
  }
}

const SDK_URL = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';

let sdkPromise: Promise<void> | null = null;

function loadKakaoSdk(): Promise<void> {
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise<void>((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('SSR'));
    if (window.Kakao?.Share) return resolve();
    const script = document.createElement('script');
    script.src = SDK_URL;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Kakao SDK'));
    document.head.appendChild(script);
  });
  return sdkPromise;
}

export async function shareToKakao(opts: KakaoShareOpts): Promise<boolean> {
  try {
    await loadKakaoSdk();
    const Kakao = window.Kakao;
    if (!Kakao) return false;
    const key = import.meta.env.VITE_KAKAO_MAP_KEY;
    if (key && !Kakao.isInitialized()) Kakao.init(key);
    if (!Kakao.Share) return false;
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: opts.title,
        description: opts.description,
        imageUrl: opts.imageUrl,
        link: {
          mobileWebUrl: opts.link,
          webUrl: opts.link,
        },
      },
      buttons: [
        {
          title: '초대장 보기',
          link: {
            mobileWebUrl: opts.link,
            webUrl: opts.link,
          },
        },
      ],
    });
    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('[Kakao Share]', e);
    return false;
  }
}
