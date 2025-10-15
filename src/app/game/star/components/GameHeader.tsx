"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface GameHeaderProps {
  phase: "ready" | "playing" | "paused" | "finished";
  score: number;
  combo: number;
  mistakes: number;
  timeLeft: number;
}

export default function GameHeader({
  phase,
  score,
  combo,
  mistakes,
  timeLeft,
}: GameHeaderProps) {
  return (
    <>
      {/* 타임 게이지바 */}
      {phase === "playing" && (
        <div className="fixed top-4 right-4 z-20 h-[90%]">
          <div className="w-[40px] h-[40px] mb-[10px] bg-black/80 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-purple-400">
            {timeLeft}
          </div>
          <div
            className="bg-black/60 backdrop-blur-md rounded-full p-3 border border-purple-500/40"
            style={{ height: "calc(100% - 40px)" }}
          >
            <div className="relative w-4 h-full">
              {/* 배경 게이지 */}
              <div className="absolute inset-0 bg-gray-700/50 rounded-full"></div>
              {/* 시간 게이지 */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-500 via-yellow-500 to-green-500 rounded-full"
                initial={{ height: "100%" }}
                animate={{
                  height: `${(timeLeft / 60) * 100}%`,
                  background:
                    timeLeft > 30
                      ? "linear-gradient(to top, #22c55e, #84cc16)" // 초록색
                      : timeLeft > 15
                      ? "linear-gradient(to top, #f59e0b, #eab308)" // 노란색
                      : "linear-gradient(to top, #ef4444, #dc2626)", // 빨간색
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 상단 헤더 */}
      <div
        className={`fixed top-4 left-4 ${
          phase === "playing" ? "right-20" : "right-4"
        } flex justify-between items-center z-20 bg-black/60 backdrop-blur-md rounded-xl p-3 border border-purple-500/40`}
      >
        <Link
          href="/"
          className="text-purple-300 hover:text-purple-100 transition-colors"
        >
          ← 홈으로
        </Link>

        {phase === "playing" && (
          <div className="flex gap-4 text-sm text-white">
            <div>⭐ {score}점</div>
            <div>🔥 콤보 {combo}</div>
            <div>❌ 실수 {mistakes}</div>
          </div>
        )}
      </div>
    </>
  );
}
