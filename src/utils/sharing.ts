import { GameResult, getRanking } from './storage';

export const generateShareImage = async (result: GameResult): Promise<string> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) throw new Error('Canvas context not available');
  
  canvas.width = 800;
  canvas.height = 600;
  
  // 배경 그라디언트
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // 텍스트 설정
  ctx.textAlign = 'center';
  ctx.fillStyle = 'white';
  
  // 타이틀
  ctx.font = 'bold 48px Arial';
  ctx.fillText('⚡ 반응속도 테스트', canvas.width / 2, 100);
  
  // 게임 타입에 따른 내용
  if (result.gameType === 'reaction') {
    ctx.font = 'bold 72px Arial';
    ctx.fillText(`${result.score}ms`, canvas.width / 2, 220);
    
    ctx.font = '32px Arial';
    ctx.fillText(getRanking('reaction', result.score), canvas.width / 2, 280);
    
    if (result.details) {
      ctx.font = '24px Arial';
      ctx.fillText(`최고: ${result.details.best}ms | 평균: ${result.details.average}ms`, canvas.width / 2, 350);
    }
  } else {
    ctx.font = 'bold 72px Arial';
    ctx.fillText(`${result.score}점`, canvas.width / 2, 220);
    
    ctx.font = '32px Arial';
    ctx.fillText(getRanking('apple', result.score), canvas.width / 2, 280);
    
    if (result.details) {
      ctx.font = '24px Arial';
      ctx.fillText(`콤보: ${result.details.combos} | 실수: ${result.details.mistakes}`, canvas.width / 2, 350);
    }
  }
  
  // 하단 텍스트
  ctx.font = '20px Arial';
  ctx.fillText('나도 도전해보기: reaction-speed-game.vercel.app', canvas.width / 2, 500);
  
  return canvas.toDataURL('image/png');
};

export const shareResult = async (result: GameResult): Promise<void> => {
  const gameTypeText = result.gameType === 'reaction' ? '반응속도 테스트' : '사과게임';
  const scoreText = result.gameType === 'reaction' ? `${result.score}ms` : `${result.score}점`;
  const ranking = getRanking(result.gameType, result.score);
  
  const text = `🎮 ${gameTypeText} 결과: ${scoreText}\n${ranking}\n\n나도 도전해보기 👇`;
  const url = typeof window !== 'undefined' ? window.location.origin : '';
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: `⚡ ${gameTypeText} 결과`,
        text: text,
        url: url,
      });
    } catch (error) {
      console.log('공유 취소됨');
    }
  } else {
    // 폴백: 클립보드에 복사
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      alert('결과가 클립보드에 복사되었습니다!');
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
    }
  }
};

export const downloadResultImage = async (result: GameResult): Promise<void> => {
  try {
    const dataUrl = await generateShareImage(result);
    const link = document.createElement('a');
    link.download = `reaction-game-result-${result.timestamp}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('이미지 다운로드 실패:', error);
    alert('이미지 다운로드에 실패했습니다.');
  }
};