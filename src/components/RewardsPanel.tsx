import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, BadgeCheck, Check, Sparkles, Gift, Copy, ShoppingBag, Mountain } from "lucide-react";
import { RewardCoupon } from "../types";
import { Language, translations } from "../utils/translations";

interface RewardsPanelProps {
  language: Language;
  userPoints: number;
  onDeductPoints: (pts: number) => void;
  textSize: "standard" | "large" | "extra";
}

// Extended Reward Coupon to include optional VVP tag
interface VVPCoupon extends RewardCoupon {
  isVvp?: boolean;
}

const couponsDatabase: VVPCoupon[] = [
  // Standard Municipal Rewards
  {
    id: "compost_free",
    titleEnglish: "Free Organic Compost Bag",
    titleTelugu: "ఉచిత సేంద్రీయ ఎరువుల సంచి",
    titleHindi: "मुफ्त जैविक खाद का बैग",
    partner: "Telugu Natural Organics",
    costPoints: 100,
    promoCode: "SWACHHORG100",
    category: "organic",
    descriptionEnglish: "Get a free 2kg premium compost package prepared from municipal wet waste recyclers.",
    descriptionTelugu: "మున్సిపల్ తడి చెత్త నుండి తయారైన 2 కేజీల ప్రీమియం సేంద్రీయ ఎరువును ఉచితంగా పొందండి.",
    descriptionHindi: "नगर निगम के गीले कचरे के पुनर्चक्रण से तैयार 2 किलो का प्रीमियम जैविक खाद बैग प्राप्त करें।",
    image: "🌿"
  },
  {
    id: "eco_bag",
    titleEnglish: "Swachh Cotton Carry Bag",
    titleTelugu: "స్వచ్ఛమైన కాటన్ క్యారీ బ్యాగ్",
    titleHindi: "स्वच्छ कॉटन कैरी बैग",
    partner: "Saroja Eco-Crafters",
    costPoints: 80,
    promoCode: "COTTONBAG80",
    category: "groceries",
    descriptionEnglish: "Exchange your points for a beautifully stitched, durable 100% cotton reusable grocery bag.",
    descriptionTelugu: "మీ పాయింట్లను ఉపయోగించి 100% పర్యావరణహిత కాటన్ క్యారీ బ్యాగ్ ఉచితంగా పొందండి.",
    descriptionHindi: "अपने अंकों को 100% सूती पर्यावरण-अनुकूल पुन: प्रयोज्य किराना बैग से बदलें।",
    image: "🛍️"
  },
  // VIBRANT VILLAGES PROGRAMME (VVP) ECO PRODUCTS (From Border SHGs)
  {
    id: "vvp_bag",
    titleEnglish: "Himalayan Hand-woven Carry Bag",
    titleTelugu: "హిమాలయ చేతితో నేసిన కాటన్ సంచి",
    titleHindi: "हिमालयी हस्तनिर्मित सूती बैग",
    partner: "Ladakh Self-Help Group (SHG)",
    costPoints: 100,
    promoCode: "VVPHIMBAG100",
    category: "retail",
    descriptionEnglish: "Eco-crafted reusable sturdy bag made from organic cotton by women SHGs in Diskit village, Ladakh.",
    descriptionTelugu: "లడఖ్‌లోని దిస్కిట్ గ్రామ మహిళా స్వయం సహాయక సంఘం సేంద్రీయ కాటన్‌తో తయారు చేసిన మన్నికైన సంచి.",
    descriptionHindi: "लद्दाख के दिस्कित गांव की महिला स्वयं सहायता समूह द्वारा जैविक कपास से बनाया गया मजबूत झोला।",
    image: "🏔️",
    isVvp: true
  },
  {
    id: "vvp_apricot",
    titleEnglish: "Ladakhi Organic Apricot Scrub",
    titleTelugu: "లడఖీ ఆర్గానిక్ జల్దరు స్క్రబ్",
    titleHindi: "लद्धाखी जैविक खुबानी स्क्रब",
    partner: "Spiti Mountain Farmers Co-op",
    costPoints: 120,
    promoCode: "VVPLADAKH120",
    category: "organic",
    descriptionEnglish: "All-natural exfoliating scrub hand-milled from sun-dried Himalayan wild apricots.",
    descriptionTelugu: "ఎండలో ఎండిన హిమాలయ అడవి జల్దరు పండ్ల నుండి చేతితో తయారు చేసిన సహజసిద్ధమైన ఆర్గానిక్ స్క్రబ్.",
    descriptionHindi: "धूप में सुखाए गए हिमालयी खुबानी से पहाड़ी महिलाओं द्वारा निर्मित 100% जैविक त्वचा स्क्रब।",
    image: "🍑",
    isVvp: true
  },
  {
    id: "vvp_tea",
    titleEnglish: "Himachal Herbal Tea Infusion Pack",
    titleTelugu: "హిమాచల్ హెర్బల్ టీ ప్యాక్",
    titleHindi: "हिमाचल हर्बल टी पैकेट",
    partner: "Kinnaur Eco-Growers Association",
    costPoints: 80,
    promoCode: "VVPHIMTEA80",
    category: "organic",
    descriptionEnglish: "Pristine tea infusion of wild herbs handpicked from the high altitudes of Kalpa, Himachal.",
    descriptionTelugu: "హిమాచల్ ప్రదేశ్‌లోని కల్పా పర్వత ప్రాంతాలలో సేకరించిన అడవి మూలికల స్వచ్ఛమైన ఆర్గానిక్ టీ ప్యాక్.",
    descriptionHindi: "हिमाचल के कल्प के ऊंचे पहाड़ों से चुनी गई जंगली जड़ी-बूटियों की ताज़ा और शुद्ध चायपत्ती।",
    image: "🍵",
    isVvp: true
  },
  {
    id: "vvp_socks",
    titleEnglish: "Arunachal Yak Wool Eco-socks",
    titleTelugu: "అరుణాచల్ యాక్ ఉన్ని సాక్సులు",
    titleHindi: "अरुणाचल याक उनी मोज़े",
    partner: "Zemithang Village Weaver Union",
    costPoints: 150,
    promoCode: "VVPARUN150",
    category: "retail",
    descriptionEnglish: "Extremely warm and breathable custom-knit socks hand-woven from sustainably sourced high-altitude Yak wool.",
    descriptionTelugu: "అరుణాచల్ సరిహద్దు తవాంగ్ సమీపంలోని జెమితాంగ్ గ్రామంలో యాక్ ఉన్నితో చేతితో నేసిన వెచ్చని సాక్సులు.",
    descriptionHindi: "अरुणाचल के सीमावर्ती जेमीथांग गांव की बुनकर महिलाओं द्वारा याक की शुद्ध उनी से बुने मोज़े।",
    image: "🧦",
    isVvp: true
  }
];

export default function RewardsPanel({
  language,
  userPoints,
  onDeductPoints,
  textSize
}: RewardsPanelProps) {
  const t = translations[language];

  const [selectedCoupon, setSelectedCoupon] = useState<VVPCoupon | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemedCode, setRedeemedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "vvp" | "municipal">("all");

  const handleRedeemClick = (coupon: VVPCoupon) => {
    if (userPoints >= coupon.costPoints) {
      setSelectedCoupon(coupon);
      setRedeemedCode(null);
    }
  };

  const confirmRedeem = () => {
    if (!selectedCoupon) return;
    setIsRedeeming(true);
    
    setTimeout(() => {
      onDeductPoints(selectedCoupon.costPoints);
      setRedeemedCode(selectedCoupon.promoCode);
      setIsRedeeming(false);
    }, 1200);
  };

  const handleCopyCode = () => {
    if (redeemedCode) {
      navigator.clipboard.writeText(redeemedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCloseModal = () => {
    setSelectedCoupon(null);
    setRedeemedCode(null);
    setCopied(false);
  };

  const getDynamicTextClass = () => {
    if (textSize === "large") return "text-sm md:text-base";
    if (textSize === "extra") return "text-base md:text-lg";
    return "text-xs";
  };

  const filteredCoupons = couponsDatabase.filter(coupon => {
    if (activeTab === "vvp") return coupon.isVvp;
    if (activeTab === "municipal") return !coupon.isVvp;
    return true;
  });

  return (
    <div className="bg-white/80 dark:bg-gray-950/75 border border-gray-200/50 dark:border-gray-800/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-full backdrop-blur-md">
      <div>
        
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-gray-100/60 dark:border-gray-900/50 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Award className="text-amber-500 animate-pulse" size={22} />
            <h3 className="text-md font-bold font-display text-gray-900 dark:text-white">
              {t.rewardsStoreTitle}
            </h3>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/50 flex items-center gap-1.5 font-mono shadow-inner shrink-0">
            <Sparkles size={14} className="text-amber-500 animate-bounce" />
            <span className="text-xs font-black text-amber-800 dark:text-amber-300">
              {userPoints} PTS
            </span>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex gap-1.5 bg-gray-100/70 dark:bg-gray-900/40 p-1 rounded-xl border border-gray-200/40 dark:border-gray-800/40 mb-4 text-[11px] font-bold">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              activeTab === "all"
                ? "bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-800"
            }`}
          >
            {language === "te" ? "అన్నీ" : language === "hi" ? "सभी" : "All Rewards"}
          </button>
          <button
            onClick={() => setActiveTab("vvp")}
            className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${
              activeTab === "vvp"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-gray-500 dark:text-gray-400 hover:text-emerald-500"
            }`}
          >
            <Mountain size={11} />
            <span>VVP Store</span>
          </button>
          <button
            onClick={() => setActiveTab("municipal")}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              activeTab === "municipal"
                ? "bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-800"
            }`}
          >
            {language === "te" ? "మున్సిపల్" : language === "hi" ? "नगर निगम" : "Municipal"}
          </button>
        </div>

        {activeTab === "vvp" && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
            <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1 mb-1">
              <Mountain size={12} /> {t.vvpStoreTitle}
            </p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-normal font-semibold">
              {t.vvpStoreSub}
            </p>
          </div>
        )}

        {/* Coupons List */}
        <div className="space-y-3.5 max-h-[360px] overflow-y-auto pr-1">
          {filteredCoupons.map((coupon) => {
            const isAffordable = userPoints >= coupon.costPoints;
            return (
              <div
                key={coupon.id}
                className={`p-4 rounded-2xl border transition-all duration-300 relative ${
                  isAffordable
                    ? "bg-gray-50/50 hover:bg-amber-50/5 dark:bg-gray-900/10 border-gray-100/80 dark:border-gray-900/80 hover:border-amber-500/30"
                    : "bg-gray-50/30 dark:bg-gray-900/5 border-gray-100/60 dark:border-gray-900/40 opacity-75"
                }`}
              >
                {coupon.isVvp && (
                  <span className="absolute top-2.5 right-2.5 text-[8px] font-black uppercase tracking-widest bg-emerald-600 text-white px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                    <Mountain size={8} /> VVP Eco
                  </span>
                )}

                <div className="flex gap-4">
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-900 border border-gray-100/80 dark:border-gray-800/80 flex items-center justify-center text-2xl shadow-xs shrink-0">
                    {coupon.image}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 font-sans tracking-wide uppercase">
                      {coupon.partner}
                    </span>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate font-display">
                      {language === "te" ? coupon.titleTelugu : language === "hi" ? coupon.titleHindi : coupon.titleEnglish}
                    </h4>
                    <p className={`${getDynamicTextClass()} text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed font-semibold`}>
                      {language === "te" ? coupon.descriptionTelugu : language === "hi" ? coupon.descriptionHindi : coupon.descriptionEnglish}
                    </p>
                  </div>
                </div>

                {/* Costs & Redeem Trigger */}
                <div className="flex items-center justify-between border-t border-gray-100/60 dark:border-gray-900/60 mt-3 pt-3">
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-400 font-mono">
                    <Gift size={13} />
                    <span>{coupon.costPoints} {t.redeemCost}</span>
                  </div>
                  
                  <button
                    disabled={!isAffordable}
                    onClick={() => handleRedeemClick(coupon)}
                    className={`px-3 py-1.5 text-[11px] font-extrabold rounded-lg shadow-sm transition-all ${
                      isAffordable
                        ? "bg-amber-500 hover:bg-amber-600 active:scale-95 text-white cursor-pointer"
                        : "bg-gray-100 dark:bg-gray-900 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    {t.redeemButton}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Footer Encouragement */}
      <div className="border-t border-gray-100/60 dark:border-gray-900/60 pt-4 mt-6 text-center">
        <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-relaxed font-semibold">
          {language === "te" 
            ? "*ఈ పాయింట్లను అమరావతి భాగస్వామ్య గ్రీన్ అవుట్‌లెట్లలో లేదా బోర్డర్ వీక్షణాల్లో ఉపయోగించవచ్చు." 
            : language === "hi"
            ? "*इन कूपनों को अमरावती और हमारे अधिकृत सीमांत सहयोग केंद्रों पर भुनाया जा सकता है।"
            : "*Redeem points at local green businesses or supported border SHGs in India."}
        </p>
      </div>

      {/* MODAL WINDOW FOR REDEMPTION */}
      <AnimatePresence>
        {selectedCoupon && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative overflow-hidden"
            >
              
              {selectedCoupon && redeemedCode && (
                <div className="absolute inset-0 pointer-events-none opacity-20">
                  <div className="absolute top-4 left-4 text-amber-500 animate-pulse text-lg">✦</div>
                  <div className="absolute bottom-10 right-4 text-amber-500 animate-bounce text-xl">✦</div>
                </div>
              )}

              <div className="text-center space-y-4">
                
                <div className="w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-3xl mx-auto border border-amber-100 dark:border-amber-900/50">
                  {selectedCoupon.image}
                </div>

                <div className="space-y-1">
                  <h4 className="text-md font-bold font-display text-gray-900 dark:text-white">
                    {language === "te" ? selectedCoupon.titleTelugu : language === "hi" ? selectedCoupon.titleHindi : selectedCoupon.titleEnglish}
                  </h4>
                  <p className="text-xs text-gray-400 font-sans">
                    {selectedCoupon.partner}
                  </p>
                </div>

                {!redeemedCode ? (
                  /* Confirm confirmation */
                  <div className="space-y-4 pt-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold leading-relaxed">
                      {language === "te" 
                        ? `ఈ కూపన్‌ని క్లెయిమ్ చేయడానికి మీ ఖాతా నుండి ${selectedCoupon.costPoints} పాయింట్లు తీసివేయబడతాయి.`
                        : language === "hi"
                        ? `इस कूपन को प्राप्त करने के लिए आपके खाते से ${selectedCoupon.costPoints} अंक काट लिए जाएंगे।`
                        : `This will deduct ${selectedCoupon.costPoints} points from your balance. Confirm coupon request?`}
                    </p>
                    <div className="flex gap-2.5">
                      <button
                        onClick={handleCloseModal}
                        className="flex-1 py-2 text-xs font-bold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-900 rounded-xl transition-colors"
                      >
                        {language === "te" ? "రద్దు చేయి" : language === "hi" ? "रद्द करें" : "Cancel"}
                      </button>
                      <button
                        onClick={confirmRedeem}
                        disabled={isRedeeming}
                        className="flex-1 py-2 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                      >
                        {isRedeeming ? (
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          language === "te" ? "నిర్ధారించు" : language === "hi" ? "पुष्टि करें" : "Confirm"
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Redemeed Success with Barcode! */
                  <div className="space-y-4 pt-2">
                    <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl flex items-center justify-center gap-2 text-emerald-800 dark:text-emerald-300">
                      <BadgeCheck size={18} />
                      <span className="text-xs font-bold">
                        {t.redeemedSuccess} {redeemedCode}
                      </span>
                    </div>

                    {/* Barcode */}
                    <div className="py-2 px-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1">
                      <div className="h-10 flex items-center justify-center gap-0.5">
                        {[3,1,4,2,3,1,2,4,1,3,2,1,4,1,3,2,2].map((width, idx) => (
                          <div 
                            key={idx} 
                            className="bg-gray-800 dark:bg-gray-200 h-full"
                            style={{ width: `${width}px` }}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-gray-400 tracking-widest block text-center">
                        * {redeemedCode} *
                      </span>
                    </div>

                    {/* Copy Promo Code */}
                    <div className="flex items-center bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-2.5 rounded-xl justify-between">
                      <span className="text-xs font-bold font-mono text-gray-700 dark:text-gray-300">
                        {redeemedCode}
                      </span>
                      <button
                        onClick={handleCopyCode}
                        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg text-emerald-600 dark:text-emerald-400 transition-colors flex items-center gap-1 text-[10px] font-bold"
                      >
                        {copied ? <Check size={13} /> : <Copy size={13} />}
                        {copied ? (language === "te" ? "కాపీ చేయబడింది" : language === "hi" ? "कॉपी हुआ" : "Copied!") : (language === "te" ? "కాపీ" : language === "hi" ? "कॉपी" : "Copy")}
                      </button>
                    </div>

                    <button
                      onClick={handleCloseModal}
                      className="w-full py-2.5 bg-gray-800 text-white rounded-xl text-xs font-bold hover:bg-gray-700 transition-colors"
                    >
                      {language === "te" ? "పూర్తయింది" : language === "hi" ? "पूरा हुआ" : "Done"}
                    </button>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
