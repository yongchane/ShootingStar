import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '혼자하기',
  description: '별똥별 게임을 혼자서 플레이하고 최고 점수에 도전하세요! 60초 안에 10을 만들어 높은 점수를 획득하세요.',
  openGraph: {
    title: '별똥별 게임 - 혼자하기 | 별똥별 게임',
    description: '별똥별 게임을 혼자서 플레이하고 최고 점수에 도전하세요!',
    type: 'website',
  },
}

export default function AloneGameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
