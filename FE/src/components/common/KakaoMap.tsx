import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useKakaoMapsSdk } from '../../utils/kakaoMap';

type KakaoMapProps = {
  /** 검색할 주소 — Geocoder로 좌표 변환 (coords가 있으면 무시) */
  address: string;
  /** 마커 인포윈도우에 표시할 장소 라벨 */
  name: string;
  /** 좌표 직접 지정 ("lat,lng"). 있으면 geocoding 스킵. */
  coords?: string;
  /** 줌 레벨 (1=상세 ~ 14=시도). 기본 3 (구 단위 정도) */
  level?: number;
  /** SDK 로딩 전·실패 시 표시할 폴백 (예: placeholder) */
  fallback?: ReactNode;
  /** 외부 컨테이너 스타일 (aspect-ratio, border 등) */
  style?: CSSProperties;
};

/**
 * Kakao 지도 임베드.
 * - SDK 미로드/키 미설정 시 fallback만 표시.
 * - 로드되면 map div가 opacity 페이드인되며 fallback을 덮음.
 * - coords 우선 → 없으면 Geocoder(주소) → 그래도 실패하면 Places(키워드)로 단계적 검색.
 */
export function KakaoMap({
  address,
  name,
  coords,
  level = 3,
  fallback,
  style,
}: KakaoMapProps) {
  const sdkLoaded = useKakaoMapsSdk();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!sdkLoaded || !containerRef.current) return;
    const kakao = window.kakao;
    let cancelled = false;

    const initAt = (lat: number, lng: number) => {
      if (cancelled || !containerRef.current) return;
      const center = new kakao.maps.LatLng(lat, lng);
      const map = new kakao.maps.Map(containerRef.current, { center, level });
      const marker = new kakao.maps.Marker({ position: center });
      marker.setMap(map);
      const infowindow = new kakao.maps.InfoWindow({
        content:
          `<div style="padding:6px 10px;font-size:12px;font-weight:600;` +
          `white-space:nowrap;color:#0F2A3D;">${name}</div>`,
        removable: false,
      });
      infowindow.open(map, marker);
      setMapReady(true);
    };

    // 1) coords prop이 있으면 우선 사용
    if (coords && coords.trim() !== '') {
      const parts = coords.split(',').map((s) => Number(s.trim()));
      if (parts.length === 2 && Number.isFinite(parts[0]) && Number.isFinite(parts[1])) {
        initAt(parts[0], parts[1]);
        return () => {
          cancelled = true;
        };
      }
    }

    // 2) Geocoder로 주소 → 좌표
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result: any[], status: string) => {
      if (cancelled) return;
      if (status === kakao.maps.services.Status.OK && result.length > 0) {
        initAt(parseFloat(result[0].y), parseFloat(result[0].x));
        return;
      }
      // 3) 주소가 매칭 안 되면 장소 키워드 검색
      const places = new kakao.maps.services.Places();
      places.keywordSearch(address, (placeResult: any[], placeStatus: string) => {
        if (cancelled) return;
        if (placeStatus === kakao.maps.services.Status.OK && placeResult.length > 0) {
          initAt(parseFloat(placeResult[0].y), parseFloat(placeResult[0].x));
        }
      });
    });

    return () => {
      cancelled = true;
    };
  }, [sdkLoaded, address, coords, name, level]);

  return (
    <div style={{ position: 'relative', ...style }}>
      {fallback}
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: mapReady ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: mapReady ? 'auto' : 'none',
        }}
      />
    </div>
  );
}
