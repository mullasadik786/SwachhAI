import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Camera, AlertCircle, CheckCircle2, ShieldAlert, Upload, Send } from "lucide-react";
import { Language, translations } from "../utils/translations";

interface GeoTagPortalProps {
  language: Language;
  pinCode: string;
  textSize: "standard" | "large" | "extra";
}

export default function GeoTagPortal({
  language,
  pinCode,
  textSize
}: GeoTagPortalProps) {
  const t = translations[language];

  const [description, setDescription] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Trigger simulated/real GPS geotagging
  const triggerGeotag = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(parseFloat(position.coords.latitude.toFixed(6)));
          setLongitude(parseFloat(position.coords.longitude.toFixed(6)));
        },
        () => {
          // Fallback coordinate mapping for Amaravati AP context
          setLatitude(16.5062);
          setLongitude(80.6480);
        }
      );
    } else {
      setLatitude(16.5062);
      setLongitude(80.6480);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        triggerGeotag();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description && !photoPreview) return;

    setIsSubmitting(true);
    triggerGeotag();

    // Stagger submission
    setTimeout(() => {
      setTicketId(`SWACHH-AMC-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleReset = () => {
    setDescription("");
    setPhotoPreview(null);
    setLatitude(null);
    setLongitude(null);
    setTicketId(null);
  };

  const getDynamicTextClass = () => {
    if (textSize === "large") return "text-sm md:text-base";
    if (textSize === "extra") return "text-base md:text-lg";
    return "text-xs";
  };

  return (
    <div className="bg-white/80 dark:bg-gray-950/75 border border-gray-200/50 dark:border-gray-800/60 rounded-3xl p-6 shadow-sm backdrop-blur-md relative overflow-hidden">
      
      {/* Background radial highlight */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center gap-3 border-b border-gray-100/60 dark:border-gray-900/50 pb-4 mb-4">
        <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-500">
          <ShieldAlert size={22} className="animate-pulse" />
        </div>
        <div>
          <h3 className="text-md font-bold font-display text-gray-900 dark:text-white">
            {t.geoTagTitle}
          </h3>
          <p className="text-[10px] text-gray-400 font-sans font-semibold leading-normal">
            {t.geoTagSub}
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!ticketId ? (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmitComplaint}
            className="space-y-4"
          >
            {/* Split layout: Photo uploader & inputs */}
            <div className="grid sm:grid-cols-12 gap-4">
              
              {/* Left col: Image Attach */}
              <div className="sm:col-span-5">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 dark:border-gray-800 hover:border-rose-500 rounded-2xl aspect-[4/3] w-full flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden group bg-gray-50/50 dark:bg-gray-900/10 transition-colors"
                >
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Spot Capture"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="p-3 space-y-1.5">
                      <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-500 mx-auto group-hover:scale-105 transition-transform">
                        <Camera size={18} />
                      </div>
                      <p className="text-[11px] font-bold text-gray-700 dark:text-gray-300">
                        {t.geoTagFileBtn}
                      </p>
                      <p className="text-[9px] text-gray-400">
                        PNG or JPG with GPS tags
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right col: Description Input */}
              <div className="sm:col-span-7 space-y-3.5 flex flex-col justify-between">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">
                    ✍️ {t.geoTagDesc}
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t.geoTagPlaceholder}
                    className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-800 dark:text-white font-medium resize-none"
                  />
                </div>

                {/* Geotag Indicator */}
                <div className="p-2.5 bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 rounded-xl flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                    <MapPin size={11} className="text-rose-500" />
                    {t.geoTagLocation}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-gray-700 dark:text-gray-300">
                    {latitude && longitude ? `${latitude}° N, ${longitude}° E` : (
                      <button
                        type="button"
                        onClick={triggerGeotag}
                        className="text-rose-500 hover:underline"
                      >
                        Auto-detect GPS
                      </button>
                    )}
                  </span>
                </div>
              </div>

            </div>

            <button
              type="submit"
              disabled={isSubmitting || (!description && !photoPreview)}
              className="w-full py-3 bg-rose-500 hover:bg-rose-600 active:scale-[0.98] disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:text-gray-400 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isSubmitting ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={13} />
                  <span>{t.geoTagBtn}</span>
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-6 text-center space-y-4"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-center text-emerald-500 mx-auto">
              <CheckCircle2 size={32} className="animate-bounce" />
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                {t.geoTagSuccess}
              </h4>
              <p className="text-xs text-gray-400 font-mono font-bold">
                Grievance Reference: <span className="text-rose-500">{ticketId}</span>
              </p>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-900/60 rounded-xl border border-gray-100 dark:border-gray-800 text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed font-semibold max-w-sm mx-auto">
              📍 Location Geo-tagged at <span className="font-mono font-bold">{latitude || "16.5062"}° N, {longitude || "80.6480"}° E</span> under Municipal Zone jurisdiction: Pincode {pinCode}. Dispatch truck dispatched!
            </div>

            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-gray-800 dark:bg-gray-900 text-white hover:bg-gray-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Submit Another Grievance
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
