'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getResults, getResultsByType, getBestScore, getAverageScore, getRanking } from '@/utils/storage';
import { shareResult, downloadResultImage } from '@/utils/sharing';
import type { GameResult, ReactionResult, AppleResult } from '@/utils/storage';

export default function ResultsPage() {
  const [results, setResults] = useState<GameResult[]>([]);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = () => {
    setResults(getResultsByType('apple'));
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const appleStats = {
    bestScore: getBestScore('apple'),
    averageScore: getAverageScore('apple'),
    totalGames: getResultsByType('apple').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 relative overflow-hidden">
      {/* 별똥별 배경 애니메이션 */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-pulse opacity-30`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            ⭐
          </div>
        ))}
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-purple-300 hover:text-purple-100 transition-colors">
            ← 홈으로
          </Link>
          <h1 className="text-3xl font-bold text-white">⭐ 내 기록</h1>
          <div></div>
        </div>

        {/* 통계 카드 */}
        <div className="max-w-2xl mx-auto mb-8">
          {/* 별똥별게임 통계 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-purple-500/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">⭐</div>
              <h3 className="text-xl font-bold text-purple-300">별똥별게임 통계</h3>
            </div>
            
            {appleStats.totalGames > 0 ? (
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>총 플레이:</span>
                  <span className="font-bold text-white">{appleStats.totalGames}회</span>
                </div>
                <div className="flex justify-between">
                  <span>최고 점수:</span>
                  <span className="font-bold text-yellow-400">{appleStats.bestScore?.score}점</span>
                </div>
                <div className="flex justify-between">
                  <span>평균 점수:</span>
                  <span className="font-bold text-blue-400">{appleStats.averageScore}점</span>
                </div>
                <div className="mt-3 text-sm text-center p-2 bg-purple-900/50 rounded-lg text-purple-300">
                  {getRanking('apple', appleStats.averageScore)}
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-center py-4">
                아직 플레이한 기록이 없어요
              </div>
            )}
          </motion.div>
        </div>


        {/* 결과 목록 */}
        <div className="space-y-4">
          {results.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-400"
            >
              <div className="text-6xl mb-4">⭐</div>
              <p>아직 플레이한 기록이 없어요!</p>
              <p className="mt-2">게임을 플레이하고 기록을 남겨보세요.</p>
            </motion.div>
          ) : (
            results.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/40 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border border-purple-500/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">⭐</div>
                    <div>
                      <div className="font-bold text-lg text-white">별똥별게임</div>
                      <div className="text-sm text-gray-400">
                        {formatDate(result.timestamp)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-400">
                      {result.score}점
                    </div>
                    <div className="text-sm text-purple-400">
                      {getRanking(result.gameType, result.score).split(' ')[0]}
                    </div>
                  </div>
                </div>

                {/* 세부 정보 */}
                {result.details && (
                  <div className="mt-3 pt-3 border-t border-purple-500/30">
                    <div className="flex gap-4 text-sm text-gray-400">
                      <span>콤보: {(result as AppleResult).details.combos}</span>
                      <span>실수: {(result as AppleResult).details.mistakes}</span>
                      <span>잔여시간: {(result as AppleResult).details.timeLeft}초</span>
                    </div>
                  </div>
                )}

                {/* 액션 버튼 */}
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => shareResult(result)}
                    className="text-sm bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-3 py-1 rounded-lg transition-all transform hover:scale-105"
                  >
                    📤 공유
                  </button>
                  <button
                    onClick={() => downloadResultImage(result)}
                    className="text-sm bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-3 py-1 rounded-lg transition-all transform hover:scale-105"
                  >
                    💾 저장
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* 게임 시작 버튼 */}
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              ⭐ 게임 플레이하러 가기
            </Link>
          </motion.div>
        )}

        {/* 광고 배너 영역 */}
        <div className="mt-8">
          <div className="bg-black/20 rounded-lg p-4 text-center text-gray-500 text-sm border-2 border-dashed border-purple-500/30">
            광고 영역 (애드센스 승인 후 활성화)
          </div>
        </div>
      </div>
    </div>
  );
}