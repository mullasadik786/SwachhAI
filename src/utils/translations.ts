export type Language = "te" | "en" | "hi";

export interface AppTranslations {
  subTitle: string;
  demoMode: string;
  realtimeAi: string;
  namaskarTitle: string;
  namaskarQuote: string;
  activeZoneLabel: string;
  activeCityVal: string;
  themeSelectorLabel: string;
  themeMint: string;
  themeSolar: string;
  themeAurora: string;
  themeSlate: string;
  themeSwachh: string;
  cameraButtonText: string;
  cameraHeading: string;
  cameraSubText: string;
  textInputPlaceholder: string;
  textInputSubmit: string;
  presetTitle: string;
  presetBanana: string;
  presetBottle: string;
  presetBattery: string;
  presetCoconut: string;
  resultTitle: string;
  disposalStepsTitle: string;
  municipalPolicyTitle: string;
  funFactTitle: string;
  rewardsStoreTitle: string;
  rewardsStoreSub: string;
  yourBalance: string;
  couponGroceries: string;
  couponOrganic: string;
  couponServices: string;
  couponRetail: string;
  redeemedSuccess: string;
  redeemButton: string;
  redeemCost: string;
  historyTitle: string;
  clearHistoryButton: string;
  noHistoryText: string;
  noHistorySub: string;
  leaderboardTitle: string;
  leaderboardFooter: string;
  footerText: string;
  adjustTextSize: string;
  adjustBrightness: string;
  darkTheme: string;
  lightTheme: string;
  micSpeakNow: string;
  micListening: string;
  micStop: string;

  // NEW TRILINGUAL TRANSLATIONS FOR VVP & FEATURES
  vvpHeader: string;
  vvpSub: string;
  vvpBorderSelect: string;
  vvpPointsBonus: string;
  vvpBonusEarned: string;
  vvpStoreTitle: string;
  vvpStoreSub: string;
  vvpBadge: string;
  
  smartThemeLabel: string;
  smartThemeDesc: string;
  smartThemeActive: string;
  
  truckTitle: string;
  truckSub: string;
  truckEta: string;
  truckDist: string;
  truckStatusReady: string;
  truckStatusArrived: string;
  truckNotification: string;
  truckTrackButton: string;

  geoTagTitle: string;
  geoTagSub: string;
  geoTagBtn: string;
  geoTagSuccess: string;
  geoTagLocation: string;
  geoTagDesc: string;
  geoTagPlaceholder: string;
  geoTagFileBtn: string;
}

export const translations: Record<Language, AppTranslations> = {
  te: {
    subTitle: "వ్యర్థాల నిర్వహణ అసిస్టెంట్",
    demoMode: "డెమో మోడ్",
    realtimeAi: "రియల్ టైమ్ AI సక్రియంగా ఉంది",
    namaskarTitle: "నమస్కారం! స్వచ్ఛభారత్ అభీష్టాన్ని విజయవంతం చేద్దాం",
    namaskarQuote: "పరిశుభ్రత అనేది దైవత్వంతో సమానం. మన అమరావతి నగరాన్ని పరిశుభ్రంగా మరియు ఆరోగ్యకరంగా ఉంచుదాం.",
    activeZoneLabel: "ప్రస్తుత మునిసిపాలిటీ జోన్:",
    activeCityVal: "అమరావతి (ఆంధ్రప్రదేశ్ రాజధాని)",
    themeSelectorLabel: "ప్రత్యక్ష వాల్‌పేపర్ & థీమ్ ఎంచుకోండి:",
    themeMint: "క్లీన్ మింట్",
    themeSolar: "సోలార్ గ్లో",
    themeAurora: "అరోరా స్కై",
    themeSlate: "క్లాసిక్ స్లేట్",
    themeSwachh: "స్వచ్ఛ భారత్ స్పెషల్ 🇮🇳",
    cameraButtonText: "కెమెరా స్కాన్ ప్రారంభించండి",
    cameraHeading: "AI కెమెరా స్కానర్",
    cameraSubText: "ఏదైనా వ్యర్థాన్ని గుర్తించడానికి ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి",
    textInputPlaceholder: "లేదా వ్యర్థం పేరు టైప్ చేయండి (ఉదా. ప్లాస్టిక్ సీసా, అరటి తొక్క)...",
    textInputSubmit: "AI విశ్లేషించు",
    presetTitle: "త్వరిత ట్రయల్ కోసం ఒకదాన్ని ఎంచుకోండి:",
    presetBanana: "అరటి తొక్క (తడి)",
    presetBottle: "ప్లాస్టిక్ సీసా (రీసైకిల్)",
    presetBattery: "వాడిన బ్యాటరీ (ప్రమాదకరం)",
    presetCoconut: "కొబ్బరి చిప్ప (సేంద్రీయ పొడి)",
    resultTitle: "AI వర్గీకరణ ఫలితాలు",
    disposalStepsTitle: "వ్యర్థాల తొలగింపు నియమాలు:",
    municipalPolicyTitle: "అమరావతి మున్సిపల్ విధానం (పిన్ కోడ్:",
    funFactTitle: "పర్యావరణ వాస్తవం (Fun Fact):",
    rewardsStoreTitle: "స్వచ్ఛ కూపన్ల స్టోర్",
    rewardsStoreSub: "వ్యర్థాలను సరిగ్గా వేరు చేసి ఉచిత గిఫ్ట్ వోచర్లు పొందండి!",
    yourBalance: "మీ స్వచ్ఛ పాయింట్లు:",
    couponGroceries: "కిరాణా వోచర్",
    couponOrganic: "సేంద్రీయ కూరగాయలు",
    couponServices: "మున్సిపల్ సర్వీస్ డిస్కౌంట్",
    couponRetail: "పర్యావరణ అనుకూల బ్యాగ్",
    redeemedSuccess: "అభినందనలు! మీ కూపన్ విజయవంతంగా క్లెయిమ్ చేయబడింది. ప్రోమో కోడ్:",
    redeemButton: "క్లెయిమ్ చేయి",
    redeemCost: "పాయింట్లు",
    historyTitle: "నా పరిశీలనల చరిత్ర",
    clearHistoryButton: "చరిత్ర తుడిచివేయి",
    noHistoryText: "ఇంకా ఎలాంటి వ్యర్థాలు స్కాన్ చేయలేదు.",
    noHistorySub: "పైన ఉన్న కెమెరాను ఉపయోగించి ప్రారంభించండి.",
    leaderboardTitle: "లీడర్‌బోర్డ్ హీరోలు",
    leaderboardFooter: "ప్రతి నెలా ఎక్కువ పాయింట్లు సాధించిన వారికి మున్సిపాలిటీ ప్రత్యేక పురస్కారం అందిస్తుంది.",
    footerText: "స్వచ్ఛAI © 2026 - అమరావతి స్మార్ట్ సిటీ డిజిటల్ విప్లవం.",
    adjustTextSize: "అక్షరాల పరిమాణం",
    adjustBrightness: "కాంతి తీవ్రత (Adjust Theme)",
    darkTheme: "డార్క్ మోడ్",
    lightTheme: "లైట్ మోడ్",
    micSpeakNow: "మాట్లాడటానికి క్లిక్ చేయండి...",
    micListening: "వినబడుతోంది... మాట్లాడండి",
    micStop: "ఆపండి",

    // VVP & EXTRA TRILINGUAL (Telugu)
    vvpHeader: "🌄 వైబ్రెంట్ విలేజెస్ ప్రోగ్రామ్ (VVP) లింక్",
    vvpSub: "సరిహద్దు గ్రామాలు (లడఖ్, హిమాచల్, అరుణాచల్ కొండ ప్రాంతాలు) పర్యావరణపరంగా చాలా సున్నితమైనవి. సరిహద్దుల్లో వ్యర్థాలు నియంత్రిద్దాం!",
    vvpBorderSelect: "సక్రియ సరిహద్దు గ్రామం ఎంచుకోండి:",
    vvpPointsBonus: "VVP స్పెషల్ 1.5x పాయింట్స్ బోనస్ సక్రియంగా ఉంది!",
    vvpBonusEarned: "వైబ్రెంట్ విలేజెస్ స్పెషల్ బోనస్ పాయింట్లు లభించాయి!",
    vvpStoreTitle: "🏔️ వైబ్రెంట్ విలేజెస్ రివార్డ్స్ (VVP Store)",
    vvpStoreSub: "సరిహద్దు గ్రామాల మహిళా స్వయం సహాయక సంఘాలు (SHGs) తయారు చేసిన అద్భుతమైన వస్తువులు!",
    vvpBadge: "సరిహద్దు గ్రామ రక్షకుడు",

    smartThemeLabel: "🌓 స్మార్ట్ థీమ్ ఆటోమేషన్ (Sunset Sync)",
    smartThemeDesc: "సూర్యాస్తమయం కాగానే ఆటోమేటిక్గా డార్క్ మోడ్కి మారుతుంది.",
    smartThemeActive: "సూర్యాస్తమయం (6 PM) దాటినందున స్మార్ట్ డార్క్ మోడ్ సక్రియమైంది!",

    truckTitle: "🚛 లైవ్ గార్బేజ్ ట్రక్ ట్రాకింగ్ (Uber for Waste)",
    truckSub: "మీ పిన్ కోడ్ ఆధారంగా మీ వీధిలోకి వచ్చే మున్సిపల్ గార్బేజ్ ట్రక్ లైవ్ మ్యాప్ స్థానం మరియు నిమిషాలు.",
    truckEta: "చేరుకోవడానికి పట్టే సమయం:",
    truckDist: "దూరం:",
    truckStatusReady: "చెత్త బండి వస్తోంది",
    truckStatusArrived: "ట్రక్ వచ్చేసింది! దయచేసి తడి-పొడి చెత్తను సిద్ధంగా ఉంచండి.",
    truckNotification: "🔔 అలర్ట్: చెత్త బండి మరో 5 నిమిషాల్లో మీ వీధికి చేరుకుంటుంది!",
    truckTrackButton: "ట్రక్ ట్రాకింగ్ ప్రారంభించు",

    geoTagTitle: "🗺️ కమ్యూనిటీ జియో-ట్యాగింగ్ (రోడ్డు పక్కన చెత్త ఫిర్యాదు)",
    geoTagSub: "వీధిలో లేదా బహిరంగ ప్రదేశంలో చెత్త కుప్పను చూశారా? ఫోటో తీయండి, GPS లొకేషన్ తో మున్సిపాలిటీకి నేరుగా ఫిర్యాదు పంపండి.",
    geoTagBtn: "ఫిర్యాదు దాఖలు చేయి",
    geoTagSuccess: "ధన్యవాదాలు! మీ జియో-ట్యాగ్డ్ ఫిర్యాదు విజయవంతంగా నమోదు చేయబడింది. మున్సిపల్ జోన్ 3 అధికారికి పంపించాము.",
    geoTagLocation: "గుర్తించిన లొకేషన్:",
    geoTagDesc: "వ్యర్థాల తీవ్రత వివరణ:",
    geoTagPlaceholder: "ఉదా. రోడ్డు పక్కన ప్లాస్టిక్ వ్యర్థాలు పేరుకుపోయాయి...",
    geoTagFileBtn: "ఫిర్యాదు ఫోటో అప్‌లోడ్"
  },
  en: {
    subTitle: "AI Waste Management Assistant",
    demoMode: "Demo Mode",
    realtimeAi: "Real-Time AI Active",
    namaskarTitle: "Namaskar! Let's fulfill the Swachh Bharat Mission",
    namaskarQuote: "Cleanliness is next to godliness. Let's keep our Amaravati beautiful and sustainable.",
    activeZoneLabel: "Active Municipal Zone:",
    activeCityVal: "Amaravati (AP Capital)",
    themeSelectorLabel: "Choose Live Wallpaper & Theme:",
    themeMint: "Clean Mint",
    themeSolar: "Solar Glow",
    themeAurora: "Aurora Sky",
    themeSlate: "Classic Slate",
    themeSwachh: "Swachh Bharat Special 🇮🇳",
    cameraButtonText: "Start Camera Scan",
    cameraHeading: "AI Camera Scanner",
    cameraSubText: "Take a photo or upload an image to identify waste category",
    textInputPlaceholder: "Or type a waste item name (e.g., plastic bottle, dry leaves)...",
    textInputSubmit: "Analyze with AI",
    presetTitle: "Or choose an item to try immediately:",
    presetBanana: "Banana Peel (Wet)",
    presetBottle: "Plastic Bottle (Recycle)",
    presetBattery: "Used Battery (Hazardous)",
    presetCoconut: "Coconut Shell (Dry)",
    resultTitle: "AI Classification Results",
    disposalStepsTitle: "Disposal Guidelines & Steps:",
    municipalPolicyTitle: "Amaravati Municipal Policy (Pin Code:",
    funFactTitle: "Environmental Fun Fact:",
    rewardsStoreTitle: "Swachh Rewards Store",
    rewardsStoreSub: "Sort waste correctly and redeem amazing free vouchers!",
    yourBalance: "Your Swachh Points:",
    couponGroceries: "Grocery Voucher",
    couponOrganic: "Organic Produce Voucher",
    couponServices: "Municipal Service Discount",
    couponRetail: "Eco-friendly Tote Bag",
    redeemedSuccess: "Congratulations! Your coupon is claimed successfully. Promo code:",
    redeemButton: "Redeem",
    redeemCost: "pts",
    historyTitle: "My Scanning History",
    clearHistoryButton: "Clear Logs",
    noHistoryText: "No scanned items logged yet.",
    noHistorySub: "Use the AI Scanner above to classify your first item.",
    leaderboardTitle: "Community Heroes",
    leaderboardFooter: "Municipalities award Special Gold Badges to top recyclers every month.",
    footerText: "SwachhAI © 2026 - Powered by Gemini. Empowering Amaravati's Clean Mission.",
    adjustTextSize: "Text Size",
    adjustBrightness: "Theme Style (Light/Dark)",
    darkTheme: "Dark Mode",
    lightTheme: "Light Mode",
    micSpeakNow: "Click to speak item name...",
    micListening: "Listening... Speak now",
    micStop: "Stop",

    // VVP & EXTRA TRILINGUAL (English)
    vvpHeader: "🌄 Vibrant Villages Programme (VVP) Link",
    vvpSub: "Border villages in Ladakh, Himachal, and Arunachal are ecologically sensitive. Scan and clean plastic wastes to protect mountains and Himalayan rivers!",
    vvpBorderSelect: "Select Active Border Village Area:",
    vvpPointsBonus: "VVP Border Special 1.5x Points Bonus Active!",
    vvpBonusEarned: "Vibrant Villages special environment bonus points awarded!",
    vvpStoreTitle: "🏔️ Vibrant Villages Eco-Store (VVP Rewards)",
    vvpStoreSub: "Support women self-help groups (SHGs) and handcrafters from pristine border villages!",
    vvpBadge: "Border Eco Guardian",

    smartThemeLabel: "🌓 Smart Theme Switcher (Sunset Sync)",
    smartThemeDesc: "Automatically transitions between light/dark themes relative to local sunset times.",
    smartThemeActive: "Local sunset detected (Simulated 6:00 PM). Auto-shifted to Classic Slate Theme!",

    truckTitle: "🚛 Live Garbage Truck Tracking (Uber for Waste)",
    truckSub: "Enter your pincode to monitor active garbage trucks nearby with live routing updates.",
    truckEta: "Estimated Arrival:",
    truckDist: "Distance:",
    truckStatusReady: "Truck En Route",
    truckStatusArrived: "Truck Arrived at street! Keep sorted waste ready.",
    truckNotification: "🔔 Notification: Garbage collection vehicle is 5 minutes away!",
    truckTrackButton: "Simulate Live Tracking",

    geoTagTitle: "🗺️ Location-Based Garbage detention (Geo-Tagging)",
    geoTagSub: "Spot roadside garbage pile or plastic spill? Snaps and submit. We tag GPS coordinates and alert local sanitation zone officers.",
    geoTagBtn: "Submit Public Sanitation Grievance",
    geoTagSuccess: "Complaint submitted! GPS geotag registered and forwarded to municipal zone authorities.",
    geoTagLocation: "Captured Coordinates:",
    geoTagDesc: "Grievance details:",
    geoTagPlaceholder: "Describe garbage accumulation here...",
    geoTagFileBtn: "Attach Spot Photo"
  },
  hi: {
    subTitle: "एआई कचरा प्रबंधन सहायक",
    demoMode: "डेमो मोड",
    realtimeAi: "रीयल-टाइम एआई सक्रिय है",
    namaskarTitle: "नमस्कार! आइए स्वच्छ भारत अभियान को सफल बनाएं",
    namaskarQuote: "स्वच्छता ही सेवा है। आइए अपने अमरावती शहर को स्वच्छ, सुंदर और हरा-भरा रखें।",
    activeZoneLabel: "सक्रिय नगर निगम क्षेत्र:",
    activeCityVal: "अमरावती (आंध्र प्रदेश की राजधानी)",
    themeSelectorLabel: "लाइव वॉलपेपर और थीम चुनें:",
    themeMint: "क्लीन मिंट",
    themeSolar: "सोलर ग्लो",
    themeAurora: "अरोड़ा स्काई",
    themeSlate: "क्लासिक स्लेट",
    themeSwachh: "स्वच्छ भारत स्पेशल 🇮🇳",
    cameraButtonText: "कैमरा स्कैन शुरू करें",
    cameraHeading: "एआई कैमरा स्कैनर",
    cameraSubText: "कचरे की पहचान करने के लिए फोटो लें या अपलोड करें",
    textInputPlaceholder: "या कचरे का नाम टाइप करें (जैसे प्लास्टिक की बोतल, केले का छिलका)...",
    textInputSubmit: "एआई विश्लेषण करें",
    presetTitle: "या तुरंत प्रयास करने के लिए एक आइटम चुनें:",
    presetBanana: "केले का छिलका (गीला)",
    presetBottle: "प्लास्टिक की बोतल (रीसायकल)",
    presetBattery: "पुरानी बैटरी (खतरनाक)",
    presetCoconut: "नारियल का खोल (सूखा)",
    resultTitle: "एआई वर्गीकरण परिणाम",
    disposalStepsTitle: "निपटान और छँटाई के चरण:",
    municipalPolicyTitle: "अमरावती नगर निगम नीति (पिन कोड:",
    funFactTitle: "पर्यावरण रोचक तथ्य (Fun Fact):",
    rewardsStoreTitle: "स्वच्छ कूपन स्टोर",
    rewardsStoreSub: "कचरे को सही ढंग से छाँटें और मुफ्त उपहार वाउचर प्राप्त करें!",
    yourBalance: "आपके स्वच्छ अंक (Points):",
    couponGroceries: "किराना वाउचर",
    couponOrganic: "जैविक उत्पाद वाउचर",
    couponServices: "नगर निगम सेवा छूट",
    couponRetail: "पर्यावरण के अनुकूल बैग",
    redeemedSuccess: "बधाई हो! आपका कूपन सफलतापूर्वक भुनाया गया। प्रोमो कोड:",
    redeemButton: "कूपन प्राप्त करें",
    redeemCost: "अंक",
    historyTitle: "मेरे स्कैनिंग का इतिहास",
    clearHistoryButton: "इतिहास मिटाएं",
    noHistoryText: "अभी तक कोई आइटम स्कैन नहीं किया गया है।",
    noHistorySub: "अपना पहला आइटम वर्गीकृत करने के लिए ऊपर दिए गए एआई स्कैनर का उपयोग करें।",
    leaderboardTitle: "कम्युनिटी हीरोज (लीडरबोर्ड)",
    leaderboardFooter: "हर महीने सबसे अधिक अंक प्राप्त करने वालों को नगर निगम विशेष स्वर्ण पदक प्रदान करता है।",
    footerText: "स्वच्छAI © 2026 - अमरावती स्मार्ट सिटी डिजिटल क्रांति।",
    adjustTextSize: "अक्षरों का आकार",
    adjustBrightness: "चमक नियंत्रण (Adjust Theme)",
    darkTheme: "डार्क मोड",
    lightTheme: "लाइट मोड",
    micSpeakNow: "बोलने के लिए क्लिक करें...",
    micListening: "सुन रहा हूँ... बोलिए",
    micStop: "रोकें",

    // VVP & EXTRA TRILINGUAL (Hindi)
    vvpHeader: "🌄 वाइब्रेंट विलेज प्रोग्राम (VVP) लिंक",
    vvpSub: "लद्दाख, हिमाचल और अरुणाचल जैसे सीमावर्ती गांव पर्यावरण की दृष्टि से संवेदनशील हैं। हिमालयी नदियों और पहाड़ों को प्लास्टिक मुक्त रखें!",
    vvpBorderSelect: "सक्रिय सीमावर्ती ग्राम क्षेत्र चुनें:",
    vvpPointsBonus: "VVP सीमा विशेष 1.5x पॉइंट बोनस सक्रिय है!",
    vvpBonusEarned: "वाइब्रेंट विलेजेज विशेष पर्यावरण संरक्षण बोनस अंक प्रदान किए गए!",
    vvpStoreTitle: "🏔️ वाइब्रेंट विलेज इको-स्टोर (VVP Rewards)",
    vvpStoreSub: "हमारे सीमावर्ती क्षेत्रों के महिला स्वयं सहायता समूहों (SHGs) द्वारा हस्तनिर्मित जैविक उत्पाद!",
    vvpBadge: "सीमा रक्षक",

    smartThemeLabel: "🌓 स्मार्ट थीम स्वचालित स्विच (Sunset Sync)",
    smartThemeDesc: "शाम होते ही (Simulated 6 PM) स्क्रीन अपने आप आँखों की सुरक्षा के लिए 'क्लासिक स्लेट' डार्क थीम में बदल जाएगी।",
    smartThemeActive: "सूर्यास्त का समय! आँख की सुरक्षा के लिए रात की थीम सक्रिय की गई है।",

    truckTitle: "🚛 कचरा गाड़ी लाइव ट्रैकिंग (Uber for Waste)",
    truckSub: "पिन कोड डालें और अपनी गली में आने वाली नगर निगम की कचरा गाड़ी की लाइव स्थिति और दूरी देखें।",
    truckEta: "अनुमानित समय:",
    truckDist: "दूरी:",
    truckStatusReady: "कचरा गाड़ी रास्ते में है",
    truckStatusArrived: "कचरा गाड़ी गली में पहुँच गई है! कृपया गीला-सूखा कचरा तैयार रखें।",
    truckNotification: "🔔 सूचना: कचरा गाड़ी अगले 5 मिनट में आपकी गली में पहुँच रही है!",
    truckTrackButton: "लाइव ट्रैकिंग शुरू करें",

    geoTagTitle: "🗺️ स्थान-आधारित कचरा डंप शिकायत (Geo-Tagging)",
    geoTagSub: "क्या सड़क किनारे कचरे का ढेर देखा? फोटो अपलोड करें, जीपीएस टैग करके सीधे नगर निगम शिकायत डेस्क को भेजें।",
    geoTagBtn: "सार्वजनिक स्वच्छता शिकायत दर्ज करें",
    geoTagSuccess: "शिकायत दर्ज! जीपीएस भू-टैग पंजीकृत कर संबंधित स्वच्छता अधिकारी को भेज दिया गया है।",
    geoTagLocation: "जीपीएस निर्देशांक (Coordinates):",
    geoTagDesc: "कचरे का विवरण:",
    geoTagPlaceholder: "यहाँ कचरे के ढेर या प्लास्टिक संचय का विवरण लिखें...",
    geoTagFileBtn: "स्थान का फोटो अपलोड करें"
  }
};
