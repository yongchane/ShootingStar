import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '내 기록',
  description: '별똥별 게임 플레이 기록과 통계를 확인하세요. 최고 점수, 평균 점수, 랭킹 정보를 한눈에 볼 수 있습니다.',
  openGraph: {
    title: '내 기록 | 별똥별 게임',
    description: '별똥별 게임 플레이 기록과 통계를 확인하세요.',
    type: 'website',
  },
}

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
