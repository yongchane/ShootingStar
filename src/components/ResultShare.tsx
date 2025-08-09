'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GameResult, getRanking } from '@/utils/storage';
import { shareResult, downloadResultImage } from '@/utils/sharing';

interface ResultShareProps {
  result: GameResult;
  showDetails?: boolean;
}

export default function ResultShare({ result, showDetails = true }: ResultShareProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      await shareResult(result);
    } catch (error) {
      console.error('공유 실패:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadResultImage(result);
    } catch (error) {
      console.error('다운로드 실패:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const gameTypeText = result.gameType === 'reaction' ? '반응속도 테스트' : '사과게임';
  const scoreText = result.gameType === 'reaction' ? `${result.score}ms` : `${result.score}점`;
  const ranking = getRanking(result.gameType, result.score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30"
    >
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">
          {result.gameType === 'reaction' ? '⚡' : '🍎'}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-1">{gameTypeText}</h3>
        <div className="text-3xl font-bold text-blue-600 mb-2">{scoreText}</div>
        <div className="text-lg text-purple-600 font-medium">{ranking}</div>
      </div>

      {showDetails && result.details && (
        <div className="mb-6 p-4 bg-gray-50/80 rounded-xl">
          <h4 className="text-sm font-medium text-gray-700 mb-2">상세 기록</h4>
          {result.gameType === 'reaction' ? (
            <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
              <div className="text-center">
                <div className="font-bold text-green-600">{result.details.best}ms</div>
                <div>최고</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-blue-600">{result.details.average}ms</div>
                <div>평균</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-red-600">{result.details.worst}ms</div>
                <div>최저</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
              <div className="text-center">
                <div className="font-bold text-orange-600">{result.details.combos}</div>
                <div>최대 콤보</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-red-600">{result.details.mistakes}</div>
                <div>실수 횟수</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-purple-600">{result.details.timeLeft}초</div>
                <div>남은 시간</div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-3 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          disabled={isSharing}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white px-4 py-2 rounded-xl font-medium transition-colors text-sm"
        >
          {isSharing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              공유 중...
            </>
          ) : (
            <>
              📤 공유하기
            </>
          )}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-400 text-white px-4 py-2 rounded-xl font-medium transition-colors text-sm"
        >
          {isDownloading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              저장 중...
            </>
          ) : (
            <>
              💾 이미지 저장
            </>
          )}
        </motion.button>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          친구들과 실력을 겨뤄보세요! 🎯
        </p>
      </div>
    </motion.div>
  );
}