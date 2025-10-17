import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '같이하기',
  description: '친구들과 함께 별똥별 게임을 플레이하고 누가 더 높은 점수를 받는지 겨뤄보세요! 실시간으로 점수를 비교하며 즐기세요.',
  openGraph: {
    title: '별똥별 게임 - 같이하기 | 별똥별 게임',
    description: '친구들과 함께 별똥별 게임을 플레이하고 누가 더 높은 점수를 받는지 겨뤄보세요!',
    type: 'website',
  },
}

export default function OthersGameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
