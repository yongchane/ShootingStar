"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface GameStartProps {
  onStartGame: () => void;
}

export default function GameStart({ onStartGame }: GameStartProps) {
  const router = useRouter();

  const handleNavigateToAlone = () => {
    router.push("/game/star/alone");
  };

  const handleNavigateToOthers = () => {
    router.push("/game/star/others");
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl font-bold text-purple-300">별똥별 게임</h1>
        <p className="text-lg text-gray-300">
          떨어지는 별똥별을 클릭해서 숫자의 합을 정확히
          <span className="font-bold text-yellow-400">10</span>으로
          만들어보세요!
        </p>

        <div className="bg-black/80 backdrop-blur-md rounded-xl p-6 space-y-3 border border-purple-500/50">
          <div className="text-left space-y-1 text-gray-300">
            <div>제한시간: 60초</div>
            <div>목표: 숫자 합 10 만들기</div>
            <div>콤보로 보너스 점수!</div>
            <div>시간이 지날수록 속도 증가</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
          {/* <button
            onClick={handleNavigateToAlone}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xl px-8 py-4 rounded-2xl font-bold transition-all shadow-lg transform hover:scale-105"
          >
            연습하기
          </button> */}
          <button
            onClick={onStartGame}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xl px-8 py-4 rounded-2xl font-bold transition-all shadow-lg transform hover:scale-105"
          >
            게임 시작하기
          </button>
          {/* <button
            onClick={handleNavigateToOthers}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xl px-8 py-4 rounded-2xl font-bold transition-all shadow-lg transform hover:scale-105"
          >
            친구들과 내기 하기
          </button> */}
        </div>
      </motion.div>
    </div>
  );
}
