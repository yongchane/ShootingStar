import { useState, useEffect, useCallback } from "react";
import { useGameStore } from "@/store/gameStore";
import { saveResult } from "@/utils/storage";

interface Star {
  id: string;
  number: number;
  x: number;
  y: number;
  speed: number;
}

type GamePhase = "ready" | "playing" | "paused" | "finished";

interface UseStarGameProps {
  initialPhase?: GamePhase;
  autoStart?: boolean;
}

export function useStarGame({
  initialPhase = "ready",
  autoStart = false,
}: UseStarGameProps = {}) {
  const [phase, setPhase] = useState<GamePhase>(initialPhase);
  const [stars, setStars] = useState<Star[]>([]);
  const [selectedStars, setSelectedStars] = useState<Star[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameSpeed, setGameSpeed] = useState(1);

  const { setCurrentGame } = useGameStore();

  // 게임 종료 함수를 먼저 정의
  const endGame = useCallback(() => {
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
  }, [score, timeLeft, combo, mistakes]);

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
  }, [phase, timeLeft, endGame]);

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

  const restartGame = useCallback((restartPhase: GamePhase = "ready") => {
    setPhase(restartPhase);
    setScore(0);
    setCombo(0);
    setMistakes(0);
    setTimeLeft(60);
    setGameSpeed(1);
    setStars([]);
    setSelectedStars([]);
  }, []);

  const getSelectedSum = () => {
    return selectedStars.reduce((sum, star) => star.number + sum, 0);
  };

  return {
    // State
    phase,
    stars,
    selectedStars,
    score,
    combo,
    mistakes,
    timeLeft,
    gameSpeed,

    // Actions
    selectStar,
    startGame,
    endGame,
    restartGame,
    getSelectedSum,

    // For direct state manipulation if needed
    setPhase,
  };
}
