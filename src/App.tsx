import React, { useState } from "react";
import BackgroundWallpaper from "./components/BackgroundWallpaper";
import InnovationPortal from "./components/InnovationPortal";
import { translations } from "./utils/translations";

function App() {
  const [currentLang, setCurrentLang] = useState<"EN" | "తెలుగు" | "हिंदी">("EN");
  const [glassWhiteness, setGlassWhiteness] = useState<number>(12);
  const [pincode] = useState<string>("522020");

  return (
    <div className="min-h-screen relative font-sans overflow-x-hidden text-white selection:bg-orange-500/30">
      {/* Dynamic Live Background Engine */}
      <BackgroundWallpaper theme="Swachh Bharat Special 🇮🇳" language={currentLang} />

      {/* Glassmorphism Global Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-300"
        style={{ backgroundColor: `rgba(255, 255, 255, \${glassWhiteness / 100})`, backdropFilter: "blur(4px)" }}
      />

      {/* Main Content Dashboard Container */}
      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        
        {/* Upper Action Utility Bar */}
        <div className="flex flex-wrap justify-between items-center bg-black/30 backdrop-blur-md border border-white/10 p-3 rounded-xl gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-wider text-orange-400">SwachhAI</span>
            <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-slate-300 font-mono">VVP & AP</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Language Switcher Trigger */}
            <div className="flex bg-white/5 rounded-lg border border-white/10 p-0.5">
              {(["EN", "తెలుగు", "हिंदी"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setCurrentLang(lang)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all \${currentLang === lang ? "bg-orange-500 text-white shadow" : "text-slate-400 hover:text-white"}`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20 font-medium">● AI Active</span>
          </div>
        </div>

        {/* Dynamic Swachh Bharat Greeting Backdrop & Slogan Section */}
        <div className="p-6 md:p-8 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-orange-500/10 to-transparent pointer-events-none rounded-bl-full" />
          
          <div className="relative space-y-2">
            <div className="text-xs font-bold tracking-widest text-orange-400 uppercase">{translations[currentLang]?.mission || "Swachh Bharat Mission"}</div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-sm">
              {translations[currentLang]?.slogan || "Cleanliness is Next to Godliness"}
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 via-white to-emerald-500 rounded-full my-4" />
            
            <h3 className="text-lg md:text-xl font-medium text-slate-100 mt-4 pt-2">
              {translations[currentLang]?.namaskar || "Namaskar!"}
            </h3>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl">
              {translations[currentLang]?.subtext || ""}
            </p>
          </div>

          {/* Active Municipal Zone Meta Tag */}
          <div className="mt-6 flex items-center justify-between text-xs border-t border-white/5 pt-4 text-slate-400">
            <div>Active Municipal Zone: <span className="text-white font-semibold">Amaravati (AP Capital)</span></div>
            <div className="font-mono">Pincode: {pincode}</div>
          </div>
        </div>

        {/* Custom Glass Control Panels */}
        <div className="p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">🎛️ Glass Whiteness Overlay Selector</label>
          <div className="flex gap-3">
            {[12, 40, 80].map((val) => (
              <button
                key={val}
                onClick={() => setGlassWhiteness(val)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all \${glassWhiteness === val ? "bg-white text-black" : "bg-white/5 border border-white/10 hover:bg-white/10"}`}
              >
                {val === 12 ? "Default (12%)" : `\${val}%`}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic VVP Module Loader */}
        <InnovationPortal />

      </div>
    </div>
  );
}

export default App;
