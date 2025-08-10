"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GameCard from "@/components/GameCard";
import AdBanner from "@/components/AdBanner";
import GradientText from "@/components/GradientText";
import Particles from "@/components/Particles";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-black">
      {/* WebGL 파티클 배경 */}
      <div className="absolute inset-0 w-full h-full">
        <Particles
          particleCount={300}
          particleSpread={15}
          speed={0.2}
          particleColors={[
            "#a855f7",
            "#3b82f6",
            "#8b5cf6",
            "#ec4899",
            "#f59e0b",
          ]}
          moveParticlesOnHover={true}
          particleHoverFactor={2}
          alphaParticles={true}
          particleBaseSize={120}
          sizeRandomness={2}
          cameraDistance={25}
          disableRotation={false}
          className="w-full h-full"
        />
      </div>
      <div className="w-full max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 md:space-y-8"
        >
          {/* 메인 타이틀 */}
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
              <GradientText
                colors={["#a855f7", "#3b82f6", "#4f46e5"]}
                animationSpeed={6}
                showBorder={false}
              >
                ⭐ 별똥별 게임
              </GradientText>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300">
              떨어지는 별똥별을 클릭해서{" "}
              <span className="font-bold text-purple-400">
                10을 만들어보자!
              </span>
            </p>
            <p className="text-sm md:text-base text-gray-400">
              60초 안에 최고 점수를 달성하고 우주 최강을 증명해보자!
            </p>
          </div>

          {/* 게임 시작 버튼 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 md:mt-12"
          >
            <Link
              href="/game/star"
              className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              게임 시작하기
            </Link>
          </motion.div>

          {/* 네비게이션 링크 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex justify-center mt-6 md:mt-8"
          >
            <Link
              href="/results"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-purple-300 hover:text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl border border-purple-500/30"
            >
              🏆 내 기록 보기
            </Link>
          </motion.div>

          {/* 하단 설명 */}
        </motion.div>

        {/* 광고 배너 영역 */}
        {/* <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="w-full max-w-2xl mx-auto mt-12 md:mt-16"
        >
          <AdBanner className="w-full" />
        </motion.div> */}
      </div>
    </div>
  );
}
