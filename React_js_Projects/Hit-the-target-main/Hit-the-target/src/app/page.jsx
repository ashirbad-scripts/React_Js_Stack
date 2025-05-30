"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import Target1 from "../components/target-1"; // Adjust the path if needed


function MainComponent() {
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [targets, setTargets] = useState([]);
  const [missedTargets, setMissedTargets] = useState(0);
  const [speed, setSpeed] = useState(1500);
  const [countdown, setCountdown] = useState(0);
  const [lastMissPosition, setLastMissPosition] = useState(null);
  const [hitEffects, setHitEffects] = useState([]);
  const [perfectText, setPerfectText] = useState(null);
  const [streak, setStreak] = useState(0);
  const gameAreaRef = useRef(null);
  const isTouchDevice = useRef("ontouchstart" in window);
  const spawnTarget = useCallback(() => {
    if (gameAreaRef.current) {
      const rect = gameAreaRef.current.getBoundingClientRect();
      const padding = 75;
      const minDistance = 100;

      let attempts = 0;
      let x, y;

      do {
        x = Math.random() * (rect.width - 2 * padding) + padding;
        y = Math.random() * (rect.height - 2 * padding) + padding;
        attempts++;

        const tooClose = targets.some((target) => {
          const distance = Math.sqrt(
            Math.pow(target.x - x, 2) + Math.pow(target.y - y, 2)
          );
          return distance < minDistance;
        });

        if (!tooClose || attempts > 10) break;
      } while (true);

      const id = Date.now();
      const spawnTime = Date.now();

      setTargets((prev) => [...prev, { id, x, y, spawnTime }]);

      setTimeout(() => {
        setTargets((prev) => {
          const stillExists = prev.find((t) => t.id === id);
          if (stillExists) {
            setLastMissPosition({ x, y });
            setStreak(0);
            setMissedTargets((m) => {
              const newMissed = m + 1;
              if (newMissed >= 3) setGameOver(true);
              document.body.style.animation = "screenShake 0.2s ease-in-out";
              setTimeout(() => {
                document.body.style.animation = "";
              }, 200);
              return newMissed;
            });
            return prev.filter((t) => t.id !== id);
          }
          return prev;
        });
      }, speed);
    }
  }, [speed, targets]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (!gameStarted || gameOver) startGame();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    let interval;
    if (gameStarted && !gameOver) {
      interval = setInterval(spawnTarget, speed);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameOver, spawnTarget, speed]);

  const handleTargetClick = (targetId) => {
    const target = targets.find((t) => t.id === targetId);
    if (target) {
      const reactionTime = Date.now() - target.spawnTime;

      setHitEffects((prev) => [
        ...prev,
        { x: target.x, y: target.y, id: Date.now() },
      ]);
      setTimeout(
        () =>
          setHitEffects((prev) =>
            prev.filter((effect) => effect.id !== Date.now())
          ),
        500
      );

      let streakMessage;
      if (streak >= 15) {
        streakMessage = "UNSTOPPABLE!";
      } else if (streak >= 12) {
        streakMessage = "LEGENDARY!";
      } else if (streak >= 9) {
        streakMessage = "DOMINATING!";
      } else if (streak >= 6) {
        streakMessage = "INCREDIBLE!";
      } else if (streak >= 3) {
        streakMessage = "AWESOME!";
      } else if (reactionTime < 500) {
        streakMessage = "Perfect!";
      } else if (reactionTime < 1000) {
        streakMessage = "Great!";
      }

      setPerfectText({
        x: target.x,
        y: target.y,
        text: streakMessage,
        id: Date.now(),
      });
      setTimeout(() => setPerfectText(null), 1000);
    }

    setTargets((prev) => prev.filter((t) => t.id !== targetId));
    setScore((prev) => {
      const newScore = prev + 1;
      if (newScore % 3 === 0) {
        setSpeed((s) => Math.max(s * 0.85, 600));
      }
      return newScore;
    });
    setStreak((prev) => prev + 1);
  };
  const startGame = () => {
    setCountdown(3);
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setGameStarted(true);
          setGameOver(false);
          setScore(0);
          setStreak(0);
          setMissedTargets(0);
          setTargets([]);
          setSpeed(1500);
          setLastMissPosition(null);
          setHitEffects([]);
          setPerfectText(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2D1B69] via-[#1E3B7E] to-[#0D1B3C] text-white font-inter flex flex-col items-center p-6 touch-manipulation">
      {!gameStarted && !gameOver && (
        <div className="text-center mb-12">
          <h1 className="text-7xl font-bold mb-8 bg-gradient-to-r from-[#4ECDC4] via-[#6C63FF] to-[#FF69B4] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(78,205,196,0.5)] animate__bounceInDown backdrop-blur">
            Target Hit Game
          </h1>
          <div className="max-w-md mx-auto bg-[#1E1E3F]/80 backdrop-blur-lg p-8 rounded-2xl shadow-[0_0_50px_rgba(123,97,255,0.15)] border border-[#7B61FF]/20">
            <h2 className="text-3xl mb-6 text-[#4ECDC4] font-bold animate-float">
              How to Play:
            </h2>
            <ul className="text-left space-y-4 text-lg animate-wave">
              <li className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <span className="text-[#4ECDC4]/90">
                  Click the targets as they appear
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <span className="text-[#4ECDC4]/90">
                  Speed increases every 5 points
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">❌</span>
                <span className="text-[#4ECDC4]/90">
                  Miss 3 targets and it's game over
                </span>
              </li>
            </ul>
            <button
              onClick={startGame}
              className="mt-8 w-full px-8 py-4 bg-gradient-to-r from-[#7B61FF] via-[#4ECDC4] to-[#FF69B4] text-white rounded-xl text-xl font-bold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(123,97,255,0.3)] active:scale-95 border border-white/10"
            >
              Start Game
            </button>
          </div>
        </div>
      )}

      {gameStarted && (
        <div className="w-full text-center mb-4">
          <div className="text-3xl font-bold animate-float">
            Score:{" "}
            <span className="text-[#4ECDC4] drop-shadow-[0_0_10px_rgba(78,205,196,0.3)] animate-score">
              {score}
            </span>
          </div>
          {streak >= 3 && (
            <div className="text-xl animate-float">
              Streak:{" "}
              <span className="text-[#FF69B4] drop-shadow-[0_0_10px_rgba(255,105,180,0.3)]">
                {streak}🔥
              </span>
            </div>
          )}
          <div className="text-xl animate-float">
            Misses:{" "}
            <span className="text-[#FF69B4] drop-shadow-[0_0_10px_rgba(255,105,180,0.3)]">
              {missedTargets}/3
            </span>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 animate-float-rotate text-[#FF69B4] drop-shadow-[0_0_20px_rgba(255,105,180,0.5)]">
            Game Over!
          </h2>
          <p className="text-2xl mb-4 animate-float">
            Final Score:{" "}
            <span className="text-[#4ECDC4] animate-pulse">{score}</span>
          </p>
          <div className="flex justify-center gap-4 items-center">
            <button
              onClick={startGame}
              className="px-8 py-3 bg-gradient-to-r from-[#6C63FF] via-[#4ECDC4] to-[#FF69B4] text-white rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 animate-pulse-border"
            >
              Play Again
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="p-3 bg-gradient-to-r from-[#6C63FF] to-[#4ECDC4] text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(123,97,255,0.3)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div
        ref={gameAreaRef}
        className="relative w-full max-w-4xl bg-[#1E1E3F]/90 backdrop-blur-md rounded-lg flex-grow max-h-[70vh] overflow-hidden shadow-[0_0_30px_rgba(123,97,255,0.2)] border border-[#7B61FF]/20"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(123,97,255,0.05) 0%, transparent 70%), repeating-linear-gradient(45deg, rgba(123,97,255,0.01) 0px, rgba(123,97,255,0.01) 1px, transparent 1px, transparent 30px), repeating-linear-gradient(-45deg, rgba(123,97,255,0.01) 0px, rgba(123,97,255,0.01) 1px, transparent 1px, transparent 30px)",
        }}
      >
        {countdown > 0 && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <div
              className="text-7xl font-bold bg-gradient-to-r from-[#7B61FF] via-[#4ECDC4] to-[#FF69B4] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(123,97,255,0.5)]"
              style={{ animation: "countdownAnimation 1s ease-in-out" }}
            >
              {countdown}
            </div>
          </div>
        )}

        {lastMissPosition && (
          <div
            className="absolute w-12 h-12 border-2 border-[#FF4B4B] rounded-full"
            style={{
              left: `${lastMissPosition.x}px`,
              top: `${lastMissPosition.y}px`,
              transform: "translate(-50%, -50%)",
              animation: "missIndicator 1s ease-out forwards",
              boxShadow: "0 0 20px rgba(255,75,75,0.4)",
            }}
          />
        )}

        {hitEffects.map((effect) => (
          <div
            key={effect.id}
            className="absolute w-16 h-16 border-3 border-[#4ECDC4] rounded-full"
            style={{
              left: `${effect.x}px`,
              top: `${effect.y}px`,
              transform: "translate(-50%, -50%)",
              animation: "hitEffect 0.5s ease-out forwards",
              boxShadow: "0 0 30px rgba(78,205,196,0.6)",
            }}
          />
        ))}

        {perfectText && (
          <div
            className="absolute text-2xl font-bold"
            style={{
              left: `${perfectText.x}px`,
              top: `${perfectText.y}px`,
              transform: "translate(-50%, -50%)",
              animation: "perfectText 1s ease-out forwards",
              color:
                streak >= 9
                  ? "#FF69B4"
                  : streak >= 6
                  ? "#6C63FF"
                  : streak >= 3
                  ? "#4ECDC4"
                  : perfectText.text === "Perfect!"
                  ? "#7B61FF"
                  : "#4ECDC4",
              textShadow: `0 0 ${
                15 + Math.min(streak * 2, 30)
              }px rgba(123,97,255,0.6)`,
              fontSize: `${Math.min(1.5 + streak * 0.1, 2.5)}rem`,
            }}
          >
            {perfectText.text}
          </div>
        )}

        {targets.map((target) => (
          <Target1
            key={target.id}
            x={target.x}
            y={target.y}
            onClick={() => handleTargetClick(target.id)}
          />
        ))}
      </div>

      <div className="text-center mt-4 text-[#4ECDC4]/60 text-sm">
        © 2025 Target Hit Game. All rights reserved.
      </div>

      <style jsx global>{`
  @keyframes bounceInDown {
    from {
      opacity: 0;
      transform: translate3d(0, -3000px, 0) scaleY(3);
    }

    60% {
      opacity: 1;
      transform: translate3d(0, 25px, 0) scaleY(0.9);
    }

    75% {
      transform: translate3d(0, -10px, 0) scaleY(0.95);
    }

    90% {
      transform: translate3d(0, 5px, 0) scaleY(0.985);
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes title-glow {
    0%, 100% { text-shadow: 0 0 30px rgba(45,27,105,0.4); }
    50% { text-shadow: 0 0 50px rgba(30,59,126,0.6); }
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
    100% { transform: translateY(0px); }
  }

  @keyframes wave {
    0% { transform: translateX(0px) rotate(0deg); }
    50% { transform: translateX(3px) rotate(1deg); }
    100% { transform: translateX(0px) rotate(0deg); }
  }

  @keyframes score {
    0% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.2) rotate(3deg); }
    100% { transform: scale(1) rotate(0deg); }
  }

  @keyframes float-rotate {
    0% { transform: translateY(0px) rotate(0deg) scale(1); }
    50% { transform: translateY(-12px) rotate(5deg) scale(1.05); }
    100% { transform: translateY(0px) rotate(0deg) scale(1); }
  }

  @keyframes countdownAnimation {
    0% { transform: scale(2) rotate(-8deg); opacity: 0; filter: blur(4px); }
    25% { transform: scale(1.5) rotate(5deg); opacity: 1; filter: blur(0); }
    75% { transform: scale(1.2) rotate(-5deg); opacity: 1; filter: blur(0); }
    100% { transform: scale(0) rotate(8deg); opacity: 0; filter: blur(4px); }
  }

  @keyframes hitEffect {
    0% { transform: scale(0.8) translate(-50%, -50%); opacity: 1; box-shadow: 0 0 50px rgba(123,97,255,0.8); }
    50% { transform: scale(1.5) translate(-50%, -50%); opacity: 0.7; box-shadow: 0 0 70px rgba(78,205,196,0.8); }
    100% { transform: scale(2.2) translate(-50%, -50%); opacity: 0; box-shadow: 0 0 0 rgba(255,105,180,0); }
  }

  @keyframes screenShake {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(4px, 4px) rotate(1deg); }
    75% { transform: translate(-4px, -4px) rotate(-1deg); }
  }

  @keyframes perfectText {
    0% { transform: translateY(0) scale(0.8) rotate(0deg); opacity: 0; filter: blur(4px); }
    25% { transform: translateY(-20px) scale(1.3) rotate(-5deg); opacity: 1; filter: blur(0); }
    75% { transform: translateY(-30px) scale(1.2) rotate(5deg); opacity: 1; filter: blur(0); }
    100% { transform: translateY(-40px) scale(0.8) rotate(0deg); opacity: 0; filter: blur(4px); }
  }

  @keyframes missIndicator {
    0% { transform: translate(-50%, -50%) scale(0.8) rotate(0deg); opacity: 1; }
    50% { transform: translate(-50%, -50%) scale(1.5) rotate(180deg); opacity: 0.6; }
    100% { transform: translate(-50%, -50%) scale(2) rotate(360deg); opacity: 0; }
  }

  .animate__bounceInDown {
    animation: bounceInDown 1s ease-out;
  }

  .animate-title-glow {
    animation: title-glow 3s ease-in-out infinite;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .animate-wave {
    animation: wave 2s ease-in-out infinite;
  }

  .animate-score {
    animation: score 0.3s ease-in-out;
  }

  .animate-float-rotate {
    animation: float-rotate 3s ease-in-out infinite;
  }
`}</style>
    </div>
  );
}

export default MainComponent;