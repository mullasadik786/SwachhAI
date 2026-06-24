export type WasteCategory = "wet" | "dry" | "recyclable" | "hazardous";

export interface WasteResult {
  category: WasteCategory;
  categoryLabel: string;
  itemName: string;
  englishInstructions: string[];
  teluguInstructions: string[];
  hindiInstructions: string[];
  localGuidelinesEnglish: string;
  localGuidelinesTelugu: string;
  localGuidelinesHindi: string;
  pointsReward: number;
  funFactEnglish: string;
  funFactTelugu: string;
  funFactHindi: string;
}

export interface HistoryItem {
  id: string;
  timestamp: string;
  itemName: string;
  category: WasteCategory;
  categoryLabel: string;
  pointsReward: number;
  pinCode: string;
  image?: string; // Base64 or local placeholder
}

export interface RewardCoupon {
  id: string;
  titleEnglish: string;
  titleTelugu: string;
  titleHindi: string;
  partner: string;
  costPoints: number;
  promoCode: string;
  category: "groceries" | "organic" | "services" | "retail";
  descriptionEnglish: string;
  descriptionTelugu: string;
  descriptionHindi: string;
  image: string;
}

