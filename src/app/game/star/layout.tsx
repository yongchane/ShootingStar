import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '별똥별 게임 플레이',
  description: '떨어지는 별똥별을 클릭해서 10을 만드는 반응속도 게임을 플레이하세요. 60초 안에 최고 점수에 도전하세요!',
  openGraph: {
    title: '별똥별 게임 플레이 | 별똥별 게임',
    description: '떨어지는 별똥별을 클릭해서 10을 만드는 반응속도 게임',
    type: 'website',
  },
}

export default function StarGameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
