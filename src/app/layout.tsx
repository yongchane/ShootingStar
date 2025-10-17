import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "별똥별 게임 - 반응속도 테스트 게임 | 10 만들기 챌린지",
    template: "%s | 별똥별 게임",
  },
  description:
    "별똥별을 클릭해서 10을 만드는 무료 온라인 반응속도 게임! 60초 안에 최고 점수를 달성하고 친구와 경쟁하세요. PC와 모바일에서 모두 플레이 가능한 브라우저 게임입니다.",
  keywords: [
    "별똥별 게임",
    "반응속도 테스트",
    "반응속도 게임",
    "10 만들기",
    "10 만들기 게임",
    "사과게임",
    "무료 게임",
    "온라인 게임",
    "브라우저 게임",
    "반응속도 측정",
    "클릭 게임",
    "타이밍 게임",
    "스피드 게임",
    "캐주얼 게임",
    "모바일 게임",
    "PC 게임",
    "무료 플래시 게임",
    "집중력 게임",
    "순발력 게임",
    "반응 테스트",
  ],
  authors: [{ name: "별똥별 게임" }],
  creator: "별똥별 게임",
  publisher: "별똥별 게임",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "별똥별 게임",
    title: "별똥별 게임 - 반응속도 테스트 게임 | 10 만들기 챌린지",
    description:
      "별똥별을 클릭해서 10을 만드는 무료 온라인 반응속도 게임! 60초 안에 최고 점수를 달성하고 친구와 경쟁하세요.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "별똥별 게임 - 반응속도 테스트",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "별똥별 게임 - 반응속도 테스트 게임",
    description: "별똥별을 클릭해서 10을 만드는 무료 온라인 반응속도 게임!",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google:
      "google-site-verification=0lRbwTuidMEl0BNBBlT5KdDB__3lcTj8Wziy6-0-r-w",
    // 나중에 Google Search Console에서 받은 코드로 교체하세요
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b5cf6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "별똥별 게임",
              description:
                "별똥별을 클릭해서 10을 만드는 무료 온라인 반응속도 게임",
              url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              applicationCategory: "Game",
              genre: "Casual Game",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "KRW",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "1000",
                bestRating: "5",
                worstRating: "1",
              },
              author: {
                "@type": "Organization",
                name: "별똥별 게임",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          {children}
        </main>
      </body>
    </html>
  );
}
