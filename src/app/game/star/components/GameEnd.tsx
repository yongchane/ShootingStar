"use client";

import { motion } from "framer-motion";
import { shareResult, downloadResultImage } from "@/utils/sharing";

interface GameEndProps {
  score: number;
  combo: number;
  mistakes: number;
  timeLeft: number;
  onRestart: () => void;
}

export default function GameEnd({
  score,
  combo,
  mistakes,
  timeLeft,
  onRestart,
}: GameEndProps) {
  const handleShare = () => {
    shareResult({
      id: Date.now().toString(),
      gameType: "apple",
      score: score,
      timestamp: Date.now(),
      details: {
        timeLeft: timeLeft,
        combos: combo,
        mistakes: mistakes,
      },
    });
  };

  const handleDownload = () => {
    downloadResultImage({
      id: Date.now().toString(),
      gameType: "apple",
      score: score,
      timestamp: Date.now(),
      details: {
        timeLeft: timeLeft,
        combos: combo,
        mistakes: mistakes,
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center space-y-6"
      >
        <div className="text-6xl mb-4">🎉</div>

        <div className="bg-black/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-purple-500/50">
          <h2 className="text-3xl font-bold mb-6 text-purple-300">
            게임 완료!
          </h2>

          <div className="space-y-3 text-lg mb-6 text-gray-300">
            <div>
              최종 점수:{" "}
              <span className="font-bold text-2xl text-yellow-400">
                {score}점
              </span>
            </div>
            <div>
              최고 콤보:{" "}
              <span className="font-bold text-orange-400">{combo}연속</span>
            </div>
            <div>
              실수 횟수:{" "}
              <span className="font-bold text-red-400">{mistakes}회</span>
            </div>
            <div>
              남은 시간:{" "}
              <span className="font-bold text-blue-400">{timeLeft}초</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={handleShare}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-xl font-medium transition-all transform hover:scale-105"
          >
            📤 공유하기
          </button>

          <button
            onClick={handleDownload}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-4 py-2 rounded-xl font-medium transition-all transform hover:scale-105"
          >
            💾 이미지 저장
          </button>

          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-xl font-medium transition-all transform hover:scale-105"
          >
            🔄 다시하기
          </button>
        </div>
      </motion.div>
    </div>
  );
}
