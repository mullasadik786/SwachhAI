import React, { useState } from "react";
import BackgroundWallpaper from "./components/BackgroundWallpaper";
import InnovationPortal from "./components/InnovationPortal";
import { translations } from "./utils/translations";

function App() {
  const [currentLang, setCurrentLang] = useState<"EN" | "తెలుగు" | "हिंदी">("EN");
  const [glassWhiteness, setGlassWhiteness] = useState<number>(12);
  const pincode = "522020";

  return (
    <div className="min-h-screen w-full relative font-sans overflow-x-hidden text-white bg-slate-900 flex flex-col justify-start pb-12">
      {/* Dynamic Live Background Engine */}
      <BackgroundWallpaper theme="Swachh Bharat Special 🇮🇳" language={currentLang} />
      
      {/* Glassmorphism Global Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-300"
        style={{ backgroundColor: `rgba(255, 255, 255, ${glassWhiteness / 100})`, backdropFilter: "blur(6px)" }}
      />

      {/* Main Content Dashboard Container - Forcing Full Width and Center Placement */}
      <div className="relative z-10 w-full max-w-7xl mx-auto p-4 md:p-8 space-y-6 flex-grow">
        
        {/* Upper Action Utility Bar */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center bg-black/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black tracking-wider text-orange-400">SwachhAI</span>
            <span className="text-xs bg-white/10 px-2 py-1 rounded-md text-slate-300 font-mono border border-white/5">VVP & AP Ecosystem</span>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            {/* Language Switcher Trigger */}
            <div className="flex bg-white/5 rounded-xl border border-white/10 p-1 shadow-inner">
              {["EN", "తెలుగు", "हिंदी"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setCurrentLang(lang as any)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${currentLang === lang ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md" : "text-slate-400 hover:text-white"}`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 font-semibold flex items-center gap-1.5 animate-pulse">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span> AI Core Active
            </span>
          </div>
        </div>

        {/* Dynamic Swachh Bharat Greeting Backdrop & Slogan Section */}
        <div className="w-full p-6 md:p-12 bg-black/30 backdrop-blur-2xl border border-white/10 rounded-3xl relative overflow-hidden shadow-2xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/10 via-emerald-500/5 to-transparent pointer-events-none rounded-bl-full" />
          
          <div className="relative space-y-4">
            <div className="text-xs md:text-sm font-extrabold tracking-widest text-orange-400 uppercase bg-orange-500/10 px-3 py-1 rounded-md inline-block border border-orange-500/20">
              {translations[currentLang]?.mission || "Swachh Bharat Mission"}
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
              {translations[currentLang]?.slogan || "Cleanliness is Next to Godliness"}
            </h1>
            <div className="w-32 h-1.5 bg-gradient-to-r from-orange-500 via-white to-emerald-500 rounded-full my-6 shadow-sm" />
            
            <h3 className="text-xl md:text-2xl font-bold text-slate-100 mt-6">
              {translations[currentLang]?.namaskar || "Namaskar!"}
            </h3>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-4xl font-normal">
              {translations[currentLang]?.subtext || ""}
            </p>
          </div>

          {/* Active Municipal Zone Meta Tag */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs md:text-sm border-t border-white/10 pt-6 text-slate-400 gap-2">
            <div>Active Municipal Zone: <span className="text-emerald-400 font-bold bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">Amaravati (AP Capital)</span></div>
            <div className="font-mono tracking-wider bg-white/5 px-2 py-0.5 rounded">Pincode Connection: {pincode}</div>
          </div>
        </div>

        {/* Custom Glass Control Panels */}
        <div className="w-full p-5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl space-y-4 shadow-xl">
          <label className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1">🎛️ Glass Whiteness Overlay Settings</label>
          <div className="flex flex-wrap gap-3">
            {[12, 40, 80].map((val) => (
              <button
                key={val}
                onClick={() => setGlassWhiteness(val)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${glassWhiteness === val ? "bg-white text-black shadow-lg scale-105" : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"}`}
              >
                {val === 12 ? "Default Ambient (12%)" : `${val}% Solid Overlay`}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic VVP Module Loader */}
        <div className="w-full">
          <InnovationPortal />
        </div>
      </div>
    </div>
  );
}

export default App;
