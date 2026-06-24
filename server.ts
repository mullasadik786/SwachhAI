import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Set up body parsing with high limit for base64 image uploads
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));

// Initialize Gemini Client safely
const apiKey = process.env.GEMINI_API_KEY;
const isGeminiActive = !!apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey !== "";

const ai = isGeminiActive
  ? new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// Local offline sample items database for fallback or quick testing with English, Telugu, and Hindi support
const fallbackDatabase: Record<string, any> = {
  "banana_peel": {
    category: "wet",
    categoryLabel: "తడి చెత్త (Wet Waste)",
    itemName: "Banana Peel / అరటి తొక్క / केले का छिलका",
    englishInstructions: [
      "Remove any plastic stickers or labels from the peel.",
      "Place it in the green compost bin (Wet Waste).",
      "Do not mix with plastics, metals, or paper."
    ],
    teluguInstructions: [
      "తొక్కపై ఉన్న ఏవైనా ప్లాస్టిక్ స్టిక్కర్లను తీసివేయండి.",
      "దీనిని ఆకుపచ్చ తడి చెత్త డబ్బాలో వేయండి.",
      "ప్లాస్టిక్, మెటల్ లేదా కాగితంతో కలపవద్దు."
    ],
    hindiInstructions: [
      "छिलके से किसी भी प्लास्टिक के स्टिकर या लेबल को हटा दें।",
      "इसे हरे कचरे के डिब्बे (गीला कचरा) में डालें।",
      "इसे प्लास्टिक, धातु या कागज के साथ न मिलाएँ।"
    ],
    localGuidelinesEnglish: "Wet waste is collected daily in Amaravati AP Capital and sent to the local municipal aerobic composting facility.",
    localGuidelinesTelugu: "అమరావతి ఏపీ రాజధానిలో ప్రతిరోజూ తడి చెత్తను సేకరించి, స్థానిక మున్సిపల్ కంపోస్టింగ్ కేంద్రానికి పంపుతారు.",
    localGuidelinesHindi: "अमरावती आंध्र प्रदेश की राजधानी में गीला कचरा दैनिक रूप से एकत्र किया जाता है और स्थानीय नगर निगम के जैविक खाद केंद्र में भेजा जाता है।",
    pointsReward: 15,
    funFactEnglish: "Banana peels decompose in just 2-10 days and are incredibly rich in potassium, making excellent compost fertilizer for soil!",
    funFactTelugu: "అరటి తొక్కలు కేవలం 2-10 రోజుల్లో కుళ్ళిపోతాయి. వీటిలో పొటాషియం పుష్కలంగా ఉంటుంది, ఇది మట్టికి అద్భుతమైన ఎరువుగా పనిచేస్తుంది!",
    funFactHindi: "केले के छिलके केवल 2-10 दिनों में सड़ जाते हैं और पोटेशियम से भरपूर होते हैं, जो मिट्टी के लिए उत्कृष्ट खाद बनाते हैं!"
  },
  "plastic_bottle": {
    category: "recyclable",
    categoryLabel: "రీసైకిల్ చేయదగిన వ్యర్థాలు (Recyclable Dry Waste)",
    itemName: "Plastic Water Bottle / ప్లాస్టిక్ సీసా / प्लास्टिक की बोतल",
    englishInstructions: [
      "Empty any remaining water or liquid completely.",
      "Rinse with clean water if it contained sweet/sticky drinks.",
      "Crush the bottle to reduce its volume and screw the cap back on (or separate it if requested locally).",
      "Dispose in the blue recycling bin."
    ],
    teluguInstructions: [
      "లోపల ఉన్న నీరు లేదా ద్రవాన్ని పూర్తిగా ఖాళీ చేయండి.",
      "తీపి లేదా జిగట ద్రవాలు ఉంటే నీటితో శుభ్రం చేయండి.",
      "సీసాను నలిపి (క్రష్ చేసి) పరిమాణాన్ని తగ్గించి, రీసైక్లింగ్ డబ్బాలో వేయండి.",
      "దీనిని నీలం రంగు రీసైక్లింగ్ డబ్బాలో వేయండి."
    ],
    hindiInstructions: [
      "बची हुई पानी या तरल को पूरी तरह से खाली कर दें।",
      "मीठे या चिपचिपे पेय होने पर साफ पानी से धो लें।",
      "बोतल को दबाकर पिचका दें (क्रश करें) और ढक्कन वापस लगा दें।",
      "इसे नीले रंग के रीसाइक्लिंग डिब्बे में डालें।"
    ],
    localGuidelinesEnglish: "Dry recyclable waste is collected twice a week in Amaravati AP Capital. Clean plastics can also be exchanged at municipal dry waste centers for rewards.",
    localGuidelinesTelugu: "అమరావతి ఏపీ రాజధానిలో వారానికి రెండుసార్లు రీసైకిల్ చేయదగిన పొడి వ్యర్థాలను సేకరిస్తారు. శుభ్రమైన ప్లాస్టిక్ను స్థానిక డ్రై వేస్ట్ సెంటర్లలో ఇచ్చి కూడా పాయింట్లు పొందవచ్చు.",
    localGuidelinesHindi: "अमरावती आंध्र प्रदेश की राजधानी में सप्ताह में दो बार सूखा पुनर्चक्रण योग्य कचरा एकत्र किया जाता है। पुरस्कारों के लिए स्थानीय नगर निगम केंद्रों पर भी प्लास्टिक बदला जा सकता है।",
    pointsReward: 25,
    funFactEnglish: "Recycling just one plastic bottle saves enough energy to power a 60-watt light bulb for up to 6 hours!",
    funFactTelugu: "ఒక్క ప్లాస్టిక్ బాటిల్ను రీసైకిల్ చేయడం వల్ల లభించే విద్యుత్ శక్తితో ఒక 60-వాట్ల బల్బును 6 గంటల పాటు వెలిగించవచ్చు!",
    funFactHindi: "केवल एक प्लास्टिक की बोतल को पुनर्चक्रित (recycle) करने से इतनी ऊर्जा बचती है कि 60 वाट के लाइट बल्ब को 6 घंटे तक जलाया जा सके!"
  },
  "batteries": {
    category: "hazardous",
    categoryLabel: "ప్రమాదకరమైన ఈ-వ్యర్థాలు (Hazardous E-Waste)",
    itemName: "Used Batteries / వాడిన బ్యాటరీలు / पुरानी बैटरी",
    englishInstructions: [
      "Keep batteries dry and store them in a non-conductive plastic container.",
      "Cover the terminals with tape to prevent short circuits.",
      "Never mix batteries with wet or general dry waste.",
      "Take them to a designated e-waste drop-off center."
    ],
    teluguInstructions: [
      "బ్యాటరీలను పొడిగా ఉంచండి మరియు ప్లాస్టిక్ కంటైనర్లో భద్రపరచండి.",
      "షార్ట్ సర్క్యూట్ కాకుండా చివరలకు టేప్ వేయండి.",
      "వీటిని తడి చెత్తతో లేదా సాధారణ పొడి చెత్తతో కలపవద్దు.",
      "నిర్దేశిత ఈ-వ్యర్థాల సేకరణ కేంద్రానికి తరలించండి."
    ],
    hindiInstructions: [
      "बैटरियों को सूखा रखें और उन्हें गैर-प्रवाहकीय प्लास्टिक कंटेनर में संग्रहीत करें।",
      "शॉर्ट सर्किट को रोकने के लिए टर्मिनलों को टेप से ढक दें।",
      "बैटरियों को कभी भी गीले या सामान्य सूखे कचरे के साथ न मिलाएँ।",
      "उन्हें एक निर्दिष्ट ई-कचरा केंद्र पर ले जाएँ।"
    ],
    localGuidelinesEnglish: "Hazardous waste must NOT be thrown in standard daily bins in Amaravati AP Capital. It is collected monthly or can be dropped at authorized municipal e-waste kiosks.",
    localGuidelinesTelugu: "అమరావతి ఏపీ రాజధానిలో ప్రమాదకరమైన వ్యర్థాలను సాధారణ డబ్బాల్లో వేయకూడదు. మున్సిపాలిటీ ప్రత్యేకంగా నెలకు ఒకసారి సేకరిస్తుంది లేదా అధీకృత ఈ-వ్యర్థాల కియోస్కులలో వేయాలి.",
    localGuidelinesHindi: "अमरावती आंध्र प्रदेश की राजधानी में खतरनाक कचरे को सामान्य डिब्बों में नहीं फेंका जाना चाहिए। इसे मासिक रूप से एकत्र किया जाता है या अधिकृत नगर निगम ई-कचरा केंद्रों पर दिया जा सकता है।",
    pointsReward: 40,
    funFactEnglish: "Batteries contain toxic heavy metals like lead, mercury, and cadmium. Recycling them extracts valuable metals and prevents toxic leaks into ground water!",
    funFactTelugu: "బ్యాటరీలలో సీసం, పాదరసం వంటి టాక్సిక్ లోహాలు ఉంటాయి. వీటిని రీసైకిల్ చేయడం వల్ల భూగర్భ జలాలు కలుషితం కాకుండా కాపాడవచ్చు!",
    funFactHindi: "बैटरियों में सीसा, पारा और कैडमियम जैसी जहरीली भारी धातुएँ होती हैं। उन्हें रीसायकल करने से मूल्यवान धातुएँ निकलती हैं और भूजल में जहरीला रिसाव रुकता है!"
  },
  "coconut_shell": {
    category: "dry",
    categoryLabel: "పొడి చెత్త (Organic Dry Waste)",
    itemName: "Coconut Shell or Husk / కొబ్బరి బోండాం లేదా చిప్ప / नारियल का खोल",
    englishInstructions: [
      "Ensure the shell is dry and free of residual water.",
      "Due to high fiber content, it takes a long time to decompose.",
      "Separate from quick-composting wet food waste.",
      "Place in the dry organic/husk bin or municipal garden waste collection."
    ],
    teluguInstructions: [
      "కొబ్బరి చిప్ప పొడిగా ఉండేలా చూసుకోండి.",
      "అధిక పీచు ఉండటం వల్ల ఇది కుళ్ళిపోవడానికి ఎక్కువ సమయం పడుతుంది.",
      "త్వరగా కుళ్ళిపోయే తడి ఆహార వ్యర్థాల నుండి దీనిని వేరు చేయండి.",
      "పొడి సేంద్రీయ వ్యర్థాల డబ్బాలో లేదా తోట వ్యర్థాల సేకరణలో వేయండి."
    ],
    hindiInstructions: [
      "सुनिश्चित करें कि खोल सूखा है और उसमें पानी नहीं है।",
      "फाइबर की अधिक मात्रा के कारण इसे सड़ने में लंबा समय लगता है।",
      "जल्दी सड़ने वाले गीले खाद्य कचरे से इसे अलग करें।",
      "इसे सूखे कार्बनिक/भूसी डिब्बे या नगर निगम उद्यान कचरा संग्रह में रखें।"
    ],
    localGuidelinesEnglish: "Bulk organic wastes like coconut shells are collected separately on designated community clean-up days in Amaravati.",
    localGuidelinesTelugu: "అమరావతిలో కొబ్బరి బోండాలు, తోట వ్యర్థాలు వంటి పెద్ద సేంద్రీయ వ్యర్థాలను మున్సిపాలిటీ ప్రత్యేక రోజుల్లో విడిగా సేకరిస్తుంది.",
    localGuidelinesHindi: "अमरावती में नारियल के गोले जैसे बड़े जैविक कचरे को निर्दिष्ट सामुदायिक सफाई के दिनों में अलग से एकत्र किया जाता है।",
    pointsReward: 15,
    funFactEnglish: "Coconut husks are excellent raw materials for coir making, soil-retention mats, and traditional eco-friendly kitchen scrubs!",
    funFactTelugu: "కొబ్బరి పీచును పగ్గాలు, మట్టి కోతను నివారించే మ్యాట్లు మరియు పర్యావరణహిత గిన్నెల స్క్రబ్బర్ల తయారీకి ఉపయోగిస్తారు!",
    funFactHindi: "नारियल की भूसी जूट बनाने, मिट्टी के कटाव को रोकने वाली मैट और पर्यावरण के अनुकूल बरतन साफ करने वाले जूने के लिए बेहतरीन कच्ची सामग्री है!"
  }
};

// API: Check health/config
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    aiMode: isGeminiActive ? "AI Active" : "Demo/Offline Mode",
    time: new Date().toISOString()
  });
});

// API: Classify Waste
app.post("/api/classify", async (req, res) => {
  const { image, text, pinCode = "522020", selectedPreset } = req.body;

  console.log(`Processing classification request. AI Active: ${isGeminiActive}. Selected Preset: ${selectedPreset}`);

  // 1. If a preset is requested and we have it in fallback, serve it immediately (or if offline)
  if (selectedPreset && fallbackDatabase[selectedPreset]) {
    return res.json({
      success: true,
      source: "preset",
      pincode: pinCode,
      data: fallbackDatabase[selectedPreset]
    });
  }

  // 2. If Gemini is NOT active or we just have text matching a basic preset keyword offline
  if (!isGeminiActive) {
    // Offline simulation mapping
    let matchedKey = "banana_peel"; // Default fallback
    const queryText = (text || "").toLowerCase();

    if (queryText.includes("bottle") || queryText.includes("plastic") || queryText.includes("can") || queryText.includes("ప్లాస్టిక్") || queryText.includes("बोतल") || queryText.includes("प्लास्टिक")) {
      matchedKey = "plastic_bottle";
    } else if (queryText.includes("battery") || queryText.includes("cell") || queryText.includes("wire") || queryText.includes("బ్యాటరీ") || queryText.includes("बैटरी")) {
      matchedKey = "batteries";
    } else if (queryText.includes("coconut") || queryText.includes("husk") || queryText.includes("కొబ్బరి") || queryText.includes("नारियल")) {
      matchedKey = "coconut_shell";
    }

    const matchedData = { ...fallbackDatabase[matchedKey] };
    
    // Simulate some variance based on user input text
    if (text) {
      matchedData.itemName = `${text} (Demo Identified)`;
    }

    // Add pincode/city customization simulation
    matchedData.localGuidelinesEnglish = `[Amaravati Zone / Pincode ${pinCode}] ${matchedData.localGuidelinesEnglish}`;
    matchedData.localGuidelinesTelugu = `[అమరావతి జోన్ / పిన్కోడ్ ${pinCode}] ${matchedData.localGuidelinesTelugu}`;
    matchedData.localGuidelinesHindi = `[अमरावती जोन / पिनकोड ${pinCode}] ${matchedData.localGuidelinesHindi}`;

    return res.json({
      success: true,
      source: "offline_demo",
      pincode: pinCode,
      data: matchedData
    });
  }

  // 3. Process with REAL Gemini AI!
  try {
    if (!ai) {
      throw new Error("Gemini AI client not initialized.");
    }

    let contents: any[] = [];

    // Add image if provided
    if (image) {
      // Remove data url prefix if exists (e.g. data:image/jpeg;base64,...)
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
      contents.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Data
        }
      });
    }

    // Prepare robust prompt explaining waste classification in the Indian municipal context with English, Telugu, and Hindi
    const pinCodeInfo = pinCode ? `The user is located in India, with local focus on Amaravati AP Capital (Pin Code: ${pinCode}). Customize municipal guidelines for this specific area.` : "The user is in Amaravati, AP Capital, India.";
    const userTextPrompt = text ? `The user describes the item as: "${text}".` : "Identify the item visible in the image.";

    const promptText = `
You are SwachhAI, the intelligent assistant for India's Swachh Bharat Abhiyan (Clean India Mission).
Your job is to analyze the uploaded waste item image and/or text description, and accurately categorize it into one of four categories:
1. 'wet' (Organic/biodegradable kitchen waste)
2. 'dry' (Clean, dry recyclable items like clean paper, cardboard, metal, wood)
3. 'recyclable' (Plastics, clean metal cans, clean glass bottles)
4. 'hazardous' (E-waste, batteries, medical waste, toxic materials)

Please analyze this item:
${userTextPrompt}
${pinCodeInfo}

Ensure you provide:
- The accurate category: 'wet' | 'dry' | 'recyclable' | 'hazardous'.
- A clear label in Telugu, English, and Hindi (e.g. "తడి చెత్త / Wet Waste / गीला कचरा").
- The identified item name in a trilingual format: "English Name / తెలుగు పేరు / हिंदी नाम".
- Step-by-step instructions on how to handle/clean/sort this item before disposal in English.
- Step-by-step instructions on how to handle/clean/sort this item in Telugu.
- Step-by-step instructions on how to handle/clean/sort this item in Hindi.
- Local municipal disposal policy or collection guidelines for Amaravati AP Capital / specified pincode in English. (Be specific and realistic for India, e.g. daily green bin, weekly dry waste, or dropping off at an e-waste booth).
- Local municipal disposal policy in Telugu.
- Local municipal disposal policy in Hindi.
- A points reward (an integer between 15 and 50 points based on correct classification and difficulty of handling - higher points for hazardous or recyclable waste requiring cleaning).
- An interesting, positive, and educational fun fact about recycling or composting this item in English.
- An interesting, positive, and educational fun fact in Telugu.
- An interesting, positive, and educational fun fact in Hindi.

Return the response strictly matching the requested JSON schema. Do not include markdown wraps or extra texts, just the clean JSON.
`;

    contents.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: {
              type: Type.STRING,
              description: "Must be one of: 'wet', 'dry', 'recyclable', 'hazardous'"
            },
            categoryLabel: {
              type: Type.STRING,
              description: "Trilingual label, e.g. 'తడి చెత్త (Wet Waste) / गीला कचरा'"
            },
            itemName: {
              type: Type.STRING,
              description: "Trilingual item name, e.g. 'Plastic Bottle / ప్లాస్టిక్ సీసా / प्लास्टिक की बोतल'"
            },
            englishInstructions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Disposal steps in English"
            },
            teluguInstructions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Disposal steps in Telugu"
            },
            hindiInstructions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Disposal steps in Hindi"
            },
            localGuidelinesEnglish: {
              type: Type.STRING,
              description: "Municipal guideline for this pincode in English"
            },
            localGuidelinesTelugu: {
              type: Type.STRING,
              description: "Municipal guideline for this pincode in Telugu"
            },
            localGuidelinesHindi: {
              type: Type.STRING,
              description: "Municipal guideline for this pincode in Hindi"
            },
            pointsReward: {
              type: Type.INTEGER,
              description: "Reward points (15 to 50)"
            },
            funFactEnglish: {
              type: Type.STRING,
              description: "Educational recycling fact in English"
            },
            funFactTelugu: {
              type: Type.STRING,
              description: "Educational recycling fact in Telugu"
            },
            funFactHindi: {
              type: Type.STRING,
              description: "Educational recycling fact in Hindi"
            }
          },
          required: [
            "category",
            "categoryLabel",
            "itemName",
            "englishInstructions",
            "teluguInstructions",
            "hindiInstructions",
            "localGuidelinesEnglish",
            "localGuidelinesTelugu",
            "localGuidelinesHindi",
            "pointsReward",
            "funFactEnglish",
            "funFactTelugu",
            "funFactHindi"
          ]
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No response received from Gemini.");
    }

    const data = JSON.parse(responseText.trim());
    return res.json({
      success: true,
      source: "gemini_ai",
      pincode: pinCode,
      data
    });

  } catch (error: any) {
    console.error("Gemini classification failed:", error);
    // Gracefully fall back to simulated response so the app never breaks
    return res.status(200).json({
      success: true,
      source: "fallback_after_error",
      error: error.message,
      pincode: pinCode,
      data: fallbackDatabase["banana_peel"] // Default fallback
    });
  }
});

// Integrate Vite Middleware for dev, or static asset serving for production
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SwachhAI Server running on http://localhost:${PORT}`);
  });
}

setupServer();
