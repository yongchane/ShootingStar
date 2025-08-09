export interface GameResult {
  id: string;
  gameType: 'reaction' | 'apple';
  score: number;
  timestamp: number;
  details?: any;
}

export interface ReactionResult extends GameResult {
  gameType: 'reaction';
  details: {
    attempts: number[];
    average: number;
    best: number;
    worst: number;
  };
}

export interface AppleResult extends GameResult {
  gameType: 'apple';
  details: {
    timeLeft: number;
    combos: number;
    mistakes: number;
  };
}

const STORAGE_KEY = 'reaction-game-results';

export const saveResult = (result: GameResult): void => {
  try {
    const results = getResults();
    results.unshift(result);
    // 최대 100개까지만 저장
    const limitedResults = results.slice(0, 100);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedResults));
  } catch (error) {
    console.error('결과 저장 실패:', error);
  }
};

export const getResults = (): GameResult[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('결과 불러오기 실패:', error);
    return [];
  }
};

export const getResultsByType = (gameType: 'reaction' | 'apple'): GameResult[] => {
  return getResults().filter(result => result.gameType === gameType);
};

export const getBestScore = (gameType: 'reaction' | 'apple'): GameResult | null => {
  const results = getResultsByType(gameType);
  if (results.length === 0) return null;

  if (gameType === 'reaction') {
    // 반응속도는 낮을수록 좋음
    return results.reduce((best, current) => 
      current.score < best.score ? current : best
    );
  } else {
    // 사과게임은 높을수록 좋음
    return results.reduce((best, current) => 
      current.score > best.score ? current : best
    );
  }
};

export const getAverageScore = (gameType: 'reaction' | 'apple'): number => {
  const results = getResultsByType(gameType);
  if (results.length === 0) return 0;

  const sum = results.reduce((acc, result) => acc + result.score, 0);
  return Math.round(sum / results.length);
};

export const getRanking = (gameType: 'reaction' | 'apple', score: number): string => {
  if (gameType === 'reaction') {
    if (score <= 120) return '🏆 페이커급 (상위 0.1%)';
    if (score <= 150) return '🥇 프로게이머급 (상위 1%)';
    if (score <= 200) return '🥈 고수급 (상위 10%)';
    if (score <= 250) return '🥉 평균 이상 (상위 50%)';
    if (score <= 300) return '🙂 평균 (하위 50%)';
    return '🐌 연습이 필요해요';
  } else {
    if (score >= 1000) return '🏆 사과 마스터 (상위 0.1%)';
    if (score >= 700) return '🥇 사과 고수 (상위 1%)';
    if (score >= 500) return '🥈 사과 중급자 (상위 10%)';
    if (score >= 300) return '🥉 사과 초급자 (상위 50%)';
    if (score >= 100) return '🙂 사과 입문자 (하위 50%)';
    return '🐌 연습이 필요해요';
  }
};