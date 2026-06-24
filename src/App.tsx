import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import HeroPanel from "./components/HeroPanel";
import ScannerPanel from "./components/ScannerPanel";
import RewardsPanel from "./components/RewardsPanel";
import HistoryPanel from "./components/HistoryPanel";
import TruckTracker from "./components/TruckTracker";
import GeoTagPortal from "./components/GeoTagPortal";
import BackgroundWallpaper from "./components/BackgroundWallpaper";
import InnovationPortal from "./components/InnovationPortal";
import { HistoryItem } from "./types";
import { Sparkles, Mountain } from "lucide-react";
import { Language, translations } from "./utils/translations";

export default function App() {
  // Trilingual language state defaulting to Telugu ("te")
  const [language, setLanguage] = useState<Language>("te");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [smartThemeEnabled, setSmartThemeEnabled] = useState<boolean>(true); // Sunset sync active by default
  const [selectedWallpaper, setSelectedWallpaper] = useState<string>("clean_mint");
  const [bgOpacity, setBgOpacity] = useState<number>(12); // Default glass background opacity to 12% for ultra-translucent beautiful look
  const [pinCode, setPinCode] = useState<string>("522020"); // Default AP Capital Pincode
  const [textSize, setTextSize] = useState<"standard" | "large" | "extra">("standard");
  const [aiMode, setAiMode] = useState<string>("Demo Mode");
  const [celebrationMessage, setCelebrationMessage] = useState<string | null>(null);

  // VVP (Vibrant Villages Programme) state
  const [vvpMode, setVvpMode] = useState<boolean>(false);
  const [vvpVillage, setVvpVillage] = useState<string>("Diskit (Ladakh Border Valley) ðŸ”ï¸");

  // Points & Log Histories
  const [userPoints, setUserPoints] = useState<number>(250); // Default points for store trials
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const t = translations[language];

  // Load state on mount
  useEffect(() => {
    const savedPoints = localStorage.getItem("swachhai_points");
    if (savedPoints) setUserPoints(parseInt(savedPoints, 10));

    const savedHistory = localStorage.getItem("swachhai_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Error parsing history:", e);
      }
    }

    // Check backend API connectivity & health status
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        if (data.aiMode === "AI Active") {
          setAiMode("AI Active");
        }
      })
      .catch(() => console.log("Using localized fallback system simulation."));
  }, []);

  // Sunset / Sunrise Smart Theme calculation:
  // If Smart Theme is active, check the current hour.
  // 6 PM (18:00) to 6 AM (06:00) is night mode (Classic Slate/Dark), otherwise light mode (Clean Mint/Light).
  useEffect(() => {
    if (!smartThemeEnabled) return;

    const currentHour = new Date().getHours();
    const isNight = currentHour >= 18 || currentHour < 6;
    
    setIsDarkMode(isNight);
    setSelectedWallpaper(isNight ? "classic_slate" : "clean_mint");
  }, [smartThemeEnabled]);

  // Save to localStorage
  const savePointsToLocalStorage = (pts: number) => {
    localStorage.setItem("swachhai_points", pts.toString());
    setUserPoints(pts);
  };

  const saveHistoryToLocalStorage = (newHistory: HistoryItem[]) => {
    localStorage.setItem("swachhai_history", JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  // Add points & log item
  const handlePointsEarned = (pts: number, itemName: string, category: string, image?: string) => {
    const newPoints = userPoints + pts;
    savePointsToLocalStorage(newPoints);

    const newItem: HistoryItem = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      itemName,
      category: category as any,
      categoryLabel: 
        category === "wet" 
          ? "à°¤à°¡à°¿ à°šà±†à°¤à±à°¤ (Wet Waste)" 
          : category === "recyclable" 
          ? "à°°à±€à°¸à±ˆà°•à°¿à°²à± à°šà±‡à°¯à°¦à°—à°¿à°¨ à°µà±à°¯à°°à±à°¥à°¾à°²à± (Recyclable Dry Waste)" 
          : category === "hazardous" 
          ? "à°ªà±à°°à°®à°¾à°¦à°•à°°à°®à±ˆà°¨ à°µà±à°¯à°°à±à°¥à°¾à°²à± (Hazardous E-Waste)" 
          : "à°ªà±Šà°¡à°¿ à°šà±†à°¤à±à°¤ (Dry Waste)",
      pointsReward: pts,
      pinCode,
      image
    };

    const updatedHistory = [newItem, ...history];
    saveHistoryToLocalStorage(updatedHistory);

    // Dynamic celebration notification
    const currentName = 
      language === "te" 
        ? (itemName.split("/")[1] || itemName).trim()
        : language === "hi"
        ? (itemName.split("/")[2] || itemName.split("/")[0]).trim()
        : (itemName.split("/")[0] || itemName).trim();

    const celebrationText = 
      language === "te" 
        ? `à°…à°¦à±à°­à±à°¤à°‚! ${currentName} à°µà°¿à°œà°¯à°µà°‚à°¤à°‚à°—à°¾ à°µà°°à±à°—à±€à°•à°°à°¿à°‚à°šà°¬à°¡à°¿à°‚à°¦à°¿. +${pts} à°ªà°¾à°¯à°¿à°‚à°Ÿà±à°²à± à°²à°­à°¿à°‚à°šà°¾à°¯à°¿!` 
        : language === "hi"
        ? `à¤¶à¤¾à¤¨à¤¦à¤¾à¤°! ${currentName} à¤•à¤¾ à¤¸à¤«à¤²à¤¤à¤¾à¤ªà¥‚à¤°à¥à¤µà¤• à¤µà¤°à¥à¤—à¥€à¤•à¤°à¤£ à¤•à¤¿à¤¯à¤¾ à¤—à¤¯à¤¾à¥¤ à¤†à¤ªà¤•à¥‹ +${pts} à¤…à¤‚à¤• à¤®à¤¿à¤²à¥‡!`
        : `Excellent! ${currentName} successfully categorized. You earned +${pts} points!`;
    
    setCelebrationMessage(celebrationText);
    setTimeout(() => {
      setCelebrationMessage(null);
    }, 4500);
  };

  const handleDeductPoints = (pts: number) => {
    const newPoints = Math.max(0, userPoints - pts);
    savePointsToLocalStorage(newPoints);
  };

  const handleClearHistory = () => {
    saveHistoryToLocalStorage([]);
  };

  // Sync dark theme class and document body class to prevent white browser background leakage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.body.className = "bg-gray-950 text-gray-100 transition-colors duration-500";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.className = "bg-white text-gray-900 transition-colors duration-500";
    }
  }, [isDarkMode]);

  // Map chose wallpaper with absolute visual precision!
  const getWallpaperClasses = () => {
    const isDark = isDarkMode;
    switch (selectedWallpaper) {
      case "clean_mint":
        return isDark
          ? "bg-gradient-to-tr from-emerald-950 via-teal-950 to-gray-950 text-gray-100"
          : "bg-gradient-to-tr from-emerald-100 via-teal-50 to-emerald-50 text-gray-900";
      case "solar_glow":
        return isDark
          ? "bg-gradient-to-tr from-amber-950 via-orange-950 to-gray-950 text-gray-100"
          : "bg-gradient-to-tr from-amber-100 via-orange-50 to-amber-50 text-gray-900";
      case "aurora_sky":
        return isDark
          ? "bg-gradient-to-tr from-sky-950 via-indigo-950 to-gray-950 text-gray-100"
          : "bg-gradient-to-tr from-sky-100 via-indigo-50 to-blue-50 text-gray-900";
      case "classic_slate":
        return isDark
          ? "bg-gradient-to-tr from-slate-900 via-zinc-900 to-gray-950 text-gray-100"
          : "bg-gradient-to-tr from-slate-100 via-zinc-50 to-slate-50 text-gray-900";
      case "swachh_bharat_special":
        // Saffron to amber to green inspired tricolor theme with beautiful modern highlights!
        return isDark
          ? "bg-gradient-to-tr from-orange-950 via-zinc-950 to-emerald-950 text-gray-100"
          : "bg-gradient-to-tr from-orange-100 via-amber-50 to-emerald-100 text-gray-900 border-t-4 border-orange-500";
      default:
        return isDark ? "bg-gray-950 text-gray-100" : "bg-white text-gray-900";
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-all duration-500 ease-in-out relative overflow-hidden ${getWallpaperClasses()}`}>
      
      {/* Dynamic style override for Whiteness Overlay adjustability */}
      <style>{`
        /* Target all glass panels and containers */
        .bg-white\\/80, .bg-white\\/70, .bg-white\\/90, .backdrop-blur-md, .backdrop-blur {
          background-color: rgba(255, 255, 255, ${bgOpacity / 100}) !important;
        }
        .dark .bg-white\\/80, .dark .bg-white\\/70, .dark .bg-white\\/90, .dark .bg-gray-950\\/75, .dark .bg-gray-950\\/80, .dark .bg-gray-950\\/70, .dark .backdrop-blur-md, .dark .backdrop-blur {
          background-color: rgba(3, 7, 18, ${Math.max(5, bgOpacity - 10) / 100}) !important;
        }
      `}</style>
      
      {/* Dynamic Animated Background Live Wallpaper */}
      <BackgroundWallpaper
        selectedWallpaper={selectedWallpaper}
        isDarkMode={isDarkMode}
        language={language}
      />
      
      {/* 1. Sticky Header Controls Panel */}
      <Header
        language={language}
        setLanguage={setLanguage}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        textSize={textSize}
        setTextSize={setTextSize}
        aiMode={aiMode}
        smartThemeEnabled={smartThemeEnabled}
        setSmartThemeEnabled={setSmartThemeEnabled}
      />

      {/* Main Container Stage */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6 md:py-8 space-y-6 md:space-y-8 relative z-10">
        
        {/* 2. Hero banner containing Live Wallpaper option */}
        <HeroPanel
          language={language}
          selectedWallpaper={selectedWallpaper}
          setSelectedWallpaper={setSelectedWallpaper}
          bgOpacity={bgOpacity}
          setBgOpacity={setBgOpacity}
        />

        {/* 3. Primary layout grid */}
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-start">
          
          {/* Main AI Classification area */}
          <div className="lg:col-span-8">
            <ScannerPanel
              language={language}
              pinCode={pinCode}
              setPinCode={setPinCode}
              onPointsEarned={handlePointsEarned}
              textSize={textSize}
              vvpMode={vvpMode}
              setVvpMode={setVvpMode}
              vvpVillage={vvpVillage}
              setVvpVillage={setVvpVillage}
            />
          </div>

          {/* Point & Coupon Store */}
          <div className="lg:col-span-4">
            <RewardsPanel
              language={language}
              userPoints={userPoints}
              onDeductPoints={handleDeductPoints}
              textSize={textSize}
            />
          </div>

        </div>

        {/* SwachhAI Innovation Portal (Smart Tourism, Micro-Logistics, Gamification) */}
        <InnovationPortal
          language={language}
          userPoints={userPoints}
          onPointsEarned={(pts) => handlePointsEarned(pts, "Premium Milestone / à°ªà±à°°à±€à°®à°¿à°¯à°‚ à°•à°¾à°°à±à°¯à°¾à°šà°°à°£ / à¤ªà¥à¤°à¥€à¤®à¤¿à¤¯à¤® à¤—à¤¤à¤¿à¤µà¤¿à¤§à¤¿", "recyclable")}
          onDeductPoints={(pts) => {
            if (userPoints >= pts) {
              handleDeductPoints(pts);
              return true;
            }
            return false;
          }}
          textSize={textSize}
        />

        {/* 4. Live Garbage Truck Tracking & Geo-tagging complaint Desk */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <TruckTracker
            language={language}
            pinCode={pinCode}
            textSize={textSize}
          />
          <GeoTagPortal
            language={language}
            pinCode={pinCode}
            textSize={textSize}
          />
        </div>

        {/* 5. Scanning History Logs */}
        <div className="border-t border-gray-200/50 dark:border-gray-800/50 pt-8">
          <HistoryPanel
            language={language}
            history={history}
            onClearHistory={handleClearHistory}
            textSize={textSize}
          />
        </div>

      </main>

      {/* Celebration Toast Modal */}
      <AnimatePresence>
        {celebrationMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 bg-emerald-600 dark:bg-emerald-500 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500 z-50 max-w-md"
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 animate-bounce">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-xs font-black font-mono tracking-wider text-amber-300 uppercase">
                {language === "te" ? "à°¬à°¹à±à°®à°¤à°¿ à°²à°­à°¿à°‚à°šà°¿à°‚à°¦à°¿!" : language === "hi" ? "à¤…à¤‚à¤• à¤ªà¥à¤°à¤¾à¤ªà¥à¤¤ à¤¹à¥à¤!" : "Points Awarded!"}
              </p>
              <p className="text-xs font-semibold mt-0.5 leading-snug">
                {celebrationMessage}
              </p>
            </div>
            <button 
              onClick={() => setCelebrationMessage(null)}
              className="ml-auto text-white/70 hover:text-white hover:bg-white/10 rounded-lg p-1.5 transition-colors font-bold text-xs"
            >
              âœ•
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footnote */}
      <footer className="py-6 border-t border-gray-200/40 dark:border-gray-800/40 text-center text-[11px] text-gray-400 dark:text-gray-500 select-none">
        <p className="font-semibold font-sans">
          {t.footerText}
        </p>
      </footer>

    </div>
  );
}
