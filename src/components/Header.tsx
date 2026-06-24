import React from "react";
import { Sun, Moon, Sparkles, Clock } from "lucide-react";
import { Language, translations } from "../utils/translations";

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  textSize: "standard" | "large" | "extra";
  setTextSize: (size: "standard" | "large" | "extra") => void;
  aiMode: string;
  smartThemeEnabled: boolean;
  setSmartThemeEnabled: (val: boolean) => void;
}

export default function Header({
  language,
  setLanguage,
  isDarkMode,
  setIsDarkMode,
  textSize,
  setTextSize,
  aiMode,
  smartThemeEnabled,
  setSmartThemeEnabled,
}: HeaderProps) {
  const t = translations[language];

  const getDynamicTitleSize = () => {
    if (textSize === "large") return "text-2xl md:text-3xl";
    if (textSize === "extra") return "text-3xl md:text-4xl";
    return "text-xl md:text-2xl";
  };

  const getDynamicSubtitleSize = () => {
    if (textSize === "large") return "text-xs md:text-sm";
    if (textSize === "extra") return "text-sm md:text-base";
    return "text-[11px]";
  };

  return (
    <header className="border-b border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-gray-950/75 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* App Title & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 dark:from-emerald-500 dark:to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Sparkles size={24} className="text-white animate-pulse" />
          </div>
          <div>
            <h1 className={`${getDynamicTitleSize()} font-bold font-display tracking-tight text-gray-900 dark:text-white flex items-center gap-2`}>
              SwachhAI{" "}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 via-white to-emerald-500 text-gray-800 dark:text-gray-900 font-mono font-black border border-gray-200/50 shadow-xs">
                VVP & AP
              </span>
            </h1>
            <p className={`${getDynamicSubtitleSize()} font-sans font-extrabold text-emerald-600 dark:text-emerald-400`}>
              {t.subTitle}
            </p>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="flex flex-wrap items-center gap-3 ml-auto">
          
          {/* AI Connection Status Indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100/80 dark:bg-gray-900/80 text-xs text-gray-600 dark:text-gray-300 border border-gray-200/50 dark:border-gray-800/50 font-mono">
            <span className={`w-2.5 h-2.5 rounded-full ${aiMode === "AI Active" ? "bg-emerald-500 animate-ping" : "bg-amber-500"} inline-block`} />
            <span className="text-[10px] font-bold">
              {aiMode === "AI Active" ? t.realtimeAi : t.demoMode}
            </span>
          </div>

          {/* Sunset Automation Smart Theme Selector Toggle */}
          <button
            onClick={() => setSmartThemeEnabled(!smartThemeEnabled)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black transition-all border ${
              smartThemeEnabled
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-indigo-400"
                : "bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
            title={t.smartThemeDesc}
          >
            <Clock size={12} className={smartThemeEnabled ? "animate-spin" : ""} />
            <span>{t.smartThemeLabel.split("(")[1]?.replace(")", "") || "Sunset Sync"}</span>
            <span className="px-1 py-0.5 text-[8px] bg-white/20 rounded font-mono">
              {smartThemeEnabled ? "ON" : "OFF"}
            </span>
          </button>

          {/* Text Size Controls */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-900 rounded-lg p-0.5 border border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setTextSize("standard")}
              className={`px-2.5 py-1 text-xs rounded-md transition-all font-bold ${
                textSize === "standard"
                  ? "bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
              title="Standard Size"
            >
              A
            </button>
            <button
              onClick={() => setTextSize("large")}
              className={`px-2.5 py-1 text-xs rounded-md transition-all font-bold ${
                textSize === "large"
                  ? "bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
              title="Large Size"
            >
              A+
            </button>
            <button
              onClick={() => setTextSize("extra")}
              className={`px-2.5 py-1 text-xs rounded-md transition-all font-bold ${
                textSize === "extra"
                  ? "bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
              title="Extra Large"
            >
              A++
            </button>
          </div>

          {/* Tri-Language Select Buttons */}
          <div className="flex bg-gray-100 dark:bg-gray-900 rounded-lg p-0.5 border border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-1 text-xs rounded-md transition-all font-black ${
                language === "en"
                  ? "bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("te")}
              className={`px-2.5 py-1 text-xs rounded-md transition-all font-black ${
                language === "te"
                  ? "bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              తెలుగు
            </button>
            <button
              onClick={() => setLanguage("hi")}
              className={`px-2.5 py-1 text-xs rounded-md transition-all font-black ${
                language === "hi"
                  ? "bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              हिंदी
            </button>
          </div>

          {/* Manual Theme Toggle (Overridden if Sunset Sync is active but can trigger override) */}
          <div className="flex bg-gray-100 dark:bg-gray-900 rounded-lg p-0.5 border border-gray-200 dark:border-gray-800">
            <button
              onClick={() => {
                setSmartThemeEnabled(false);
                setIsDarkMode(false);
              }}
              className={`p-1 px-2.5 rounded-md transition-all flex items-center gap-1 ${
                !isDarkMode
                  ? "bg-white text-amber-500 shadow-sm"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              title="Light Mode"
            >
              <Sun size={14} />
              <span className="text-[10px] font-bold hidden sm:inline">Light</span>
            </button>
            <button
              onClick={() => {
                setSmartThemeEnabled(false);
                setIsDarkMode(true);
              }}
              className={`p-1 px-2.5 rounded-md transition-all flex items-center gap-1 ${
                isDarkMode
                  ? "bg-gray-800 text-sky-400 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              title="Dark Mode"
            >
              <Moon size={14} />
              <span className="text-[10px] font-bold hidden sm:inline">Dark</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
