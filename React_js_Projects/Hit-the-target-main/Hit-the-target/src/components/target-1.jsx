"use client";
import { useState } from "react";

function Target1({ x, y, onClick, visible = true, colorTheme }) {
  const [isPressed, setIsPressed] = useState(false);
  const [theme] = useState(colorTheme || Math.floor(Math.random() * 4));

  const colorThemes = {
    0: {
      outer: "bg-[#6C63FF]",
      middle: "bg-[#4ECDC4]",
      inner: "bg-[#FF69B4]",
      glow: "drop-shadow-[0_0_20px_rgba(108,99,255,0.4)]",
    },
    1: {
      outer: "bg-[#4ECDC4]",
      middle: "bg-[#FF69B4]",
      inner: "bg-[#6C63FF]",
      glow: "drop-shadow-[0_0_20px_rgba(78,205,196,0.4)]",
    },
    2: {
      outer: "bg-[#FF69B4]",
      middle: "bg-[#6C63FF]",
      inner: "bg-[#4ECDC4]",
      glow: "drop-shadow-[0_0_20px_rgba(255,105,180,0.4)]",
    },
    3: {
      outer: "bg-gradient-to-r from-[#6C63FF] via-[#4ECDC4] to-[#FF69B4]",
      middle: "bg-gradient-to-l from-[#6C63FF] via-[#4ECDC4] to-[#FF69B4]",
      inner: "bg-gradient-to-t from-[#6C63FF] via-[#4ECDC4] to-[#FF69B4]",
      glow: "drop-shadow-[0_0_25px_rgba(78,205,196,0.5)]",
    },
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    onClick?.();
  };

  return (
    <div
      onClick={handleClick}
      className={`absolute cursor-pointer transition-transform duration-300 ease-in-out origin-center ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-0"
      } ${isPressed ? "scale-90 rotate-12" : ""}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative w-[50px] h-[50px] transition-all duration-500 ease-in-out hover:scale-110 overflow-visible">
        <div
          className={`absolute w-full h-full rounded-full overflow-hidden ${colorThemes[theme].outer} ${colorThemes[theme].glow} animate-targetPulse transition-colors duration-300 group-hover:drop-shadow-[0_0_30px_rgba(108,99,255,0.6)]`}
        />
        <div
          className={`absolute w-[70%] h-[70%] rounded-full overflow-hidden ${colorThemes[theme].middle} animate-targetFloat transition-colors duration-300 group-hover:drop-shadow-[0_0_20px_rgba(78,205,196,0.5)]`}
          style={{
            top: "15%",
            left: "15%",
          }}
        />
        <div
          className={`absolute w-[40%] h-[40%] rounded-full overflow-hidden ${colorThemes[theme].inner} transition-colors duration-300 group-hover:drop-shadow-[0_0_15px_rgba(255,105,180,0.4)]`}
          style={{
            top: "30%",
            left: "30%",
          }}
        />
      </div>
      <style jsx global>{`
        @keyframes targetPulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.85; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes targetFloat {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(1px, 1px); }
          50% { transform: translate(0, 2px); }
          75% { transform: translate(-1px, 1px); }
        }

        .animate-targetPulse {
          animation: targetPulse 3s ease-in-out infinite;
        }

        .animate-targetFloat {
          animation: targetFloat 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function Target1Story() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="relative w-full h-[400px] bg-[#16213e] rounded-lg p-4">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="px-4 py-2 bg-[#6C63FF] text-white rounded-md font-inter hover:bg-[#5550DD] transition-colors"
        >
          Toggle Target
        </button>
      </div>

      <Target1
        x={100}
        y={100}
        visible={isVisible}
        colorTheme={0}
        onClick={() => console.log("Target clicked at 100,100")}
      />

      <Target1
        x={200}
        y={200}
        visible={isVisible}
        colorTheme={1}
        onClick={() => console.log("Target clicked at 200,200")}
      />

      <Target1
        x={300}
        y={300}
        visible={isVisible}
        colorTheme={2}
        onClick={() => console.log("Target clicked at 300,300")}
      />

      <Target1
        x={400}
        y={200}
        visible={isVisible}
        colorTheme={3}
        onClick={() => console.log("Target clicked at 400,200")}
      />
    </div>
  );
}

export default Target1;