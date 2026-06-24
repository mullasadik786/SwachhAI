import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Navigation, Clock, Bell, RefreshCw, AlertTriangle, Truck } from "lucide-react";
import { Language, translations } from "../utils/translations";

interface TruckTrackerProps {
  language: Language;
  pinCode: string;
  textSize: "standard" | "large" | "extra";
}

export default function TruckTracker({
  language,
  pinCode,
  textSize
}: TruckTrackerProps) {
  const t = translations[language];

  const [isTracking, setIsTracking] = useState(true);
  const [truckDistance, setTruckDistance] = useState(1.8); // start at 1.8 km
  const [truckEta, setTruckEta] = useState(5); // start at 5 minutes
  const [progress, setProgress] = useState(15); // path progress %
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    // Reset status texts based on language
    if (truckEta <= 0) {
      setStatusText(t.truckStatusArrived);
    } else {
      setStatusText(t.truckStatusReady);
    }
  }, [truckEta, language]);

  // Simulate real-time tracking motion
  useEffect(() => {
    if (!isTracking) return;

    const interval = setInterval(() => {
      setTruckDistance(prevDist => {
        const nextDist = parseFloat((prevDist - 0.2).toFixed(1));
        if (nextDist <= 0) {
          clearInterval(interval);
          setTruckEta(0);
          setProgress(100);
          return 0;
        }
        return nextDist;
      });

      setTruckEta(prevEta => {
        const nextEta = prevEta - 1;
        if (nextEta <= 1 && !isAlertActive) {
          setIsAlertActive(true);
        }
        return Math.max(0, nextEta);
      });

      setProgress(prev => Math.min(100, prev + 18));
    }, 8000); // update every 8 seconds for fast demonstration

    return () => clearInterval(interval);
  }, [isTracking, isAlertActive]);

  const handleSimulateReset = () => {
    setTruckDistance(1.8);
    setTruckEta(5);
    setProgress(15);
    setIsAlertActive(false);
    setIsTracking(true);
  };

  const getDynamicTextClass = () => {
    if (textSize === "large") return "text-sm md:text-base";
    if (textSize === "extra") return "text-base md:text-lg";
    return "text-xs";
  };

  return (
    <div className="bg-white/80 dark:bg-gray-950/75 border border-gray-200/50 dark:border-gray-800/60 rounded-3xl p-6 shadow-sm backdrop-blur-md relative overflow-hidden">
      
      {/* Wave glow effect behind */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100/60 dark:border-gray-900/50 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center animate-pulse">
            <Truck size={22} />
          </div>
          <div>
            <h3 className="text-md font-bold font-display text-gray-900 dark:text-white flex items-center gap-1.5">
              {t.truckTitle}
            </h3>
            <p className="text-[10px] text-gray-400 font-sans font-semibold">
              {t.truckSub} (Active Pin: <span className="font-mono underline text-emerald-600 dark:text-emerald-400">{pinCode}</span>)
            </p>
          </div>
        </div>

        <button
          onClick={handleSimulateReset}
          className="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-800 rounded-xl text-[10px] font-bold text-gray-700 dark:text-gray-300 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw size={11} className="animate-spin-slow" />
          <span>{t.truckTrackButton}</span>
        </button>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-center">
        
        {/* Statistics & Warnings */}
        <div className="md:col-span-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50/60 dark:bg-gray-900/20 border border-gray-100/80 dark:border-gray-800/60 rounded-2xl text-center">
              <span className="text-[10px] text-gray-400 font-bold block">{t.truckEta}</span>
              <span className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                {truckEta > 0 ? `${truckEta} mins` : "ARRIVED"}
              </span>
            </div>
            <div className="p-3 bg-gray-50/60 dark:bg-gray-900/20 border border-gray-100/80 dark:border-gray-800/60 rounded-2xl text-center">
              <span className="text-[10px] text-gray-400 font-bold block">{t.truckDist}</span>
              <span className="text-xl font-black font-mono text-gray-800 dark:text-white">
                {truckDistance > 0 ? `${truckDistance} km` : "0 km"}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mb-1">
              <Navigation size={12} className="animate-bounce" /> Current Status
            </span>
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 leading-relaxed">
              {statusText}
            </p>
          </div>

          {/* Trigger Alert Notification Banner */}
          <AnimatePresence>
            {isAlertActive && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3.5 bg-amber-500/10 border border-amber-500/25 rounded-2xl flex items-start gap-2 text-amber-800 dark:text-amber-300"
              >
                <Bell size={16} className="animate-ring text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[10px] font-semibold leading-relaxed">
                  {t.truckNotification}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Live Vector Map Simulation */}
        <div className="md:col-span-8 bg-gray-50 dark:bg-gray-900/40 border border-gray-100/80 dark:border-gray-900/80 rounded-2xl p-4 h-48 relative overflow-hidden flex flex-col justify-between">
          
          {/* Map Grid Pattern background */}
          <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
            backgroundImage: "radial-gradient(#10b981 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }} />

          {/* Animated SVG Path for garbage truck routing */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <svg className="w-full h-full" viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Roads lines */}
              <path d="M10 60 H 390" stroke="rgba(156, 163, 175, 0.3)" strokeWidth="12" strokeLinecap="round" />
              <path d="M100 10 V 110" stroke="rgba(156, 163, 175, 0.2)" strokeWidth="8" strokeLinecap="round" />
              <path d="M300 10 V 110" stroke="rgba(156, 163, 175, 0.2)" strokeWidth="8" strokeLinecap="round" />
              
              {/* Animated active path */}
              <path 
                d="M10 60 H 390" 
                stroke="url(#gradient-path)" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeDasharray="400" 
                strokeDashoffset={400 - (progress / 100) * 400} 
                className="transition-all duration-1000"
              />

              {/* Define Gradients */}
              <defs>
                <linearGradient id="gradient-path" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>

              {/* Markers */}
              <circle cx="20" cy="60" r="6" fill="#f59e0b" className="animate-ping" />
              <circle cx="20" cy="60" r="4" fill="#f59e0b" />
              <text x="20" y="45" fill="#f59e0b" fontSize="8" fontWeight="black" fontFamily="sans-serif">Truck Start</text>

              <circle cx="380" cy="60" r="6" fill="#10b981" />
              <text x="340" y="45" fill="#10b981" fontSize="8" fontWeight="black" fontFamily="sans-serif">My Home</text>

              {/* Truck Marker moving along path */}
              <g transform={`translate(${10 + (progress / 100) * 360 - 15}, 45)`} className="transition-all duration-1000">
                {/* Truck icon container */}
                <rect width="30" height="24" rx="4" fill="#10b981" className="shadow" />
                <polygon points="18,4 28,12 28,24 18,24" fill="#047857" />
                <circle cx="8" cy="22" r="3" fill="#1f2937" />
                <circle cx="22" cy="22" r="3" fill="#1f2937" />
              </g>
            </svg>
          </div>

          <div className="z-10 bg-white/70 dark:bg-gray-950/80 backdrop-blur px-2.5 py-1 rounded-lg border border-gray-100 dark:border-gray-800 text-[9px] font-mono font-bold flex items-center gap-1 w-max mt-auto">
            <MapPin size={10} className="text-emerald-500" />
            <span>Zone Sector 4 AP Street GPS Tracking Active</span>
          </div>
        </div>

      </div>

    </div>
  );
}
