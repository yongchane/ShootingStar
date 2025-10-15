"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Star {
  id: string;
  number: number;
  x: number;
  y: number;
  speed: number;
}

interface GamePlayProps {
  stars: Star[];
  selectedStars: Star[];
  onSelectStar: (star: Star) => void;
  getSelectedSum: () => number;
}

export default function GamePlay({
  stars,
  selectedStars,
  onSelectStar,
  getSelectedSum,
}: GamePlayProps) {
  return (
    <>
      {/* 선택된 별똥별 표시 */}
      {selectedStars.length > 0 && (
        <div className="fixed top-20 left-4 right-20 z-20">
          <div className="bg-transparent backdrop-blur-sm rounded-xl p-4 text-center border border-purple-500/30">
            <div className="flex justify-center gap-2 items-center mb-2">
              {selectedStars.map((star, index) => (
                <span key={star.id}>
                  <span className="text-2xl font-bold text-yellow-300">
                    {star.number}
                  </span>
                  {index < selectedStars.length - 1 && (
                    <span className="mx-1 text-white">+</span>
                  )}
                </span>
              ))}
              <span className="mx-2 text-white">=</span>
              <span
                className={`text-2xl font-bold ${
                  getSelectedSum() === 10
                    ? "text-green-400"
                    : getSelectedSum() > 10
                    ? "text-red-400"
                    : "text-blue-400"
                }`}
              >
                {getSelectedSum()}
              </span>
            </div>
            <div className="text-sm text-gray-300">
              {getSelectedSum() === 10
                ? "🌟 완성!"
                : getSelectedSum() > 10
                ? "💥 너무 커요!"
                : "10을 만들어주세요"}
            </div>
          </div>
        </div>
      )}

      {/* 게임 플레이 영역 */}
      <div className="game-area pr-20">
        <AnimatePresence>
          {stars.map((star) => (
            <motion.div
              key={star.id}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              exit={{ scale: 0 }}
              onClick={() => onSelectStar(star)}
              style={{
                position: "absolute",
                left: star.x,
                top: star.y,
              }}
              className="star w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg cursor-pointer select-none border-2 border-yellow-300"
              whileHover={{ scale: 1.1, rotate: 405 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              }}
            >
              {star.number}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
