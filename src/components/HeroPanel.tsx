import React, { useState } from "react";
import { motion } from "motion/react";
import { Quote, HeartHandshake, Eye, EyeOff, MapPin } from "lucide-react";
import { Language, translations } from "../utils/translations";

const namaskarImage = "/src/assets/images/swachh_bharat_namaskar_1782307077431.jpg";
const swachhBharatBg = "/src/assets/images/swachh_bharat_wallpaper_1782308751533.jpg";

interface HeroPanelProps {
  language: Language;
  selectedWallpaper: string;
  setSelectedWallpaper: (wp: string) => void;
  bgOpacity: number;
  setBgOpacity: (opacity: number) => void;
}

export default function HeroPanel({
  language,
  selectedWallpaper,
  setSelectedWallpaper,
  bgOpacity,
  setBgOpacity,
}: HeroPanelProps) {
  const [showMotto, setShowMotto] = useState(true);
  const t = translations[language];

  // List of high-quality backdrops with the requested Swachh Bharat Special live wallpaper option!
  const wallpapers = [
    { id: "clean_mint", label: t.themeMint },
    { id: "solar_glow", label: t.themeSolar },
    { id: "aurora_sky", label: t.themeAurora },
    { id: "classic_slate", label: t.themeSlate },
    { id: "swachh_bharat_special", label: t.themeSwachh }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 dark:bg-gray-950/75 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="grid md:grid-cols-12 items-center gap-6 p-6">
        
        {/* Left Column: Namaskar or Swachh Bharat Image with Overlays */}
        <div className="md:col-span-5 relative group overflow-hidden rounded-2xl aspect-[16/9] md:aspect-auto md:h-64 shadow-inner border border-gray-100 dark:border-gray-800">
          <img
            src={selectedWallpaper === "swachh_bharat_special" ? swachhBharatBg : namaskarImage}
            alt="Swachh Bharat Greeting Backdrop - SwachhAI"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/40 to-transparent flex flex-col justify-end p-4">
            <span className="text-amber-400 font-display font-black text-xs uppercase tracking-wider flex items-center gap-1 bg-black/40 backdrop-blur-xs w-max px-2.5 py-1 rounded-full border border-amber-400/20">
              <HeartHandshake size={14} className="animate-pulse text-amber-400" /> 
              Swachh Bharat Mission
            </span>
            <p className="text-white font-black font-display text-base md:text-lg leading-snug mt-2 italic shadow-sm">
              {language === "te" ? `"పరిశుభ్రతే మహాభాగ్యం"` : language === "hi" ? `"स्वच्छता ही सेवा है"` : `"Cleanliness is Next to Godliness"`}
            </p>
          </div>
        </div>

        {/* Right Column: Dynamic Motto / Area Indicator & Wallpaper Selectors */}
        <div className="md:col-span-7 flex flex-col justify-between h-full gap-4">
          <div>
            <div className="flex items-center justify-between">
              {/* Active Zone Badge showing Amaravati AP Capital */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/40 text-amber-800 dark:text-amber-300">
                <MapPin size={15} className="animate-bounce" />
                <div className="text-xs">
                  <span className="font-semibold">{t.activeZoneLabel} </span>
                  <span className="font-extrabold underline">{t.activeCityVal}</span>
                </div>
              </div>

              <button
                onClick={() => setShowMotto(!showMotto)}
                className="text-xs text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors"
              >
                {showMotto ? <EyeOff size={14} /> : <Eye size={14} />}
                {showMotto ? (language === "te" ? "దాచు" : language === "hi" ? "छिपाएं" : "Hide") : (language === "te" ? "చూపించు" : language === "hi" ? "दिखाएं" : "Show")}
              </button>
            </div>

            {showMotto && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                <h3 className="text-sm md:text-base font-extrabold font-display text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Quote size={16} /> {t.namaskarTitle}
                </h3>
                <p className="text-xs md:text-sm font-medium font-sans text-gray-800 dark:text-gray-200 border-l-4 border-emerald-500 pl-3 leading-relaxed mt-2 italic">
                  {t.namaskarQuote}
                </p>
              </motion.div>
            )}
          </div>

          {/* Wallpaper Selection Container */}
          <div className="border-t border-gray-100 dark:border-gray-900 pt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="text-xs font-bold font-sans text-gray-500 dark:text-gray-400 flex items-center gap-1">
              🎨 {t.themeSelectorLabel}
            </span>
            <div className="flex flex-wrap items-center gap-1.5 bg-gray-50 dark:bg-gray-900 p-1 rounded-xl border border-gray-200/50 dark:border-gray-800/50">
              {wallpapers.map((wp) => (
                <button
                  key={wp.id}
                  onClick={() => setSelectedWallpaper(wp.id)}
                  className={`px-2 py-1 text-[10px] sm:text-xs rounded-lg transition-all font-bold ${
                    selectedWallpaper === wp.id
                      ? "bg-emerald-600 text-white shadow-md scale-102"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {wp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Glass Whiteness/Opacity Slider Adjuster */}
          <div className="border-t border-gray-100 dark:border-gray-900 pt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-xs font-bold font-sans text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                🎛️ {language === "te" ? "గ్లాస్ తెలుపుదనం (Whiteness Overlay):" : language === "hi" ? "ग्लास सफेदी (Whiteness):" : "Glass Whiteness (Overlay):"}
              </span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500">
                {language === "te" ? "వాల్‌పేపర్ స్పష్టత కోసం అడ్జస్ట్ చేయండి" : language === "hi" ? "वॉलपेपर की स्पष्टता के लिए समायोजित करें" : "Adjust for wallpaper visibility & clarity"}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* Opacity Value Badge */}
              <span className="px-2 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-mono font-black text-xs rounded-lg border border-emerald-100 dark:border-emerald-900/30 shrink-0">
                {bgOpacity}%
              </span>

              {/* Range Slider */}
              <input
                type="range"
                min="0"
                max="100"
                value={bgOpacity}
                onChange={(e) => setBgOpacity(parseInt(e.target.value, 10))}
                className="w-full sm:w-32 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />

              {/* Quick Adjustment presets */}
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-lg border border-gray-200/50 dark:border-gray-800/50">
                {[
                  { value: 0, label: language === "te" ? "తొలగించు" : language === "hi" ? "हटाएं" : "Clear" },
                  { value: 12, label: language === "te" ? "డిఫాల్ట్ (12%)" : language === "hi" ? "डिफ़ॉल्ट (12%)" : "Default (12%)" },
                  { value: 40, label: "40%" }
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setBgOpacity(item.value)}
                    className={`px-2 py-0.5 text-[9px] rounded-md transition-all font-bold ${
                      bgOpacity === item.value
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
