import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '⚡ 반응속도 테스트 게임',
  description: '1분 만에 내 반응속도 측정하고, 친구와 경쟁하며 사과게임까지! 너의 반응속도는 페이커급일까?',
  keywords: ['반응속도', '게임', '테스트', '사과게임', '10만들기'],
  openGraph: {
    title: '⚡ 반응속도 테스트 게임',
    description: '너의 반응속도는 페이커급일까? 지금 바로 테스트해보자!',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          {children}
        </main>
      </body>
    </html>
  )
}