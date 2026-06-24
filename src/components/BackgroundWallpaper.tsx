import React from "react";
import { motion } from "motion/react";
import { Language } from "../utils/translations";

interface BackgroundWallpaperProps {
  selectedWallpaper: string;
  isDarkMode: boolean;
  language: Language;
}

export default function BackgroundWallpaper({
  selectedWallpaper,
  isDarkMode,
  language
}: BackgroundWallpaperProps) {
  
  // Custom interactive/live elements depending on selected wallpaper
  const renderLiveElements = () => {
    switch (selectedWallpaper) {
      case "clean_mint":
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Drifting organic soft green circular glows/leaves */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`mint-${i}`}
                className="absolute rounded-full bg-emerald-400/25 dark:bg-emerald-500/15 blur-3xl"
                style={{
                  width: `${200 + i * 100}px`,
                  height: `${200 + i * 100}px`,
                  top: `${5 + i * 15}%`,
                  left: `${2 + (i * 19) % 85}%`,
                }}
                animate={{
                  x: [0, 40, -40, 0],
                  y: [0, -50, 50, 0],
                  scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                  duration: 12 + i * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
            {/* Floating leaf-like small shapes */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`leaf-${i}`}
                className="absolute text-emerald-600/35 dark:text-emerald-400/25 select-none text-2xl font-sans"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [100, -120],
                  x: [0, Math.sin(i) * 40],
                  rotate: [0, 360],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: 10 + Math.random() * 8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.6
                }}
              >
                🍃
              </motion.div>
            ))}
          </div>
        );

      case "solar_glow":
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Ambient solar rays & warm particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`solar-${i}`}
                className="absolute rounded-full bg-amber-400/25 dark:bg-amber-500/15 blur-3xl"
                style={{
                  width: `${250 + i * 110}px`,
                  height: `${250 + i * 110}px`,
                  bottom: `${5 + i * 15}%`,
                  right: `${2 + (i * 20) % 80}%`,
                }}
                animate={{
                  scale: [1, 1.2, 0.85, 1],
                  opacity: [0.7, 0.95, 0.8, 0.7],
                  x: [0, -30, 30, 0],
                }}
                transition={{
                  duration: 14 + i * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
            {/* Solar gold dust */}
            {[...Array(18)].map((_, i) => (
              <motion.div
                key={`dust-${i}`}
                className="absolute w-2 h-2 rounded-full bg-amber-500/40 dark:bg-amber-300/30 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [50, -100],
                  opacity: [0, 0.9, 0],
                  scale: [0.4, 1.4, 0.4]
                }}
                transition={{
                  duration: 8 + Math.random() * 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4
                }}
              />
            ))}
          </div>
        );

      case "aurora_sky":
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Wave of color light curtains resembling Aurora Borealis */}
            <motion.div
              className="absolute inset-0 opacity-70 dark:opacity-40"
              style={{
                background: "linear-gradient(135deg, rgba(14,165,233,0.25) 0%, rgba(99,102,241,0.2) 45%, rgba(168,85,247,0.25) 90%)",
                filter: "blur(35px)"
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            {/* Shimmering stars */}
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute text-sky-500/50 dark:text-sky-300/40 select-none text-sm font-black"
                style={{
                  top: `${Math.random() * 95}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 0.9, 0.2],
                  scale: [0.7, 1.3, 0.7]
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
              >
                ✦
              </motion.div>
            ))}
          </div>
        );

      case "classic_slate":
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Technical grid backdrop & blueprint accent lines */}
            <div 
              className="absolute inset-0 opacity-20 dark:opacity-[0.25]" 
              style={{
                backgroundImage: "linear-gradient(rgba(100, 116, 139, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 116, 139, 0.25) 1px, transparent 1px)",
                backgroundSize: "50px 50px"
              }}
            />
            <div className="absolute top-1/4 left-10 w-96 h-0.5 bg-gradient-to-r from-transparent via-slate-400/45 to-transparent dark:via-slate-500/30" />
            <div className="absolute bottom-1/3 right-10 w-80 h-0.5 bg-gradient-to-r from-transparent via-slate-400/45 to-transparent dark:via-slate-500/30" />
          </div>
        );

      case "swachh_bharat_special":
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Saffron, White, and Green Ambient tricolor cloud flows with higher, beautiful visibility */}
            <div className="absolute top-0 left-0 right-0 h-[450px] bg-gradient-to-b from-orange-500/25 via-orange-400/12 to-transparent dark:from-orange-500/24 dark:via-orange-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 right-0 h-[450px] bg-gradient-to-t from-emerald-500/25 via-emerald-400/12 to-transparent dark:from-emerald-500/24 dark:via-emerald-500/10 blur-3xl" />
            
            {/* Large, Beautiful Watermark of Mahatma Gandhi's Swachh Bharat Spectacles - SIGNIFICANTLY ENHANCED opacity */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.18] dark:opacity-[0.24]">
              <svg 
                className="w-full max-w-[650px] aspect-[2/1] text-orange-600 dark:text-orange-400 drop-shadow-[0_4px_12px_rgba(249,115,22,0.15)]" 
                viewBox="0 0 500 250" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Left Spectacle lens frame */}
                <circle cx="150" cy="120" r="75" />
                {/* Right Spectacle lens frame */}
                <circle cx="350" cy="120" r="75" />
                
                {/* Center Nose bridge link */}
                <path d="M225 120 C250 100, 250 100, 275 120" />
                
                {/* Left Spectacle side temple */}
                <path d="M75 120 C40 120, 20 100, 15 60" />
                {/* Right Spectacle side temple */}
                <path d="M425 120 C460 120, 480 100, 485 60" />

                {/* Left Lens Text */}
                <text 
                  x="150" 
                  y="130" 
                  textAnchor="middle" 
                  fill="currentColor" 
                  stroke="none"
                  className="font-sans font-black text-4xl tracking-widest select-none"
                >
                  {language === "te" ? "స్వచ్ఛ" : language === "hi" ? "स्वच्छ" : "Clean"}
                </text>

                {/* Right Lens Text */}
                <text 
                  x="350" 
                  y="130" 
                  textAnchor="middle" 
                  fill="currentColor" 
                  stroke="none"
                  className="font-sans font-black text-4xl tracking-widest select-none"
                >
                  {language === "te" ? "భారత్" : language === "hi" ? "भारत" : "India"}
                </text>
              </svg>
            </div>

            {/* Ashoka Chakra style floating geometry or stars - beautifully colored blue */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`chakra-spark-${i}`}
                className="absolute text-blue-600/25 dark:text-blue-400/20 select-none text-3xl font-black"
                style={{
                  top: `${12 + i * 11}%`,
                  left: `${5 + (i * 14) % 84}%`,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                ⚙️
              </motion.div>
            ))}

            {/* Saffron & Green decorative flower garlands (Mangalor / Marigold theme colors) */}
            {[...Array(14)].map((_, i) => {
              const isSaffron = i % 2 === 0;
              return (
                <motion.div
                  key={`marigold-${i}`}
                  className={`absolute rounded-full w-4 h-4 ${
                    isSaffron 
                      ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" 
                      : "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                  } opacity-40 dark:opacity-30`}
                  style={{
                    top: `${Math.random() * 95}%`,
                    left: `${Math.random() * 95}%`,
                  }}
                  animate={{
                    y: [0, -50, 0],
                    x: [0, Math.sin(i) * 20, 0],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 7 + Math.random() * 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3
                  }}
                />
              );
            })}

            {/* Glowing golden tricolor sparkles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`swachh-glow-${i}`}
                className="absolute text-orange-500/40 dark:text-emerald-400/30 select-none text-xl font-bold"
                style={{
                  top: `${Math.random() * 95}%`,
                  left: `${Math.random() * 95}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  scale: [0.8, 1.3, 0.8],
                  opacity: [0.2, 0.9, 0.2]
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3
                }}
              >
                ✦
              </motion.div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 select-none overflow-hidden transition-all duration-700">
      {renderLiveElements()}
    </div>
  );
}

