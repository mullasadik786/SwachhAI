import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, UploadCloud, MapPin, Mic, AlertCircle, CheckCircle2, 
  RotateCcw, Sparkles, Volume2, ArrowRight, Info, CheckSquare, Square, Mountain, MessageSquare, Play, HelpCircle
} from "lucide-react";
import { WasteResult } from "../types";
import { Language, translations } from "../utils/translations";

interface ScannerPanelProps {
  language: Language;
  pinCode: string;
  setPinCode: (pin: string) => void;
  onPointsEarned: (pts: number, itemName: string, category: string, image?: string) => void;
  textSize: "standard" | "large" | "extra";
  vvpMode: boolean;
  setVvpMode: (val: boolean) => void;
  vvpVillage: string;
  setVvpVillage: (val: string) => void;
}

// Quick Sample items
const sampleItems = [
  { id: "banana_peel", nameEnglish: "Banana Peel", nameTelugu: "అరటి తొక్క", nameHindi: "केले का छिलका", icon: "🍌", desc: "Wet Waste" },
  { id: "plastic_bottle", nameEnglish: "Plastic Bottle", nameTelugu: "ప్లాస్టిక్ బాటిల్", nameHindi: "प्लास्टिक की बोतल", icon: "🍼", desc: "Recyclable" },
  { id: "batteries", nameEnglish: "Used Batteries", nameTelugu: "వాడిన బ్యాటరీలు", nameHindi: "पुरानी बैटरी", icon: "🔋", desc: "Hazardous" },
  { id: "coconut_shell", nameEnglish: "Coconut Shell", nameTelugu: "కొబ్బరి చిప్ప", nameHindi: "नารियल का खोल", icon: "🥥", desc: "Dry Organic" }
];

const vvpVillagesList = [
  { id: "diskit_ladakh", label: "Diskit (Ladakh Border Valley) 🏔️" },
  { id: "turtuk_ladakh", label: "Turtuk (Baltistan Border, Ladakh) 🌿" },
  { id: "kaza_spiti", label: "Kaza (Spiti Valley, Himachal) 🏔️" },
  { id: "kalpa_kinnaur", label: "Kalpa (Kinnaur, Himachal) 🌲" },
  { id: "kibithu_arunachal", label: "Kibithu (Anjaw, Arunachal Pradesh) 🌅" },
  { id: "zemithang_tawang", label: "Zemithang (Tawang, Arunachal Pradesh) 🌄" }
];

export default function ScannerPanel({
  language,
  pinCode,
  setPinCode,
  onPointsEarned,
  textSize,
  vvpMode,
  setVvpMode,
  vvpVillage,
  setVvpVillage
}: ScannerPanelProps) {
  const t = translations[language];

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [classificationResult, setClassificationResult] = useState<WasteResult | null>(null);
  
  // Input states
  const [inputText, setInputText] = useState("");
  const [pincodeInput, setPincodeInput] = useState(pinCode);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [micActive, setMicActive] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  // Voice Assistant conversation simulation states
  const [voiceQuery, setVoiceQuery] = useState<string | null>(null);
  const [voiceReply, setVoiceReply] = useState<string | null>(null);
  const [voiceSpeaking, setVoiceSpeaking] = useState(false);

  // Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Synchronize external pinCode with local input
  useEffect(() => {
    setPincodeInput(pinCode);
  }, [pinCode]);

  // Handle pincode save
  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincodeInput.trim().length >= 6) {
      setPinCode(pincodeInput.trim());
    }
  };

  // Turn on/off real web camera
  const startCamera = async () => {
    setIsCameraActive(true);
    setCameraError(null);
    setImagePreview(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      setCameraError(
        language === "te" 
          ? "కెమెరాను తెరవడంలో సమస్య ఏర్పడింది." 
          : language === "hi" 
          ? "कैमरा खोलने में समस्या आई। कृपया इमेज अपलोड करें।" 
          : "Could not open camera. Please upload an image instead."
      );
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        setImagePreview(dataUrl);
        stopCamera();
      }
    }
  };

  // Image Upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        if (isCameraActive) stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  // Call the server API to classify
  const runClassification = async (payload: { image?: string; text?: string; selectedPreset?: string }) => {
    setLoading(true);
    setCheckedSteps({});
    setClassificationResult(null);

    // Stagger loading messages for beautiful visual feedback
    const steps = language === "te" 
      ? ["చిత్రాన్ని విశ్లేషిస్తోంది...", "వ్యర్థాల రకాన్ని లెక్కిస్తోంది...", "మున్సిపల్ నియమాలను సేకరిస్తోంది..."] 
      : language === "hi"
      ? ["कचरे का विश्लेषण किया जा रहा है...", "नियमों की जांच हो रही है...", "कचरे की श्रेणी निर्धारित हो रही है..."]
      : ["Analyzing waste structure...", "Retrieving regional municipal guidelines...", "Determining waste category..."];

    setLoadingStep(steps[0]);
    setTimeout(() => {
      setLoadingStep(steps[1]);
    }, 600);
    setTimeout(() => {
      setLoadingStep(steps[2]);
    }, 1200);

    try {
      const response = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: payload.image || imagePreview,
          text: payload.text,
          pinCode,
          selectedPreset: payload.selectedPreset
        })
      });

      const resData = await response.json();
      if (resData.success) {
        setTimeout(() => {
          setClassificationResult(resData.data);
          setLoading(false);
        }, 1600);
      } else {
        throw new Error("Failed response");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // Handle Preset item clicks
  const handlePresetSelect = (id: string) => {
    setInputText("");
    setImagePreview(null);
    runClassification({ selectedPreset: id });
  };

  // Simulated Hands-free Voice assistance conversation
  const runVoiceAssistantQuery = (query: string) => {
    setMicActive(true);
    setVoiceQuery(query);
    setVoiceReply(null);
    setVoiceSpeaking(true);

    let reply = "";
    let voiceLocale = "en-IN";

    if (query.includes("కొబ్బరి చిప్ప") || query.includes("coconut") || query.includes("नारियल")) {
      reply = language === "te" 
        ? "బాబూ, కొబ్బరి చిప్ప ఎండిన సేంద్రీయ వ్యర్థం. దానిని పసుపు లేదా సాధారణ పొడి చెత్త డబ్బాలో వేయండి!"
        : language === "hi"
        ? "बेटा, नारियल का खोल सूखा जैविक कचरा है। इसे सूखे कचरे के पीले या सामान्य डिब्बे में डालें!"
        : "Child, coconut shell is dry organic waste. Discard it in the yellow or dry organic bin!";
      voiceLocale = language === "te" ? "te-IN" : language === "hi" ? "hi-IN" : "en-IN";
    } else if (query.includes("అరటి") || query.includes("banana") || query.includes("केले")) {
      reply = language === "te"
        ? "దాది, అరటి తొక్క అనేది తడి వ్యర్థం. దయచేసి దీనిని ఆకుపచ్చ తడి చెత్త బుట్టలోనే వేయండి!"
        : language === "hi"
        ? "दादी, केले का छिलका गीला कचरा है। कृपया इसे केवल हरे गीले कचरे के डिब्बे में ही डालें!"
        : "Dadi, banana peel is wet waste. Please discard it in the green compost bin only!";
      voiceLocale = language === "te" ? "te-IN" : language === "hi" ? "hi-IN" : "en-IN";
    } else {
      reply = language === "te"
        ? "నమస్కారం! ఏదైనా వ్యర్థాల వర్గీకరణ తెలుసుకోవడానికి నన్ను అడగండి."
        : language === "hi"
        ? "नमस्कार! कचरा छँटाई के नियमों को जानने के लिए मुझसे पूछें।"
        : "Hello! Ask me any questions about waste classification.";
      voiceLocale = language === "te" ? "te-IN" : language === "hi" ? "hi-IN" : "en-IN";
    }

    setTimeout(() => {
      setMicActive(false);
      setVoiceReply(reply);
      
      // Perform speech readback using synthesis
      const synth = window.speechSynthesis;
      if (synth) {
        const utterance = new SpeechSynthesisUtterance(reply);
        utterance.lang = voiceLocale;
        utterance.rate = 0.95;
        synth.cancel();
        
        utterance.onend = () => {
          setVoiceSpeaking(false);
        };
        synth.speak(utterance);
      } else {
        setVoiceSpeaking(false);
      }
    }, 1200);
  };

  // Web Speech synthesis to speak guidelines out loud
  const speakInstructions = () => {
    if (!classificationResult) return;
    const synth = window.speechSynthesis;
    if (!synth) return;

    const currentName = 
      language === "te" 
        ? (classificationResult.itemName.split("/")[1] || classificationResult.itemName).trim()
        : language === "hi"
        ? (classificationResult.itemName.split("/")[2] || classificationResult.itemName.split("/")[0]).trim()
        : (classificationResult.itemName.split("/")[0] || classificationResult.itemName).trim();

    const title = language === "te" 
      ? `గుర్తించబడిన వస్తువు: ${currentName}`
      : language === "hi"
      ? `पहचाना गया आइटम: ${currentName}`
      : `Identified item: ${currentName}`;

    const stepsHeader = language === "te" ? "పాటించాల్సిన పద్ధతులు:" : language === "hi" ? "निपटान चरण:" : "Disposal steps:";
    const instructionsList = 
      language === "te" 
        ? classificationResult.teluguInstructions 
        : language === "hi" 
        ? (classificationResult.hindiInstructions || classificationResult.teluguInstructions)
        : classificationResult.englishInstructions;

    const steps = instructionsList.join(". ");

    const guidelinesHeader = language === "te" ? "మున్సిపల్ నియమాలు:" : language === "hi" ? "नगर निगम नियम:" : "Municipal guidelines:";
    const guidelines = 
      language === "te" 
        ? classificationResult.localGuidelinesTelugu 
        : language === "hi"
        ? (classificationResult.localGuidelinesHindi || classificationResult.localGuidelinesTelugu)
        : classificationResult.localGuidelinesEnglish;

    const utterance = new SpeechSynthesisUtterance(`${title}. ${stepsHeader}. ${steps}. ${guidelinesHeader}. ${guidelines}`);
    utterance.lang = language === "te" ? "te-IN" : language === "hi" ? "hi-IN" : "en-IN";
    utterance.rate = 0.95;

    synth.cancel();
    synth.speak(utterance);
  };

  const handleReset = () => {
    setClassificationResult(null);
    setImagePreview(null);
    setInputText("");
    setCheckedSteps({});
  };

  const handleClaimPoints = () => {
    if (classificationResult) {
      // 1.5x Multiplier for VVP mode
      const points = vvpMode 
        ? Math.round(classificationResult.pointsReward * 1.5) 
        : classificationResult.pointsReward;

      const prefix = vvpMode ? `[VVP: ${vvpVillage.split("(")[0].trim()}] ` : "";

      onPointsEarned(
        points,
        prefix + classificationResult.itemName,
        classificationResult.category,
        imagePreview || undefined
      );
      handleReset();
    }
  };

  const toggleCheckStep = (index: number) => {
    setCheckedSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case "wet":
        return {
          bg: "bg-emerald-50 dark:bg-emerald-950/20",
          text: "text-emerald-800 dark:text-emerald-300",
          border: "border-emerald-200 dark:border-emerald-800",
          badge: "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300"
        };
      case "recyclable":
        return {
          bg: "bg-blue-50 dark:bg-blue-950/20",
          text: "text-blue-800 dark:text-blue-300",
          border: "border-blue-200 dark:border-blue-800",
          badge: "bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300"
        };
      case "dry":
        return {
          bg: "bg-amber-50 dark:bg-amber-950/20",
          text: "text-amber-800 dark:text-amber-300",
          border: "border-amber-200 dark:border-amber-800",
          badge: "bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300"
        };
      case "hazardous":
        return {
          bg: "bg-rose-50 dark:bg-rose-950/20",
          text: "text-rose-800 dark:text-rose-300",
          border: "border-rose-200 dark:border-rose-800",
          badge: "bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300"
        };
      default:
        return {
          bg: "bg-gray-50 dark:bg-gray-950/20",
          text: "text-gray-800 dark:text-gray-300",
          border: "border-gray-200 dark:border-gray-800",
          badge: "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300"
        };
    }
  };

  const getDynamicTextClass = () => {
    if (textSize === "large") return "text-sm md:text-base";
    if (textSize === "extra") return "text-base md:text-lg";
    return "text-xs";
  };

  return (
    <div className="space-y-6">
      
      {/* Pincode & VVP integration settings panel */}
      <div className="bg-white/80 dark:bg-gray-950/75 border border-gray-200/50 dark:border-gray-800/60 p-5 rounded-3xl shadow-sm backdrop-blur-md space-y-4">
        
        {/* VVP Toggle Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100/60 dark:border-gray-900/50 pb-4">
          <div className="flex items-start gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <Mountain size={18} />
            </div>
            <div>
              <h4 className="text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                {t.vvpHeader}
                <span className="text-[8px] px-1.5 py-0.5 bg-emerald-600 text-white rounded font-bold uppercase tracking-widest">v1.2 VVP</span>
              </h4>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold leading-relaxed">
                {t.vvpSub}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setVvpMode(!vvpMode)}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all shrink-0 border ${
              vvpMode
                ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white border-emerald-500 shadow-sm"
                : "bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-800 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {vvpMode ? "VVP Active 🟢" : "Enable VVP Mode"}
          </button>
        </div>

        {/* Dynamic VVP Village selector or standard pincode */}
        <div className="grid sm:grid-cols-2 gap-4 items-center">
          
          {vvpMode ? (
            /* VVP Village Selector */
            <div className="sm:col-span-2 space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                🏔️ {t.vvpBorderSelect}
              </label>
              <div className="grid sm:grid-cols-2 gap-2">
                {vvpVillagesList.map((village) => (
                  <button
                    key={village.id}
                    type="button"
                    onClick={() => setVvpVillage(village.label)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between text-[11px] font-bold ${
                      vvpVillage === village.label
                        ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-700 dark:text-emerald-400 scale-[1.01]"
                        : "bg-gray-50/50 dark:bg-gray-900/30 border-gray-200/50 dark:border-gray-800/50 text-gray-600 dark:text-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    <span>{village.label}</span>
                    {vvpVillage === village.label && <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.5 rounded-full font-mono">1.5x</span>}
                  </button>
                ))}
              </div>
              <p className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1 animate-pulse">
                ✨ {t.vvpPointsBonus}
              </p>
            </div>
          ) : (
            /* Municipal Jurisdiction Pincode Setup */
            <div className="sm:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-500">
                  <MapPin size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-bold font-sans text-gray-800 dark:text-white">
                    {language === "te" ? "మునిసిపాలిటీ పిన్ కోడ్" : language === "hi" ? "नगर निगम पिन कोड" : "Municipal Pin Zone"}
                  </h3>
                  <p className="text-[9px] text-gray-400">
                    {language === "te" ? "మీ వీధి పిన్ ఎంటర్ చేయండి" : language === "hi" ? "अपनी स्थानीय पिन प्रविष्ट करें" : "Enter your local postal pincode"}
                  </p>
                </div>
              </div>

              <form onSubmit={handlePincodeSubmit} className="flex items-center gap-1.5 w-full sm:w-auto">
                <input
                  type="text"
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="522235"
                  className="px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800 dark:text-white font-mono w-full sm:w-32 text-center"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 text-[10px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors shrink-0"
                >
                  {language === "te" ? "సేవ్" : language === "hi" ? "सहेजें" : "Save"}
                </button>
              </form>
            </div>
          )}

        </div>

      </div>

      {/* Main scanner platform container */}
      <div className="bg-white/80 dark:bg-gray-950/75 border border-gray-200/50 dark:border-gray-800/60 rounded-3xl shadow-sm overflow-hidden p-6 backdrop-blur-md">
        
        <AnimatePresence mode="wait">
          {!classificationResult && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="text-center max-w-md mx-auto">
                <h3 className="text-md font-black font-display text-gray-900 dark:text-white flex items-center justify-center gap-1.5">
                  {vvpMode ? <Mountain className="text-emerald-600 animate-bounce" size={18} /> : <Sparkles className="text-emerald-600" size={16} />}
                  {t.cameraHeading} {vvpMode ? `(${vvpVillage.split("(")[0].trim()})` : ""}
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                  {t.cameraSubText}
                </p>
              </div>

              {/* Camera & Drag/Drop Upload Area */}
              <div className="grid sm:grid-cols-2 gap-4">
                
                {/* Visual Capture (Webcam or capture mock) */}
                <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[180px] text-center bg-gray-50/50 dark:bg-gray-900/10 relative overflow-hidden group">
                  {isCameraActive ? (
                    <div className="absolute inset-0 bg-black flex flex-col justify-between">
                      <video ref={videoRef} className="w-full h-full object-cover" playsInline />
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 px-4 z-10">
                        <button
                          onClick={capturePhoto}
                          className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-md hover:bg-emerald-700 transition-colors"
                        >
                          {language === "te" ? "ఫోటో తీయి" : language === "hi" ? "फोटो लें" : "Capture"}
                        </button>
                        <button
                          onClick={stopCamera}
                          className="px-4 py-2 bg-gray-800 text-white rounded-xl font-bold text-xs hover:bg-gray-700 transition-colors"
                        >
                          {language === "te" ? "ఆపివేయి" : language === "hi" ? "रद्द करें" : "Cancel"}
                        </button>
                      </div>
                    </div>
                  ) : imagePreview ? (
                    <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                      <button
                        onClick={() => setImagePreview(null)}
                        className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors"
                        title="Clear photo"
                      >
                        <RotateCcw size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                        <Camera size={24} />
                      </div>
                      <button
                        onClick={startCamera}
                        className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm transition-colors cursor-pointer"
                      >
                        {t.cameraButtonText}
                      </button>
                      {cameraError && <p className="text-xs text-rose-500 px-2">{cameraError}</p>}
                    </div>
                  )}
                </div>

                {/* Upload Area */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 dark:border-gray-800 hover:border-emerald-500 dark:hover:border-emerald-400 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[180px] text-center bg-gray-50/50 dark:bg-gray-900/10 cursor-pointer group transition-colors"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <UploadCloud size={24} />
                  </div>
                  <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mt-3">
                    {language === "te" ? "ఫైల్ అప్‌లోడ్ చేయండి" : language === "hi" ? "फाइल अपलोड करें" : "Drag & Drop or Browse"}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    Supports PNG, JPG, JPEG
                  </p>
                </div>

              </div>

              {/* Hands-Free Voice Assistant Conversation Console */}
              <div className="p-4 bg-emerald-50/40 dark:bg-emerald-950/10 rounded-2xl border border-emerald-100/60 dark:border-emerald-900/40 space-y-3">
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Mic size={14} className={voiceSpeaking ? "animate-ping text-rose-500" : "animate-pulse"} />
                  🗣️ Hands-Free Swachh AI (వాయిస్ అసిస్టెంట్)
                </span>
                
                {/* Visual Audio waves when speaking */}
                {voiceSpeaking && (
                  <div className="flex items-center gap-0.5 h-4 my-2">
                    {[1, 2, 3, 2, 1, 2, 3, 4, 3, 2, 1, 2, 3, 2, 1].map((val, idx) => (
                      <div 
                        key={idx} 
                        className="bg-emerald-500 dark:bg-emerald-400 w-0.5 rounded-full"
                        style={{
                          height: `${val * 25}%`,
                          animation: "pulse 0.6s infinite alternate",
                          animationDelay: `${idx * 0.05}s`
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Quick Simulated prompts buttons */}
                <div className="space-y-1.5">
                  <p className="text-[10px] text-gray-400 font-bold">
                    {language === "te" ? "పరీక్షించడానికి ఈ క్రింది వాయిస్ అసిస్టెంట్ ప్రశ్నలను క్లిక్ చేయండి:" : language === "hi" ? "पूछने के लिए नीचे दिए गए प्रश्नों पर क्लिक करें:" : "Click a phrase below to ask hands-free:"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => runVoiceAssistantQuery(language === "te" ? "దాది, కొబ్బరి చిప్ప ఎందులోకి వేయాలి?" : language === "hi" ? "दादी, नारियल का छिलका किसमें डालें?" : "Dadi, where to throw coconut shell?")}
                      className="px-3 py-1.5 bg-white dark:bg-gray-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-gray-200/50 dark:border-gray-800/60 rounded-xl text-[10px] font-bold text-gray-700 dark:text-gray-300 transition-all flex items-center gap-1.5"
                    >
                      <Play size={10} className="text-emerald-500" />
                      <span>{language === "te" ? `"దాది, కొబ్బరి చిప్ప ఎందులోకి వేయాలి?"` : language === "hi" ? `"दादी, नारियल का छिलका किसमें डालें?"` : `"Coconut Shell?"`}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => runVoiceAssistantQuery(language === "te" ? "దాది, అరటి తొక్క ఏ డబ్బాలో వేయాలి?" : language === "hi" ? "दादी, केले का छिलका कहाँ फेंकें?" : "Dadi, where to throw banana peel?")}
                      className="px-3 py-1.5 bg-white dark:bg-gray-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-gray-200/50 dark:border-gray-800/60 rounded-xl text-[10px] font-bold text-gray-700 dark:text-gray-300 transition-all flex items-center gap-1.5"
                    >
                      <Play size={10} className="text-emerald-500" />
                      <span>{language === "te" ? `"దాది, అరటి తొక్క ఎందులో వేయాలి?"` : language === "hi" ? `"दादी, केले का छिलका कहाँ फेंकें?"` : `"Banana Peel?"`}</span>
                    </button>
                  </div>
                </div>

                {/* Dialog chat bubble display */}
                <AnimatePresence>
                  {voiceQuery && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-900/60"
                    >
                      {/* Query Bubble */}
                      <div className="flex items-start gap-2 max-w-[85%]">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-xs text-emerald-800 dark:text-emerald-300 shrink-0">
                          🧑
                        </div>
                        <div className="bg-emerald-500 text-white p-2.5 rounded-2xl rounded-tl-none text-xs font-bold shadow-xs">
                          {voiceQuery}
                        </div>
                      </div>

                      {/* Reply Bubble */}
                      {voiceReply && (
                        <div className="flex items-start gap-2 max-w-[85%] ml-auto justify-end">
                          <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-2.5 rounded-2xl rounded-tr-none text-xs font-bold border border-gray-100 dark:border-gray-800 shadow-xs leading-relaxed">
                            {voiceReply}
                          </div>
                          <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs text-indigo-800 dark:text-indigo-300 shrink-0">
                            🤖
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* Text Input Submit */}
              <div className="border-t border-gray-100 dark:border-gray-900 pt-5 space-y-3">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={t.textInputPlaceholder}
                      className="w-full px-4 py-3 text-xs bg-gray-50 dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800 dark:text-white font-bold"
                    />
                  </div>
                  <button
                    onClick={() => runClassification({ text: inputText })}
                    disabled={!inputText && !imagePreview}
                    className="px-5 py-3 text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors shadow-md disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:text-gray-400 disabled:shadow-none font-sans flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    {t.textInputSubmit} <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Instant Sample Presets */}
              <div className="border-t border-gray-100 dark:border-gray-900 pt-5 space-y-3">
                <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 block uppercase tracking-wider">
                  🎯 {t.presetTitle}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {sampleItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handlePresetSelect(item.id)}
                      className="p-3 bg-gray-50/50 hover:bg-emerald-50/30 dark:bg-gray-900/40 dark:hover:bg-emerald-950/20 border border-gray-200/50 dark:border-gray-800/50 rounded-xl text-left transition-all hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-gray-800 dark:text-white leading-tight truncate">
                          {language === "te" ? item.nameTelugu : language === "hi" ? item.nameHindi : item.nameEnglish}
                        </p>
                        <p className="text-[9px] text-gray-400 font-sans mt-0.5 font-semibold">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

          {/* LOADING STATE */}
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
                <div className="absolute inset-2 rounded-full bg-emerald-500/30 animate-pulse" />
                <div className="absolute inset-4 rounded-full border-4 border-dashed border-emerald-600 animate-spin" />
              </div>
              <div>
                <h4 className="text-sm font-bold font-display text-gray-900 dark:text-white">
                  SwachhAI Brain Active
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-sans mt-1 animate-pulse font-semibold">
                  {loadingStep}
                </p>
              </div>
            </motion.div>
          )}

          {/* CLASSIFICATION RESULTS STATE */}
          {classificationResult && !loading && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Back & Speak Header */}
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-900 pb-4">
                <button
                  onClick={handleReset}
                  className="text-[11px] font-black text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw size={13} />
                  {language === "te" ? "మరో వ్యర్థాన్ని విశ్లేషించు" : language === "hi" ? "दूसरा कचरा स्कैन करें" : "Scan Another Item"}
                </button>
                
                <button
                  onClick={speakInstructions}
                  className="px-3 py-1.5 text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/50 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/50 flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  title="Speak instructions"
                >
                  <Volume2 size={14} />
                  {language === "te" ? "వాయిస్ రీడ్అవుట్" : language === "hi" ? "आवाज द्वारा पढ़ें" : "Voice Readout"}
                </button>
              </div>

              {/* Main Info Hero */}
              <div className={`p-5 rounded-2xl border ${getCategoryTheme(classificationResult.category).border} ${getCategoryTheme(classificationResult.category).bg} relative overflow-hidden`}>
                
                {vvpMode && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[8px] font-black uppercase tracking-widest shadow">
                    <Mountain size={10} />
                    <span>{vvpVillage.split("(")[0].trim()} Bonus Active</span>
                  </div>
                )}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className={`px-2.5 py-1 text-[9px] font-black rounded-full ${getCategoryTheme(classificationResult.category).badge} uppercase tracking-wider`}>
                      {classificationResult.categoryLabel}
                    </span>
                    <h3 className="text-lg md:text-xl font-black font-display text-gray-900 dark:text-white mt-2.5">
                      {language === "te" 
                        ? (classificationResult.itemName.split("/")[1] || classificationResult.itemName).trim() 
                        : language === "hi"
                        ? (classificationResult.itemName.split("/")[2] || classificationResult.itemName.split("/")[0]).trim()
                        : (classificationResult.itemName.split("/")[0] || classificationResult.itemName).trim()
                      }
                    </h3>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-sans mt-0.5 font-semibold">
                      {classificationResult.itemName}
                    </p>
                  </div>
                  
                  {/* Points Box */}
                  <div className="bg-white/80 dark:bg-gray-950/80 backdrop-blur border border-amber-300 dark:border-amber-700/60 p-2.5 rounded-xl text-center shrink-0 shadow-xs animate-bounce mt-4 sm:mt-0">
                    <span className="text-[9px] font-mono text-gray-400 block uppercase tracking-wider font-extrabold">PTS</span>
                    <span className="text-md font-black font-mono text-amber-600 dark:text-amber-400">
                      +{vvpMode ? Math.round(classificationResult.pointsReward * 1.5) : classificationResult.pointsReward}
                    </span>
                    {vvpMode && <span className="text-[8px] block font-black text-emerald-500 font-mono leading-none mt-0.5">1.5x VVP</span>}
                  </div>
                </div>
              </div>

              {/* Layout splits on desktop */}
              <div className="grid md:grid-cols-2 gap-5">
                
                {/* Disposal steps checklist */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    {t.disposalStepsTitle}
                  </h4>
                  <div className="space-y-2">
                    {(language === "te" 
                      ? classificationResult.teluguInstructions 
                      : language === "hi" 
                      ? (classificationResult.hindiInstructions || classificationResult.teluguInstructions)
                      : classificationResult.englishInstructions
                    ).map((step, idx) => (
                      <div
                        key={idx}
                        onClick={() => toggleCheckStep(idx)}
                        className={`flex items-start gap-2.5 p-3 rounded-xl border border-gray-100 dark:border-gray-900 cursor-pointer transition-all ${
                          checkedSteps[idx] 
                            ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60" 
                            : "bg-gray-50/50 dark:bg-gray-900/10 hover:bg-gray-100/50 dark:hover:bg-gray-900/30"
                        }`}
                      >
                        <button className="shrink-0 text-emerald-500 mt-0.5">
                          {checkedSteps[idx] ? <CheckSquare size={14} /> : <Square size={14} className="text-gray-400" />}
                        </button>
                        <span className={`${getDynamicTextClass()} font-medium font-sans leading-relaxed ${checkedSteps[idx] ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-700 dark:text-gray-300"}`}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Local guidelines & Trivia */}
                <div className="space-y-4">
                  
                  {/* Regional guidelines card */}
                  <div className="bg-slate-50 dark:bg-gray-900/40 border border-slate-100/60 dark:border-gray-800/60 p-4 rounded-xl space-y-2">
                    <h5 className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <MapPin size={12} className="text-emerald-500" />
                      {vvpMode ? "VVP Border Protection Rules:" : `${t.municipalPolicyTitle} ${pinCode})`}
                    </h5>
                    <p className={`${getDynamicTextClass()} font-sans text-gray-700 dark:text-gray-300 leading-relaxed font-semibold`}>
                      {vvpMode ? (
                        language === "te"
                          ? `[వైబ్రెంట్ విలేజ్: ${vvpVillage}] పర్యావరణ సున్నిత పర్వత ప్రాంతం. ప్లాస్టిక్ మరియు సీసాలను వేరుచేసి మున్సిపల్ రీసైక్లింగ్ సేకరిణిలో అందజేయడం తప్పనిసరి.`
                          : language === "hi"
                          ? `[सीमांत ग्राम: ${vvpVillage}] संवेदनशील पहाड़ी पर्यावरण नियम: प्लास्टिक और रासायनिक कचरे को अलग रखना और निर्दिष्ट संग्रहण डिब्बों में जमा करना कानूनी तौर पर अनिवार्य है।`
                          : `[VVP Border Zone: ${vvpVillage}] Ecological protection laws apply. You must separate all plastic waste, compost and metals completely before scheduling VVP center drop-off.`
                      ) : (
                        language === "te" 
                          ? classificationResult.localGuidelinesTelugu 
                          : language === "hi"
                          ? (classificationResult.localGuidelinesHindi || classificationResult.localGuidelinesTelugu)
                          : classificationResult.localGuidelinesEnglish
                      )}
                    </p>
                  </div>

                  {/* Fun Fact card */}
                  <div className="bg-amber-50/40 dark:bg-amber-950/10 border border-amber-100/50 dark:border-amber-900/40 p-4 rounded-xl space-y-2">
                    <h5 className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                      <Info size={12} className="text-amber-500" />
                      {t.funFactTitle}
                    </h5>
                    <p className="text-xs font-semibold font-sans text-amber-800 dark:text-amber-300 leading-relaxed">
                      {language === "te" 
                        ? classificationResult.funFactTelugu 
                        : language === "hi"
                        ? (classificationResult.funFactHindi || classificationResult.funFactTelugu)
                        : classificationResult.funFactEnglish
                      }
                    </p>
                  </div>

                </div>

              </div>

              {/* ACTION CLAIM POINTS */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-900 flex justify-end">
                <button
                  onClick={handleClaimPoints}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles size={14} />
                  {language === "te" ? "పాయింట్లు క్లెయిమ్ చేయి" : language === "hi" ? "अंक प्राप्त करें" : "Claim Points & Log"}
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
}
