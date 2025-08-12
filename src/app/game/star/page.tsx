"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useGameStore } from "@/store/gameStore";
import { saveResult, getRanking } from "@/utils/storage";
import { shareResult, downloadResultImage } from "@/utils/sharing";
import Particles from "@/components/Particles";

interface Star {
  id: string;
  number: number;
  x: number;
  y: number;
  speed: number;
}

type GamePhase = "ready" | "playing" | "paused" | "finished";

export default function StarGame() {
  const [phase, setPhase] = useState<GamePhase>("ready");
  const [stars, setStars] = useState<Star[]>([]);
  const [selectedStars, setSelectedStars] = useState<Star[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameSpeed, setGameSpeed] = useState(1);

  const { setCurrentGame } = useGameStore();

  useEffect(() => {
    setCurrentGame("apple");
    return () => setCurrentGame(null);
  }, [setCurrentGame]);

  // 게임 타이머
  useEffect(() => {
    if (phase === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [phase, timeLeft]);

  // 별똥별 생성
  useEffect(() => {
    if (phase === "playing") {
      const interval = setInterval(() => {
        spawnStar();
      }, Math.max(1000 - (gameSpeed - 1) * 100, 300));

      return () => clearInterval(interval);
    }
  }, [phase, gameSpeed]);

  // 별똥별 이동
  useEffect(() => {
    if (phase === "playing") {
      const interval = setInterval(() => {
        setStars((prev) =>
          prev
            .map((star) => ({
              ...star,
              y: star.y + star.speed,
            }))
            .filter((star) => star.y < window.innerHeight + 100)
        );
      }, 50);

      return () => clearInterval(interval);
    }
  }, [phase]);

  // 게임 속도 증가
  useEffect(() => {
    if (phase === "playing") {
      const interval = setInterval(() => {
        setGameSpeed((prev) => Math.min(prev + 0.1, 3));
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [phase]);

  const spawnStar = () => {
    // 게이지바 영역(우측 80px) 제외하고 별 생성
    const gameAreaWidth = window.innerWidth - 80; // 게이지바 + 여백 제외
    const newStar: Star = {
      id: Date.now().toString() + Math.random(),
      number: Math.floor(Math.random() * 9) + 1, // 1-9
      x: Math.random() * (gameAreaWidth - 80) + 40, // 좌우 여백 40px씩
      y: -50,
      speed: Math.random() * 2 + 1 + gameSpeed,
    };

    setStars((prev) => [...prev, newStar]);
  };

  const selectStar = (star: Star) => {
    const newSelected = [...selectedStars, star];
    setSelectedStars(newSelected);

    // 별똥별 제거
    setStars((prev) => prev.filter((s) => s.id !== star.id));

    // 합계 계산
    const sum = newSelected.reduce((total, s) => total + s.number, 0);

    if (sum === 10) {
      // 성공!
      const points = 100 + combo * 10;
      setScore((prev) => prev + points);
      setCombo((prev) => prev + 1);
      setSelectedStars([]);
    } else if (sum > 10) {
      // 실패
      setMistakes((prev) => prev + 1);
      setCombo(0);
      setSelectedStars([]);
    }

    // 2개 이상 선택했는데 10이 안 되면 자동으로 리셋
    if (newSelected.length >= 3 && sum !== 10) {
      setTimeout(() => {
        setSelectedStars([]);
        setMistakes((prev) => prev + 1);
        setCombo(0);
      }, 500);
    }
  };

  const startGame = () => {
    setPhase("playing");
    setScore(0);
    setCombo(0);
    setMistakes(0);
    setTimeLeft(60);
    setGameSpeed(1);
    setStars([]);
    setSelectedStars([]);
  };

  const endGame = () => {
    setPhase("finished");

    const gameResult = {
      id: Date.now().toString(),
      gameType: "apple" as const,
      score: score,
      timestamp: Date.now(),
      details: {
        timeLeft: timeLeft,
        combos: combo,
        mistakes: mistakes,
      },
    };

    saveResult(gameResult);
  };

  const restartGame = () => {
    setPhase("ready");
    setScore(0);
    setCombo(0);
    setMistakes(0);
    setTimeLeft(60);
    setGameSpeed(1);
    setStars([]);
    setSelectedStars([]);
  };

  const getSelectedSum = () => {
    return selectedStars.reduce((sum, star) => star.number + sum, 0);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* WebGL 파티클 배경 */}
      <div className="absolute inset-0 w-full h-full">
        <Particles
          particleCount={250}
          particleSpread={12}
          speed={0.3}
          particleColors={[
            "#a855f7",
            "#3b82f6",
            "#8b5cf6",
            "#ec4899",
            "#f59e0b",
            "#ffffff",
          ]}
          moveParticlesOnHover={false}
          particleHoverFactor={0}
          alphaParticles={true}
          particleBaseSize={80}
          sizeRandomness={1.5}
          cameraDistance={20}
          disableRotation={false}
          className="w-full h-full"
        />
      </div>
      {/* 타임 게이지바 */}
      {phase === "playing" && (
        <div className="fixed top-4 right-4 z-20 h-[90%]">
          <div className=" w-[40px] h-[40px] mb-[10px] bg-black/80 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-purple-400">
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
              {/* 시간 텍스트 */}
            </div>
          </div>
        </div>
      )}

      {/* 상단 헤더  phase === "playing" ? "right-20" : "right-4" */}
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

      {/* 선택된 별똥별 표시 */}
      {phase === "playing" && selectedStars.length > 0 && (
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

      {/* 게임 시작 화면 */}
      {phase === "ready" && (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl font-bold text-purple-300">별똥별 게임</h1>
            <p className="text-lg text-gray-300 ">
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
              <button
                // onClick={startGame}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xl px-8 py-4 rounded-2xl font-bold transition-all shadow-lg transform hover:scale-105"
              >
                연습하기(개발중)
              </button>
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xl px-8 py-4 rounded-2xl font-bold transition-all shadow-lg transform hover:scale-105"
              >
                게임 시작하기
              </button>
              <button
                // onClick={startGame}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xl px-8 py-4 rounded-2xl font-bold transition-all shadow-lg transform hover:scale-105"
              >
                친구들과 내기 하기(개발중)
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* 게임 플레이 화면 */}
      {phase === "playing" && (
        <div className="game-area pr-20">
          {" "}
          {/* 우측 80px 여백 확보 */}
          <AnimatePresence>
            {stars.map((star) => (
              <motion.div
                key={star.id}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                exit={{ scale: 0 }}
                onClick={() => selectStar(star)}
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
      )}

      {/* 게임 종료 화면 */}
      {phase === "finished" && (
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
                onClick={() =>
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
                  })
                }
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-xl font-medium transition-all transform hover:scale-105"
              >
                📤 공유하기
              </button>

              <button
                onClick={() =>
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
                  })
                }
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-4 py-2 rounded-xl font-medium transition-all transform hover:scale-105"
              >
                💾 이미지 저장
              </button>

              <button
                onClick={restartGame}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-xl font-medium transition-all transform hover:scale-105"
              >
                🔄 다시하기
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* 광고 배너 영역 */}
      {/* {phase === "playing" && (
        <div className="fixed bottom-4 left-4 right-4 z-10">
          <div className="bg-black/60 backdrop-blur-md rounded-lg p-2 text-center text-gray-400 text-xs border border-purple-500/40">
            광고 영역
          </div>
        </div>
      )} */}
    </div>
  );
}
