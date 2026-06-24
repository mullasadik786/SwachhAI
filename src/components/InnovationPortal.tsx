import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Map, Compass, WifiOff, Home, Truck, Volume2, Play, Square, 
  Trash2, Trophy, Award, Palette, Camera, ShieldCheck, Sparkles, 
  ChevronRight, RefreshCw, Layers, Check, Coins, Users, Image
} from "lucide-react";
import { Language } from "../utils/translations";

interface InnovationPortalProps {
  language: Language;
  userPoints: number;
  onPointsEarned: (pts: number) => void;
  onDeductPoints: (pts: number) => boolean;
  textSize: "standard" | "large" | "extra";
}

// Local translation dictionary for premium features
const localT = {
  en: {
    portalTitle: "SwachhAI Premium v1.2",
    portalSubtitle: "Smart tourism, localized grid-logistics, and proactive eco-game zones",
    tabTourism: "Eco-Tourism",
    tabLogistics: "Citizen Logistics",
    tabGamification: "Green Play & Craft",
    tabAi: "Proactive AI Hub",
    
    // Eco-tourism
    trailTitle: "Eco-Trail Active Heatmaps",
    trailSub: "Identify & clean littered trails in Himalayan border areas",
    trailLegendHigh: "High Litter",
    trailLegendClean: "Cleaned Zone",
    trailCleanSuccess: "Dispatch successful! Swachh Eco-Band deployed. Earned +100 Points!",
    offlineTitle: "Offline AI On-Device Scanning",
    offlineSub: "For zero-connectivity regions like Ladakh & Kibithu",
    offlineBtnLoad: "Initialize Lightweight WASM Model",
    offlineBtnLoaded: "Lightweight Model Ready (WASM Local)",
    offlineScanning: "Local scanning ready without internet",
    homestayTitle: "VVP Green Homestay Rewards",
    homestaySub: "Redeem your Swachh points for certified green homestays",
    homestayBookBtn: "Book Stay (350 Points)",
    homestaySuccess: "Homestay booked! QR Voucher sent to your phone. -350 Points.",
    homestayLowPoints: "Need more points! Earn points by cleanups or trash scanning.",

    // Smart Logistics
    missedTruckTitle: '"Missed My Truck" Route Request',
    missedTruckSub: "Missed the morning pickup? Request secondary micro-pickup within 1km",
    missedTruckBtn: "Request Nearby Micro-Pickup",
    missedTruckSuccess: "Micro-pickup vehicle dispatched! Arriving in 15 minutes.",
    audioTitle: "Audio-Beacon Ambient Alerts",
    audioSub: "Play municipal garbage truck notification jingle",
    audioPlaying: "Playing Beacon Song...",
    audioPlayBtn: "Test Siren Ringtone",
    binTitle: "Bin-Fullness IoT Predictor",
    binSub: "Live sensor status of public garbage containers",
    binRefreshBtn: "Refresh Sensors",

    // Gamification
    leagueTitle: "Swachh Corporate Leagues",
    leagueSub: "Schools & businesses competing for Cleanest Zone Shield",
    nftTitle: "Green NFT Milestone Badges",
    nftSub: "Verifiable digital collectibles on Swachh chain",
    nftClaim: "Claim NFT Badge (250 Points)",
    nftClaimSuccess: "Congratulations! NFT minted on Polygon ledger! -250 Points.",
    artTitle: "Waste-to-Art Craft Exchange",
    artSub: "Trade collected materials with local craft artisans",
    artTradeBtn: "Trade Materials (+120 Points)",
    artTradeSuccess: "Artisan transaction complete! Raw waste traded for craft points. +120 Points!",

    // Proactive AI
    bulkTitle: "Bulk Waste Volume AI Estimator",
    bulkSub: "Instant clean-up workload calculation via smart photo analysis",
    bulkBtn: "Analyze Pile Image",
    bulkResult: "AI Calculation complete: Estimated 3.4 Tons, requires 18 bags, 4.2 hours labor.",
    routeTitle: "AI Automated Grievance Routing",
    routeSub: "Extract photo GPS tags & dispatch directly to assigned ward officer",
    routeBtn: "Scan & Route Ticket",
    routeResult: "Success! Routed to Officer R. K. Naidu (Ward 14, Amaravati). Ticket #SW44129."
  },
  te: {
    portalTitle: "స్వచ్ఛAI ప్రీమియం v1.2",
    portalSubtitle: "స్మార్ట్ టూరిజం, స్థానిక లాజిస్టిక్స్ మరియు ఎకో-గేమ్ జోన్‌లు",
    tabTourism: "ఎకో-టూరిజం",
    tabLogistics: "సిటిజెన్ లాజిస్టిక్స్",
    tabGamification: "గ్రీన్ ప్లే & క్రాఫ్ట్",
    tabAi: "ప్రోయాక్టివ్ AI హబ్",
    
    trailTitle: "ఎకో-ట్రైల్ యాక్టివ్ హీట్‌మ్యాప్స్",
    trailSub: "హిమాలయ సరిహద్దు ప్రాంతాలలో చెత్త పేరుకుపోయిన మార్గాలను గుర్తించండి",
    trailLegendHigh: "ఎక్కువ చెత్త",
    trailLegendClean: "శుభ్రం చేసిన ప్రాంతం",
    trailCleanSuccess: "డిస్పాచ్ విజయం! స్వచ్ఛ ఎకో-బ్యాండ్ మోహరించబడింది. +100 పాయింట్లు లభించాయి!",
    offlineTitle: "ఆఫ్‌లైన్ AI ఆన్-డివైస్ స్కానింగ్",
    offlineSub: "లడఖ్ & కిబితు వంటి ఇంటర్నెట్ లేని ప్రాంతాల కోసం",
    offlineBtnLoad: "లైట్ వెయిట్ WASM మోడల్ ప్రారంభించు",
    offlineBtnLoaded: "లైట్ వెయిట్ మోడల్ సిద్ధంగా ఉంది (WASM లోకల్)",
    offlineScanning: "ఇంటర్నెట్ లేకుండా స్థానిక స్కానింగ్ సిద్ధంగా ఉంది",
    homestayTitle: "VVP గ్రీన్ హోమ్‌స్టే రివార్డ్‌లు",
    homestaySub: "గ్రీన్ హోమ్‌స్టేలలో డిస్కౌంట్‌ల కోసం పాయింట్లను రీడీమ్ చేసుకోండి",
    homestayBookBtn: "బుక్ చేయండి (350 పాయింట్లు)",
    homestaySuccess: "హోమ్‌స్టే బుక్ చేయబడింది! QR వోచర్ ఫోన్‌కి పంపబడింది. -350 పాయింట్లు.",
    homestayLowPoints: "మరిన్ని పాయింట్లు కావాలి! స్కానింగ్ ద్వారా పాయింట్లు సంపాదించండి.",

    missedTruckTitle: '"మిస్డ్ మై ట్రక్" రూట్ అభ్యర్థన',
    missedTruckSub: "ఉదయం పికప్ మిస్ అయ్యారా? 1 కిమీ పరిధిలో మైక్రో-పికప్ అభ్యర్థించండి",
    missedTruckBtn: "సమీప మైక్రో-పికప్ అభ్యర్థించండి",
    missedTruckSuccess: "మైక్రో-పికప్ వాహనం పంపబడింది! 15 నిమిషాల్లో వస్తుంది.",
    audioTitle: "ఆడియో-బీకాన్ అంబియెంట్ అలర్ట్‌లు",
    audioSub: "మునిసిపల్ గార్బేజ్ ట్రక్ నోటిఫికేషన్ జింగిల్ ప్లే చేయండి",
    audioPlaying: "బీకాన్ సాంగ్ ప్లే అవుతోంది...",
    audioPlayBtn: "సైరన్ రింగ్‌టోన్ టెస్ట్ చేయి",
    binTitle: "బిన్-ఫుల్‌నెస్ IoT ప్రిడిక్టర్",
    binSub: "ప్రజా డబ్బాల ప్రత్యక్ష సెన్సార్ స్థితి",
    binRefreshBtn: "సెన్సార్లు రీఫ్రెష్ చేయి",

    leagueTitle: "స్వచ్ఛ కార్పొరేట్ లీగ్‌లు",
    leagueSub: "షీల్డ్ కోసం పోటీపడుతున్న పాఠశాలలు & వ్యాపారాలు",
    nftTitle: "గ్రీన్ NFT మైల్‌స్టోన్ బ్యాడ్జ్‌లు",
    nftSub: "స్వచ్ఛ చైన్‌లో ధృవీకరించదగిన డిజిటల్ సేకరణలు",
    nftClaim: "NFT బ్యాడ్జ్ పొందండి (250 పాయింట్లు)",
    nftClaimSuccess: "అభినందనలు! పాలిగాన్ లెడ్జర్‌లో NFT మింట్ చేయబడింది! -250 పాయింట్లు.",
    artTitle: "వేస్ట్-టు-ఆర్ట్ క్రాఫ్ట్ ఎక్స్ఛేంజ్",
    artSub: "చెత్తను స్థానిక కళాకారులతో వ్యాపారం చేయండి",
    artTradeBtn: "మెటీరియల్స్ ట్రేడ్ చేయి (+120 పాయింట్లు)",
    artTradeSuccess: "కళాకారుడి లావాదేవీ పూర్తయింది! +120 పాయింట్లు వచ్చాయి!",

    bulkTitle: "బల్క్ వేస్ట్ వాల్యూమ్ AI ఎస్టిమేటర్",
    bulkSub: "స్మార్ట్ ఫోటో విశ్లేషణ ద్వారా పని పరిమాణం లెక్కింపు",
    bulkBtn: "చెత్త కుప్ప చిత్రాన్ని విశ్లేషించండి",
    bulkResult: "AI గణన పూర్తయింది: సుమారు 3.4 టన్నులు, 18 సంచులు కావాలి.",
    routeTitle: "AI ఆటోమేటెడ్ గ్రీవెన్స్ రూటింగ్",
    routeSub: "ఫోటో GPS ట్యాగ్‌లను సంగ్రహించి వార్డు అధికారికి పంపండి",
    routeBtn: "స్క్యాన్ & రూట్ టికెట్",
    routeResult: "విజయం! అధికారి ఆర్. కె. నాయుడు (వార్డు 14, అమరావతి) కి పంపబడింది. టికెట్ #SW44129."
  },
  hi: {
    portalTitle: "स्वच्छAI प्रीमियम v1.2",
    portalSubtitle: "स्मार्ट पर्यटन, स्थानीयकृत ग्रिड-लॉजिस्टिक्स और पर्यावरण-खेल क्षेत्र",
    tabTourism: "पारिस्थितिकी पर्यटन",
    tabLogistics: "नागरिक रसद",
    tabGamification: "हरित खेल और शिल्प",
    tabAi: "सक्रिय AI हब",
    
    trailTitle: "इको-ट्रेल सक्रिय हीटमैप",
    trailSub: "हिमालयी सीमा क्षेत्रों में बिखरे कचरे वाले मार्गों की पहचान करें",
    trailLegendHigh: "अत्यधिक कचरा",
    trailLegendClean: "साफ किया हुआ क्षेत्र",
    trailCleanSuccess: "प्रेषण सफल! स्वच्छ इको-बैंड तैनात। +100 अंक प्राप्त हुए!",
    offlineTitle: "ऑफ़लाइन AI ऑन-डिवाइस स्कैनिंग",
    offlineSub: "लद्दाख और किबिथू जैसे बिना इंटरनेट कनेक्टिविटी वाले क्षेत्रों के लिए",
    offlineBtnLoad: "लाइटवेट WASM मॉडल लोड करें",
    offlineBtnLoaded: "लाइटवेट मॉडल तैयार है (WASM लोकल)",
    offlineScanning: "बिना इंटरनेट स्थानीय स्कैनिंग सक्षम है",
    homestayTitle: "VVP ग्रीन होमस्टे पुरस्कार",
    homestaySub: "ग्रीन होमस्टे में छूट के लिए अपने स्वच्छ अंकों का उपयोग करें",
    homestayBookBtn: "बुक करें (350 अंक)",
    homestaySuccess: "होमस्टे बुक हो गया! आपके फोन पर QR वाउचर भेजा गया है। -350 अंक।",
    homestayLowPoints: "अधिक अंकों की आवश्यकता है! कचरा स्कैन करके अंक अर्जित करें।",

    missedTruckTitle: '"मिस्ड माई ट्रक" मार्ग अनुरोध',
    missedTruckSub: "सुबह की कचरा गाड़ी छूट गई? 1 किमी के दायरे में माइक्रो-पिकअप का अनुरोध करें",
    missedTruckBtn: "निकटतम माइक्रो-पिकअप का अनुरोध करें",
    missedTruckSuccess: "माइक्रो-पिकअप वाहन रवाना! 15 मिनट में पहुंचेगा।",
    audioTitle: "ऑडियो-बीकन परिवेश सचेतक",
    audioSub: "नगरपालिका कचरा गाड़ी का विशेष गीत बजाएं",
    audioPlaying: "बीकन गीत बज रहा है...",
    audioPlayBtn: "सायरन रिंगटोन का परीक्षण करें",
    binTitle: "स्मार्ट कचरा पेटी IoT सूचक",
    binSub: "सार्वजनिक कूड़ेदानों की लाइव सेंसर स्थिति",
    binRefreshBtn: "सेंसर अपडेट करें",

    leagueTitle: "स्वच्छ कॉर्पोरेट लीग",
    leagueSub: "शील्ड के लिए प्रतिस्पर्धा कर रहे स्कूल और व्यवसाय",
    nftTitle: "ग्रीन NFT मील का पत्थर बैज",
    nftSub: "स्वच्छ ब्लॉकचेन पर सत्यापित डिजिटल कलेक्टिबल्स",
    nftClaim: "NFT बैज का दावा करें (250 अंक)",
    nftClaimSuccess: "बधाई हो! पॉलीगॉन लेज़र पर NFT मिंट किया गया! -250 अंक।",
    artTitle: "कचरे से कला शिल्प विनिमय",
    artSub: "एकत्रित कचरे को स्थानीय शिल्पकारों के साथ साझा करें",
    artTradeBtn: "सामग्री का व्यापार करें (+120 अंक)",
    artTradeSuccess: "शिल्पकार लेनदेन पूरा! +120 अंक अर्जित किए!",

    bulkTitle: "थोक अपशिष्ट मात्रा AI मूल्यांकन",
    bulkSub: "स्मार्ट फोटो विश्लेषण के माध्यम से सफाई कार्यभार की गणना",
    bulkBtn: "कचरे के ढेर का विश्लेषण करें",
    bulkResult: "AI गणना पूर्ण: अनुमानित 3.4 टन, 18 बैग आवश्यक हैं।",
    routeTitle: "AI स्वचालित शिकायत अग्रेषण",
    routeSub: "फोटो GPS टैग निकालें और सीधे वार्ड अधिकारी को भेजें",
    routeBtn: "स्कैन और रूट टिकट",
    routeResult: "सफलता! अधिकारी आर. के. नायडू (वार्ड 14, अमरावती) को भेजा गया। टिकट #SW44129."
  }
};

export default function InnovationPortal({
  language,
  userPoints,
  onPointsEarned,
  onDeductPoints,
  textSize
}: InnovationPortalProps) {
  const currentLang = language === "te" ? "te" : language === "hi" ? "hi" : "en";
  const st = localT[currentLang];

  const [activeTab, setActiveTab] = useState<"tourism" | "logistics" | "gamification" | "ai">("tourism");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // ECO-TOURISM STATES
  const [heatmapGrid, setHeatmapGrid] = useState<Array<{ id: number; name: string; littered: boolean; score: number }>>([
    { id: 1, name: "Kargil Trail A", littered: true, score: 85 },
    { id: 2, name: "Pangong Eco-Route", littered: true, score: 92 },
    { id: 3, name: "Nubra Valley Bank", littered: false, score: 10 },
    { id: 4, name: "Kibithu Pass Road", littered: true, score: 78 },
    { id: 5, name: "Tawang Monastery Trail", littered: false, score: 12 },
    { id: 6, name: "Zanskar Trek Spot", littered: true, score: 89 },
    { id: 7, name: "Leh Market Perimeter", littered: false, score: 5 },
    { id: 8, name: "Drass Valley Stream", littered: true, score: 95 }
  ]);
  const [offlineLoaded, setOfflineLoaded] = useState<boolean>(false);
  const [offlineLoading, setOfflineLoading] = useState<boolean>(false);

  // CITIZEN LOGISTICS STATES
  const [missedPickupState, setMissedPickupState] = useState<"idle" | "requesting" | "dispatched">("idle");
  const [missedGridCell, setMissedGridCell] = useState<{ x: number; y: number } | null>({ x: 3, y: 2 });
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [iotBins, setIotBins] = useState([
    { id: "S-101", location: "Leh Bazar", fullness: 88, status: "Critical" },
    { id: "S-102", location: "Border Homestay Zone", fullness: 42, status: "Moderate" },
    { id: "S-103", location: "Tawang Tourist Stand", fullness: 15, status: "Optimal" }
  ]);
  const [isRefreshingIot, setIsRefreshingIot] = useState<boolean>(false);

  // GAMIFICATION STATES
  const [corporateLeagues, setCorporateLeagues] = useState([
    { rank: 1, name: "Amaravati Tech Park", weight: "1,450 kg", score: 980 },
    { rank: 2, name: "Leh Homestay Alliance", weight: "1,220 kg", score: 890 },
    { rank: 3, name: "Kibithu Border School", weight: "940 kg", score: 750 },
    { rank: 4, name: "Nagarjuna Residency Guntur", weight: "780 kg", score: 620 }
  ]);
  const [nfts, setNfts] = useState([
    { id: "nft-1", name: "Silver Sweep Champion", image: "🏆", cost: 250, owned: false },
    { id: "nft-2", name: "Himalayan Green Warrior", image: "🏔️", cost: 250, owned: false }
  ]);
  const [rawMaterials, setRawMaterials] = useState({
    coconutShells: 14,
    plasticBottles: 32,
    cardboard: 8
  });

  // PROACTIVE AI STATES
  const [bulkAnalysisState, setBulkAnalysisState] = useState<"idle" | "analyzing" | "completed">("idle");
  const [grievanceState, setGrievanceState] = useState<"idle" | "routing" | "completed">("idle");

  // Show auto-expiring success jingles
  const triggerSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 4500);
  };

  // 1. Eco Trail dispatch clean action
  const cleanTrail = (id: number) => {
    setHeatmapGrid(prev => prev.map(t => t.id === id ? { ...t, littered: false, score: 0 } : t));
    onPointsEarned(100);
    triggerSuccess(st.trailCleanSuccess);
  };

  // 2. Load Offline AI WASM
  const loadOfflineWasm = () => {
    setOfflineLoading(true);
    setTimeout(() => {
      setOfflineLoading(false);
      setOfflineLoaded(true);
      triggerSuccess(language === "te" ? "ఆఫ్‌లైన్ మోడల్ విజయవంతంగా లోడ్ చేయబడింది!" : "Lightweight WASM AI compiled & loaded successfully on local Cache!");
    }, 2500);
  };

  // 3. Book green homestay
  const bookHomestay = () => {
    const success = onDeductPoints(350);
    if (success) {
      triggerSuccess(st.homestaySuccess);
    } else {
      triggerSuccess(st.homestayLowPoints);
    }
  };

  // 4. Request missed truck pickup
  const handleMissedTruckRequest = () => {
    setMissedPickupState("requesting");
    setTimeout(() => {
      setMissedPickupState("dispatched");
      triggerSuccess(st.missedTruckSuccess);
    }, 2000);
  };

  // 5. Simulated Audio Beacon ringtone using Web Audio API
  const testAudioBeacon = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      return;
    }
    setIsPlayingAudio(true);
    
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        // Play an upbeat 5-note melodic progression resembling municipal siren alert
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.3);
          gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.3);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.3 + 0.28);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.3);
          osc.stop(ctx.currentTime + idx * 0.3 + 0.3);
        });
      }
    } catch (e) {
      console.warn("Web Audio API not supported in this container environment");
    }

    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 3500);
  };

  // 6. Refresh IoT Bins
  const refreshIotSensors = () => {
    setIsRefreshingIot(true);
    setTimeout(() => {
      setIotBins(prev => prev.map(bin => {
        const newFullness = Math.max(10, Math.min(98, Math.round(bin.fullness + (Math.random() * 20 - 10))));
        let newStatus = "Optimal";
        if (newFullness > 80) newStatus = "Critical";
        else if (newFullness > 40) newStatus = "Moderate";
        return { ...bin, fullness: newFullness, status: newStatus };
      }));
      setIsRefreshingIot(false);
      triggerSuccess(language === "te" ? "IoT డబ్బాల సెన్సార్ డేటా నవీకరించబడింది!" : "IoT sensor streams updated in real-time from ward beacons.");
    }, 1200);
  };

  // 7. Claim Milestone NFT
  const claimNFT = (id: string, cost: number) => {
    const success = onDeductPoints(cost);
    if (success) {
      setNfts(prev => prev.map(nft => nft.id === id ? { ...nft, owned: true } : nft));
      triggerSuccess(st.nftClaimSuccess);
    } else {
      triggerSuccess(st.homestayLowPoints);
    }
  };

  // 8. Waste-to-Art Trade
  const triggerTradeMaterials = () => {
    if (rawMaterials.coconutShells > 0) {
      setRawMaterials({ coconutShells: 0, plasticBottles: 0, cardboard: 0 });
      onPointsEarned(120);
      triggerSuccess(st.artTradeSuccess);
    } else {
      triggerSuccess(language === "te" ? "ట్రేడ్ చేయడానికి కొత్త వ్యర్థ పదార్థాలు లేవు!" : "No fresh recyclable materials currently in citizen container to trade.");
    }
  };

  // 9. Bulk waste estimator
  const handleBulkAnalysis = () => {
    setBulkAnalysisState("analyzing");
    setTimeout(() => {
      setBulkAnalysisState("completed");
      onPointsEarned(30); // bonus point for doing estimate calculations
      triggerSuccess(language === "te" ? "AI విశ్లేషణ విజయవంతంగా పూర్తయింది! +30 పాయింట్లు" : "AI Bulk Analysis processed. 3.4 Tons workload registered. +30 Points!");
    }, 2000);
  };

  // 10. Automated Routing
  const handleGrievanceRouting = () => {
    setGrievanceState("routing");
    setTimeout(() => {
      setGrievanceState("completed");
      triggerSuccess(language === "te" ? "ఫిర్యాదు నేరుగా వార్డు అధికారికి పంపబడింది!" : "Grievance automatically dispatched & registered with Officer R. K. Naidu!");
    }, 2000);
  };

  const getDynamicTextClass = () => {
    if (textSize === "large") return "text-sm md:text-base";
    if (textSize === "extra") return "text-base md:text-lg";
    return "text-xs";
  };

  return (
    <div className="bg-white/80 dark:bg-gray-950/75 border border-gray-200/50 dark:border-gray-800/60 rounded-3xl p-6 shadow-sm backdrop-blur-md relative overflow-hidden space-y-6">
      
      {/* Absolute brand ambient light decoration */}
      <div className="absolute -top-12 -left-12 w-40 h-40 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Title & Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100/60 dark:border-gray-900/50 pb-4">
        <div>
          <h2 className="text-lg font-black font-display text-gray-900 dark:text-white flex items-center gap-2">
            <Sparkles className="text-amber-500 animate-spin-slow" size={20} />
            <span>{st.portalTitle}</span>
            <span className="px-1.5 py-0.5 text-[8px] tracking-wider uppercase font-extrabold text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30 rounded-md border border-emerald-100 dark:border-emerald-900/30">
              VVP Special
            </span>
          </h2>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold font-sans mt-0.5">
            {st.portalSubtitle}
          </p>
        </div>

        {/* Global Tab Navigation Selection Buttons */}
        <div className="flex flex-wrap gap-1 bg-gray-100 dark:bg-gray-900/60 p-1 rounded-xl border border-gray-200/30 dark:border-gray-800/30">
          {[
            { id: "tourism", icon: Compass, label: st.tabTourism },
            { id: "logistics", icon: Truck, label: st.tabLogistics },
            { id: "gamification", icon: Palette, label: st.tabGamification },
            { id: "ai", icon: Camera, label: st.tabAi }
          ].map((tab) => {
            const IconComp = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSuccessMessage(null);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black font-sans transition-all ${
                  isSel 
                    ? "bg-emerald-600 text-white shadow-xs" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <IconComp size={12} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Real-time floating overlay jingles feedback alert */}
      <AnimatePresence>
        {successMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300 font-sans font-bold text-xs flex items-center gap-2.5 shadow-sm"
          >
            <ShieldCheck size={16} className="text-emerald-500 animate-bounce" />
            <span className="flex-grow">{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TAB CONTENT AREA */}
      <div className="min-h-[240px]">
        
        {/* 1. ECO TOURISM TAB */}
        {activeTab === "tourism" && (
          <div className="space-y-6">
            
            {/* Heatmap Section */}
            <div className="bg-gray-50/50 dark:bg-gray-900/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-900/60">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h4 className="text-xs font-black font-sans text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                    🗺️ {st.trailTitle}
                  </h4>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold">
                    {st.trailSub}
                  </p>
                </div>
                {/* Map Legend */}
                <div className="flex items-center gap-3 text-[9px] font-bold">
                  <span className="flex items-center gap-1 text-red-500">
                    <span className="w-2.5 h-2.5 rounded-xs bg-red-500 animate-pulse" /> {st.trailLegendHigh}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-500">
                    <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500" /> {st.trailLegendClean}
                  </span>
                </div>
              </div>

              {/* Active Heatmap Grid Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {heatmapGrid.map((trail) => (
                  <div 
                    key={trail.id}
                    className={`p-3 rounded-xl border transition-all flex flex-col justify-between h-20 ${
                      trail.littered 
                        ? "bg-red-50/40 dark:bg-red-950/20 border-red-200/50 dark:border-red-900/30 hover:border-red-400" 
                        : "bg-emerald-50/20 dark:bg-emerald-950/10 border-emerald-100 dark:border-emerald-950/30"
                    }`}
                  >
                    <div>
                      <span className="text-[9px] font-black text-gray-500 dark:text-gray-400 block truncate">
                        {trail.name}
                      </span>
                      {trail.littered && (
                        <span className="text-[8px] font-mono text-red-600 dark:text-red-400 font-bold">
                          Litter Index: {trail.score}%
                        </span>
                      )}
                    </div>
                    
                    {trail.littered ? (
                      <button
                        type="button"
                        onClick={() => cleanTrail(trail.id)}
                        className="w-full py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[8px] font-sans font-black uppercase tracking-wider transition-all"
                      >
                        Dispatch Band
                      </button>
                    ) : (
                      <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 justify-center py-1">
                        <Check size={10} /> Clean
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Offline AI & Homestay Flex Row */}
            <div className="grid md:grid-cols-2 gap-4">
              
              {/* Left Panel: Offline AI */}
              <div className="bg-gray-50/50 dark:bg-gray-900/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-900/60 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black font-sans text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                    <WifiOff size={14} className="text-indigo-500" />
                    <span>{st.offlineTitle}</span>
                  </h4>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold mt-1">
                    {st.offlineSub}
                  </p>
                </div>

                <div className="mt-4 space-y-3">
                  {offlineLoading ? (
                    <div className="space-y-1">
                      <div className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-indigo-500" 
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2.2 }}
                        />
                      </div>
                      <span className="text-[8px] text-gray-400 font-mono font-bold block text-right">
                        Downloading on-device model weights...
                      </span>
                    </div>
                  ) : offlineLoaded ? (
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl text-[10px] font-sans font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>{st.offlineScanning}</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={loadOfflineWasm}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-sans font-black transition-all flex items-center justify-center gap-1.5"
                    >
                      <Layers size={11} />
                      <span>{st.offlineBtnLoad}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Right Panel: Homestays */}
              <div className="bg-gray-50/50 dark:bg-gray-900/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-900/60 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black font-sans text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                    <Home size={14} className="text-amber-500" />
                    <span>{st.homestayTitle}</span>
                  </h4>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold mt-1">
                    {st.homestaySub}
                  </p>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-bold text-gray-600 dark:text-gray-400">
                    <span>🏔️ Kibithu Border Stay Voucher</span>
                    <span className="font-mono text-amber-600 dark:text-amber-400">350 Pts</span>
                  </div>
                  <button
                    type="button"
                    onClick={bookHomestay}
                    className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-[10px] font-sans font-black transition-all flex items-center justify-center gap-1.5"
                  >
                    <Coins size={11} />
                    <span>{st.homestayBookBtn}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 2. CITIZEN LOGISTICS TAB */}
        {activeTab === "logistics" && (
          <div className="space-y-6">
            
            {/* Missed My Truck Grid */}
            <div className="bg-gray-50/50 dark:bg-gray-900/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-900/60">
              <h4 className="text-xs font-black font-sans text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                🚛 {st.missedTruckTitle}
              </h4>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold mt-0.5 mb-3">
                {st.missedTruckSub}
              </p>

              <div className="grid md:grid-cols-12 gap-4">
                
                {/* Interactive Map Grid Selector */}
                <div className="md:col-span-7 bg-white dark:bg-gray-900/60 p-2.5 rounded-xl border border-gray-200/50 dark:border-gray-800/40">
                  <span className="text-[9px] font-bold text-gray-400 block mb-1.5 uppercase tracking-wider">
                    Select Secondary Drop-off point (1-Kilometer Ward Radius)
                  </span>
                  
                  <div className="grid grid-cols-5 gap-1 bg-gray-50 dark:bg-gray-950 p-1 rounded-lg">
                    {[...Array(25)].map((_, idx) => {
                      const x = idx % 5;
                      const y = Math.floor(idx / 5);
                      const isSelected = missedGridCell && missedGridCell.x === x && missedGridCell.y === y;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setMissedGridCell({ x, y })}
                          className={`aspect-square rounded-md text-[9px] font-mono flex items-center justify-center transition-all ${
                            isSelected 
                              ? "bg-emerald-600 text-white font-black scale-105 shadow-sm" 
                              : "bg-white dark:bg-gray-900 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-800/50"
                          }`}
                        >
                          {isSelected ? "📍" : `${x},${y}`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Info and Request Actions */}
                <div className="md:col-span-5 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono font-black text-gray-400 dark:text-gray-500 block">
                      MAP METRICS COORDINATES: {missedGridCell ? `[X: ${missedGridCell.x}, Y: ${missedGridCell.y}]` : "No Coordinate Selected"}
                    </span>
                    <p className="text-[10px] text-gray-500 leading-relaxed font-sans">
                      {language === "te" 
                        ? "సమీపంలోని పికప్ వాహనాన్ని ఆర్డర్ చేయడానికి పై గ్రిడ్‌లో ఏదైనా గడిపై క్లిక్ చేయండి." 
                        : "Click any block on the grid to pinpoint your secondary micro-garbage vehicle pickup request."}
                    </p>
                  </div>

                  <div className="mt-4">
                    {missedPickupState === "requesting" ? (
                      <div className="py-2 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 text-amber-700 dark:text-amber-400 text-center rounded-xl text-[10px] font-bold animate-pulse">
                        Dispatching Secondary Truck...
                      </div>
                    ) : missedPickupState === "dispatched" ? (
                      <div className="py-2 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-center rounded-xl text-[10px] font-bold">
                        ✓ Truck Dispatch Success! Arriving soon.
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleMissedTruckRequest}
                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-sans font-black transition-all flex items-center justify-center gap-1.5"
                      >
                        <Truck size={12} />
                        <span>{st.missedTruckBtn}</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Audio Beacon & IoT dustbins row */}
            <div className="grid md:grid-cols-2 gap-4">
              
              {/* Left Panel: Audio Beacon */}
              <div className="bg-gray-50/50 dark:bg-gray-900/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-900/60 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black font-sans text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                    <Volume2 size={14} className="text-pink-500 animate-bounce" />
                    <span>{st.audioTitle}</span>
                  </h4>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold mt-1">
                    {st.audioSub}
                  </p>
                </div>

                <div className="mt-4 space-y-3">
                  <button
                    type="button"
                    onClick={testAudioBeacon}
                    className={`w-full py-2 rounded-xl text-[10px] font-sans font-black transition-all flex items-center justify-center gap-1.5 ${
                      isPlayingAudio 
                        ? "bg-pink-600 text-white" 
                        : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-800/60 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {isPlayingAudio ? <Square size={11} /> : <Play size={11} />}
                    <span>{isPlayingAudio ? st.audioPlaying : st.audioPlayBtn}</span>
                  </button>
                  <p className="text-[9px] text-gray-400 text-center font-mono font-bold uppercase tracking-wider">
                    JINGLE: "Swachh Bharat Ka Irada..."
                  </p>
                </div>
              </div>

              {/* Right Panel: Smart IoT Bins */}
              <div className="bg-gray-50/50 dark:bg-gray-900/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-900/60 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-black font-sans text-gray-800 dark:text-gray-200">
                    📟 {st.binTitle}
                  </h4>
                  <button
                    type="button"
                    onClick={refreshIotSensors}
                    className="p-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg"
                  >
                    <RefreshCw size={11} className={isRefreshingIot ? "animate-spin" : ""} />
                  </button>
                </div>
                
                <div className="mt-3 space-y-2.5">
                  {iotBins.map((bin) => (
                    <div key={bin.id} className="space-y-1">
                      <div className="flex items-center justify-between text-[9px] font-bold">
                        <span className="text-gray-500 dark:text-gray-400">{bin.location} ({bin.id})</span>
                        <span className={`font-mono font-extrabold ${
                          bin.fullness > 80 ? "text-red-500" : bin.fullness > 40 ? "text-amber-500" : "text-emerald-500"
                        }`}>
                          {bin.fullness}% ({bin.status})
                        </span>
                      </div>
                      <div className="h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            bin.fullness > 80 ? "bg-red-500" : bin.fullness > 40 ? "bg-amber-500" : "bg-emerald-500"
                          }`}
                          style={{ width: `${bin.fullness}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 3. GAMIFICATION & CRAFT TAB */}
        {activeTab === "gamification" && (
          <div className="space-y-6">
            
            {/* Swachh Corporate Leagues Leaderboard */}
            <div className="bg-gray-50/50 dark:bg-gray-900/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-900/60">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="text-amber-500" size={16} />
                <div>
                  <h4 className="text-xs font-black font-sans text-gray-800 dark:text-gray-200">
                    {st.leagueTitle}
                  </h4>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold">
                    {st.leagueSub}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {corporateLeagues.map((item) => (
                  <div 
                    key={item.rank}
                    className="flex items-center justify-between bg-white dark:bg-gray-900/60 p-2 rounded-xl border border-gray-100 dark:border-gray-800/40 text-[10px] font-bold"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono font-black text-[9px]">
                        #{item.rank}
                      </span>
                      <span className="text-gray-700 dark:text-gray-200">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 font-sans text-[9px]">{item.weight} recycled</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-black">{item.score} XP</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NFTs & Art Marketplace exchange */}
            <div className="grid md:grid-cols-2 gap-4">
              
              {/* Green NFTs */}
              <div className="bg-gray-50/50 dark:bg-gray-900/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-900/60 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black font-sans text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                    <Award size={14} className="text-amber-500" />
                    <span>{st.nftTitle}</span>
                  </h4>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold mt-1">
                    {st.nftSub}
                  </p>
                </div>

                <div className="mt-4 space-y-2">
                  {nfts.map((nft) => (
                    <div key={nft.id} className="flex items-center justify-between p-2 bg-white dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800/40">
                      <div className="flex items-center gap-2 text-[10px] font-bold">
                        <span className="text-lg">{nft.image}</span>
                        <span className="text-gray-700 dark:text-gray-200">{nft.name}</span>
                      </div>
                      
                      {nft.owned ? (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 rounded text-[8px] font-bold">
                          ✓ Owned
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => claimNFT(nft.id, nft.cost)}
                          className="px-2 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded text-[8px] font-black uppercase tracking-wider transition-all"
                        >
                          {nft.cost} Pts
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Waste-to-Art Marketplace exchange */}
              <div className="bg-gray-50/50 dark:bg-gray-900/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-900/60 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black font-sans text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                    <Palette size={14} className="text-indigo-500" />
                    <span>{st.artTitle}</span>
                  </h4>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold mt-1">
                    {st.artSub}
                  </p>
                </div>

                <div className="mt-4 space-y-3">
                  {/* Current stock of collected materials */}
                  <div className="flex items-center justify-around bg-white dark:bg-gray-900/60 p-2 rounded-xl border border-gray-100 dark:border-gray-800/40 text-[9px] font-mono font-bold text-gray-500">
                    <div className="text-center">
                      <span className="block text-sm">🥥</span>
                      <span>{rawMaterials.coconutShells} Shells</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-sm">🧴</span>
                      <span>{rawMaterials.plasticBottles} Bottles</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-sm">📦</span>
                      <span>{rawMaterials.cardboard} Cardboard</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={triggerTradeMaterials}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-sans font-black transition-all flex items-center justify-center gap-1.5"
                  >
                    <Coins size={11} />
                    <span>{st.artTradeBtn}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 4. PROACTIVE AI ENHANCEMENTS TAB */}
        {activeTab === "ai" && (
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Left: Bulk Waste Estimator */}
            <div className="bg-gray-50/50 dark:bg-gray-900/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-900/60 flex flex-col justify-between space-y-4">
              <div>
                <h4 className="text-xs font-black font-sans text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                  🤖 {st.bulkTitle}
                </h4>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold mt-0.5">
                  {st.bulkSub}
                </p>
              </div>

              {/* Graphic Simulator container */}
              <div className="bg-white dark:bg-gray-900/60 p-3 rounded-xl border border-gray-200/50 dark:border-gray-800/40 flex flex-col items-center justify-center min-h-[100px]">
                {bulkAnalysisState === "idle" && (
                  <div className="text-center py-2 space-y-2">
                    <span className="text-2xl">📸</span>
                    <p className="text-[10px] text-gray-400 font-semibold">Ready to estimate community waste heap pile</p>
                  </div>
                )}
                
                {bulkAnalysisState === "analyzing" && (
                  <div className="text-center py-2 space-y-2 w-full">
                    <span className="text-2xl block animate-bounce">🧠</span>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden w-2/3 mx-auto">
                      <div className="h-full bg-emerald-500 animate-pulse w-full" />
                    </div>
                    <span className="text-[8px] font-mono text-gray-400">Volume estimator active...</span>
                  </div>
                )}

                {bulkAnalysisState === "completed" && (
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl text-center space-y-1 w-full">
                    <span className="text-lg">📊</span>
                    <p className="text-[10px] font-sans font-bold text-emerald-800 dark:text-emerald-400 leading-relaxed">
                      {st.bulkResult}
                    </p>
                  </div>
                )}
              </div>

              <div>
                {bulkAnalysisState !== "analyzing" && (
                  <button
                    type="button"
                    onClick={handleBulkAnalysis}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-sans font-black transition-all flex items-center justify-center gap-1.5"
                  >
                    <Image size={12} />
                    <span>{st.bulkBtn}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right: Grievance Routing */}
            <div className="bg-gray-50/50 dark:bg-gray-900/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-900/60 flex flex-col justify-between space-y-4">
              <div>
                <h4 className="text-xs font-black font-sans text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                  🎯 {st.routeTitle}
                </h4>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold mt-0.5">
                  {st.routeSub}
                </p>
              </div>

              {/* Routing Graphic Simulator */}
              <div className="bg-white dark:bg-gray-900/60 p-3 rounded-xl border border-gray-200/50 dark:border-gray-800/40 flex flex-col items-center justify-center min-h-[100px]">
                {grievanceState === "idle" && (
                  <div className="text-center py-2 space-y-2">
                    <span className="text-2xl">📍</span>
                    <p className="text-[10px] text-gray-400 font-semibold">Extract GPS tag & dispatch sanitation crew</p>
                  </div>
                )}
                
                {grievanceState === "routing" && (
                  <div className="text-center py-2 space-y-2 w-full">
                    <span className="text-2xl block animate-spin-slow">📡</span>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden w-2/3 mx-auto">
                      <div className="h-full bg-indigo-500 animate-pulse w-full" />
                    </div>
                    <span className="text-[8px] font-mono text-gray-400">Parsing photo EXIF headers...</span>
                  </div>
                )}

                {grievanceState === "completed" && (
                  <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-xl text-center space-y-1 w-full">
                    <span className="text-lg">👮</span>
                    <p className="text-[10px] font-sans font-bold text-indigo-800 dark:text-indigo-400 leading-relaxed">
                      {st.routeResult}
                    </p>
                  </div>
                )}
              </div>

              <div>
                {grievanceState !== "routing" && (
                  <button
                    type="button"
                    onClick={handleGrievanceRouting}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-sans font-black transition-all flex items-center justify-center gap-1.5"
                  >
                    <Map size={12} />
                    <span>{st.routeBtn}</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
