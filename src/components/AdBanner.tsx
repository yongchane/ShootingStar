'use client'

import { useEffect, useState } from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  className?: string;
}

export default function AdBanner({ 
  slot = '0000000000',
  format = 'auto', 
  responsive = true,
  className = ''
}: AdBannerProps) {
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // 애드센스 스크립트가 로드되었는지 확인
    const checkAdSense = () => {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        try {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          setAdLoaded(true);
        } catch (error) {
          console.error('AdSense 로드 실패:', error);
        }
      }
    };

    // 스크립트 로드 후 광고 초기화
    const timer = setTimeout(checkAdSense, 100);
    return () => clearTimeout(timer);
  }, []);

  // 개발 환경에서는 플레이스홀더 표시
  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    return (
      <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-500 ${className}`}>
        <div className="text-sm">
          🏷️ 광고 배너 영역
        </div>
        <div className="text-xs mt-1">
          (개발 모드 - 실제 광고는 프로덕션에서 표시됩니다)
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-banner ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-0000000000000000" // 실제 애드센스 클라이언트 ID로 변경
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
      
      {!adLoaded && (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-center text-gray-500">
          <div className="animate-pulse">
            <div className="text-sm">광고 로딩 중...</div>
          </div>
        </div>
      )}
    </div>
  );
}

// 애드센스 스크립트를 문서에 추가하는 헬퍼 함수
export const loadAdSenseScript = () => {
  if (typeof window !== 'undefined' && !document.querySelector('#adsense-script')) {
    const script = document.createElement('script');
    script.id = 'adsense-script';
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000';
    script.crossOrigin = 'anonymous';
    script.async = true;
    document.head.appendChild(script);
  }
};