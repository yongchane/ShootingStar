"use client";

import Particles from "@/components/Particles";
import GameHeader from "../components/GameHeader";
import GameStart from "../components/GameStart";
import GamePlay from "../components/GamePlay";
import GameEnd from "../components/GameEnd";
import { useStarGame } from "@/hooks/useStarGame";

export default function OthersGame() {
  const {
    phase,
    stars,
    selectedStars,
    score,
    combo,
    mistakes,
    timeLeft,
    selectStar,
    startGame,
    restartGame,
    getSelectedSum,
  } = useStarGame({ initialPhase: "ready" });

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
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

      <GameHeader
        phase={phase}
        score={score}
        combo={combo}
        mistakes={mistakes}
        timeLeft={timeLeft}
      />

      {phase === "ready" && <GameStart onStartGame={startGame} />}

      {phase === "playing" && (
        <GamePlay
          stars={stars}
          selectedStars={selectedStars}
          onSelectStar={selectStar}
          getSelectedSum={getSelectedSum}
        />
      )}

      {phase === "finished" && (
        <GameEnd
          score={score}
          combo={combo}
          mistakes={mistakes}
          timeLeft={timeLeft}
          onRestart={restartGame}
        />
      )}
    </div>
  );
}
