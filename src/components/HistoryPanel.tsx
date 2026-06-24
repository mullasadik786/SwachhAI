import React from "react";
import { motion } from "motion/react";
import { History, Calendar, Trash2, ArrowUpRight, Sparkles, Trophy } from "lucide-react";
import { HistoryItem } from "../types";
import { Language, translations } from "../utils/translations";

interface HistoryPanelProps {
  language: Language;
  history: HistoryItem[];
  onClearHistory: () => void;
  textSize: "standard" | "large" | "extra";
}

const leaderboardList = [
  { rank: 1, name: "Pranav M. (Amaravati)", points: 480, avatar: "🏆" },
  { rank: 2, name: "Srujana K. (Vijayawada)", points: 410, avatar: "🥈" },
  { rank: 3, name: "Venkatesh S. (Vizag)", points: 350, avatar: "🥉" },
  { rank: 4, name: "Suresh R. (Guntur)", points: 290, avatar: "🌿" }
];

export default function HistoryPanel({
  language,
  history,
  onClearHistory,
  textSize
}: HistoryPanelProps) {
  const t = translations[language];

  const getCategoryBadgeColor = (cat: string) => {
    switch (cat) {
      case "wet":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300";
      case "recyclable":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300";
      case "dry":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300";
      case "hazardous":
        return "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getDynamicTextClass = () => {
    if (textSize === "large") return "text-sm md:text-base";
    if (textSize === "extra") return "text-base md:text-lg";
    return "text-xs";
  };

  return (
    <div className="grid md:grid-cols-12 gap-6">
      
      {/* History log */}
      <div className="md:col-span-8 bg-white/80 dark:bg-gray-950/75 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-900 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <History className="text-emerald-600 dark:text-emerald-400" size={20} />
            <h3 className="text-md font-bold font-display text-gray-900 dark:text-white">
              {t.historyTitle}
            </h3>
          </div>
          
          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
            >
              <Trash2 size={13} />
              {t.clearHistoryButton}
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="py-12 text-center text-gray-400 dark:text-gray-500 space-y-2">
            <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center mx-auto border border-gray-100 dark:border-gray-800">
              <History size={20} className="text-gray-300" />
            </div>
            <p className="text-xs font-bold">
              {t.noHistoryText}
            </p>
            <p className="text-[10px] font-semibold">
              {t.noHistorySub}
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {history.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3.5 bg-gray-50/50 dark:bg-gray-900/20 border border-gray-100 dark:border-gray-900 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.itemName}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-lg object-cover border border-gray-100 dark:border-gray-800"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 font-mono text-sm font-bold">
                      {item.itemName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                      {language === "te" 
                        ? (item.itemName.split("/")[1] || item.itemName).trim() 
                        : language === "hi"
                        ? (item.itemName.split("/")[2] || item.itemName.split("/")[0]).trim()
                        : (item.itemName.split("/")[0] || item.itemName).trim()
                      }
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${getCategoryBadgeColor(item.category)}`}>
                        {language === "te" ? item.categoryLabel.split("(")[0].trim() : item.categoryLabel.split("(")[1]?.replace(")", "").trim() || item.category}
                      </span>
                      <span className="text-[9px] text-gray-400 font-mono flex items-center gap-0.5 font-semibold">
                        <Calendar size={10} />
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    +{item.pointsReward} PTS
                  </span>
                  <ArrowUpRight size={14} className="text-gray-300" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Leaderboard Column */}
      <div className="md:col-span-4 bg-white/80 dark:bg-gray-950/75 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-900 pb-4 mb-5">
            <div className="flex items-center gap-2">
              <Trophy className="text-amber-500 animate-bounce" size={20} />
              <h3 className="text-md font-bold font-display text-gray-900 dark:text-white">
                {t.leaderboardTitle}
              </h3>
            </div>
            <Sparkles size={14} className="text-amber-500 animate-pulse" />
          </div>

          <div className="space-y-3.5">
            {leaderboardList.map((hero) => (
              <div
                key={hero.rank}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg w-6 text-center">{hero.avatar}</span>
                  <div>
                    <p className="text-xs font-bold text-gray-800 dark:text-white font-sans leading-none">
                      {hero.name}
                    </p>
                    <p className="text-[9px] text-gray-400 font-mono mt-1 font-semibold">
                      Rank #{hero.rank}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono bg-amber-50 dark:bg-amber-950/40 border border-amber-100/50 dark:border-amber-900/40 px-2 py-0.5 rounded-lg shrink-0">
                  {hero.points} pts
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-900 pt-4 mt-6">
          <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-relaxed text-center font-semibold">
            {t.leaderboardFooter}
          </p>
        </div>

      </div>

    </div>
  );
}
